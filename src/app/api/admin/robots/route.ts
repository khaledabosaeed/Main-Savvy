import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"
import type { RobotCustomPagePayload } from "@/lib/robots-custom-page"
import { extractCatalogCard } from "@/lib/robots-custom-page"
import { patchLocaleRobotsJson } from "@/lib/robots-admin-db"

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
  action: z.enum(["draft", "publish"]).default("publish"),
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

function robotsHasSlugSlot(
  robots: Record<string, unknown>,
  slug: string
): boolean {
  const customPages =
    (robots.customPages as Record<string, unknown> | undefined) ?? {}
  const drafts =
    (robots.customPageDrafts as Record<string, unknown> | undefined) ?? {}
  return Boolean(customPages[slug] || drafts[slug])
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
      | {
          customPages?: Record<string, RobotCustomPagePayload>
          customPageDrafts?: Record<string, RobotCustomPagePayload>
          customPageStatus?: Record<string, string>
        }
      | undefined

    const customPages = robots?.customPages ?? {}
    const drafts = robots?.customPageDrafts ?? {}
    const statusMap = robots?.customPageStatus ?? {}
    const slugs = new Set([
      ...Object.keys(customPages),
      ...Object.keys(drafts),
    ])

    const list = [...slugs].sort((a, b) => a.localeCompare(b)).map((slug) => {
      const rawStatus = statusMap[slug]
      const hasPublished = Boolean(customPages[slug])
      const hasDraft = Boolean(drafts[slug])
      const status =
        rawStatus === "draft" || (!hasPublished && hasDraft)
          ? ("draft" as const)
          : ("published" as const)
      const page = drafts[slug] ?? customPages[slug]
      const card = page
        ? extractCatalogCard(page.sections, slug)
        : null
      return {
        slug,
        name: card?.name ?? slug,
        category: card?.category ?? "industrial",
        image: card?.image ?? "",
        status,
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

  const { slug, action, en, ar } = parsed.data
  if (en.slug !== slug || ar.slug !== slug) {
    return NextResponse.json(
      { error: "Payload slug must match top-level slug" },
      { status: 400 }
    )
  }

  const enPayload = normalizePayload(slug, en)
  const arPayload = normalizePayload(slug, ar)

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
      if (robotsHasSlugSlot(robots, slug)) {
        return NextResponse.json(
          { error: `Robot "${slug}" already exists` },
          { status: 409 }
        )
      }
    }

    if (action === "draft") {
      await patchLocaleRobotsJson("en", (r) => {
        const d = {
          ...((r.customPageDrafts as Record<string, RobotCustomPagePayload>) ??
            {}),
        }
        const st = {
          ...((r.customPageStatus as Record<string, string>) ?? {}),
        }
        d[slug] = enPayload
        st[slug] = "draft"
        return { ...r, customPageDrafts: d, customPageStatus: st }
      })
      await patchLocaleRobotsJson("ar", (r) => {
        const d = {
          ...((r.customPageDrafts as Record<string, RobotCustomPagePayload>) ??
            {}),
        }
        const st = {
          ...((r.customPageStatus as Record<string, string>) ?? {}),
        }
        d[slug] = arPayload
        st[slug] = "draft"
        return { ...r, customPageDrafts: d, customPageStatus: st }
      })
    } else {
      await patchLocaleRobotsJson("en", (r) => {
        const cp = {
          ...((r.customPages as Record<string, RobotCustomPagePayload>) ?? {}),
        }
        const d = {
          ...((r.customPageDrafts as Record<string, RobotCustomPagePayload>) ??
            {}),
        }
        const st = {
          ...((r.customPageStatus as Record<string, string>) ?? {}),
        }
        cp[slug] = enPayload
        delete d[slug]
        st[slug] = "published"
        return {
          ...r,
          customPages: cp,
          customPageDrafts: d,
          customPageStatus: st,
        }
      })
      await patchLocaleRobotsJson("ar", (r) => {
        const cp = {
          ...((r.customPages as Record<string, RobotCustomPagePayload>) ?? {}),
        }
        const d = {
          ...((r.customPageDrafts as Record<string, RobotCustomPagePayload>) ??
            {}),
        }
        const st = {
          ...((r.customPageStatus as Record<string, string>) ?? {}),
        }
        cp[slug] = arPayload
        delete d[slug]
        st[slug] = "published"
        return {
          ...r,
          customPages: cp,
          customPageDrafts: d,
          customPageStatus: st,
        }
      })
    }

    revalidateTag("translations")
    return NextResponse.json({ ok: true, slug, action })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
