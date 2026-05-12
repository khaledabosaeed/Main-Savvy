"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import RobotSectionEditor from "@/components/admin/RobotSectionEditor"
import { createDefaultSection } from "@/lib/robot-section-defaults"
import {
  applySharedMedia,
  mergeEmptyArMediaFromEn,
} from "@/lib/robot-page-shared-media"
import type {
  CustomPagePublishStatus,
  RobotPageSectionData,
} from "@/lib/robots-custom-page"
import { sectionSummary } from "@/lib/robots-custom-page"

const SECTION_TYPES: RobotPageSectionData["type"][] = [
  "catalogCard",
  "hero",
  "product",
  "specs",
  "scrollVideo",
  "image",
  "carousel",
]

function patchCatalogCardLinks(
  sections: RobotPageSectionData[],
  slug: string
): RobotPageSectionData[] {
  const path = `/robots/${slug}`
  const productPath = `/robots/${slug}/product`
  return sections.map((s) => {
    if (s.type !== "catalogCard") return s
    const link = s.link?.trim() ? s.link.trim() : path
    const productLink = s.productLink?.trim()
      ? s.productLink.trim()
      : productPath
    return { ...s, link, productLink }
  })
}

export default function RobotPageBuilder({
  mode,
  initialSlug = "",
  initialEn,
  initialAr,
  initialPublishingStatus = "published",
}: {
  mode: "create" | "edit"
  initialSlug?: string
  initialEn: RobotPageSectionData[]
  initialAr: RobotPageSectionData[]
  initialPublishingStatus?: CustomPagePublishStatus
}) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug)
  const [sectionsEn, setSectionsEn] = useState<RobotPageSectionData[]>(initialEn)
  const [sectionsAr, setSectionsAr] = useState<RobotPageSectionData[]>(initialAr)
  const [lang, setLang] = useState<"en" | "ar">("en")
  const [selected, setSelected] = useState(0)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)

  const sections = lang === "en" ? sectionsEn : sectionsAr
  const setSections =
    lang === "en" ? setSectionsEn : setSectionsAr

  const selectedSection = sections[selected] ?? null

  const slugOk = useMemo(() => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), [slug])

  const hasCatalog = useMemo(
    () =>
      sectionsEn.some((s) => s.type === "catalogCard") &&
      sectionsAr.some((s) => s.type === "catalogCard"),
    [sectionsEn, sectionsAr]
  )

  const updateSectionForActiveLangOnly = useCallback(
    (index: number, next: RobotPageSectionData) => {
      setSections((prev) => {
        const copy = [...prev]
        copy[index] = next
        return copy
      })
    },
    [setSections]
  )

  /** Create: mirror media to the peer locale at the same section index; edit: active locale only. */
  const handleSectionChange = useCallback(
    (next: RobotPageSectionData) => {
      if (!selectedSection || !sections[selected]) return
      updateSectionForActiveLangOnly(selected, next)

      if (mode !== "create") return

      const otherSetSections = lang === "en" ? setSectionsAr : setSectionsEn
      otherSetSections((prev) => {
        const copy = [...prev]
        const peer = copy[selected]
        if (!peer || peer.type !== next.type) return prev
        copy[selected] = applySharedMedia(next, peer)
        return copy
      })
    },
    [
      selected,
      selectedSection,
      sections,
      updateSectionForActiveLangOnly,
      lang,
      mode,
    ]
  )

  const addSection = useCallback(
    (type: RobotPageSectionData["type"]) => {
      const enSec = createDefaultSection(type)
      const arSec = createDefaultSection(type)
      if (type === "catalogCard" && slugOk) {
        const path = `/robots/${slug}`
        const productPath = `/robots/${slug}/product`
        ;(enSec as Extract<RobotPageSectionData, { type: "catalogCard" }>).link =
          path
        ;(enSec as Extract<RobotPageSectionData, { type: "catalogCard" }>).productLink =
          productPath
        ;(arSec as Extract<RobotPageSectionData, { type: "catalogCard" }>).link =
          path
        ;(arSec as Extract<RobotPageSectionData, { type: "catalogCard" }>).productLink =
          productPath
      }
      setSectionsEn((prev) => {
        const next = [...prev, enSec]
        setSelected(next.length - 1)
        return next
      })
      setSectionsAr((prev) => [...prev, arSec])
      setPickerOpen(false)
    },
    [slugOk, slug]
  )

  const removeSection = useCallback((index: number) => {
    setSectionsEn((prev) => prev.filter((_, i) => i !== index))
    setSectionsAr((prev) => prev.filter((_, i) => i !== index))
    setSelected((s) => {
      if (s === index) return Math.max(0, index - 1)
      if (s > index) return s - 1
      return s
    })
  }, [])

  const move = useCallback((from: number, dir: -1 | 1) => {
    const to = from + dir
    const reorder = (arr: RobotPageSectionData[]) => {
      if (to < 0 || to >= arr.length) return arr
      const copy = [...arr]
      ;[copy[from], copy[to]] = [copy[to], copy[from]]
      return copy
    }
    setSectionsEn((prev) => reorder(prev))
    setSectionsAr((prev) => reorder(prev))
    setSelected(to)
  }, [])

  async function persist(action: "draft" | "publish") {
    setToast(null)
    if (!slugOk || !slug) {
      setToast({ ok: false, text: "Enter a valid kebab-case slug." })
      return
    }
    if (!hasCatalog) {
      setToast({
        ok: false,
        text: "Add a Catalog card section in both EN and AR (required for the store).",
      })
      return
    }
    if (sectionsEn.length !== sectionsAr.length) {
      setToast({
        ok: false,
        text: "EN and AR must have the same number of sections (add/remove in sync).",
      })
      return
    }

    const enSections = patchCatalogCardLinks(sectionsEn, slug)
    const arSectionsPatched = patchCatalogCardLinks(sectionsAr, slug)
    const arSections =
      mode === "create"
        ? mergeEmptyArMediaFromEn(enSections, arSectionsPatched)
        : arSectionsPatched

    const enPayload = {
      slug,
      sections: enSections,
    }
    const arPayload = {
      slug,
      sections: arSections,
    }

    setSaving(true)
    try {
      const url =
        mode === "create"
          ? "/api/admin/robots"
          : `/api/admin/robots/${encodeURIComponent(slug)}`
      const method = mode === "create" ? "POST" : "PUT"
      const body =
        mode === "create"
          ? JSON.stringify({
              slug,
              action,
              en: enPayload,
              ar: arPayload,
            })
          : JSON.stringify({ action, en: enPayload, ar: arPayload })
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      })
      const bodyJson = (await res.json()) as { error?: unknown; ok?: boolean }
      if (!res.ok) {
        const msg =
          typeof bodyJson.error === "string"
            ? bodyJson.error
            : JSON.stringify(bodyJson.error ?? res.statusText)
        setToast({ ok: false, text: msg })
        return
      }
      setToast({
        ok: true,
        text:
          action === "publish"
            ? "Published. Cache updated."
            : "Draft saved. Page stays off the live site.",
      })
      router.push("/admin/robots")
      router.refresh()
    } catch (e) {
      setToast({
        ok: false,
        text: e instanceof Error ? e.message : "Save failed",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/robots"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Robots
          </Link>
          <h1 className="text-sm font-semibold text-white">
            {mode === "create" ? "New robot page" : `Edit “${initialSlug}”`}
          </h1>
          {mode === "edit" && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                initialPublishingStatus === "draft"
                  ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
              }`}
            >
              {initialPublishingStatus === "draft" ? "Draft" : "Published"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void persist("draft")}
            disabled={saving}
            className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            onClick={() => void persist("publish")}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </header>

      {toast && (
        <div
          className={`mx-4 mt-3 shrink-0 rounded-lg border px-4 py-2 text-sm md:mx-6 ${
            toast.ok
              ? "border-emerald-900/60 bg-emerald-950/50 text-emerald-100"
              : "border-red-900/60 bg-red-950/50 text-red-100"
          }`}
        >
          {toast.text}
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-zinc-800 bg-zinc-900/40 md:border-r">
          <div className="border-b border-zinc-800 p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Slug
            </p>
            <input
              value={slug}
              disabled={mode === "edit"}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="my-robot-slug"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 disabled:opacity-60"
            />
            {!slugOk && slug.length > 0 && (
              <p className="mt-1 text-xs text-amber-300">
                Use lowercase letters, numbers, and hyphens only.
              </p>
            )}
          </div>

          <div className="border-b border-zinc-800 p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Editing language
            </p>
            <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
              {(["en", "ar"] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLang(loc)}
                  className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                    lang === loc
                      ? "bg-primary text-white shadow"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-zinc-500">
              Section order is shared. Text differs per language. On new pages,
              media URLs mirror across EN/AR; after publish, editing media is
              per language.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Sections ({sections.length})
            </p>
            <ul className="space-y-1">
              {sections.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`flex w-full flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                      selected === i
                        ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-zinc-500">
                      {s.type}
                    </span>
                    <span className="truncate">{sectionSummary(s)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-zinc-800 p-3 space-y-2">
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className="w-full rounded-lg border border-zinc-600 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              + Add section
            </button>
            {pickerOpen && (
              <div className="flex flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-950 p-2">
                {SECTION_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="rounded px-2 py-1.5 text-left text-xs text-zinc-200 hover:bg-zinc-800"
                    onClick={() => addSection(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={selected <= 0}
                onClick={() => move(selected, -1)}
                className="flex-1 rounded border border-zinc-700 py-1 text-xs disabled:opacity-40"
              >
                Up
              </button>
              <button
                type="button"
                disabled={selected >= sections.length - 1}
                onClick={() => move(selected, 1)}
                className="flex-1 rounded border border-zinc-700 py-1 text-xs disabled:opacity-40"
              >
                Down
              </button>
              <button
                type="button"
                onClick={() => removeSection(selected)}
                className="flex-1 rounded border border-red-900/50 py-1 text-xs text-red-300 hover:bg-red-950/40"
              >
                Remove
              </button>
            </div>
          </div>
        </aside>

        <main className="min-h-0 overflow-y-auto overscroll-y-contain px-4 py-4 md:px-6">
          {!selectedSection ? (
            <p className="text-sm text-zinc-500">Select a section.</p>
          ) : (
            <RobotSectionEditor
              section={selectedSection}
              onChange={handleSectionChange}
              slugHint={slug}
            />
          )}
        </main>
      </div>
    </div>
  )
}
