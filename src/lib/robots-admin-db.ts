import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"

/** Read–modify–write `translations.content.robots` for one locale. */
export async function patchLocaleRobotsJson(
  locale: "en" | "ar",
  patch: (robots: Record<string, unknown>) => Record<string, unknown>
): Promise<void> {
  const admin = createSupabaseServiceRoleClient()
  const { data: row } = await admin
    .from("translations")
    .select("content")
    .eq("locale", locale)
    .maybeSingle()

  const current = (row?.content as Record<string, unknown>) ?? {}
  const robots = { ...(current.robots as Record<string, unknown>) }
  const nextRobots = patch(robots)
  const merged = { ...current, robots: nextRobots }

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
