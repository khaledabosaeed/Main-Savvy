"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { deepEqualJson, findFieldElementByPath, isPlainObject } from "./translation-editor/json-helpers"
import { previewPathFor, buildRobotPageEntries, extractRobotsForRobotPage, inferRobotPageFromMatchPath } from "./translation-editor/robot-helpers"
import { GROUP_ORDER, sectionGroup } from "./translation-editor/section-groups"
import { collectMatches, valueContainsText } from "./translation-editor/search-helpers"
import { TranslationEditorPanel } from "./translation-editor/TranslationEditorPanel"
import { TranslationPreviewPane } from "./translation-editor/TranslationPreviewPane"
import { TranslationSidebar } from "./translation-editor/TranslationSidebar"
import type {
  GroupId,
  JsonValue,
  LocaleTab,
  PreviewTarget,
  RobotSidebarPage,
  SearchMatch,
  ToastState,
} from "./translation-editor/types"

type TranslationEditorProps = {
  onSignOut: () => void | Promise<void>
}

export default function TranslationEditor({ onSignOut }: TranslationEditorProps) {
  const [locale, setLocale] = useState<LocaleTab>("en")
  const [previewTarget, setPreviewTarget] = useState<PreviewTarget>("home")
  const [robotPageFocus, setRobotPageFocus] = useState<RobotSidebarPage | null>(
    null
  )
  const [content, setContent] = useState<Record<string, JsonValue> | null>(null)
  const [baseline, setBaseline] = useState<Record<string, JsonValue> | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [previewTick, setPreviewTick] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)
  const [scrollToFieldPath, setScrollToFieldPath] = useState<string | null>(null)
  const sectionNavRef = useRef<HTMLElement | null>(null)
  const editorScrollRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (!activeSection || !sectionNavRef.current) return
    const esc =
      typeof CSS !== "undefined" && "escape" in CSS
        ? CSS.escape(activeSection)
        : activeSection.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
    const btn = sectionNavRef.current.querySelector<HTMLElement>(
      `[data-section="${esc}"]`
    )
    btn?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [activeSection])

  useEffect(() => {
    if (!scrollToFieldPath || loading) return

    const path = scrollToFieldPath
    let cancelled = false
    const timers: number[] = []

    const tryScroll = (): boolean => {
      if (cancelled) return true
      const field = findFieldElementByPath(path)
      if (!field) return false
      const scrollRoot = editorScrollRef.current
      if (scrollRoot) {
        const rootRect = scrollRoot.getBoundingClientRect()
        const fieldRect = field.getBoundingClientRect()
        const stickyHeader = scrollRoot.querySelector<HTMLElement>(
          ".sticky.top-0"
        )
        const offset = stickyHeader
          ? stickyHeader.getBoundingClientRect().height
          : 0
        const delta = fieldRect.top - rootRect.top - offset - 8
        scrollRoot.scrollBy({ top: delta, behavior: "smooth" })
      } else {
        field.scrollIntoView({ block: "start", behavior: "smooth" })
      }
      const focusable =
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLInputElement
          ? field
          : field.querySelector<HTMLTextAreaElement | HTMLInputElement>(
              "textarea, input:not([type=checkbox])"
            )
      focusable?.focus({ preventScroll: true })
      setScrollToFieldPath(null)
      return true
    }

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setScrollToFieldPath(null)
      }, 520)
    )
    for (const ms of [0, 50, 120, 250, 400]) {
      timers.push(
        window.setTimeout(() => {
          if (tryScroll()) {
            for (const t of timers) clearTimeout(t)
          }
        }, ms)
      )
    }

    return () => {
      cancelled = true
      for (const t of timers) clearTimeout(t)
    }
  }, [scrollToFieldPath, loading, activeSection, robotPageFocus, content])

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

  const searchMatches = useMemo((): SearchMatch[] | null => {
    const q = search.trim()
    if (!q || !content) return null
    const qLower = q.toLowerCase()
    const all: SearchMatch[] = []
    for (const section of topLevelKeys) {
      if (section.toLowerCase().includes(qLower)) {
        all.push({ section, path: section, value: section })
      }
      all.push(...collectMatches(section, content[section], qLower))
    }
    return all
  }, [search, content, topLevelKeys])

  const robotsScopedSlice = useMemo(() => {
    if (!content || !robotPageFocus || !isPlainObject(content.robots)) {
      return null
    }
    return extractRobotsForRobotPage(
      content.robots as Record<string, JsonValue>,
      robotPageFocus
    )
  }, [content, robotPageFocus])

  const robotPageEntries = useMemo(() => {
    return buildRobotPageEntries(
      content && isPlainObject(content.robots)
        ? (content.robots as Record<string, JsonValue>)
        : null
    )
  }, [content])

  const selectedRobotEntry = useMemo(() => {
    if (!robotPageFocus) return undefined
    return robotPageEntries.find((entry) => entry.target === robotPageFocus)
  }, [robotPageEntries, robotPageFocus])

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

  function handleSearchResultClick(path: string) {
    setScrollToFieldPath(path)
    const section = path.split(".")[0]
    setActiveSection(section)
    if (section === "robots") {
      const page = inferRobotPageFromMatchPath(path)
      setRobotPageFocus(page)
      setPreviewTarget(page === "robots" ? "robots" : page)
    } else {
      setRobotPageFocus(null)
    }
  }

  async function saveActiveSection() {
    if (!content || !activeSection || !(activeSection in content)) return
    setSaving(true)
    setToast(null)
    setError(null)
    try {
      if (
        activeSection === "robots" &&
        baseline &&
        isPlainObject(content.robots)
      ) {
        const cr = content.robots as Record<string, JsonValue>
        const br = (
          isPlainObject(baseline.robots)
            ? baseline.robots
            : {}
        ) as Record<string, JsonValue>
        const topKeys = new Set([...Object.keys(cr), ...Object.keys(br)])
        let chunks = 0
        for (const key of topKeys) {
          if (deepEqualJson(cr[key], br[key])) continue
          if (
            (key === "customPages" || key === "customPageDrafts") &&
            isPlainObject(cr[key])
          ) {
            const curCp = cr[key] as Record<string, JsonValue>
            const baseCp = isPlainObject(br[key])
              ? (br[key] as Record<string, JsonValue>)
              : {}
            const slugKeys = new Set([
              ...Object.keys(curCp),
              ...Object.keys(baseCp),
            ])
            for (const slug of slugKeys) {
              if (deepEqualJson(curCp[slug], baseCp[slug])) continue
              const partial =
                curCp[slug] === undefined
                  ? { [key]: { [slug]: null } }
                  : { [key]: { [slug]: curCp[slug] } }
              const res = await fetch("/api/admin/translations", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ locale, robotsPartial: partial }),
              })
              const bodyJson = (await res.json()) as {
                error?: unknown
                ok?: boolean
              }
              if (!res.ok) {
                const msg =
                  typeof bodyJson.error === "string"
                    ? bodyJson.error
                    : JSON.stringify(bodyJson.error ?? res.statusText)
                setToast({ type: "err", text: msg })
                return
              }
              chunks++
            }
          } else {
            const res = await fetch("/api/admin/translations", {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                locale,
                robotsPartial: { [key]: cr[key] },
              }),
            })
            const bodyJson = (await res.json()) as {
              error?: unknown
              ok?: boolean
            }
            if (!res.ok) {
              const msg =
                typeof bodyJson.error === "string"
                  ? bodyJson.error
                  : JSON.stringify(bodyJson.error ?? res.statusText)
              setToast({ type: "err", text: msg })
              return
            }
            chunks++
          }
        }
        if (chunks === 0) {
          setToast({
            type: "ok",
            text: `Saved “robots” (no changes detected).`,
          })
          await load()
          return
        }
        setToast({
          type: "ok",
          text: `Saved “robots” (${chunks} update${chunks === 1 ? "" : "s"}). Public cache updated.`,
        })
        await load()
        return
      }

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
  const canSave =
    !loading &&
    !!content &&
    !!activeSection &&
    activeSection in (content ?? {}) &&
    dirty

  const previewEntry =
    previewTarget === "home"
      ? undefined
      : robotPageEntries.find((entry) => entry.target === previewTarget)
  const previewPath = previewPathFor(locale, previewTarget, previewEntry)

  return (
    <div
      className="flex h-dvh min-h-0 flex-col overflow-hidden"
      data-lenis-prevent
    >
      <header className="z-30 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur md:px-6">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Admin
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/admin/robots"
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            Robot pages
          </Link>
          <Link
            href={previewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            View website
          </Link>
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-200"
          >
            Sign out
          </button>
          <button
            type="button"
            disabled={saving || !canSave}
            onClick={() => void saveActiveSection()}
            className="min-w-[140px] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving
              ? "Saving…"
              : activeSection
                ? `Save “${activeSection}”`
                : "Save"}
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(40vh,1fr)_minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1">
        <TranslationPreviewPane
          locale={locale}
          previewTarget={previewTarget}
          previewEntry={previewEntry}
          previewPath={previewPath}
          updatedAt={updatedAt}
          previewTick={previewTick}
          onPreviewTargetChange={setPreviewTarget}
          onRefreshPreview={() => setPreviewTick((n) => n + 1)}
        />

        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden md:flex-row">
          <TranslationSidebar
            sectionNavRef={sectionNavRef}
            loading={loading}
            locale={locale}
            search={search}
            searchMatches={searchMatches}
            topLevelKeys={topLevelKeys}
            filteredKeys={filteredKeys}
            grouped={grouped}
            activeSection={activeSection}
            robotPageFocus={robotPageFocus}
            robotPageEntries={robotPageEntries}
            updatedAt={updatedAt}
            isSectionDirty={isSectionDirty}
            onLocaleChange={trySetLocale}
            onSearchChange={setSearch}
            onActiveSectionChange={setActiveSection}
            onRobotPageFocusChange={setRobotPageFocus}
            onPreviewTargetChange={setPreviewTarget}
            onScrollToFieldPathChange={handleSearchResultClick}
          />
          <TranslationEditorPanel
            editorScrollRef={editorScrollRef}
            loading={loading}
            content={content}
            activeSection={activeSection}
            robotPageFocus={robotPageFocus}
            selectedRobotEntry={selectedRobotEntry}
            robotsScopedSlice={robotsScopedSlice}
            dirty={dirty}
            topLevelKeys={topLevelKeys}
            toast={toast}
            error={error}
            onContentChange={setContent}
          />
        </div>
      </div>
    </div>
  )
}
