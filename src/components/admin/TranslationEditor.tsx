"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

type JsonValue = unknown

function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

/** Human-readable path for labels (e.g. hero → title) */
function formatPathDisplay(path: string): string {
  return path.replace(/\./g, " → ")
}

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

type GroupId = "site" | "home" | "pages" | "robots" | "other"

const GROUP_ORDER: GroupId[] = ["site", "home", "pages", "robots", "other"]
const GROUP_LABELS: Record<GroupId, string> = {
  site: "Site",
  home: "Home",
  pages: "Pages",
  robots: "Robots",
  other: "Other",
}

function sectionGroup(key: string): GroupId {
  if (SITE_KEYS.has(key)) return "site"
  if (HOME_KEYS.has(key)) return "home"
  if (PAGES_KEYS.has(key)) return "pages"
  if (ROBOTS_KEYS.has(key)) return "robots"
  return "other"
}

function deepEqualJson(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

/** True if any string/number/boolean leaf contains `q` (case-insensitive). */
function valueContainsText(value: unknown, qLower: string): boolean {
  if (!qLower) return true
  const walk = (v: unknown): boolean => {
    if (v === null || v === undefined) return false
    if (typeof v === "string") return v.toLowerCase().includes(qLower)
    if (typeof v === "number" || typeof v === "boolean") {
      return String(v).toLowerCase().includes(qLower)
    }
    if (Array.isArray(v)) return v.some(walk)
    if (typeof v === "object") {
      return Object.values(v as Record<string, unknown>).some(walk)
    }
    return false
  }
  return walk(value)
}

function ValueField({
  path,
  value,
  onChange,
  depth,
}: {
  path: string
  value: JsonValue
  onChange: (next: JsonValue) => void
  depth: number
}) {
  const pad = Math.min(depth, 6) * 10

  if (value === null) {
    return (
      <span className="text-xs text-zinc-500" style={{ marginLeft: pad }}>
        null
      </span>
    )
  }

  if (typeof value === "string") {
    const rows = Math.min(12, Math.max(2, value.split("\n").length))
    return (
      <div className="min-w-0" style={{ marginLeft: pad }}>
        <label
          htmlFor={path}
          className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
        >
          {formatPathDisplay(path)}
        </label>
        <textarea
          id={path}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>
    )
  }

  if (typeof value === "number") {
    return (
      <div className="min-w-0" style={{ marginLeft: pad }}>
        <label
          htmlFor={path}
          className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
        >
          {formatPathDisplay(path)}
        </label>
        <input
          id={path}
          type="number"
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => {
            const n = parseFloat(e.target.value)
            onChange(Number.isNaN(n) ? 0 : n)
          }}
          className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary"
        />
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div style={{ marginLeft: pad }}>
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600"
          />
          {String(value)}
        </label>
      </div>
    )
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4" style={{ marginLeft: pad }}>
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </span>
        {value.map((item, i) => (
          <div
            key={`${path}[${i}]`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <div className="mb-2 text-xs font-medium text-zinc-500">Item [{i}]</div>
            <ValueField
              path={`${path}[${i}]`}
              value={item}
              depth={0}
              onChange={(next) => {
                const copy = [...value]
                copy[i] = next
                onChange(copy)
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    return (
      <div className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4" style={{ marginLeft: pad }}>
        {depth > 0 && (
          <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            {formatPathDisplay(path)}
          </span>
        )}
        {entries.map(([key, child]) => (
          <div key={key} className="min-w-0">
            <ValueField
              path={`${path}.${key}`}
              value={child}
              depth={depth + 1}
              onChange={(next) => {
                onChange({ ...value, [key]: next })
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <span className="text-xs text-zinc-400" style={{ marginLeft: pad }}>
      {String(value)}
    </span>
  )
}

type LocaleTab = "en" | "ar"

type TranslationEditorProps = {
  onSignOut: () => void | Promise<void>
}

export default function TranslationEditor({ onSignOut }: TranslationEditorProps) {
  const [locale, setLocale] = useState<LocaleTab>("en")
  const [content, setContent] = useState<Record<string, JsonValue> | null>(null)
  const [baseline, setBaseline] = useState<Record<string, JsonValue> | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/translations?locale=${locale}`, {
        credentials: "include",
      })
      const body = (await res.json()) as {
        content?: Record<string, JsonValue>
        updated_at?: string
        error?: string
      }
      if (!res.ok) {
        setError(body.error ?? res.statusText)
        setContent(null)
        setBaseline(null)
        setActiveSection(null)
        return
      }
      const next =
        body.content && typeof body.content === "object"
          ? { ...body.content }
          : {}
      setContent(next)
      setBaseline(JSON.parse(JSON.stringify(next)) as Record<string, JsonValue>)
      setUpdatedAt(body.updated_at ?? null)
      const keys = Object.keys(next).sort((a, b) => a.localeCompare(b))
      setActiveSection((prev) => (prev && prev in next ? prev : keys[0] ?? null))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
      setContent(null)
      setBaseline(null)
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    setToast(null)
  }, [locale])

  useEffect(() => {
    void load()
  }, [load])

  const topLevelKeys = useMemo(
    () =>
      content
        ? Object.keys(content).sort((a, b) => a.localeCompare(b))
        : [],
    [content]
  )

  const filteredKeys = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return topLevelKeys
    if (!content) return topLevelKeys
    return topLevelKeys.filter((k) => {
      if (k.toLowerCase().includes(q)) return true
      return valueContainsText(content[k], q)
    })
  }, [topLevelKeys, search, content])

  const grouped = useMemo(() => {
    const map = new Map<GroupId, string[]>()
    for (const g of GROUP_ORDER) map.set(g, [])
    for (const key of filteredKeys) {
      const g = sectionGroup(key)
      map.get(g)!.push(key)
    }
    return map
  }, [filteredKeys])

  useEffect(() => {
    if (!content || filteredKeys.length === 0) return
    if (activeSection && !filteredKeys.includes(activeSection)) {
      setActiveSection(filteredKeys[0] ?? null)
    }
  }, [content, filteredKeys, activeSection])

  function isSectionDirty(section: string): boolean {
    if (!content || !baseline) return false
    return !deepEqualJson(content[section], baseline[section])
  }

  function hasAnyUnsaved(): boolean {
    if (!content || !baseline) return false
    return topLevelKeys.some((k) => !deepEqualJson(content[k], baseline[k]))
  }

  function trySetLocale(next: LocaleTab) {
    if (next === locale) return
    if (hasAnyUnsaved()) {
      const ok = window.confirm(
        "You have unsaved changes. Discard them and switch language?"
      )
      if (!ok) return
    }
    setLocale(next)
  }

  async function saveActiveSection() {
    if (!content || !activeSection || !(activeSection in content)) return
    setSaving(true)
    setToast(null)
    setError(null)
    try {
      const res = await fetch("/api/admin/translations", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          section: activeSection,
          data: content[activeSection],
        }),
      })
      const body = (await res.json()) as { error?: unknown; ok?: boolean }
      if (!res.ok) {
        const msg =
          typeof body.error === "string"
            ? body.error
            : JSON.stringify(body.error ?? res.statusText)
        setToast({ type: "err", text: msg })
        return
      }
      setToast({
        type: "ok",
        text: `Saved “${activeSection}”. Public cache updated.`,
      })
      await load()
    } catch (e) {
      setToast({
        type: "err",
        text: e instanceof Error ? e.message : "Save failed",
      })
    } finally {
      setSaving(false)
    }
  }

  const dirty = activeSection ? isSectionDirty(activeSection) : false

  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col md:flex-row md:min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-full shrink-0 flex-col border-zinc-800 bg-zinc-900/40 md:w-72 md:border-r">
        <div className="border-b border-zinc-800 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Language
          </p>
          <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            {(["en", "ar"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => trySetLocale(loc)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                  locale === loc
                    ? "bg-primary text-white shadow"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-zinc-800 p-3">
          <label
            htmlFor="section-search-sidebar"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Search (name or text)
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <input
              id="section-search-sidebar"
              type="search"
              placeholder="Section name or text inside…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 pb-4">
          {loading && (
            <p className="px-2 py-4 text-sm text-zinc-500">Loading…</p>
          )}
          {!loading && topLevelKeys.length > 0 && filteredKeys.length === 0 && (
            <p className="px-2 py-4 text-sm text-amber-200/90">
              No section name or text matches “{search.trim()}”.
            </p>
          )}
          {!loading &&
            GROUP_ORDER.map((gid) => {
              const keys = grouped.get(gid) ?? []
              if (keys.length === 0) return null
              return (
                <div key={gid} className="mb-4">
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    {GROUP_LABELS[gid]}
                  </p>
                  <ul className="space-y-0.5">
                    {keys.map((key) => {
                      const isActive = activeSection === key
                      const unsaved = isSectionDirty(key)
                      return (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => setActiveSection(key)}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                              isActive
                                ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                unsaved ? "bg-amber-400" : "bg-transparent"
                              }`}
                              title={unsaved ? "Unsaved changes" : undefined}
                              aria-hidden
                            />
                            <span className="truncate font-mono text-[13px]">
                              {key}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </nav>

        <div className="mt-auto border-t border-zinc-800 p-3">
          <Link
            href="/ar"
            className="mb-2 block w-full rounded-lg border border-zinc-700 py-2 text-center text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="w-full rounded-lg border border-zinc-700 py-2 text-sm text-zinc-300 hover:border-red-900/60 hover:bg-red-950/30 hover:text-red-200"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main editor */}
      <div className="flex min-h-[50vh] min-w-0 flex-1 flex-col bg-zinc-950">
        <div className="border-b border-zinc-800 px-4 py-4 md:px-6">
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Translations
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            Edit copy by section. Changes save to Supabase and refresh the public
            site on next request (
            <code className="rounded bg-zinc-800 px-1 text-[11px]">
              revalidateTag
            </code>
            ).
          </p>
          <div className="mt-4 max-w-xl">
            <label
              htmlFor="section-search-main"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
              Search (name or text)
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden
              />
              <input
                id="section-search-main"
                type="search"
                placeholder="Search section names or any translation text…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            {search.trim() && !loading && content && (
              <p className="mt-2 text-xs text-zinc-500">
                {filteredKeys.length} section
                {filteredKeys.length === 1 ? "" : "s"} match (name or text) — of{" "}
                {topLevelKeys.length} total
              </p>
            )}
          </div>
          {updatedAt && (
            <p className="mt-3 text-xs text-zinc-500">
              Locale last saved: {new Date(updatedAt).toLocaleString()}
            </p>
          )}
        </div>

        {toast && (
          <div
            className={`mx-4 mt-4 rounded-lg border px-4 py-3 text-sm md:mx-6 ${
              toast.type === "ok"
                ? "border-emerald-900/60 bg-emerald-950/50 text-emerald-100"
                : "border-red-900/60 bg-red-950/50 text-red-100"
            }`}
          >
            {toast.text}
          </div>
        )}
        {error && (
          <div className="mx-4 mt-4 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200 md:mx-6">
            {error}
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          {!loading && content && activeSection && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-zinc-800 px-2 py-1 font-mono text-sm text-primary">
                    {activeSection}
                  </span>
                  {dirty && (
                    <span className="text-xs font-medium text-amber-400">
                      Unsaved changes
                    </span>
                  )}
                </div>
                <ValueField
                  path={activeSection}
                  value={content[activeSection]}
                  depth={0}
                  onChange={(next) => {
                    setContent((prev) =>
                      prev ? { ...prev, [activeSection]: next } : prev
                    )
                  }}
                />
              </div>

              <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950/95 px-4 py-4 backdrop-blur md:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-zinc-500">
                    {dirty
                      ? "Save to publish this section to the live site."
                      : "No pending changes for this section."}
                  </p>
                  <button
                    type="button"
                    disabled={saving || !dirty}
                    onClick={() => void saveActiveSection()}
                    className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {saving ? "Saving…" : `Save “${activeSection}”`}
                  </button>
                </div>
              </div>
            </>
          )}

          {!loading && content && !activeSection && topLevelKeys.length === 0 && (
            <p className="p-6 text-sm text-zinc-500">No translation data.</p>
          )}
        </div>
      </div>
    </div>
  )
}
