import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"

export type Language = "en" | "ar"
export type RobotSlug = "g1" | "h1" | "go2"

const locales = { en, ar } as const

export interface RobotCard {
  id: string
  name: string
  description: string
  image: string
  link: string
  buttonText: string
}

export interface RobotHeroConfig {
  videoSrc: string
  title: string
  subtitle: string
  priceStartsFrom: string
  buttonText: string
  textPlacement: "left" | "center" | "right"
}

export interface ProductVersion {
  id: string
  name: string
}

export interface RobotProductConfig {
  name: string
  price: string
  images: string[]
  versions: ProductVersion[]
  bulletPoints: string[]
  addToCartText: string
  contactSalesText: string
}

export interface RobotSlide extends RobotCard {
  backgroundImage?: string
  backgroundVideo?: string
}

export interface ScrollSectionItem {
  scrollVideoSrc: string
  scrollTitle: string
  scrollSubtitle: string
}

/** @deprecated Use ScrollSectionItem - kept for type compatibility */
export type G1ScrollSectionConfig = ScrollSectionItem

/** Normalizes scroll section config (single object or items array) to ScrollSectionItem[] */
function normalizeScrollSection(raw: unknown): ScrollSectionItem[] {
  if (!raw || typeof raw !== "object") return []
  const obj = raw as Record<string, unknown>
  if (Array.isArray(obj.items) && obj.items.length > 0) {
    return obj.items as ScrollSectionItem[]
  }
  if (typeof obj.scrollVideoSrc === "string" && obj.scrollTitle !== undefined) {
    return [{
      scrollVideoSrc: obj.scrollVideoSrc,
      scrollTitle: String(obj.scrollTitle),
      scrollSubtitle: String(obj.scrollSubtitle ?? "")
    }]
  }
  return []
}

export interface RobotFeatureItem {
  title: string
  description: string
}

export interface G1ParameterSectionConfig {
  header: string
  image: string
}

export interface G1ImageSectionConfig {
  title?: string
  images: string[]
}

export interface RobotSingleImageConfig {
  title?: string
  image: string
}

export interface G1FlexibleSectionConfig {
  title: string
  images: string[]
}

export interface SpecsRow {
  name: string
  values: string[]
  highlight?: boolean
}

export interface SpecsSection {
  label: string
  rows: SpecsRow[]
}

export interface RobotSpecsConfig {
  specLabel: string
  valueLabel: string
  columnHeaders?: string[]
  sections: SpecsSection[]
}

export function getRobotCards(lang: Language): RobotCard[] {
  const robots = locales[lang]?.robots
  return (robots?.cards ?? locales.en.robots.cards) as RobotCard[]
}

export function getRobotsSectionContent(lang: Language): {
  sectionTitle: string
  robots: RobotCard[]
} {
  const robots = locales[lang]?.robots as { heading?: string; cards?: RobotCard[] }
  const fallback = locales.en.robots as { heading: string; cards: RobotCard[] }
  return {
    sectionTitle: robots?.heading ?? fallback.heading,
    robots: (robots?.cards ?? fallback.cards) as RobotCard[],
  }
}

export function getRobotSliderSlides(lang: Language): RobotSlide[] {
  const cards = getRobotCards(lang)
  const suffix =
    (locales[lang]?.robots as { sliderDescriptionSuffix?: string })
      ?.sliderDescriptionSuffix ?? locales.en.robots.sliderDescriptionSuffix
  return cards.map((r) => ({
    ...r,
    description: r.description + suffix,
    backgroundImage: r.image,
  }))
}

export function getRobotHeroContent(
  slug: RobotSlug,
  lang: Language
): RobotHeroConfig {
  const hero = (locales[lang]?.robots as { hero?: Record<RobotSlug, RobotHeroConfig> })?.hero?.[slug]
  const fallback = (locales.en.robots as { hero: Record<RobotSlug, RobotHeroConfig> }).hero[slug]
  return (hero ?? fallback) as RobotHeroConfig
}

export function getRobotProductContent(
  slug: RobotSlug,
  lang: Language
): RobotProductConfig {
  const product = (locales[lang]?.robots as { product?: Record<RobotSlug, RobotProductConfig> })?.product?.[slug]
  const fallback = (locales.en.robots as { product: Record<RobotSlug, RobotProductConfig> }).product[slug]
  return (product ?? fallback) as RobotProductConfig
}

export function getG1ScrollSectionContent(lang: Language): ScrollSectionItem[] {
  const raw = (locales[lang]?.robots as { scrollSection?: { g1?: unknown } })?.scrollSection?.g1
  const fallback = (locales.en.robots as { scrollSection: { g1: unknown } }).scrollSection.g1
  return normalizeScrollSection(raw ?? fallback)
}

export function getRobotScrollSectionContent(
  slug: RobotSlug,
  lang: Language
): ScrollSectionItem[] {
  const raw = (locales[lang]?.robots as unknown as { scrollSection?: Record<RobotSlug, unknown> })?.scrollSection?.[slug]
  const fallback = (locales.en.robots as unknown as { scrollSection?: Record<RobotSlug, unknown> })?.scrollSection?.[slug]
  return normalizeScrollSection(raw ?? fallback)
}

export function getRobotFeatureSectionContent(
  slug: RobotSlug,
  lang: Language
): RobotFeatureItem[] {
  const featureSection = (locales[lang]?.robots as unknown as { featureSection?: Record<RobotSlug, RobotFeatureItem[]> })?.featureSection?.[slug]
  const fallback = (locales.en.robots as unknown as { featureSection?: Record<RobotSlug, RobotFeatureItem[]> })?.featureSection?.[slug]
  return featureSection ?? fallback ?? []
}

export function getG1ParameterSectionContent(lang: Language): G1ParameterSectionConfig | null {
  const specs = (locales[lang]?.robots as { specs?: { g1?: { header?: string; image?: string } } })?.specs?.g1
  const fallback = (locales.en.robots as { specs?: { g1?: { header?: string; image?: string } } })?.specs?.g1
  const data = specs ?? fallback
  if (!data?.header || !data?.image) return null
  return { header: data.header, image: data.image }
}

export function getG1ImageSectionContent(
  lang: Language,
  section: "section1" | "section2"
): G1ImageSectionConfig | null {
  const imageSection = (locales[lang]?.robots as { imageSection?: { g1?: { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig } } })?.imageSection?.g1?.[section]
  const fallback = (locales.en.robots as { imageSection?: { g1?: { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig } } })?.imageSection?.g1?.[section]
  return (imageSection ?? fallback) ?? null
}

export function getH1ImageSectionsBeforeVideo(lang: Language): RobotSingleImageConfig[] {
  const sections = (locales[lang]?.robots as { imageSection?: { h1?: { beforeVideo?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeVideo
  const fallback = (locales.en.robots as { imageSection?: { h1?: { beforeVideo?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeVideo
  return sections ?? fallback ?? []
}

export function getH1ImageSectionsBeforeTable(lang: Language): RobotSingleImageConfig[] {
  const sections = (locales[lang]?.robots as { imageSection?: { h1?: { beforeTable?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeTable
  const fallback = (locales.en.robots as { imageSection?: { h1?: { beforeTable?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeTable
  return sections ?? fallback ?? []
}

export function getRobotImageSectionContent(
  slug: RobotSlug,
  lang: Language,
  section: "section1" | "section2"
): G1ImageSectionConfig | null {
  const imageSection = (locales[lang]?.robots as unknown as { imageSection?: Record<RobotSlug, { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig }> })?.imageSection?.[slug]?.[section]
  const fallback = (locales.en.robots as unknown as { imageSection?: Record<RobotSlug, { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig }> })?.imageSection?.[slug]?.[section]
  return (imageSection ?? fallback) ?? null
}

export function getG1FlexibleSectionContent(lang: Language): G1FlexibleSectionConfig {
  const flexibleSection = (locales[lang]?.robots as { flexibleSection?: { g1?: G1FlexibleSectionConfig } })?.flexibleSection?.g1
  const fallback = (locales.en.robots as { flexibleSection: { g1: G1FlexibleSectionConfig } }).flexibleSection.g1
  return (flexibleSection ?? fallback) as G1FlexibleSectionConfig
}

export function getRobotSpecsContent(
  slug: RobotSlug,
  lang: Language
): RobotSpecsConfig | null {
  const specs = (locales[lang]?.robots as unknown as { specs?: Record<RobotSlug, RobotSpecsConfig> })?.specs?.[slug]
  const fallback = (locales.en.robots as unknown as { specs?: Record<RobotSlug, RobotSpecsConfig> })?.specs?.[slug]
  return (specs ?? fallback) ?? null
}

export function getRobotLabel(
  lang: Language,
  key: "version" | "quantity" | "viewProduct"
): string {
  const robots = locales[lang]?.robots as {
    version?: string
    quantity?: string
    viewProduct?: string
  }
  return (
    robots?.[key] ??
    (locales.en.robots as { version: string; quantity: string; viewProduct: string })[key]
  )
}
