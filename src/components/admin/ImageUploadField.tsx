"use client"

import { useCallback, useId, useRef, useState } from "react"
import ImageGalleryModal from "@/components/admin/ImageGalleryModal"

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

  const upload = useCallback(
    async (file: File) => {
      setErr(null)
      setBusy(true)
      try {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("folder", folder)
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
          credentials: "include",
        })
        const body = (await res.json()) as { url?: string; error?: string }
        if (!res.ok) {
          throw new Error(body.error ?? res.statusText)
        }
        if (!body.url) throw new Error("No URL returned")
        onChange(body.url)
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Upload failed")
      } finally {
        setBusy(false)
      }
    },
    [folder, onChange]
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
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste image URL or use buttons below…"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-100 outline-none focus:border-primary"
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
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
          {busy ? "Uploading…" : "Upload file"}
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
        Upload sends the image to ImageKit. Gallery lists existing images in{" "}
        <code className="rounded bg-zinc-900 px-1">{folder}</code>.
      </p>
      {err && <p className="text-xs text-red-300">{err}</p>}
      {value.trim() !== "" && (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary URLs from paste/upload/gallery
        <img
          src={value}
          alt=""
          className="mt-2 h-28 w-full max-w-xs rounded-lg border border-zinc-700 object-contain"
        />
      )}
      <ImageGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        folder={folder}
        onSelect={(url) => {
          onChange(url)
          setErr(null)
        }}
      />
    </div>
  )
}
