import type { LocaleDictionary } from "@/i18n/getDictionary"

/** Same values as `RobotCategory` in robots-locale (avoid circular imports). */
export type StoreRobotCategory =
  | "industrial"
  | "service"
  | "educational"
  | "entertainment"
export type RobotPageSectionType =
  | "hero"
  | "product"
  | "specs"
  | "scrollVideo"
  | "image"
  | "carousel"
  | "catalogCard"
  
export interface HeroSectionData {
  type: "hero"
  videoSrc: string
  posterImage?: string
  title: string
  subtitle: string
  textPlacement: "left" | "center" | "right"
  features?: string[]
  buttonText: string
}

export interface ProductSectionData {
  type: "product"
  name: string
  price: string
  images: string[]
  bulletPoints: string[]
  versions: {
    id: string
    name: string
    price?: string
    images?: string[]
  }[]
  sku?: string
  manufacturerName?: string
  manufacturerPartNumber?: string
}

export interface SpecsBlockData {
  header: string
  headerImage?: string
  columns: string[]
  rows: string[][]
}

export interface SpecsSectionData {
  type: "specs"
  sections: SpecsBlockData[]
}

export interface ScrollVideoSectionData {
  type: "scrollVideo"
  items: {
    videoSrc: string
    title: string
    subtitle: string
    features?: string[]
  }[]
}

/** Stored under `robots.customPages` — legacy rows may still use `images: string[]`. */
export interface RobotImageSlide {
  url: string
  title?: string
}

export function normalizeRobotImageSlides(raw: unknown): RobotImageSlide[] {
  if (!Array.isArray(raw)) return []
  return raw.map((entry) => {
    if (typeof entry === "string") {
      return { url: entry }
    }
    if (entry && typeof entry === "object") {
      const o = entry as Record<string, unknown>
      const url =
        (typeof o.url === "string" ? o.url : "") ||
        (typeof o.src === "string" ? o.src : "")
      const tt = typeof o.title === "string" ? o.title.trim() : ""
      return tt ? { url, title: tt } : { url }
    }
    return { url: "" }
  })
}

export interface ImageSectionData {
  type: "image"
  title?: string
  images: RobotImageSlide[]
}

export interface CarouselSectionData {
  type: "carousel"
  title?: string
  subtitle?: string
  images: string[]
  items: { header: string; subtext: string }[]
}

export interface CatalogCardSectionData {
  type: "catalogCard"
  name: string
  description: string
  image: string
  buttonText: string
  /** Path without locale prefix, e.g. `/robots/my-bot` */
  link: string
  productLink?: string
  category: StoreRobotCategory
}

export type RobotPageSectionData =
  | HeroSectionData
  | ProductSectionData
  | SpecsSectionData
  | ScrollVideoSectionData
  | ImageSectionData
  | CarouselSectionData
  | CatalogCardSectionData

/** Stored per locale under `robots.customPages[slug]` */
export interface RobotCustomPagePayload {
  slug: string
  sections: RobotPageSectionData[]
}

export type CustomPagesMap = Record<string, RobotCustomPagePayload>

/** Duplicated on `en` and `ar` translation rows (`robots.customPageStatus`). */
export type CustomPagePublishStatus = "draft" | "published"

/** Work-in-progress copy per slug / locale (`robots.customPageDrafts`). */
export type CustomPageDraftsMap = Record<string, RobotCustomPagePayload>

/** Per-slug status map (`robots.customPageStatus`). */
export type CustomPageStatusMap = Record<string, CustomPagePublishStatus>

export function getCustomPagesFromDict(
  dict: LocaleDictionary
): CustomPagesMap {
  const robots = dict.robots as { customPages?: CustomPagesMap } | undefined
  return robots?.customPages ?? {}
}

export function getCustomPageDraftsFromDict(
  dict: LocaleDictionary
): CustomPageDraftsMap {
  const robots = dict.robots as
    | { customPageDrafts?: CustomPageDraftsMap }
    | undefined
  return robots?.customPageDrafts ?? {}
}

export function getCustomPageStatusFromDict(
  dict: LocaleDictionary,
  slug: string
): CustomPagePublishStatus {
  const robots = dict.robots as
    | { customPageStatus?: CustomPageStatusMap }
    | undefined
  const st = robots?.customPageStatus?.[slug]
  return st === "draft" ? "draft" : "published"
}

/** True when this slug is hidden from the public site (draft mode). */
export function isCustomPageDraftInDict(
  dict: LocaleDictionary,
  slug: string
): boolean {
  return getCustomPageStatusFromDict(dict, slug) === "draft"
}

function pickFirstNonEmptyString(...vals: unknown[]): string {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim()
  }
  return ""
}

/**
 * DB / JSON may store `null`, omit the field, or use snake_case. Also falls back to
 * `dict.robots.hero[pageSlug].videoSrc` when the custom hero has no URL (same slug as catalog).
 */
function normalizeHeroSectionForRead(
  section: HeroSectionData,
  pageSlug: string,
  dict: LocaleDictionary
): HeroSectionData {
  const o = section as unknown as Record<string, unknown>
  let videoSrc = pickFirstNonEmptyString(
    o.videoSrc,
    o.video_src,
    o.videoUrl,
    o.video_url
  )

  const robots = dict.robots as
    | { hero?: Record<string, { videoSrc?: unknown }> }
    | undefined
  const catalog = robots?.hero?.[pageSlug]
  if (!videoSrc) {
    videoSrc = pickFirstNonEmptyString(catalog?.videoSrc)
  }

  const posterImage = pickFirstNonEmptyString(
    o.posterImage,
    o.poster_image,
    o.posterUrl,
    o.poster_url
  )

  return {
    ...section,
    videoSrc,
    posterImage: posterImage || undefined,
  }
}

/**
 * Custom robot pages live at `dict.robots.customPages[slug]` (usually from Supabase),
 * not under `dict.robots.hero` — that object is for static catalog robots only.
 */
export function getCustomPageForSlug(
  dict: LocaleDictionary,
  slug: string
): RobotCustomPagePayload | null {
  if (isCustomPageDraftInDict(dict, slug)) return null
  const pages = getCustomPagesFromDict(dict)
  const raw = pages[slug]
  if (!raw) return null
  return {
    slug: raw.slug,
    sections: raw.sections.map((s) => {
      if (s.type === "hero") {
        return normalizeHeroSectionForRead(s, slug, dict)
      }
      if (s.type === "image") {
        return { ...s, images: normalizeRobotImageSlides(s.images) }
      }
      return s
    }),
  }
}

/** Migrate legacy payload shapes before editing or saving sections. */
export function normalizeRobotPageSections(
  sections: RobotPageSectionData[]
): RobotPageSectionData[] {
  return sections.map((s) =>
    s.type === "image"
      ? { ...s, images: normalizeRobotImageSlides(s.images) }
      : s
  )
}

export function extractCatalogCard(
  sections: RobotPageSectionData[],
  slug: string
): CatalogCardSectionData | null {
  const raw = sections.find((s) => s.type === "catalogCard")
  if (!raw || raw.type !== "catalogCard") return null
  const link =
    raw.link?.startsWith("/") && raw.link.length > 0
      ? raw.link
      : `/robots/${slug}`
  const productLink =
    raw.productLink?.startsWith("/") && raw.productLink.length > 0
      ? raw.productLink
      : `/robots/${slug}/product`
  return {
    ...raw,
    link,
    productLink,
  }
}

export function sectionSummary(section: RobotPageSectionData): string {
  switch (section.type) {
    case "hero":
      return section.title || "Hero"
    case "product":
      return section.name || "Product"
    case "specs":
      return `Specs (${section.sections.length})`
    case "scrollVideo":
      return `Videos (${section.items.length})`
    case "image":
      return section.title || `Images (${section.images.length})`
    case "carousel":
      return section.title || "Carousel"
    case "catalogCard":
      return section.name || "Catalog card"
    default:
      return "Section"
  }
}
