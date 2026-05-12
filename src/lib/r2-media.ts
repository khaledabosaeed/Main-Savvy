import crypto from "node:crypto"

export type R2FileSummary = {
  url: string
  thumbnailUrl: string
  name: string
  kind: "image" | "video"
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

export async function listR2Files(params: {
  path: string
  limit?: number
  skip?: number
}): Promise<R2FileSummary[]> {
  const limit = Math.min(params.limit ?? 100, 1000)
  const skip = params.skip ?? 0
  const prefix = normalizeR2Folder(params.path)
  const fetchCount = Math.min(limit + skip, 1000)
  const endpoint = r2Endpoint()
  endpoint.pathname = `/${encodePath(getR2BucketName())}`
  endpoint.search = canonicalQuery({
    "list-type": "2",
    "max-keys": String(fetchCount),
    ...(prefix ? { prefix: `${prefix}/` } : {}),
  })

  const res = await fetch(endpoint, {
    headers: signedHeadersForRequest({
      method: "GET",
      url: endpoint,
      bodyHash: sha256Hex(""),
    }),
    cache: "no-store",
  })
  const xml = await res.text()
  if (!res.ok) {
    throw new Error(`Cloudflare R2 list failed (${res.status}): ${xml}`)
  }

  return [...xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)]
    .map((match) => {
      const block = match[1]
      return {
        key: textFromXml(block, "Key"),
        lastModified: Date.parse(textFromXml(block, "LastModified")) || 0,
      }
    })
    .filter((item) => item.key && !item.key.endsWith("/"))
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(skip, skip + limit)
    .flatMap((item) => {
      const kind = kindFromKey(item.key)
      if (!kind) return []
      const name = item.key.split("/").pop() ?? item.key
      const url = buildR2PublicUrl(item.key)
      return [{ url, thumbnailUrl: url, name, kind }]
    })
}
