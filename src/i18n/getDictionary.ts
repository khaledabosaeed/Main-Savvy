import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"
import type { AppLanguage } from "./settings"

export type LocaleDictionary = typeof en

async function fetchLocaleFromSupabase(
  locale: AppLanguage
): Promise<LocaleDictionary | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase
    .from("translations")
    .select("content")
    .eq("locale", locale)
    .maybeSingle()

  if (error || data?.content == null) return null
  return data.content as LocaleDictionary
}

function staticDictionary(lang: AppLanguage): LocaleDictionary {
  return (lang === "ar" ? ar : en) as LocaleDictionary
}

/**
 * Cached locale bundle. Use `revalidateTag("translations")` after admin saves.
 */
export async function getDictionary(
  lang: AppLanguage
): Promise<LocaleDictionary> {
  return unstable_cache(
    async () => {
      try {
        const fromDb = await fetchLocaleFromSupabase(lang)
        if (fromDb) return fromDb
      } catch {
        /* network / missing table — fall back */
      }
      return staticDictionary(lang)
    },
    ["translations-dictionary", lang],
    { tags: ["translations"] }
  )()
}
