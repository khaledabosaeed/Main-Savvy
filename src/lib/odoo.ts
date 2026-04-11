import { z } from 'zod'

import type {
  NormalizedOdooProduct,
  OdooJsonRpcRequest,
  OdooJsonRpcResponse,
  OdooProductRecord,
} from '@/types/odoo'

/** Treat missing env as empty so Zod reports our message, not "received undefined". */
function envString(name: string, message: string) {
  return z.preprocess(
    (v) => (typeof v === 'string' ? v : ''),
    z.string().trim().min(1, message || `${name} is required`)
  )
}

const odooEnvSchema = z.object({
  /** Instance root URL, e.g. https://mydb.odoo.com — not the web UI path /odoo (JSON-RPC is POST /jsonrpc on the host root). */
  ODOO_URL: envString('ODOO_URL', 'ODOO_URL is missing or empty'),
  ODOO_DB: envString('ODOO_DB', 'ODOO_DB is missing or empty'),
  ODOO_USERNAME: envString('ODOO_USERNAME', 'ODOO_USERNAME is missing or empty'),
  ODOO_API_KEY: envString('ODOO_API_KEY', 'ODOO_API_KEY is missing or empty'),
})

export type OdooEnv = z.infer<typeof odooEnvSchema> & { jsonRpcUrl: string }

export class OdooConfigError extends Error {
  readonly name = 'OdooConfigError'
  constructor(message: string) {
    super(message)
  }
}

export class OdooAuthError extends Error {
  readonly name = 'OdooAuthError'
  constructor(message = 'Odoo authentication failed') {
    super(message)
  }
}

export class OdooNetworkError extends Error {
  readonly name = 'OdooNetworkError'
  constructor(
    message: string,
    readonly cause?: unknown
  ) {
    super(message)
  }
}

export class OdooRpcError extends Error {
  readonly name = 'OdooRpcError'
  constructor(
    message: string,
    readonly code?: number,
    readonly data?: unknown
  ) {
    super(message)
  }
}

export class OdooInvalidIdError extends Error {
  readonly name = 'OdooInvalidIdError'
  constructor(message = 'Invalid product id') {
    super(message)
  }
}

export class OdooInvalidPrefixError extends Error {
  readonly name = 'OdooInvalidPrefixError'
  constructor(message = 'Invalid name prefix') {
    super(message)
  }
}

/** Map domain errors to HTTP status + safe client message (no secrets). */
export function getOdooHttpError(err: unknown): {
  status: number
  error: string
  code?: string
} {
  if (err instanceof OdooConfigError) {
    return { status: 500, error: 'Odoo is not configured', code: 'CONFIG' }
  }
  if (err instanceof OdooInvalidIdError) {
    return { status: 400, error: err.message, code: 'BAD_REQUEST' }
  }
  if (err instanceof OdooInvalidPrefixError) {
    return { status: 400, error: err.message, code: 'BAD_REQUEST' }
  }
  if (err instanceof OdooAuthError) {
    return { status: 401, error: err.message, code: 'AUTH' }
  }
  if (err instanceof OdooNetworkError) {
    return { status: 503, error: 'Odoo server is unreachable', code: 'NETWORK' }
  }
  if (err instanceof OdooRpcError) {
    return { status: 502, error: err.message, code: 'RPC' }
  }
  console.error('Unexpected Odoo error:', err)
  return { status: 500, error: 'Internal server error', code: 'INTERNAL' }
}

let rpcId = 0

function nextRpcId(): number {
  rpcId += 1
  return rpcId
}

/** Strip trailing slashes and optional /odoo so JSON-RPC targets https://host/jsonrpc, not .../odoo/jsonrpc (CSRF HTML 400 on Odoo SaaS). */
export function odooJsonRpcBaseFromUrl(odooUrl: string): string {
  return odooUrl.replace(/\/+$/, '').replace(/\/odoo$/i, '')
}

function originFromOdooUrl(odooUrl: string): string {
  const u = new URL(odooUrl.replace(/\/+$/, ''))
  return `${u.protocol}//${u.host}`
}

export function parseOdooEnv(): OdooEnv {
  const parsed = odooEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join('; ')
    throw new OdooConfigError(msg || 'Invalid Odoo environment configuration')
  }
  const rpcBase = odooJsonRpcBaseFromUrl(parsed.data.ODOO_URL)
  return {
    ...parsed.data,
    jsonRpcUrl: `${rpcBase}/jsonrpc`,
  }
}

const ODOO_PROBE_BODY = JSON.stringify({
  jsonrpc: '2.0',
  method: 'call',
  params: {
    service: 'common',
    method: 'login',
    args: ['__odoo_url_probe__', '__odoo_url_probe__', '__odoo_url_probe__'],
  },
  id: 0,
} satisfies OdooJsonRpcRequest)

let odooUrlProbesLogged = false

/** When NODE_ENV=development or ODOO_DEBUG_URLS=1, POST once per process to candidate /jsonrpc URLs and log status, content-type, body. */
async function maybeLogOdooJsonRpcUrlProbes(env: OdooEnv): Promise<void> {
  const enabled =
    process.env.ODOO_DEBUG_URLS === '1' || process.env.NODE_ENV === 'development'
  if (!enabled || odooUrlProbesLogged) return
  odooUrlProbesLogged = true

  const rpcBase = odooJsonRpcBaseFromUrl(env.ODOO_URL)
  const origin = originFromOdooUrl(env.ODOO_URL)
  const urls = [...new Set([`${rpcBase}/jsonrpc`, `${origin}/jsonrpc`, `${origin}/odoo/jsonrpc`])]

  console.error('---- ODOO JSON-RPC URL PROBES (one-shot) ----')
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: ODOO_PROBE_BODY,
      })
      const contentType = res.headers.get('content-type')
      const rawText = await res.text()
      console.error('---- ODOO PROBE RESPONSE ----')
      console.error('URL:', url)
      console.error('STATUS:', res.status)
      console.error('CONTENT-TYPE:', contentType)
      console.error('BODY:', rawText)
      console.error('-----------------------------')
    } catch (e) {
      console.error('---- ODOO PROBE FAILED ----')
      console.error('URL:', url)
      console.error(e)
      console.error('---------------------------')
    }
  }
  console.error('---- END ODOO URL PROBES ----')
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isOdooJsonRpcResponse<T>(v: unknown): v is OdooJsonRpcResponse<T> {
  if (!isRecord(v)) return false
  return v.jsonrpc === '2.0' && ('result' in v || 'error' in v)
}

export function normalizeProduct(record: OdooProductRecord): NormalizedOdooProduct {
  const id = typeof record.id === 'number' && Number.isFinite(record.id) ? record.id : 0
  const name =
    typeof record.name === 'string' && record.name.length > 0
      ? record.name
      : record.name === false
        ? ''
        : String(record.name ?? '')

  const rawPrice = record.list_price
  let listPrice: number | null = null
  if (typeof rawPrice === 'number' && Number.isFinite(rawPrice)) {
    listPrice = rawPrice
  } else if (rawPrice !== false && rawPrice != null) {
    const n = Number(rawPrice)
    if (Number.isFinite(n)) listPrice = n
  }

  const defaultCode =
    typeof record.default_code === 'string'
      ? record.default_code
      : record.default_code === false || record.default_code == null
        ? null
        : String(record.default_code)

  const descriptionSale =
    typeof record.description_sale === 'string'
      ? record.description_sale
      : record.description_sale === false || record.description_sale == null
        ? null
        : String(record.description_sale)

  // Same-origin proxy; some Odoo DBs have no `has_image` on product.template — always link and let GET return 404 if empty.
  const imageUrl = id > 0 ? `/api/odoo/product-image?templateId=${id}` : null

  return {
    id,
    name,
    listPrice,
    defaultCode,
    descriptionSale,
    imageUrl,
  }
}

function sniffImageContentType(buf: Buffer): string {
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return 'image/png'
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg'
  }
  if (
    buf.length >= 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp'
  }
  return 'image/png'
}

function decodeOdooBinaryField(value: string | false | undefined): Buffer | null {
  if (typeof value !== 'string' || value.length === 0) return null
  const trimmed = value.trim()
  const b64 = trimmed.startsWith('data:') ? (trimmed.split(',')[1] ?? '') : trimmed
  if (!b64) return null
  try {
    return Buffer.from(b64, 'base64')
  } catch {
    return null
  }
}

/**
 * Loads `image_512` for a product template (server-only). Used by the image proxy route.
 */
export async function getProductTemplateImage(
  templateId: number
): Promise<{ data: Buffer; contentType: string } | null> {
  if (!Number.isInteger(templateId) || templateId <= 0) {
    throw new OdooInvalidIdError()
  }

  type Row = { image_512?: string | false }
  const rows = await odooExecuteKw<Row[]>(
    'product.template',
    'read',
    [[templateId], ['image_512']],
    {}
  )

  if (!Array.isArray(rows) || rows.length === 0) {
    return null
  }

  const raw = rows[0]?.image_512
  const data = decodeOdooBinaryField(raw)
  if (!data || data.length === 0) {
    return null
  }

  return { data, contentType: sniffImageContentType(data) }
}

async function jsonRpcCall<T>(env: OdooEnv, params: OdooJsonRpcRequest['params']): Promise<T> {
  const url = env.jsonRpcUrl
  const body: OdooJsonRpcRequest = {
    jsonrpc: '2.0',
    method: 'call',
    params,
    id: nextRpcId(),
  }

  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (e) {
    throw new OdooNetworkError('Failed to reach Odoo server', e)
  }

  const contentType = res.headers.get('content-type')
  const rawText = await res.text()

  console.error('---- ODOO RAW RESPONSE ----')
  console.error('URL:', url)
  console.error('STATUS:', res.status)
  console.error('CONTENT-TYPE:', contentType)
  console.error('BODY:', rawText)
  console.error('---------------------------')

  if (!contentType?.includes('application/json')) {
    throw new OdooRpcError(
      `Invalid Odoo response. Expected JSON but got ${contentType ?? '(missing)'}\nBody:\n${rawText}`,
      res.status
    )
  }

  let json: unknown
  try {
    json = JSON.parse(rawText) as unknown
  } catch {
    throw new OdooRpcError(`Odoo returned NON-JSON:\n${rawText}`, res.status)
  }

  if (!isOdooJsonRpcResponse<T>(json)) {
    throw new OdooRpcError('Invalid JSON-RPC response from Odoo', res.status)
  }

  if (json.error) {
    const { code, message, data } = json.error
    throw new OdooRpcError(message || 'Odoo JSON-RPC error', code, data)
  }

  if (!res.ok) {
    throw new OdooRpcError(`Odoo HTTP error: ${res.status}`, res.status)
  }

  if (!('result' in json)) {
    throw new OdooRpcError('Odoo JSON-RPC response missing result')
  }

  return json.result as T
}

export async function login(): Promise<number> {
  const env = parseOdooEnv()
  await maybeLogOdooJsonRpcUrlProbes(env)
  const uid = await jsonRpcCall<number | false>(env, {
    service: 'common',
    method: 'login',
    args: [env.ODOO_DB, env.ODOO_USERNAME, env.ODOO_API_KEY],
  })

  if (uid === false || typeof uid !== 'number' || !Number.isFinite(uid) || uid <= 0) {
    throw new OdooAuthError()
  }

  return uid
}

/**
* Low-level Odoo `execute_kw` for any model/method. Prefer domain-specific helpers when they exist.
*/

export async function odooExecuteKw<T>(
  model: string,
  method: string,
  args: unknown[],
  kwargs: Record<string, unknown> = {}
): Promise<T> {
  const env = parseOdooEnv()
  const uid = await login()
  return jsonRpcCall<T>(env, {
    service: 'object',
    method: 'execute_kw',
    args: [env.ODOO_DB, uid, env.ODOO_API_KEY, model, method, args, kwargs],
  })
}

const PRODUCT_FIELDS = ['id', 'name', 'list_price', 'default_code', 'description_sale'] as const

/** Raw `search_read` rows (Odoo field names; empty values are often `false`). */
export async function getProductsRaw(): Promise<OdooProductRecord[]> {
  const env = parseOdooEnv()
  const uid = await login()

  const rows = await jsonRpcCall<OdooProductRecord[]>(env, {
    service: 'object',
    method: 'execute_kw',
    args: [
      env.ODOO_DB,
      uid,
      env.ODOO_API_KEY,
      'product.template',
      'search_read',
      [[['sale_ok', '=', true]], [...PRODUCT_FIELDS]],
      { limit: 20 },
    ],
  })

  if (!Array.isArray(rows)) {
    throw new OdooRpcError('Unexpected Odoo search_read result')
  }

  return rows
}

export async function getProducts(): Promise<NormalizedOdooProduct[]> {
  const rows = await getProductsRaw()
  return rows.map((r) => normalizeProduct(r))
}

/**
 * When true, product API routes may return unnormalized Odoo records via `?raw=1`.
 * Enabled in development or when `ODOO_DEBUG_RAW_PRODUCTS=1`.
 */
export function isOdooRawProductDebugEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ODOO_DEBUG_RAW_PRODUCTS === '1'
}

const NAME_PREFIX_SEARCH_LIMIT = 500

/** Strip SQL LIKE wildcards so the prefix is matched literally (ilike still case-insensitive). */
function sanitizeNamePrefixForIlike(namePrefix: string): string {
  return namePrefix.trim().replace(/[%_\\]/g, '')
}

/**
* Saleable product templates whose name starts with the given prefix (case-insensitive in Odoo via ilike).
*/

export async function getProductsByNamePrefixRaw(
  namePrefix: string,
  options?: { limit?: number }
): Promise<OdooProductRecord[]> {
  const literal = sanitizeNamePrefixForIlike(namePrefix)
  if (!literal) {
    throw new OdooInvalidPrefixError('namePrefix must be non-empty and cannot consist only of wildcards')
  }

  const env = parseOdooEnv()
  const uid = await login()
  const limit = Math.min(
    Math.max(1, options?.limit ?? NAME_PREFIX_SEARCH_LIMIT),
    2000
  )

  const domain: unknown[] = ['&', ['sale_ok', '=', true], ['name', 'ilike', `${literal}%`]]

  const rows = await jsonRpcCall<OdooProductRecord[]>(env, {
    service: 'object',
    method: 'execute_kw',
    args: [
      env.ODOO_DB,
      uid,
      env.ODOO_API_KEY,
      'product.template',
      'search_read',
      [domain, [...PRODUCT_FIELDS]],
      { limit },
    ],
  })

  if (!Array.isArray(rows)) {
    throw new OdooRpcError('Unexpected Odoo search_read result')
  }

  return rows
}

export async function getProductsByNamePrefix(
  namePrefix: string,
  options?: { limit?: number }
): Promise<NormalizedOdooProduct[]> {
  const rows = await getProductsByNamePrefixRaw(namePrefix, options)
  return rows.map((r) => normalizeProduct(r))
}

export async function getProductByIdRaw(id: number): Promise<OdooProductRecord | null> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new OdooInvalidIdError()
  }

  const env = parseOdooEnv()
  const uid = await login()

  const rows = await jsonRpcCall<OdooProductRecord[]>(env, {
    service: 'object',
    method: 'execute_kw',
    args: [
      env.ODOO_DB,
      uid,
      env.ODOO_API_KEY,
      'product.template',
      'read',
      [[id], [...PRODUCT_FIELDS]],
      {},
    ],
  })

  if (!Array.isArray(rows) || rows.length === 0) {
    return null
  }

  return rows[0]!
}

export async function getProductById(id: number): Promise<NormalizedOdooProduct | null> {
  const raw = await getProductByIdRaw(id)
  return raw ? normalizeProduct(raw) : null
}
