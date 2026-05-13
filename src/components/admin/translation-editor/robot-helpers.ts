import { isPlainObject } from "./json-helpers"
import type {
  JsonValue,
  LocaleTab,
  PreviewTarget,
  RobotPageEntry,
  RobotSidebarPage,
} from "./types"

export function previewPathFor(
  loc: LocaleTab,
  target: PreviewTarget,
  entry?: RobotPageEntry
): string {
  const base = `/${loc}`
  if (target === "home") return base
  if (target === "robots") return `${base}/robots`
  if (entry?.source === "custom" && entry.status === "draft") {
    return `/admin/robots/${encodeURIComponent(target)}/edit`
  }
  return `${base}/robots/${target}`
}

const ROBOTS_HUB_EXCLUDE = new Set([
  "hero",
  "scrollSection",
  "imageSection",
  "flexibleSection",
  "specs",
  "product",
  "customPages",
  "customPageDrafts",
  "customPageStatus",
])

const ROBOTS_PER_PAGE_TOP_KEYS = [
  "hero",
  "scrollSection",
  "imageSection",
  "flexibleSection",
  "specs",
  "product",
] as const

const CUSTOM_PAGE_TOP_KEYS = ["customPages", "customPageDrafts"] as const
const STATIC_ROBOT_PRODUCT_SLUGS = new Set(["r1", "g1", "go2", "h2"])

function extractRobotsHub(r: Record<string, JsonValue>): Record<string, JsonValue> {
  const out: Record<string, JsonValue> = {}
  for (const [k, v] of Object.entries(r)) {
    if (!ROBOTS_HUB_EXCLUDE.has(k)) out[k] = v
  }
  return out
}

export function extractRobotsForRobotPage(
  r: Record<string, JsonValue>,
  page: RobotSidebarPage
): Record<string, JsonValue> {
  if (page === "robots") {
    return extractRobotsHub(r)
  }
  for (const key of CUSTOM_PAGE_TOP_KEYS) {
    const block = r[key]
    if (!isPlainObject(block)) continue
    const slice = (block as Record<string, JsonValue>)[page]
    if (slice !== undefined) {
      return { [key]: { [page]: slice } }
    }
  }
  const out: Record<string, JsonValue> = {}
  for (const key of ROBOTS_PER_PAGE_TOP_KEYS) {
    const block = r[key]
    if (!isPlainObject(block)) continue
    const slice = (block as Record<string, JsonValue>)[page]
    if (slice !== undefined) {
      out[key] = { [page]: slice }
    }
  }
  return out
}

export function applyRobotsRobotPageEdit(
  fullRobots: Record<string, JsonValue>,
  page: RobotSidebarPage,
  edited: Record<string, JsonValue>
): Record<string, JsonValue> {
  if (page === "robots") {
    return { ...fullRobots, ...edited }
  }
  const merged = { ...fullRobots }
  for (const [topKey, partial] of Object.entries(edited)) {
    if (!isPlainObject(partial)) continue
    const prevBlock = isPlainObject(merged[topKey])
      ? { ...(merged[topKey] as Record<string, JsonValue>) }
      : {}
    for (const [sk, val] of Object.entries(partial)) {
      prevBlock[sk] = val
    }
    merged[topKey] = prevBlock
  }
  return merged
}

export function inferRobotPageFromMatchPath(path: string): RobotSidebarPage {
  if (path === "robots" || !path.startsWith("robots.")) return "robots"
  const parts = path.split(".")
  if (parts.length < 3) return "robots"
  const topKey = parts[1]
  const slug = parts[2]
  if ((CUSTOM_PAGE_TOP_KEYS as readonly string[]).includes(topKey)) {
    return slug
  }
  if (
    (ROBOTS_PER_PAGE_TOP_KEYS as readonly string[]).includes(topKey) &&
    STATIC_ROBOT_PRODUCT_SLUGS.has(slug)
  ) {
    return slug
  }
  return "robots"
}

const STATIC_ROBOT_PAGE_ENTRIES: RobotPageEntry[] = [
  {
    target: "robots",
    title: "Robots overview",
    description: "Landing grid, shared labels, and robot cards for /robots.",
    source: "overview",
  },
  {
    target: "r1",
    title: "Unitree R1",
    description: "Humanoid R1 — hero, product, specs, and page copy.",
    source: "static",
  },
  {
    target: "g1",
    title: "Unitree G1",
    description: "Humanoid G1 — hero, scroll sections, specs, and galleries.",
    source: "static",
  },
  {
    target: "go2",
    title: "Unitree Go2",
    description: "Quadruped Go2 — hero, flexible sections, and product copy.",
    source: "static",
  },
  {
    target: "h2",
    title: "Unitree H2",
    description: "H2 robot page — hero, imagery, and specification content.",
    source: "static",
  },
]

function pickCustomPageTitle(page: JsonValue, slug: string): string {
  if (!isPlainObject(page) || !Array.isArray(page.sections)) return slug
  const card = page.sections.find((section) => {
    return isPlainObject(section) && section.type === "catalogCard"
  })
  if (!isPlainObject(card)) return slug
  return typeof card.name === "string" && card.name.trim()
    ? card.name.trim()
    : slug
}

export function buildRobotPageEntries(
  robots: Record<string, JsonValue> | null
): RobotPageEntry[] {
  if (!robots) return STATIC_ROBOT_PAGE_ENTRIES
  const customPages = isPlainObject(robots.customPages)
    ? (robots.customPages as Record<string, JsonValue>)
    : {}
  const customPageDrafts = isPlainObject(robots.customPageDrafts)
    ? (robots.customPageDrafts as Record<string, JsonValue>)
    : {}
  const statusMap = isPlainObject(robots.customPageStatus)
    ? (robots.customPageStatus as Record<string, JsonValue>)
    : {}
  const customSlugs = new Set([
    ...Object.keys(customPages),
    ...Object.keys(customPageDrafts),
  ])
  const customEntries = [...customSlugs]
    .filter((slug) => !STATIC_ROBOT_PRODUCT_SLUGS.has(slug))
    .sort((a, b) => a.localeCompare(b))
    .map((slug): RobotPageEntry => {
      const status =
        statusMap[slug] === "draft" || (!customPages[slug] && customPageDrafts[slug])
          ? "draft"
          : "published"
      const page =
        status === "draft"
          ? customPageDrafts[slug] ?? customPages[slug]
          : customPages[slug] ?? customPageDrafts[slug]
      return {
        target: slug,
        title: pickCustomPageTitle(page, slug),
        description:
          status === "draft"
            ? `Custom robot page draft for /robots/${slug}.`
            : `Custom robot page for /robots/${slug}.`,
        status,
        source: "custom",
      }
    })
  return [...STATIC_ROBOT_PAGE_ENTRIES, ...customEntries]
}
