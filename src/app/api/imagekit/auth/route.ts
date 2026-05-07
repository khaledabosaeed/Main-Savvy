import { NextResponse } from "next/server"
import { getUploadAuthParams } from "@imagekit/next/server"
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

/**
 * Returns signed upload parameters for the ImageKit client SDK.
 * Protected: only authenticated admin users (Supabase session).
 */
export async function GET() {
  const { user, error } = await requireUser()
  if (!user) return error!

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "ImageKit keys are not configured" },
      { status: 503 }
    )
  }

  try {
    const { token, expire, signature } = getUploadAuthParams({
      publicKey,
      privateKey,
    })

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to sign upload"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
