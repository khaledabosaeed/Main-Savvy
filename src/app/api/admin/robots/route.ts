import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"
import type { RobotCustomPagePayload } from "@/lib/robots-custom-page"
import { extractCatalogCard } from "@/lib/robots-custom-page"

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

const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case")

const pagePayloadSchema = z.object({
  slug: z.string(),
  sections: z.array(z.unknown()),
})

const postSchema = z.object({
  slug: slugSchema,
  en: pagePayloadSchema,
  ar: pagePayloadSchema,
})

function normalizePayload(
  slug: string,
  data: z.infer<typeof pagePayloadSchema>
): RobotCustomPagePayload {
  return {
    slug,
    sections: data.sections as RobotCustomPagePayload["sections"],
  }
}

/** Merge `robots.customPages[slug]` into locale content */
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

export async function GET() {
  const { user, error } = await requireUser()
  if (!user) return error!

  try {
    const admin = createSupabaseServiceRoleClient()
    const { data, error: dbError } = await admin
      .from("translations")
      .select("content")
      .eq("locale", "en")
      .maybeSingle()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }
    const content = (data?.content as Record<string, unknown>) ?? {}
    const robots = content.robots as
      | { customPages?: Record<string, RobotCustomPagePayload> }
      | undefined
    const customPages = robots?.customPages ?? {}

    const list = Object.entries(customPages).map(([slug, page]) => {
      const card = extractCatalogCard(page.sections, slug)
      return {
        slug,
        name: card?.name ?? slug,
        category: card?.category ?? "industrial",
        image: card?.image ?? "",
      }
    })

    return NextResponse.json({ robots: list })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
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

  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { slug, en, ar } = parsed.data
  if (en.slug !== slug || ar.slug !== slug) {
    return NextResponse.json(
      { error: "Payload slug must match top-level slug" },
      { status: 400 }
    )
  }

  try {
    const admin = createSupabaseServiceRoleClient()
    for (const locale of ["en", "ar"] as const) {
      const { data: row } = await admin
        .from("translations")
        .select("content")
        .eq("locale", locale)
        .maybeSingle()

      const current = (row?.content as Record<string, unknown>) ?? {}
      const robots = (current.robots ?? {}) as Record<string, unknown>
      const customPages = (robots.customPages ?? {}) as Record<string, unknown>
      if (customPages[slug]) {
        return NextResponse.json(
          { error: `Robot "${slug}" already exists` },
          { status: 409 }
        )
      }
    }

    await upsertCustomPageLocale("en", slug, normalizePayload(slug, en))
    await upsertCustomPageLocale("ar", slug, normalizePayload(slug, ar))

    revalidateTag("translations")
    return NextResponse.json({ ok: true, slug })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
