"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import RobotPageBuilder from "@/components/admin/RobotPageBuilder"
import type {
  CustomPagePublishStatus,
  RobotCustomPagePayload,
} from "@/lib/robots-custom-page"

export default function AdminEditRobotPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""
  const [en, setEn] = useState<RobotCustomPagePayload | null>(null)
  const [ar, setAr] = useState<RobotCustomPagePayload | null>(null)
  const [publishingStatus, setPublishingStatus] =
    useState<CustomPagePublishStatus>("published")
  const [err, setErr] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!slug) return
    setErr(null)
    try {
      const res = await fetch(
        `/api/admin/robots/${encodeURIComponent(slug)}`,
        { credentials: "include" }
      )
      const body = (await res.json()) as {
        en?: RobotCustomPagePayload | null
        ar?: RobotCustomPagePayload | null
        publishingStatus?: CustomPagePublishStatus
        error?: string
      }
      if (!res.ok) {
        setErr(body.error ?? res.statusText)
        setEn(null)
        setAr(null)
        setPublishingStatus("published")
        return
      }
      setEn(body.en ?? null)
      setAr(body.ar ?? null)
      setPublishingStatus(body.publishingStatus ?? "published")
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load")
      setEn(null)
      setAr(null)
      setPublishingStatus("published")
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  if (!slug) {
    return <p className="p-6 text-sm text-red-300">Invalid slug.</p>
  }

  if (err) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-300">{err}</p>
      </div>
    )
  }

  if (!en || !ar) {
    return (
      <div className="flex h-dvh items-center justify-center text-sm text-zinc-500">
        Loading…
      </div>
    )
  }

  return (
    <RobotPageBuilder
      mode="edit"
      initialSlug={slug}
      initialEn={en.sections}
      initialAr={ar.sections}
      initialPublishingStatus={publishingStatus}
    />
  )
}
