"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"

type GalleryFile = {
  url: string
  thumbnailUrl: string
  name: string
  kind?: "image" | "video"
}

const PAGE_SIZE = 48

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
  const [err, setErr] = useState<string | null>(null)
  const [mayHaveMore, setMayHaveMore] = useState(false)
  const filesRef = useRef<GalleryFile[]>([])

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => {
    if (!open) return
    setFiles([])
    setMayHaveMore(false)
    setErr(null)
    let cancelled = false
    async function initial() {
      setLoading(true)
      try {
        const qs = new URLSearchParams({
          folder,
          limit: String(PAGE_SIZE),
          skip: "0",
        })
        const res = await fetch(`/api/admin/media?${qs}`, {
          credentials: "include",
        })
        const body = (await res.json()) as {
          files?: GalleryFile[]
          error?: string
        }
        if (cancelled) return
        if (!res.ok) {
          throw new Error(body.error ?? res.statusText)
        }
        const list = body.files ?? []
        setMayHaveMore(list.length >= PAGE_SIZE)
        setFiles(list)
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : "Could not load gallery")
          setFiles([])
          setMayHaveMore(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void initial()
    return () => {
      cancelled = true
    }
  }, [open, folder])

  const loadMore = useCallback(async () => {
    setLoading(true)
    setErr(null)
    const skip = filesRef.current.length
    try {
      const qs = new URLSearchParams({
        folder,
        limit: String(PAGE_SIZE),
        skip: String(skip),
      })
      const res = await fetch(`/api/admin/media?${qs}`, {
        credentials: "include",
      })
      const body = (await res.json()) as {
        files?: GalleryFile[]
        error?: string
      }
      if (!res.ok) {
        throw new Error(body.error ?? res.statusText)
      }
      const list = body.files ?? []
      setMayHaveMore(list.length >= PAGE_SIZE)
      setFiles((prev) => [...prev, ...list])
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not load more")
    } finally {
      setLoading(false)
    }
  }, [folder])

  if (!open) return null

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
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Choose image or video</p>
            <p className="text-[11px] text-zinc-500">
              Folder: <code className="text-zinc-400">{folder}</code>
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

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          {loading && files.length === 0 && (
            <p className="py-12 text-center text-sm text-zinc-500">Loading…</p>
          )}
          {err && (
            <p className="mb-4 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-200">
              {err}
            </p>
          )}
          {!loading && !err && files.length === 0 && (
            <p className="py-12 text-center text-sm text-zinc-500">
              No images or videos in this folder yet. Use <strong>Upload</strong>{" "}
              first, then pick the file here.
            </p>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {files.map((f) => (
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
          {mayHaveMore && files.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => void loadMore()}
                className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
