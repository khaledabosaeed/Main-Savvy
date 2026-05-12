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
 * When AR `customPages` hero has no `videoSrc`, copy media from the merged EN bundle
 * so `/ar/...` matches EN for assets saved only on the EN tab historically.
 */
function fillArCustomPagesHeroMediaFromEn(
  arDict: LocaleDictionary,
  enDict: LocaleDictionary
): void {
  const mediaString = (obj: Record<string, unknown>, ...keys: string[]): string => {
    for (const k of keys) {
      const v = obj[k]
      if (typeof v === "string" && v.trim()) return v.trim()
    }
    return ""
  }

  const arRobots = arDict.robots as Record<string, unknown> | undefined
  const enRobots = enDict.robots as Record<string, unknown> | undefined
  const arPages = arRobots?.customPages as
    | Record<string, { sections?: unknown[] }>
    | undefined
  const enPages = enRobots?.customPages as
    | Record<string, { sections?: unknown[] }>
    | undefined
  if (!arPages || !enPages) return

  for (const pageSlug of Object.keys(arPages)) {
    const arPage = arPages[pageSlug]
    const enPage = enPages[pageSlug]
    if (!arPage?.sections || !enPage?.sections) continue
    const arSections = arPage.sections
    const enSections = enPage.sections
    for (let i = 0; i < arSections.length; i++) {
      const arS = arSections[i] as Record<string, unknown>
      const enS = enSections[i] as Record<string, unknown>
      if (
        !isPlainObject(arS) ||
        arS.type !== "hero" ||
        !isPlainObject(enS) ||
        enS.type !== "hero"
      ) {
        continue
      }
      const arVid = mediaString(arS, "videoSrc", "video_src", "videoUrl", "video_url")
      if (arVid) continue
      const enVid = mediaString(enS, "videoSrc", "video_src", "videoUrl", "video_url")
      if (enVid) arS.videoSrc = enVid

      const arPoster = mediaString(arS, "posterImage", "poster_image")
      const enPoster = mediaString(enS, "posterImage", "poster_image")
      if (!arPoster && enPoster) arS.posterImage = enPoster

      if (
        (arS.textPlacement == null || arS.textPlacement === "") &&
        typeof enS.textPlacement === "string"
      ) {
        arS.textPlacement = enS.textPlacement
      }
    }
  }
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
          const enFromDb = await fetchLocaleFromSupabase("en")
          const enDict = enFromDb
            ? (mergeTranslationsTree(
                staticDictionary("en") as unknown as Record<string, unknown>,
                enFromDb as unknown as Record<string, unknown>
              ) as LocaleDictionary)
            : staticDictionary("en")
          fillArCustomPagesHeroMediaFromEn(dict, enDict)
          const clone = JSON.parse(JSON.stringify(dict)) as LocaleDictionary
          applyEnglishRobotDisplayNames(clone, staticDictionary("en"))
          return clone
        }
        return dict
      } catch {
        /* network / missing table — fall back */
        const dict = staticDictionary(lang)
        if (lang === "ar") {
          const enFromDb = await fetchLocaleFromSupabase("en")
          const enDict = enFromDb
            ? (mergeTranslationsTree(
                staticDictionary("en") as unknown as Record<string, unknown>,
                enFromDb as unknown as Record<string, unknown>
              ) as LocaleDictionary)
            : staticDictionary("en")
          fillArCustomPagesHeroMediaFromEn(dict, enDict)
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
