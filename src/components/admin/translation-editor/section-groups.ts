import type { GroupId } from "./types"

const SITE_KEYS = new Set([
  "header",
  "nav",
  "footer",
  "topBanner",
  "common",
])
const HOME_KEYS = new Set([
  "hero",
  "home",
  "promo",
  "servicesGrid",
  "partnersSlider",
  "imageSlider",
  "gallerySection",
  "latestNewsSection",
  "savvySections",
])
const PAGES_KEYS = new Set([
  "expo",
  "innovation",
  "media",
  "news",
  "contact",
  "faq",
  "privacy",
  "terms",
])
const ROBOTS_KEYS = new Set(["robots"])

export const GROUP_ORDER: GroupId[] = ["site", "home", "pages", "robots", "other"]

export const GROUP_LABELS: Record<GroupId, string> = {
  site: "Site",
  home: "Home",
  pages: "Pages",
  robots: "Robots",
  other: "Other",
}

export function sectionGroup(key: string): GroupId {
  if (SITE_KEYS.has(key)) return "site"
  if (HOME_KEYS.has(key)) return "home"
  if (PAGES_KEYS.has(key)) return "pages"
  if (ROBOTS_KEYS.has(key)) return "robots"
  return "other"
}
