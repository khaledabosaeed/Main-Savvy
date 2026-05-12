"use client"

import { useCallback, useId, useMemo, useRef, useState } from "react"
import ImageGalleryModal from "@/components/admin/ImageGalleryModal"
import {
  isLikelyDirectVideoFileUrl,
  resolveVideoUrl,
} from "@/lib/video-embed"

export type ImageUploadFieldProps = {
  label: string
  value: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  folder = "/robots",
}: ImageUploadFieldProps) {
  const inputId = useId()
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  /** From gallery pick or file upload — avoids guessing R2 URLs without extensions */
  const [previewHint, setPreviewHint] = useState<"image" | "video" | null>(
    null
  )

  const preview = useMemo(() => {
    const v = value.trim()
    if (!v) return { type: "none" as const }

    if (previewHint === "video") return { type: "video" as const }
    if (previewHint === "image") return { type: "image" as const }

    const embed = resolveVideoUrl(v, { embedMinimal: false })
    if (embed?.kind === "youtube" || embed?.kind === "vimeo") {
      return {
        type: "embed" as const,
        embedSrc: embed.embedSrc,
      }
    }

    if (embed?.kind === "direct" && isLikelyDirectVideoFileUrl(v)) {
      return { type: "video" as const }
    }

    return { type: "image" as const }
  }, [value, previewHint])

  const upload = useCallback(
    async (file: File) => {
      setErr(null)
      setBusy(true)
      try {
        /** Direct upload to R2 — avoids Vercel 413 when the file exceeds ~4.5 MB serverless body limit. */
        const targetRes = await fetch("/api/admin/r2-upload-url", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name || "upload",
            contentType: file.type || "application/octet-stream",
            folder,
          }),
        })
        const targetBody = (await targetRes.json()) as {
          uploadUrl?: string
          publicUrl?: string
          method?: "PUT"
          error?: string
        }
        if (!targetRes.ok) {
          throw new Error(targetBody.error ?? targetRes.statusText)
        }
        if (!targetBody.uploadUrl || !targetBody.publicUrl) {
          throw new Error("Invalid R2 upload response")
        }

        const res = await fetch(targetBody.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        })
        if (!res.ok) {
          throw new Error(`Cloudflare R2 upload failed (${res.status})`)
        }
        setPreviewHint(file.type.startsWith("video") ? "video" : "image")
        onChange(targetBody.publicUrl)
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Upload failed")
      } finally {
        setBusy(false)
      }
    },
    [folder, onChange]
  )

  const handleUrlChange = useCallback(
    (next: string) => {
      setPreviewHint(null)
      onChange(next)
    },
    [onChange]
  )

  return (
    <div className="min-w-0 space-y-2">
      <label
        htmlFor={inputId}
        className="block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="url"
        value={value}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder="Paste image or video URL or use buttons below…"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-100 outline-none focus:border-primary"
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            e.target.value = ""
            if (f) void upload(f)
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 rounded-lg border border-primary/60 bg-primary/15 px-4 py-2 text-xs font-semibold text-white hover:bg-primary/25 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Upload image or video"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => setGalleryOpen(true)}
          className="shrink-0 rounded-lg border border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
        >
          Gallery
        </button>
      </div>
      <p className="text-[10px] leading-snug text-zinc-600">
        Upload goes straight to Cloudflare R2 (large images and videos supported).
        Gallery lists images and videos in{" "}
        <code className="rounded bg-zinc-900 px-1">{folder}</code>.
      </p>
      {err && <p className="text-xs text-red-300">{err}</p>}
      {preview.type !== "none" && (
        <div className="mt-2 max-w-xs">
          {preview.type === "embed" && (
            <iframe
              title="Video preview"
              src={preview.embedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-lg border border-zinc-700"
            />
          )}
          {preview.type === "video" && (
            <video
              src={value.trim()}
              controls
              playsInline
              className="h-auto max-h-48 w-full rounded-lg border border-zinc-700 bg-black object-contain"
            />
          )}
          {preview.type === "image" && (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary URLs from paste/upload/gallery
            <img
              src={value.trim()}
              alt=""
              className="h-28 w-full rounded-lg border border-zinc-700 object-contain"
            />
          )}
        </div>
      )}
      <ImageGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        folder={folder}
        onSelect={(url, meta) => {
          setPreviewHint(meta?.kind === "video" ? "video" : "image")
          onChange(url)
          setErr(null)
        }}
      />
    </div>
  )
}
