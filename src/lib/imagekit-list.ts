export type ImageKitFileSummary = {
  url: string
  thumbnailUrl: string
  name: string
}

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not set`)
  return v
}

/**
 * List image files in an ImageKit folder (Media API v1).
 * Auth: HTTP Basic, username = private API key, empty password.
 */
export async function listImageKitFiles(params: {
  /** Folder path, e.g. `/robots` */
  path: string
  limit?: number
  skip?: number
}): Promise<ImageKitFileSummary[]> {
  const privateKey = requireEnv("IMAGEKIT_PRIVATE_KEY")
  const auth = Buffer.from(`${privateKey}:`).toString("base64")

  const limit = Math.min(params.limit ?? 100, 1000)
  const skip = params.skip ?? 0
  const normalizedPath = params.path.startsWith("/")
    ? params.path
    : `/${params.path}`

  type RawItem = {
    url?: string
    thumbnail?: string
    name?: string
    filePath?: string
    mime?: string
    type?: string
    fileType?: string
  }

  async function fetchList(pathQuery: string): Promise<RawItem[]> {
    const search = new URLSearchParams()
    search.set("path", pathQuery)
    search.set("fileType", "image")
    search.set("limit", String(limit))
    search.set("skip", String(skip))

    const res = await fetch(`https://api.imagekit.io/v1/files?${search}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
      cache: "no-store",
    })

    const json = (await res.json()) as RawItem[] | { list?: RawItem[]; message?: string; help?: string }

    if (!res.ok) {
      const errBody = json as { message?: string; help?: string }
      throw new Error(
        errBody.message ?? errBody.help ?? `ImageKit list failed (${res.status})`
      )
    }

    return Array.isArray(json) ? json : (json.list ?? [])
  }

  let list = await fetchList(normalizedPath)
  if (
    list.length === 0 &&
    normalizedPath !== "/" &&
    !normalizedPath.endsWith("/")
  ) {
    list = await fetchList(`${normalizedPath}/`)
  }
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? ""

  const out: ImageKitFileSummary[] = []
  for (const item of list) {
    if (item.type === "folder") continue

    const mime = item.mime ?? ""
    const nameOrPath = item.name ?? item.filePath ?? ""
    const isImage =
      mime.startsWith("image/") ||
      item.fileType === "image" ||
      /\.(jpe?g|png|gif|webp|avif|svg|bmp|ico)$/i.test(nameOrPath)

    if (!isImage) continue

    let url = item.url
    if (!url && item.filePath && urlEndpoint) {
      const base = urlEndpoint.replace(/\/$/, "")
      const fp = item.filePath.startsWith("/")
        ? item.filePath
        : `/${item.filePath}`
      url = `${base}${fp}`
    }
    if (!url) continue

    const thumbnailUrl = item.thumbnail || url
    out.push({
      url,
      thumbnailUrl,
      name: item.name ?? item.filePath ?? "Image",
    })
  }

  return out
}
