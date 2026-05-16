import crypto from "node:crypto"

export type R2FileSummary = {
  url: string
  thumbnailUrl: string
  name: string
  kind: "image" | "video"
  /** UTC epoch ms from R2 LastModified (newest-first gallery order) */
  lastModified: number
}

export type R2UploadTarget = {
  uploadUrl: string
  publicUrl: string
  key: string
  method: "PUT"
}

function requireEnv(name: string): string {
  const v = process.env[name]?.trim()
  if (!v) throw new Error(`${name} is not set`)
  return v
}

function hmac(key: Buffer | string, value: string): Buffer {
  return crypto.createHmac("sha256", key).update(value).digest()
}

function sha256Hex(value: string | Buffer): string {
  return crypto.createHash("sha256").update(value).digest("hex")
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")
}

function encodeQuery(value: string): string {
  return encodeURIComponent(value).replace(/[!*'()]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  )
}

function formatAmzDate(date = new Date()): { amzDate: string; dateStamp: string } {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, "")
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  }
}

function signingKey(dateStamp: string): Buffer {
  const secret = requireEnv("R2_SECRET_ACCESS_KEY")
  const kDate = hmac(`AWS4${secret}`, dateStamp)
  const kRegion = hmac(kDate, "auto")
  const kService = hmac(kRegion, "s3")
  return hmac(kService, "aws4_request")
}

function credentialScope(dateStamp: string): string {
  return `${dateStamp}/auto/s3/aws4_request`
}

function r2Endpoint(): URL {
  return new URL(requireEnv("R2_ENDPOINT").replace(/\/+$/, ""))
}

export function getR2BucketName(): string {
  return requireEnv("R2_BUCKET_NAME")
}

export function normalizeR2Folder(folder: string): string {
  return folder
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\/{2,}/g, "/")
}

function safeFileName(fileName: string): string {
  return (
    (fileName || "upload")
      .replace(/[/\\]+/g, "_")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 160) || "upload"
  )
}

export function createR2ObjectKey(folder: string, fileName: string): string {
  const safeName = safeFileName(fileName)
  const prefix = normalizeR2Folder(folder)
  const stamp = new Date().toISOString().replace(/[:.]/g, "-")
  const random = Math.random().toString(36).slice(2, 10)
  const keyedName = `${stamp}-${random}-${safeName}`
  return prefix ? `${prefix}/${keyedName}` : keyedName
}

export function buildR2PublicUrl(key: string): string {
  const base = requireEnv("NEXT_PUBLIC_R2_PUBLIC_URL").replace(/\/+$/, "")
  return `${base}/${encodePath(key.replace(/^\/+/, ""))}`
}

function kindFromKey(key: string): "image" | "video" | null {
  if (/\.(mp4|webm|mov|m4v|ogv|mkv|avi)$/i.test(key)) return "video"
  if (/\.(jpe?g|png|gif|webp|avif|svg|bmp|ico)$/i.test(key)) return "image"
  return null
}

function objectUrl(key: string): URL {
  const endpoint = r2Endpoint()
  endpoint.pathname = `/${encodePath(`${getR2BucketName()}/${key.replace(/^\/+/, "")}`)}`
  endpoint.search = ""
  return endpoint
}

function canonicalQuery(params: Record<string, string>): string {
  return Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${encodeQuery(key)}=${encodeQuery(value)}`)
    .join("&")
}

function presignPutUrl(params: {
  key: string
  contentType: string
  expiresIn: number
}): string {
  const url = objectUrl(params.key)
  const { amzDate, dateStamp } = formatAmzDate()
  const scope = credentialScope(dateStamp)
  const signedHeaders = "content-type;host"
  const query = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD",
    "X-Amz-Credential": `${requireEnv("R2_ACCESS_KEY_ID")}/${scope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(params.expiresIn),
    "X-Amz-SignedHeaders": signedHeaders,
  }
  const canonical = [
    "PUT",
    url.pathname,
    canonicalQuery(query),
    `content-type:${params.contentType}\n` + `host:${url.host}\n`,
    signedHeaders,
    "UNSIGNED-PAYLOAD",
  ].join("\n")
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256Hex(canonical),
  ].join("\n")
  const signature = crypto
    .createHmac("sha256", signingKey(dateStamp))
    .update(stringToSign)
    .digest("hex")

  url.search = `${canonicalQuery(query)}&X-Amz-Signature=${signature}`
  return url.toString()
}

function signedHeadersForRequest(params: {
  method: "GET" | "PUT"
  url: URL
  contentType?: string
  bodyHash: string
}): HeadersInit {
  const { amzDate, dateStamp } = formatAmzDate()
  const scope = credentialScope(dateStamp)
  const headers: Record<string, string> = {
    host: params.url.host,
    "x-amz-content-sha256": params.bodyHash,
    "x-amz-date": amzDate,
  }
  if (params.contentType) headers["content-type"] = params.contentType

  const signedHeaders = Object.keys(headers).sort().join(";")
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((key) => `${key}:${headers[key]}\n`)
    .join("")
  const canonical = [
    params.method,
    params.url.pathname,
    params.url.searchParams.toString(),
    canonicalHeaders,
    signedHeaders,
    params.bodyHash,
  ].join("\n")
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256Hex(canonical),
  ].join("\n")
  const signature = crypto
    .createHmac("sha256", signingKey(dateStamp))
    .update(stringToSign)
    .digest("hex")

  const out: Record<string, string> = {
    "x-amz-content-sha256": params.bodyHash,
    "x-amz-date": amzDate,
    Authorization:
      `AWS4-HMAC-SHA256 Credential=${requireEnv("R2_ACCESS_KEY_ID")}/${scope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`,
  }
  if (params.contentType) out["Content-Type"] = params.contentType
  return out
}

export async function createPresignedR2Upload(params: {
  folder: string
  fileName: string
  contentType: string
  expiresIn?: number
}): Promise<R2UploadTarget> {
  const key = createR2ObjectKey(params.folder, params.fileName)
  const contentType = params.contentType || "application/octet-stream"
  return {
    uploadUrl: presignPutUrl({
      key,
      contentType,
      expiresIn: params.expiresIn ?? 900,
    }),
    publicUrl: buildR2PublicUrl(key),
    key,
    method: "PUT",
  }
}

export async function uploadBufferToR2(
  buffer: Buffer,
  fileName: string,
  folder = "/robots",
  contentType = "application/octet-stream"
): Promise<{ url: string; key: string; name: string }> {
  const key = createR2ObjectKey(folder, fileName)
  const url = objectUrl(key)
  const res = await fetch(url, {
    method: "PUT",
    headers: signedHeadersForRequest({
      method: "PUT",
      url,
      contentType,
      bodyHash: sha256Hex(buffer),
    }),
    body: new Uint8Array(buffer),
  })
  if (!res.ok) {
    throw new Error(`Cloudflare R2 upload failed (${res.status})`)
  }
  return {
    url: buildR2PublicUrl(key),
    key,
    name: safeFileName(fileName),
  }
}

function decodeXml(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
}

function textFromXml(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return match ? decodeXml(match[1]) : ""
}

/**
 * Offset pager for `/api/admin/media`: each response is a slice into the folder’s
 * image/video keys sorted by R2 LastModified descending (latest first).
 */
type MediaListCursorV2 = { v: 2; o: number }

const MEDIA_LIST_CURSOR_V = 2
const MEDIA_LIST_KEYS_PER_REQ = 500
/** Max listing pages scanned per HTTP request (~30k keys); beyond this sorting is refused */
const MEDIA_LIST_SORT_MAX_LOOPS = 60

function encodeMediaListCursor(offset: number): string {
  const body: MediaListCursorV2 = { v: MEDIA_LIST_CURSOR_V, o: offset }
  return Buffer.from(JSON.stringify(body), "utf8").toString("base64url")
}

export function decodeMediaListCursor(encoded: string): MediaListCursorV2 | null {
  try {
    const raw = Buffer.from(encoded.trim(), "base64url").toString("utf8")
    const o = JSON.parse(raw) as MediaListCursorV2 & { v?: unknown; o?: unknown }
    if (o?.v !== MEDIA_LIST_CURSOR_V || typeof o.o !== "number") return null
    if (!Number.isInteger(o.o) || o.o < 0) return null
    return { v: MEDIA_LIST_CURSOR_V, o: o.o }
  } catch {
    return null
  }
}

export type ListR2FilesResult = {
  files: R2FileSummary[]
  nextContinuationToken: string | null
}

function parseContentsRows(xml: string): { key: string; lastModified: number }[] {
  return [...xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)]
    .map((match) => {
      const block = match[1]
      const key = textFromXml(block, "Key")
      const lm = Date.parse(textFromXml(block, "LastModified"))
      return { key, lastModified: Number.isFinite(lm) ? lm : 0 }
    })
    .filter((row) => row.key && !row.key.endsWith("/"))
}

async function listSortedMediaSummaries(prefix: string | undefined): Promise<
  Array<{ item: R2FileSummary; key: string }>
> {
  const items: Array<{ item: R2FileSummary; key: string }> = []
  let listContinuationToken: string | undefined
  let truncated = false
  let truncationToken: string | null = null

  for (
    let loop = 0;
    loop < MEDIA_LIST_SORT_MAX_LOOPS;
    loop++
  ) {
    const { xml, ok, status } = await fetchListObjectsXml({
      prefix,
      maxKeys: MEDIA_LIST_KEYS_PER_REQ,
      continuationToken: listContinuationToken,
    })

    if (!ok) {
      throw new Error(`Cloudflare R2 list failed (${status}): ${xml}`)
    }

    listContinuationToken = undefined

    const rows = parseContentsRows(xml)
    const { isTruncated, continuationToken } = parseTruncation(xml)
    truncated = isTruncated
    truncationToken = continuationToken

    for (const row of rows) {
      const kind = kindFromKey(row.key)
      if (!kind) continue
      const name = row.key.split("/").pop() ?? row.key
      const url = buildR2PublicUrl(row.key)
      items.push({
        key: row.key,
        item: {
          url,
          thumbnailUrl: url,
          name,
          kind,
          lastModified: row.lastModified,
        },
      })
    }

    if (!truncated) break
    if (!continuationToken) break
    listContinuationToken = continuationToken
  }

  if (truncated && truncationToken) {
    const cap = MEDIA_LIST_SORT_MAX_LOOPS * MEDIA_LIST_KEYS_PER_REQ
    throw new Error(
      `Too many objects in this folder to sort by date (>${cap} keys); use a narrower folder path`
    )
  }

  items.sort((a, b) => {
    const d = b.item.lastModified - a.item.lastModified
    if (d !== 0) return d
    return b.key.localeCompare(a.key)
  })

  return items
}

function parseTruncation(xml: string): {
  isTruncated: boolean
  continuationToken: string | null
} {
  const t = /^true$/i.test(textFromXml(xml, "IsTruncated"))
  const token = textFromXml(xml, "NextContinuationToken")
  return {
    isTruncated: t,
    continuationToken: token || null,
  }
}

async function fetchListObjectsXml(params: {
  prefix: string | undefined
  maxKeys: number
  continuationToken?: string
  startAfter?: string
}): Promise<{ xml: string; ok: boolean; status: number }> {
  const endpoint = r2Endpoint()
  endpoint.pathname = `/${encodePath(getR2BucketName())}`
  const q: Record<string, string> = {
    "list-type": "2",
    "max-keys": String(params.maxKeys),
  }
  if (params.prefix != null && params.prefix !== "") {
    q.prefix = `${params.prefix}/`
  }
  if (params.continuationToken) {
    q["continuation-token"] = params.continuationToken
  } else if (params.startAfter != null && params.startAfter !== "") {
    q["start-after"] = params.startAfter
  }

  endpoint.search = canonicalQuery(q)

  const res = await fetch(endpoint, {
    headers: signedHeadersForRequest({
      method: "GET",
      url: endpoint,
      bodyHash: sha256Hex(""),
    }),
    cache: "no-store",
  })
  const xml = await res.text()
  return { xml, ok: res.ok, status: res.status }
}

export async function listR2Files(params: {
  path: string
  limit?: number
  cursor?: string | null
}): Promise<ListR2FilesResult> {
  const limit = Math.min(params.limit ?? 100, 1000)
  const prefixRaw = normalizeR2Folder(params.path)
  const prefix = prefixRaw || undefined

  let offset = 0
  if (params.cursor?.trim()) {
    const decoded = decodeMediaListCursor(params.cursor.trim())
    if (!decoded) {
      throw new Error("Invalid media list cursor")
    }
    offset = decoded.o
  }

  const sorted = await listSortedMediaSummaries(prefix)
  const slice = sorted.slice(offset, offset + limit).map((x) => x.item)
  const nextContinuationToken =
    offset + limit < sorted.length ? encodeMediaListCursor(offset + limit) : null

  return {
    files: slice,
    nextContinuationToken,
  }
}
