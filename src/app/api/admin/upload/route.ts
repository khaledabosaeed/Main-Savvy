import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { uploadBufferToR2 } from "@/lib/r2-media"

/**
 * Server proxies file bytes — Vercel limits request bodies (~4.5 MB), so large uploads return 413.
 * Admin UI uses direct browser → R2 upload via `/api/admin/r2-upload-url` instead.
 */
const MAX_BYTES = 4 * 1024 * 1024

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

export async function POST(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = form.get("file")
  const folderRaw = form.get("folder")
  const folder =
    typeof folderRaw === "string" && folderRaw.startsWith("/")
      ? folderRaw
      : "/robots"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large for this endpoint (max 4 MB). Use the admin image field upload (direct to Cloudflare R2) for larger files." },
      { status: 400 }
    )
  }

  const originalName = file.name || "upload"
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 200)
  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const result = await uploadBufferToR2(buffer, safeName, folder, file.type)
    return NextResponse.json({
      url: result.url,
      key: result.key,
      name: result.name,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
