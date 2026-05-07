import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

async function requireUser() {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return {
        user: null as null,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      }
    }
    return { user, error: null as null }
  } catch {
    return {
      user: null as null,
      error: NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 503 }
      ),
    }
  }
}

export type ImageKitFileItem = {
  fileId: string
  name: string
  filePath: string
  url: string
  thumbnailUrl: string | null
  mime: string | null
  fileType: string | null
  width?: number
  height?: number
  size?: number
}

function isVideoAsset(mime: string | null, url: string): boolean {
  if (mime?.startsWith("video/")) return true
  return /\.(mp4|webm|mov|m4v|mkv|ogg)(\?|$)/i.test(url)
}

function isImageAsset(mime: string | null, fileType: string | null): boolean {
  if (mime?.startsWith("image/")) return true
  if (fileType === "image") return true
  return false
}

/**
 * Lists media from ImageKit Media Library (Management API).
 * Protected: only authenticated admin users.
 */
export async function GET(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  if (!privateKey) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY is not configured" },
      { status: 503 }
    )
  }

  const { searchParams } = new URL(request.url)
  const filterType = searchParams.get("type") ?? "all"
  if (!["all", "image", "video"].includes(filterType)) {
    return NextResponse.json(
      { error: 'Invalid type. Use "all", "image", or "video".' },
      { status: 400 }
    )
  }

  const skip = searchParams.get("skip") ?? "0"
  const limit = searchParams.get("limit") ?? "100"

  const auth =
    "Basic " + Buffer.from(`${privateKey}:`).toString("base64")

  try {
    const ikUrl = new URL("https://api.imagekit.io/v1/files")
    ikUrl.searchParams.set("skip", skip)
    ikUrl.searchParams.set("limit", limit)

    const res = await fetch(ikUrl.toString(), {
      headers: {
        Authorization: auth,
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    })

    const raw = await res.json()

    if (!res.ok) {
      const message =
        typeof raw?.message === "string"
          ? raw.message
          : typeof raw?.help === "string"
            ? raw.help
            : `ImageKit API error (${res.status})`
      return NextResponse.json({ error: message }, { status: res.status })
    }

    const rows: unknown[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.files)
        ? raw.files
        : []

    const mapped: ImageKitFileItem[] = rows
      .filter((row): row is Record<string, unknown> => typeof row === "object" && row !== null)
      .filter((row) => row.type !== "folder")
      .map((row) => {
        const fileId = String(row.fileId ?? row.file_id ?? "")
        const name = String(row.name ?? "")
        const filePath = String(row.filePath ?? row.file_path ?? "")
        const url = String(row.url ?? "")
        const thumbnailUrl =
          typeof row.thumbnail === "string"
            ? row.thumbnail
            : typeof row.thumbnailUrl === "string"
              ? row.thumbnailUrl
              : null
        const mime =
          typeof row.mime === "string"
            ? row.mime
            : typeof row.mimeType === "string"
              ? row.mimeType
              : null
        const fileType =
          typeof row.fileType === "string"
            ? row.fileType
            : typeof row.file_type === "string"
              ? row.file_type
              : null
        const width = typeof row.width === "number" ? row.width : undefined
        const height = typeof row.height === "number" ? row.height : undefined
        const size = typeof row.size === "number" ? row.size : undefined

        return {
          fileId,
          name,
          filePath,
          url,
          thumbnailUrl,
          mime,
          fileType,
          width,
          height,
          size,
        }
      })
      .filter((f) => f.fileId && f.url)

    const filtered =
      filterType === "all"
        ? mapped
        : filterType === "video"
          ? mapped.filter((f) => isVideoAsset(f.mime, f.url))
          : mapped.filter(
              (f) =>
                isImageAsset(f.mime, f.fileType) &&
                !isVideoAsset(f.mime, f.url)
            )

    return NextResponse.json({ files: filtered })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to list files"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
