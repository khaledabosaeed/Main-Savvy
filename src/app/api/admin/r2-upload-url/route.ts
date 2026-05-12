import { NextResponse } from "next/server"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createPresignedR2Upload } from "@/lib/r2-media"

const bodySchema = z.object({
  fileName: z.string().min(1).max(240),
  contentType: z.string().min(1).max(160),
  folder: z.string().min(1).max(240).default("/robots"),
})

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

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const target = await createPresignedR2Upload(parsed.data)
    return NextResponse.json(target)
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload URL failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
