import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"
import type { AppLanguage } from "./settings"
import { applyEnglishRobotDisplayNames } from "./robot-names-en-overlay"

export type LocaleDictionary = typeof en

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Robot card arrays: repo JSON decides which `id`s exist; DB only overlays fields per id. */
const ROBOT_CARD_ARRAY_KEYS = new Set(["catalogCards", "cards"])

function mergeRobotCardArrays(base: unknown[], override: unknown[]): unknown[] {
  const obById = new Map<string, Record<string, unknown>>()
  for (const item of override) {
    if (
      isPlainObject(item) &&
      typeof item.id === "string" &&
      item.id.length > 0
    ) {
      obById.set(item.id, item)
    }
  }
  return base.map((b) => {
    if (
      !isPlainObject(b) ||
      typeof b.id !== "string" ||
      b.id.length === 0
    ) {
      return b
    }
    const fromDb = obById.get(b.id)
    return fromDb ? { ...b, ...fromDb } : b
  })
}

/**
 * Deep-merge Supabase snapshot onto the repo JSON bundle.
 * Keys present only in the file (e.g. new copy) are kept; DB values override on conflict.
 * Exception: `robots.catalogCards` and `robots.cards` merge by `id` so removing a card from
 * the repo JSON removes it even when older DB snapshots still list it.
 */
function mergeTranslationsTree(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of new Set([
    ...Object.keys(base),
    ...Object.keys(override),
  ])) {
    const bb = base[key]
    const ob = override[key]
    if (ob === undefined) {
      out[key] = bb
    } else if (bb === undefined) {
      out[key] = ob
    } else if (isPlainObject(ob) && isPlainObject(bb)) {
      out[key] = mergeTranslationsTree(bb, ob)
    } else if (
      ROBOT_CARD_ARRAY_KEYS.has(key) &&
      Array.isArray(bb) &&
      Array.isArray(ob)
    ) {
      out[key] = mergeRobotCardArrays(bb, ob)
    } else {
      out[key] = ob
    }
  }
  return out
}

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
        let dict: LocaleDictionary
        if (fromDb) {
          dict = mergeTranslationsTree(
            staticDictionary(lang) as unknown as Record<string, unknown>,
            fromDb as unknown as Record<string, unknown>
          ) as LocaleDictionary
        } else {
          dict = staticDictionary(lang)
        }
        if (lang === "ar") {
          const clone = JSON.parse(JSON.stringify(dict)) as LocaleDictionary
          applyEnglishRobotDisplayNames(clone, staticDictionary("en"))
          return clone
        }
        return dict
      } catch {
        /* network / missing table — fall back */
        const dict = staticDictionary(lang)
        if (lang === "ar") {
          const clone = JSON.parse(JSON.stringify(dict)) as LocaleDictionary
          applyEnglishRobotDisplayNames(clone, staticDictionary("en"))
          return clone
        }
        return dict
      }
    },
    ["translations-dictionary", "catalog-merge-by-id", lang],
    { tags: ["translations"] }
  )()
}
