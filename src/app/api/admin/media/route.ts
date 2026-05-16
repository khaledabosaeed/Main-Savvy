import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { listR2Files } from "@/lib/r2-media"

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

export async function GET(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { searchParams } = new URL(request.url)
  const folder =
    searchParams.get("folder")?.trim() || "/robots"
  const limitRaw = searchParams.get("limit")
  const cursor = searchParams.get("cursor")?.trim() || undefined
  const limit =
    limitRaw != null ? Math.min(Math.max(parseInt(limitRaw, 10) || 50, 1), 1000) : 50

  try {
    const { files, nextContinuationToken } = await listR2Files({
      path: folder,
      limit,
      cursor: cursor ?? null,
    })
    return NextResponse.json({ files, nextContinuationToken })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to list media"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
