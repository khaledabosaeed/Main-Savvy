import en from "../../public/locales/en.json"
import type { LocaleDictionary } from "@/i18n/getDictionary"

export type Language = "en" | "ar"
export type RobotSlug = "g1" | "h2" | "go2" | "r1"

/** Set to `true` to show hero prices, spec table prices, product prices, and “View pricing” CTAs. */
export const SHOW_ROBOT_PRICING = false

export interface RobotCard {
  id: string
  name: string
  description: string
  image: string
  link: string
  buttonText: string
  productLink?: string
}

export interface RobotHeroConfig {
  videoSrc: string
  title: string
  subtitle: string
  priceStartsFrom?: string
  buttonText: string
  textPlacement: "left" | "center" | "right"
  features?: string[]
}

export interface ProductVersion {
  id: string
  name: string
  /** List price for this variant; falls back to `RobotProductConfig.price` if omitted */
  price?: string
  /** When set (e.g. R1 colorways), gallery uses these instead of product-level `images` */
  images?: string[]
  /** Distributor catalog — optional per variant */
  manufacturerName?: string
  sku?: string
  manufacturerPartNumber?: string
}

export interface RobotProductConfig {
  name: string
  price: string
  images: string[]
  versions: ProductVersion[]
  bulletPoints: string[]
  /** Distributor catalog — optional; variant fields override when present */
  manufacturerName?: string
  sku?: string
  manufacturerPartNumber?: string
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

export interface FlexibleSectionImageItem {
  image: string
  header?: string
  subtext?: string
}

export interface G1FlexibleSectionConfig {
  title?: string
  subtitle?: string
  images?: string[]
  items?: FlexibleSectionImageItem[]
}

export interface Go2FlexibleSectionCard {
  image: string
  title?: string
  description?: string
}

export interface Go2FlexibleSectionConfig {
  header?: string
  subtext?: string
  cards?: Go2FlexibleSectionCard[]
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
  /** Header image shown above each model column (e.g. robot product image) */
  headerImage?: string
  /** Price or CTA for each model column (e.g. "18,375 SAR", "Contact Sales") */
  columnPrices?: string[]
  /** Label for the price row in header (e.g. "Price (Tax and Shipping cost excluded)") */
  priceLabel?: string
  /** Label for model column header when using header image (e.g. "Model") */
  modelLabel?: string
}

export function getRobotCards(dict: LocaleDictionary): RobotCard[] {
  const robots = dict?.robots
  return (robots?.cards ?? en.robots.cards) as RobotCard[]
}

export function getRobotsSectionContent(
  lang: Language,
  dict: LocaleDictionary
): {
  sectionTitle: string
  robots: RobotCard[]
  viewPricingText: string
} {
  const robots = dict?.robots as { heading?: string; cards?: RobotCard[]; viewPricingText?: string }
  const fallback = en.robots as { heading: string; cards: RobotCard[]; viewPricingText: string }
  return {
    sectionTitle: robots?.heading ?? fallback.heading,
    robots: (robots?.cards ?? fallback.cards) as RobotCard[],
    viewPricingText: robots?.viewPricingText ?? fallback.viewPricingText ?? (lang === "ar" ? "عرض السعر" : "View pricing"),
  }
}

export function getRobotSliderSlides(dict: LocaleDictionary): RobotSlide[] {
  const cards = getRobotCards(dict)
  const suffix = SHOW_ROBOT_PRICING
    ? ((dict?.robots as { sliderDescriptionSuffix?: string })
        ?.sliderDescriptionSuffix ?? en.robots.sliderDescriptionSuffix)
    : ""
  return cards.map((r) => ({
    ...r,
    description: r.description + suffix,
    backgroundImage: r.image,
  }))
}

function stripHeroPricing(config: RobotHeroConfig): RobotHeroConfig {
  return { ...config, priceStartsFrom: undefined }
}

export function getRobotHeroContent(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotHeroConfig {
  const hero = (dict?.robots as unknown as { hero?: Record<RobotSlug, RobotHeroConfig> })?.hero?.[slug]
  const fallback = (en.robots as unknown as { hero: Record<RobotSlug, RobotHeroConfig> }).hero[slug]
  const config = (hero ?? fallback) as RobotHeroConfig
  return SHOW_ROBOT_PRICING ? config : stripHeroPricing(config)
}

function stripProductPricing(config: RobotProductConfig): RobotProductConfig {
  return {
    ...config,
    price: "",
    versions: config.versions.map(({ price, ...v }) => {
      void price
      return v
    }),
  }
}

export function getRobotProductContent(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotProductConfig {
  const product = (dict?.robots as { product?: Record<RobotSlug, RobotProductConfig> })?.product?.[slug]
  const fallback = (en.robots as unknown as { product?: Record<RobotSlug, RobotProductConfig> })?.product?.[slug]
  const config = (product ?? fallback) as RobotProductConfig
  return SHOW_ROBOT_PRICING ? config : stripProductPricing(config)
}

export function getG1ScrollSectionContent(dict: LocaleDictionary): ScrollSectionItem[] {
  const raw = (dict?.robots as { scrollSection?: { g1?: unknown } })?.scrollSection?.g1
  const fallback = (en.robots as { scrollSection: { g1: unknown } }).scrollSection.g1
  return normalizeScrollSection(raw ?? fallback)
}

export function getRobotScrollSectionContent(
  slug: RobotSlug,
  dict: LocaleDictionary
): ScrollSectionItem[] {
  const raw = (dict?.robots as unknown as { scrollSection?: Record<RobotSlug, unknown> })?.scrollSection?.[slug]
  const fallback = (en.robots as unknown as { scrollSection?: Record<RobotSlug, unknown> })?.scrollSection?.[slug]
  return normalizeScrollSection(raw ?? fallback)
}

export function getRobotFeatureSectionContent(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotFeatureItem[] {
  const featureSection = (dict?.robots as unknown as { featureSection?: Record<RobotSlug, RobotFeatureItem[]> })?.featureSection?.[slug]
  const fallback = (en.robots as unknown as { featureSection?: Record<RobotSlug, RobotFeatureItem[]> })?.featureSection?.[slug]
  return featureSection ?? fallback ?? []
}

export function getG1ParameterSectionContent(dict: LocaleDictionary): G1ParameterSectionConfig | null {
  const specs = (dict?.robots as { specs?: { g1?: { header?: string; image?: string } } })?.specs?.g1
  const fallback = (en.robots as { specs?: { g1?: { header?: string; image?: string } } })?.specs?.g1
  const data = specs ?? fallback
  if (!data?.header || !data?.image) return null
  return { header: data.header, image: data.image }
}

export function getG1ImageSectionContent(
  dict: LocaleDictionary,
  section: "section1" | "section2"
): G1ImageSectionConfig | null {
  const imageSection = (dict?.robots as { imageSection?: { g1?: { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig } } })?.imageSection?.g1?.[section]
  const fallback = (en.robots as { imageSection?: { g1?: { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig } } })?.imageSection?.g1?.[section]
  return (imageSection ?? fallback) ?? null
}

export function getH1ImageSectionsBeforeVideo(dict: LocaleDictionary): RobotSingleImageConfig[] {
  const sections = (dict?.robots as { imageSection?: { h1?: { beforeVideo?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeVideo
  const fallback = (en.robots as { imageSection?: { h1?: { beforeVideo?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeVideo
  return sections ?? fallback ?? []
}

export function getH1ImageSectionsBeforeTable(dict: LocaleDictionary): RobotSingleImageConfig[] {
  const sections = (dict?.robots as { imageSection?: { h1?: { beforeTable?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeTable
  const fallback = (en.robots as { imageSection?: { h1?: { beforeTable?: RobotSingleImageConfig[] } } })?.imageSection?.h1?.beforeTable
  return sections ?? fallback ?? []
}

export function getRobotImageSectionsBeforeVideo(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotSingleImageConfig[] {
  const sections = (dict?.robots as unknown as { imageSection?: Partial<Record<RobotSlug, { beforeVideo?: RobotSingleImageConfig[] }>> })?.imageSection?.[slug]?.beforeVideo
  const fallback = (en.robots as unknown as { imageSection?: Partial<Record<RobotSlug, { beforeVideo?: RobotSingleImageConfig[] }>> })?.imageSection?.[slug]?.beforeVideo
  return sections ?? fallback ?? []
}

export function getRobotImageSectionsBeforeTable(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotSingleImageConfig[] {
  const sections = (dict?.robots as unknown as { imageSection?: Partial<Record<RobotSlug, { beforeTable?: RobotSingleImageConfig[] }>> })?.imageSection?.[slug]?.beforeTable
  const fallback = (en.robots as unknown as { imageSection?: Partial<Record<RobotSlug, { beforeTable?: RobotSingleImageConfig[] }>> })?.imageSection?.[slug]?.beforeTable
  return sections ?? fallback ?? []
}

export function getRobotImageSectionContent(
  slug: RobotSlug,
  dict: LocaleDictionary,
  section: "section1" | "section2"
): G1ImageSectionConfig | null {
  const imageSection = (dict?.robots as unknown as { imageSection?: Record<RobotSlug, { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig }> })?.imageSection?.[slug]?.[section]
  const fallback = (en.robots as unknown as { imageSection?: Record<RobotSlug, { section1?: G1ImageSectionConfig; section2?: G1ImageSectionConfig }> })?.imageSection?.[slug]?.[section]
  return (imageSection ?? fallback) ?? null
}

/** Normalizes g1 flexible section: supports legacy images[] or new items[] format */
function normalizeG1FlexibleSection(raw: unknown): G1FlexibleSectionConfig {
  if (!raw || typeof raw !== "object") return {}
  const obj = raw as Record<string, unknown>
  const items = obj.items as FlexibleSectionImageItem[] | undefined
  const images = obj.images as string[] | undefined
  const imageUrls = Array.isArray(items)
    ? items.map((i) => i.image)
    : Array.isArray(images)
      ? images
      : []
  return {
    title: typeof obj.title === "string" ? obj.title : undefined,
    subtitle: typeof obj.subtitle === "string" ? obj.subtitle : undefined,
    images: imageUrls,
    items: Array.isArray(items) ? items : undefined,
  }
}

export function getG1FlexibleSectionContent(dict: LocaleDictionary): G1FlexibleSectionConfig {
  const raw = (dict?.robots as { flexibleSection?: { g1?: unknown } })?.flexibleSection?.g1
  const fallback = (en.robots as { flexibleSection: { g1: unknown } }).flexibleSection.g1
  return normalizeG1FlexibleSection(raw ?? fallback)
}

export function getGo2FlexibleSectionContent(dict: LocaleDictionary): Go2FlexibleSectionConfig {
  const raw = (dict?.robots as { flexibleSection?: { go2?: Go2FlexibleSectionConfig } })?.flexibleSection?.go2
  const fallback = (en.robots as { flexibleSection?: { go2?: Go2FlexibleSectionConfig } })?.flexibleSection?.go2
  return (raw ?? fallback ?? {}) as Go2FlexibleSectionConfig
}

function stripSpecsPricing(config: RobotSpecsConfig): RobotSpecsConfig {
  const { columnPrices, priceLabel, ...rest } = config
  void columnPrices
  void priceLabel
  return {
    ...rest,
    sections: config.sections.map((section) => ({
      ...section,
      rows: section.rows.filter((row) => !row.highlight),
    })),
  }
}

export function getRobotSpecsContent(
  slug: RobotSlug,
  dict: LocaleDictionary
): RobotSpecsConfig | null {
  const specs = (dict?.robots as unknown as { specs?: Record<RobotSlug, RobotSpecsConfig> })?.specs?.[slug]
  const fallback = (en.robots as unknown as { specs?: Record<RobotSlug, RobotSpecsConfig> })?.specs?.[slug]
  const raw = (specs ?? fallback) ?? null
  if (!raw) return null
  return SHOW_ROBOT_PRICING ? raw : stripSpecsPricing(raw)
}

export function getRobotLabel(
  dict: LocaleDictionary,
  key: "version" | "viewProduct" | "responsibleUseLabel"
): string {
  const robots = dict?.robots as {
    version?: string
    viewProduct?: string
    responsibleUseLabel?: string
  }
  return (
    robots?.[key] ??
    (en.robots as {
      version: string
      viewProduct: string
      responsibleUseLabel: string
    })[key]
  )
}

export interface ResponsibleUseContent {
  title: string
  lastUpdated: string
  ipTitle: string
  ipContent: string
  operationTitle: string
  operationContent: string
  requirementsTitle: string
  requirementsList: string[]
  safetyTitle: string
  safetyContent: string
  notesTitle: string
  notesList: string[]
}

export type ResponsibleUseKey = keyof ResponsibleUseContent

export function getResponsibleUseContent<K extends ResponsibleUseKey>(
  dict: LocaleDictionary,
  key: K
): ResponsibleUseContent[K] {
  const content = (dict?.robots as { responsibleUse?: ResponsibleUseContent })
    ?.responsibleUse
  const fallback = (en.robots as { responsibleUse: ResponsibleUseContent })
    .responsibleUse
  return (content ?? fallback)[key]
}
