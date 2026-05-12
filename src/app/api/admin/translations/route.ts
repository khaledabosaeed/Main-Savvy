import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Merge PATCH payloads into `content.robots` without replacing the whole tree (smaller HTTP bodies). */
function mergeRobotsPartial(
  existing: Record<string, unknown> | undefined,
  partial: Record<string, unknown>
): Record<string, unknown> {
  const robots = { ...(existing ?? {}) }
  for (const [key, val] of Object.entries(partial)) {
    if (key === "customPages" && isPlainObject(val)) {
      const prev = isPlainObject(robots.customPages)
        ? { ...(robots.customPages as Record<string, unknown>) }
        : {}
      for (const [slug, page] of Object.entries(val)) {
        if (page === null) {
          delete prev[slug]
        } else {
          prev[slug] = page
        }
      }
      robots.customPages = prev
    } else {
      robots[key] = val
    }
  }
  return robots
}

const putSchema = z
  .object({
    locale: z.enum(["en", "ar"]),
    section: z.string().min(1).optional(),
    data: z.unknown().optional(),
    robotsPartial: z.record(z.string(), z.unknown()).optional(),
  })
  .superRefine((v, ctx) => {
    const hasSection = v.section != null && v.section.length > 0
    const hasData = v.data !== undefined
    const hasRobotsPartial =
      v.robotsPartial != null && Object.keys(v.robotsPartial).length > 0
    if (hasRobotsPartial && (hasSection || hasData)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Use either section+data or robotsPartial, not both",
      })
    }
    if (!hasRobotsPartial && (!hasSection || !hasData)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide section and data, or robotsPartial",
      })
    }
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

export async function GET(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { searchParams } = new URL(request.url)
  const locale = searchParams.get("locale")
  if (locale !== "en" && locale !== "ar") {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 })
  }

  try {
    const admin = createSupabaseServiceRoleClient()
    const { data, error: dbError } = await admin
      .from("translations")
      .select("content, updated_at")
      .eq("locale", locale)
      .maybeSingle()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }
    if (!data) {
      return NextResponse.json(
        { error: "No row for this locale — run scripts/seed-translations.cjs" },
        { status: 404 }
      )
    }
    return NextResponse.json({
      content: data.content,
      updated_at: data.updated_at,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server configuration error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = putSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const payload = parsed.data

  try {
    const admin = createSupabaseServiceRoleClient()
    const { data: row } = await admin
      .from("translations")
      .select("content")
      .eq("locale", payload.locale)
      .maybeSingle()

    const current = (row?.content as Record<string, unknown>) ?? {}

    let merged: Record<string, unknown>
    if (payload.robotsPartial) {
      const prevRobots = current.robots as Record<string, unknown> | undefined
      merged = {
        ...current,
        robots: mergeRobotsPartial(prevRobots, payload.robotsPartial),
      }
    } else {
      merged = {
        ...current,
        [payload.section!]: payload.data,
      }
    }

    const { error: upError } = await admin
      .from("translations")
      .upsert(
        {
          locale: payload.locale,
          content: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "locale" }
      )

    if (upError) {
      return NextResponse.json({ error: upError.message }, { status: 500 })
    }

    revalidateTag("translations")
    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server configuration error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
