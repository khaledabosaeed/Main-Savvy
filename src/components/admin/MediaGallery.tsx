"use client"

import {
  ImageKitProvider,
  Image as IKImage,
  Video as IKVideo,
  upload,
} from "@imagekit/next"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

type FilterTab = "all" | "image" | "video"

type GalleryFile = {
  fileId: string
  name: string
  filePath: string
  url: string
  thumbnailUrl: string | null
  mime: string | null
  fileType: string | null
  width?: number
  height?: number
  size?: number
}

function isVideoAsset(mime: string | null, url: string): boolean {
  if (mime?.startsWith("video/")) return true
  return /\.(mp4|webm|mov|m4v|mkv|ogg)(\?|$)/i.test(url)
}

function isImageAsset(mime: string | null, fileType: string | null): boolean {
  if (mime?.startsWith("image/")) return true
  if (fileType === "image") return true
  return false
}

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? ""

export default function MediaGallery() {
  const [filter, setFilter] = useState<FilterTab>("all")
  const [files, setFiles] = useState<GalleryFile[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const loadFiles = useCallback(async () => {
    setListError(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/imagekit/files?type=${filter}`, {
        credentials: "same-origin",
      })
      const data = await res.json()
      if (!res.ok) {
        setListError(typeof data?.error === "string" ? data.error : "Failed to load media")
        setFiles([])
        return
      }
      const list = Array.isArray(data?.files) ? data.files : []
      setFiles(list as GalleryFile[])
    } catch {
      setListError("Network error loading media")
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    void loadFiles()
  }, [loadFiles])

  async function uploadFiles(fileList: FileList | File[]) {
    const arr = Array.from(fileList)
    if (!arr.length) return

    setUploadError(null)
    setUploading(true)
    setUploadPct(0)

    try {
      const authRes = await fetch("/api/imagekit/auth", {
        credentials: "same-origin",
      })
      const authJson = await authRes.json()
      if (!authRes.ok) {
        throw new Error(
          typeof authJson?.error === "string" ? authJson.error : "Upload auth failed"
        )
      }

      let token: string = authJson.token
      let expire: number = authJson.expire
      let signature: string = authJson.signature
      let publicKey: string = authJson.publicKey

      const total = arr.length
      for (let i = 0; i < arr.length; i++) {
        const file = arr[i]
        const safeName = file.name.replace(/[^\w.\-]/g, "_")

        await upload({
          file,
          fileName: safeName,
          token,
          expire,
          signature,
          publicKey,
          useUniqueFileName: true,
          folder: "/admin-uploads",
          onProgress: (ev) => {
            if (!ev.lengthComputable) return
            const filePart = ev.loaded / Math.max(ev.total, 1)
            const overall = ((i + filePart) / total) * 100
            setUploadPct(Math.round(overall))
          },
        })

        // Fresh signature per file (unique token per upload request)
        if (i < arr.length - 1) {
          const nextAuth = await fetch("/api/imagekit/auth", {
            credentials: "same-origin",
          })
          const nextJson = await nextAuth.json()
          if (!nextAuth.ok) {
            throw new Error(
              typeof nextJson?.error === "string"
                ? nextJson.error
                : "Upload auth failed"
            )
          }
          token = nextJson.token
          expire = nextJson.expire
          signature = nextJson.signature
          publicKey = nextJson.publicKey
        }
      }

      setUploadPct(100)
      await loadFiles()
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed"
      setUploadError(msg)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadPct(null), 800)
    }
  }

  async function copyUrl(url: string, id: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      setUploadError("Could not copy to clipboard")
    }
  }

  if (!urlEndpoint) {
    return (
      <div className="rounded-lg border border-amber-900/60 bg-amber-950/40 p-4 text-amber-200">
        <p className="font-medium">Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT</p>
        <p className="mt-1 text-sm text-amber-200/80">
          Add it to your environment to use the media gallery.
        </p>
      </div>
    )
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="text-sm text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
              >
                ← Admin
              </Link>
              <h1 className="text-xl font-semibold text-zinc-50">Media library</h1>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              ImageKit images & videos. Upload requires an admin session.
            </p>
          </div>

          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-0.5">
            {(
              [
                ["all", "All"],
                ["image", "Images"],
                ["video", "Videos"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`relative rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver
              ? "border-emerald-500/70 bg-emerald-950/20"
              : "border-zinc-700 bg-zinc-900/40"
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            void uploadFiles(e.dataTransfer.files)
          }}
        >
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={uploading}
            onChange={(e) => {
              const fl = e.target.files
              if (fl) void uploadFiles(fl)
              e.target.value = ""
            }}
          />
          <p className="text-zinc-200">
            Drop images or videos here, or{" "}
            <span className="font-medium text-emerald-400">browse</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Signed uploads go to folder{" "}
            <code className="rounded bg-zinc-800 px-1 py-0.5">/admin-uploads</code>
          </p>
          {uploading && uploadPct !== null && (
            <div className="mx-auto mt-4 max-w-md">
              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-emerald-500 transition-all duration-200"
                  style={{ width: `${uploadPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-400">{uploadPct}%</p>
            </div>
          )}
          {uploadError && (
            <p className="mt-4 text-sm text-red-400">{uploadError}</p>
          )}
        </div>

        {listError && (
          <p className="text-sm text-red-400">{listError}</p>
        )}

        {loading ? (
          <p className="text-sm text-zinc-500">Loading media…</p>
        ) : files.length === 0 ? (
          <p className="text-sm text-zinc-500">No files match this filter.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {files.map((f) => {
              const video = isVideoAsset(f.mime, f.url)
              const image =
                isImageAsset(f.mime, f.fileType) && !video
              const w = f.width && f.width > 0 ? f.width : 400
              const h = f.height && f.height > 0 ? f.height : 300

              return (
                <li
                  key={f.fileId}
                  className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60"
                >
                  <div className="relative aspect-video bg-black">
                    {video ? (
                      <IKVideo
                        src={f.filePath}
                        controls
                        playsInline
                        className="h-full w-full object-contain"
                        poster={f.thumbnailUrl ?? undefined}
                      />
                    ) : image ? (
                      <IKImage
                        src={f.filePath}
                        alt={f.name}
                        width={w}
                        height={h}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-zinc-500">
                        Preview not available
                        <br />
                        <span className="mt-1 text-xs break-all">{f.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <p
                      className="truncate text-sm font-medium text-zinc-200"
                      title={f.name}
                    >
                      {f.name}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyUrl(f.url, f.fileId)}
                        className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-100 hover:bg-zinc-700"
                      >
                        {copiedId === f.fileId ? "Copied!" : "Copy URL"}
                      </button>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </ImageKitProvider>
  )
}
