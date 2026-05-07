import type { LocaleDictionary } from "./getDictionary"

function syncCardArrayById(
  arCards: unknown,
  enCards: unknown,
  field: "name"
): void {
  if (!Array.isArray(arCards) || !Array.isArray(enCards)) return
  const enList = enCards as { id?: string; name?: string }[]
  for (const a of arCards as { id?: string; name?: string }[]) {
    if (!a?.id) continue
    const e = enList.find((c) => c.id === a.id)
    if (e && typeof e[field] === "string") {
      a[field] = e[field]!
    }
  }
}

/**
 * For Arabic locale, force robot / model display strings to match English (`en.json`)
 * so product names stay Latin on every page (including Supabase overrides).
 */
export function applyEnglishRobotDisplayNames(
  arDict: LocaleDictionary,
  enDict: LocaleDictionary
): void {
  const arR = arDict.robots as Record<string, unknown> | undefined
  const enR = enDict.robots as Record<string, unknown> | undefined
  if (!arR || !enR) return

  syncCardArrayById(arR.cards, enR.cards, "name")
  syncCardArrayById(arR.catalogCards, enR.catalogCards, "name")

  const enHero = enR.hero as Record<string, { title?: string }> | undefined
  const arHero = arR.hero as Record<string, { title?: string }> | undefined
  if (enHero && arHero) {
    for (const k of Object.keys(enHero)) {
      const t = enHero[k]?.title
      if (typeof t === "string" && arHero[k]) {
        arHero[k].title = t
      }
    }
  }

  const enProd = enR.product as Record<
    string,
    { name?: string; versions?: { name?: string }[] }
  > | undefined
  const arProd = arR.product as Record<
    string,
    { name?: string; versions?: { name?: string }[] }
  > | undefined
  if (enProd && arProd) {
    for (const k of Object.keys(enProd)) {
      const ep = enProd[k]
      const ap = arProd[k]
      if (!ep || !ap) continue
      if (typeof ep.name === "string") ap.name = ep.name
      const ev = ep.versions
      const av = ap.versions
      if (Array.isArray(ev) && Array.isArray(av)) {
        const n = Math.min(ev.length, av.length)
        for (let i = 0; i < n; i++) {
          if (typeof ev[i]?.name === "string") av[i]!.name = ev[i]!.name!
        }
      }
    }
  }

  const enSpecs = enR.specs as Record<
    string,
    { columnHeaders?: string[]; header?: string }
  > | undefined
  const arSpecs = arR.specs as Record<
    string,
    { columnHeaders?: string[]; header?: string }
  > | undefined
  if (enSpecs && arSpecs) {
    for (const k of Object.keys(enSpecs)) {
      const es = enSpecs[k]
      const as = arSpecs[k]
      if (!es || !as) continue
      if (Array.isArray(es.columnHeaders)) {
        as.columnHeaders = [...es.columnHeaders]
      }
      if (typeof es.header === "string") {
        as.header = es.header
      }
    }
  }

  const enScroll = enR.scrollSection as
    | Record<string, { items?: { scrollTitle?: string }[] }>
    | undefined
  const arScroll = arR.scrollSection as
    | Record<string, { items?: { scrollTitle?: string }[] }>
    | undefined
  if (enScroll && arScroll) {
    for (const k of Object.keys(enScroll)) {
      const ei = enScroll[k]?.items
      const ai = arScroll[k]?.items
      if (!Array.isArray(ei) || !Array.isArray(ai)) continue
      const n = Math.min(ei.length, ai.length)
      for (let i = 0; i < n; i++) {
        if (typeof ei[i]?.scrollTitle === "string") {
          ai[i]!.scrollTitle = ei[i]!.scrollTitle!
        }
      }
    }
  }

  const enFeat = enR.featureSection as
    | Record<string, { title?: string }[]>
    | undefined
  const arFeat = arR.featureSection as
    | Record<string, { title?: string }[]>
    | undefined
  if (enFeat && arFeat) {
    for (const k of Object.keys(enFeat)) {
      const ea = enFeat[k]
      const aa = arFeat[k]
      if (!Array.isArray(ea) || !Array.isArray(aa)) continue
      const n = Math.min(ea.length, aa.length)
      for (let i = 0; i < n; i++) {
        if (typeof ea[i]?.title === "string") {
          aa[i]!.title = ea[i]!.title!
        }
      }
    }
  }
}
