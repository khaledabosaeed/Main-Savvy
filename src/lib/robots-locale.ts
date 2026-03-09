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
