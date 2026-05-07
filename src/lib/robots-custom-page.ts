import type { LocaleDictionary } from "@/i18n/getDictionary"

/** Same values as `RobotCategory` in robots-locale (avoid circular imports). */
export type StoreRobotCategory =
  | "industrial"
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

export interface ImageSectionData {
  type: "image"
  title?: string
  images: string[]
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

export function getCustomPagesFromDict(
  dict: LocaleDictionary
): CustomPagesMap {
  const robots = dict.robots as { customPages?: CustomPagesMap } | undefined
  return robots?.customPages ?? {}
}

export function getCustomPageForSlug(
  dict: LocaleDictionary,
  slug: string
): RobotCustomPagePayload | null {
  const pages = getCustomPagesFromDict(dict)
  return pages[slug] ?? null
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
