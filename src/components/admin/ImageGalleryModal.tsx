"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

type GalleryFile = {
  url: string
  thumbnailUrl: string
  name: string
  kind?: "image" | "video"
  /** R2 LastModified (ms); used for newest-first ordering from API */
  lastModified?: number
}

const PAGE_SIZE = 48
const FILTER_DEBOUNCE_MS = 250

type MediaListBody = {
  files?: GalleryFile[]
  nextContinuationToken?: string | null
  error?: string
}

export default function ImageGalleryModal({
  open,
  onClose,
  onSelect,
  folder,
}: {
  open: boolean
  onClose: () => void
  onSelect: (
    url: string,
    meta?: { kind?: "image" | "video" }
  ) => void
  folder: string
}) {
  const [files, setFiles] = useState<GalleryFile[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [appendErr, setAppendErr] = useState<string | null>(null)
  const [nextContinuationToken, setNextContinuationToken] = useState<
    string | null
  >(null)
  const [filter, setFilter] = useState("")
  const [debouncedFilter, setDebouncedFilter] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const nextCursorRef = useRef<string | null>(null)

  nextCursorRef.current = nextContinuationToken

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedFilter(filter.trim().toLowerCase())
    }, FILTER_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [filter])

  const visibleFiles = useMemo(() => {
    if (!debouncedFilter) return files
    return files.filter((f) =>
      f.name.toLowerCase().includes(debouncedFilter)
    )
  }, [files, debouncedFilter])

  const loadingRef = useRef(false)
  const loadingMoreRef = useRef(false)
  const appendInFlightRef = useRef(false)
  loadingRef.current = loading
  loadingMoreRef.current = loadingMore

  useEffect(() => {
    let cancelled = false
    async function initial() {
      setLoading(true)
      setErr(null)
      setAppendErr(null)
      setFilter("")
      setDebouncedFilter("")
      try {
        const qs = new URLSearchParams({
          folder,
          limit: String(PAGE_SIZE),
        })
        const res = await fetch(`/api/admin/media?${qs}`, {
          credentials: "include",
        })
        const body = (await res.json()) as MediaListBody
        if (cancelled) return
        if (!res.ok) {
          throw new Error(body.error ?? res.statusText)
        }
        const list = body.files ?? []
        const nextTok =
          body.nextContinuationToken === undefined ? null : body.nextContinuationToken
        setNextContinuationToken(
          typeof nextTok === "string" || nextTok === null ? nextTok : null
        )
        setFiles(list)
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : "Could not load gallery")
          setFiles([])
          setNextContinuationToken(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (!open) return undefined
    setFiles([])
    setNextContinuationToken(null)
    setErr(null)
    setAppendErr(null)
    setFilter("")
    setDebouncedFilter("")
    void initial()

    return () => {
      cancelled = true
    }
  }, [open, folder])

  const fetchNextPage = useCallback(async () => {
    const cursor = nextCursorRef.current
    if (
      cursor === null ||
      loadingRef.current ||
      loadingMoreRef.current ||
      appendInFlightRef.current
    ) {
      return
    }

    appendInFlightRef.current = true
    setLoadingMore(true)
    setAppendErr(null)
    try {
      const qs = new URLSearchParams({
        folder,
        limit: String(PAGE_SIZE),
        cursor,
      })
      const res = await fetch(`/api/admin/media?${qs}`, {
        credentials: "include",
      })
      const body = (await res.json()) as MediaListBody
      if (!res.ok) {
        throw new Error(body.error ?? res.statusText)
      }
      const list = body.files ?? []
      const nextTok =
        body.nextContinuationToken === undefined ? null : body.nextContinuationToken
      setNextContinuationToken(
        typeof nextTok === "string" || nextTok === null ? nextTok : null
      )

      setFiles((prev) => {
        const seen = new Set(prev.map((f) => `${f.url}-${f.name}`))
        const added = list.filter((f) => !seen.has(`${f.url}-${f.name}`))
        return [...prev, ...added]
      })
    } catch (e) {
      setAppendErr(e instanceof Error ? e.message : "Could not load more")
    } finally {
      appendInFlightRef.current = false
      setLoadingMore(false)
    }
  }, [folder])

  const fetchNextPageRef = useRef(fetchNextPage)
  fetchNextPageRef.current = fetchNextPage

  useEffect(() => {
    const root = scrollRef.current
    const sentinel = sentinelRef.current
    if (!open || !root || !sentinel) return undefined
    if (nextContinuationToken === null || files.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((en) => en.isIntersecting)
        if (!hit) return
        if (
          nextCursorRef.current === null ||
          loadingRef.current ||
          loadingMoreRef.current ||
          appendInFlightRef.current
        ) {
          return
        }
        void fetchNextPageRef.current()
      },
      {
        root,
        rootMargin: "160px",
        threshold: 0,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [open, folder, files.length, nextContinuationToken])

  if (!open) return null

  const showFilteredEmpty =
    !loading &&
    debouncedFilter.length > 0 &&
    visibleFiles.length === 0 &&
    files.length > 0

  const showMoreRail =
    nextContinuationToken !== null && files.length > 0 && !loading

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Media gallery"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-2 border-b border-zinc-800 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">
                Choose image or video
              </p>
              <p className="text-[11px] text-zinc-500">
                Folder:{" "}
                <code className="text-zinc-400">{folder}</code>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800"
            >
              Close
            </button>
          </div>
          <label className="block">
            <span className="sr-only">Filter by filename</span>
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by filename…"
              autoComplete="off"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </label>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4"
        >
          {loading && files.length === 0 && (
            <p className="py-12 text-center text-sm text-zinc-500">Loading…</p>
          )}
          {err && (
            <p className="mb-4 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-200">
              {err}
            </p>
          )}
          {appendErr && (
            <p className="mb-4 rounded-lg border border-amber-900/60 bg-amber-950/40 px-3 py-2 text-sm text-amber-100">
              {appendErr}
            </p>
          )}
          {!loading && !err && files.length === 0 && (
            <p className="py-12 text-center text-sm text-zinc-500">
              No images or videos in this folder yet. Use{" "}
              <strong>Upload</strong> first, then pick the file here.
            </p>
          )}
          {showFilteredEmpty && (
            <p className="mb-4 text-center text-sm text-zinc-500">
              No files match{" "}
              <span className="font-mono text-zinc-400">&quot;{debouncedFilter}&quot;</span>
              .
            </p>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {visibleFiles.map((f) => (
              <button
                key={`${f.url}-${f.name}`}
                type="button"
                onClick={() => {
                  onSelect(f.url, { kind: f.kind ?? "image" })
                  onClose()
                }}
                className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 text-left transition hover:border-primary hover:ring-1 hover:ring-primary/40"
              >
                {f.kind === "video" ? (
                  <video
                    src={f.url}
                    poster={
                      f.thumbnailUrl !== f.url ? f.thumbnailUrl : undefined
                    }
                    muted
                    playsInline
                    preload="metadata"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={f.thumbnailUrl}
                    alt={f.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="200px"
                    unoptimized
                  />
                )}
                {f.kind === "video" && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                    Video
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-[10px] text-white line-clamp-2">
                  {f.name}
                </span>
              </button>
            ))}
          </div>

          {showMoreRail && loadingMore && (
            <p className="py-6 text-center text-xs text-zinc-500">
              Loading more…
            </p>
          )}
          {showMoreRail && (
            <div ref={sentinelRef} className="h-3 w-full shrink-0" aria-hidden />
          )}

          {showMoreRail && !loadingMore && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => void fetchNextPage()}
                className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
