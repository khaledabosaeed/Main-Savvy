import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"
import type { RobotCustomPagePayload } from "@/lib/robots-custom-page"

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

const slugParamSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

const pagePayloadSchema = z.object({
  slug: z.string(),
  sections: z.array(z.unknown()),
})

const putSchema = z.object({
  en: pagePayloadSchema,
  ar: pagePayloadSchema,
})

async function upsertCustomPageLocale(
  locale: "en" | "ar",
  slug: string,
  payload: RobotCustomPagePayload | null
) {
  const admin = createSupabaseServiceRoleClient()
  const { data: row } = await admin
    .from("translations")
    .select("content")
    .eq("locale", locale)
    .maybeSingle()

  const current = (row?.content as Record<string, unknown>) ?? {}
  const robots = { ...(current.robots as Record<string, unknown>) }

  const customPages = {
    ...((robots.customPages as Record<string, RobotCustomPagePayload>) ?? {}),
  }

  if (payload === null) {
    delete customPages[slug]
  } else {
    customPages[slug] = payload
  }

  robots.customPages = customPages
  const merged = { ...current, robots }

  const { error: upError } = await admin.from("translations").upsert(
    {
      locale,
      content: merged,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "locale" }
  )

  if (upError) throw new Error(upError.message)
}

function normalizePayload(
  slug: string,
  data: z.infer<typeof pagePayloadSchema>
): RobotCustomPagePayload {
  return {
    slug,
    sections: data.sections as RobotCustomPagePayload["sections"],
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { slug: rawSlug } = await context.params
  const slugParsed = slugParamSchema.safeParse(rawSlug)
  if (!slugParsed.success) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }
  const slug = slugParsed.data

  try {
    const admin = createSupabaseServiceRoleClient()
    const [enRow, arRow] = await Promise.all([
      admin.from("translations").select("content").eq("locale", "en").maybeSingle(),
      admin.from("translations").select("content").eq("locale", "ar").maybeSingle(),
    ])

    if (enRow.error || arRow.error) {
      return NextResponse.json(
        { error: enRow.error?.message ?? arRow.error?.message },
        { status: 500 }
      )
    }

    const enContent = (enRow.data?.content as Record<string, unknown>) ?? {}
    const arContent = (arRow.data?.content as Record<string, unknown>) ?? {}
    const enRobots = enContent.robots as
      | { customPages?: Record<string, RobotCustomPagePayload> }
      | undefined
    const arRobots = arContent.robots as
      | { customPages?: Record<string, RobotCustomPagePayload> }
      | undefined

    const enPage = enRobots?.customPages?.[slug] ?? null
    const arPage = arRobots?.customPages?.[slug] ?? null

    if (!enPage && !arPage) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json({
      slug,
      en: enPage ?? { slug, sections: [] },
      ar: arPage ?? { slug, sections: [] },
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { slug: rawSlug } = await context.params
  const slugParsed = slugParamSchema.safeParse(rawSlug)
  if (!slugParsed.success) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }
  const slug = slugParsed.data

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

  const { en, ar } = parsed.data
  if (en.slug !== slug || ar.slug !== slug) {
    return NextResponse.json(
      { error: "Payload slug must match URL" },
      { status: 400 }
    )
  }

  try {
    await upsertCustomPageLocale("en", slug, normalizePayload(slug, en))
    await upsertCustomPageLocale("ar", slug, normalizePayload(slug, ar))
    revalidateTag("translations")
    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { slug: rawSlug } = await context.params
  const slugParsed = slugParamSchema.safeParse(rawSlug)
  if (!slugParsed.success) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }
  const slug = slugParsed.data

  try {
    await upsertCustomPageLocale("en", slug, null)
    await upsertCustomPageLocale("ar", slug, null)
    revalidateTag("translations")
    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
