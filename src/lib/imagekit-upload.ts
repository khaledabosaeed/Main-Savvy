import crypto from "node:crypto"

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not set`)
  return v
}

/** ImageKit upload authentication (server-side). */
export function getImageKitAuthParams(): {
  token: string
  expire: number
  signature: string
} {
  const token = crypto.randomBytes(16).toString("hex")
  const expire = Math.floor(Date.now() / 1000) + 2400
  const privateKey = requireEnv("IMAGEKIT_PRIVATE_KEY")
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex")
  return { token, expire, signature }
}

export type ImageKitUploadResult = {
  url: string
  fileId: string
  name: string
}

/** Upload a file buffer to ImageKit (no npm `imagekit` package — uses REST API). */
export async function uploadBufferToImageKit(
  buffer: Buffer,
  fileName: string,
  folder = "/robots"
): Promise<ImageKitUploadResult> {
  const publicKey = requireEnv("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY")
  const { token, expire, signature } = getImageKitAuthParams()

  const form = new FormData()
  form.append(
    "file",
    new Blob([new Uint8Array(buffer)]),
    fileName
  )
  form.append("fileName", fileName)
  form.append("publicKey", publicKey)
  form.append("signature", signature)
  form.append("expire", String(expire))
  form.append("token", token)
  form.append("folder", folder)

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: form,
  })

  const json = (await res.json()) as {
    url?: string
    fileId?: string
    name?: string
    message?: string
    help?: string
  }

  if (!res.ok) {
    throw new Error(json.message ?? json.help ?? `ImageKit upload failed (${res.status})`)
  }

  if (!json.url || !json.fileId) {
    throw new Error("ImageKit response missing url or fileId")
  }

  return {
    url: json.url,
    fileId: json.fileId,
    name: json.name ?? fileName,
  }
}
