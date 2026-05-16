"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Row = {
  slug: string
  name: string
  category: string
  image: string
  status: "draft" | "published"
}

type PendingModal =
  | { kind: "delete"; row: Row }
  | { kind: "to-draft"; row: Row }
  | { kind: "to-published"; row: Row }

export default function RobotManager() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [busySlug, setBusySlug] = useState<string | null>(null)
  const [menuOpenSlug, setMenuOpenSlug] = useState<string | null>(null)
  const [pendingModal, setPendingModal] = useState<PendingModal | null>(null)
  const busySlugRef = useRef<string | null>(null)

  busySlugRef.current = busySlug

  const load = useCallback(async () => {
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch("/api/admin/robots", { credentials: "include" })
      const body = (await res.json()) as {
        robots?: Row[]
        error?: string
      }
      if (!res.ok) {
        setErr(body.error ?? res.statusText)
        setRows([])
        return
      }
      setRows(body.robots ?? [])
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load")
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    function onPointerDown(ev: MouseEvent | PointerEvent) {
      const t = ev.target as Node | null
      if (!t || !(t instanceof Element)) return
      if (
        typeof menuOpenSlug === "string" &&
        t.closest(`[data-robot-actions-root="${menuOpenSlug}"]`)
      ) {
        return
      }
      setMenuOpenSlug(null)
    }

    if (!menuOpenSlug) return undefined
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
  }, [menuOpenSlug])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return
      setMenuOpenSlug(null)
      if (!busySlugRef.current) setPendingModal(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  function toggleMenu(slug: string) {
    setMenuOpenSlug((prev) => (prev === slug ? null : slug))
  }

  function openModal(next: PendingModal) {
    setMenuOpenSlug(null)
    setPendingModal(next)
  }

  async function executeDelete(slug: string) {
    setBusySlug(slug)
    try {
      const res = await fetch(`/api/admin/robots/${encodeURIComponent(slug)}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) {
        const body = (await res.json()) as { error?: string }
        alert(body.error ?? "Delete failed")
        return
      }
      setPendingModal(null)
      void load()
    } finally {
      setBusySlug(null)
    }
  }

  async function executePatch(slug: string, intent: "to-draft" | "to-published") {
    setBusySlug(slug)
    try {
      const res = await fetch(`/api/admin/robots/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent }),
      })
      const body = (await res.json()) as { error?: string }
      if (!res.ok) {
        alert(body.error ?? res.statusText)
        return
      }
      setPendingModal(null)
      void load()
    } finally {
      setBusySlug(null)
    }
  }

  async function handleModalConfirm() {
    if (!pendingModal) return
    const { slug } = pendingModal.row
    if (pendingModal.kind === "delete") {
      await executeDelete(slug)
      return
    }
    if (pendingModal.kind === "to-draft") {
      await executePatch(slug, "to-draft")
      return
    }
    await executePatch(slug, "to-published")
  }

  function closeModal() {
    if (busySlug !== null) return
    setPendingModal(null)
  }

  const menuDisabled = busySlug !== null

  const modalConfirmLabel =
    pendingModal?.kind === "delete"
      ? "Delete"
      : pendingModal?.kind === "to-draft"
        ? "Move to draft"
        : pendingModal?.kind === "to-published"
          ? "Publish"
          : "Confirm"

  const modalDanger = pendingModal?.kind === "delete"

  const modalBusy =
    pendingModal !== null && busySlug === pendingModal.row.slug

  const modalCopy =
    pendingModal?.kind === "delete"
      ? {
          title: "Delete robot page",
          description: `Remove “${pendingModal.row.name}” (${pendingModal.row.slug})? This cannot be undone.`,
        }
      : pendingModal?.kind === "to-draft"
        ? {
            title: "Move to draft",
            description: `“${pendingModal.row.name}” (${pendingModal.row.slug}) will be removed from the live site until you publish it again.`,
          }
        : pendingModal?.kind === "to-published"
          ? {
              title: "Publish robot page",
              description: `Make “${pendingModal.row.name}” (${pendingModal.row.slug}) live for visitors?`,
            }
          : null

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
      {pendingModal && modalCopy !== null ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="robot-action-modal-title"
          aria-describedby="robot-action-modal-desc"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div
            className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-950 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="robot-action-modal-title"
              className="text-base font-semibold text-zinc-100"
            >
              {modalCopy.title}
            </h2>
            <p id="robot-action-modal-desc" className="mt-2 text-sm text-zinc-400">
              {modalCopy.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled={modalBusy}
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-40"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={modalBusy}
                className={`rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-50 ${modalDanger
                  ? "bg-red-600 shadow-red-600/20 hover:bg-red-500"
                  : "bg-primary shadow-primary/20 hover:bg-primary/90"
                }`}
                onClick={() => void handleModalConfirm()}
              >
                {modalBusy ? "Working…" : modalConfirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Admin
          </Link>
          <h1 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Robot pages
          </h1>
        </div>
        <Link
          href="/admin/robots/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20"
        >
          New robot page
        </Link>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
        {loading ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : null}
        {err ? (
          <p className="text-sm text-red-300">{err}</p>
        ) : null}
        {!loading && !err && rows.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No custom robot pages yet. Create one to store data in Supabase and
            images on Cloudflare R2.
          </p>
        ) : null}
        {!loading && rows.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-900/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-zinc-400">Image</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Name</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Slug</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Status</th>
                  <th
                    className="w-28 px-2 py-3 text-center text-sm font-medium text-zinc-400"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.slug}
                    className="border-b border-zinc-800/80 hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-zinc-800">
                        {r.image ? (
                          <Image
                            src={r.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-[10px] text-zinc-600">
                            —
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-100">{r.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-primary">
                      {r.slug}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{r.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${r.status === "draft"
                          ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25"
                          : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
                          }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="relative px-2 py-3 text-center">
                      <div
                        data-robot-actions-root={r.slug}
                        className="relative inline-flex justify-center align-middle"
                      >
                        <button
                          type="button"
                          className={`flex size-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 ${menuOpenSlug === r.slug ? "bg-zinc-800 text-white" : ""
                            }`}
                          aria-expanded={menuOpenSlug === r.slug}
                          aria-haspopup="menu"
                          aria-label={`More actions for ${r.name}`}
                          disabled={menuDisabled}
                          title="More actions"
                          onClick={() => toggleMenu(r.slug)}
                        >
                          <span
                            className="flex flex-col items-center gap-[3px]"
                            aria-hidden
                          >
                            <span className="size-[3px] rounded-full bg-current" />
                            <span className="size-[3px] rounded-full bg-current" />
                            <span className="size-[3px] rounded-full bg-current" />
                          </span>
                        </button>

                        {menuOpenSlug === r.slug ? (
                          <ul
                            role="menu"
                            className="absolute right-0 top-full z-[60] mt-1 min-w-[10.5rem] list-none rounded-lg border border-zinc-700 bg-zinc-950 py-1 shadow-xl"
                          >
                            <li role="none">
                              <Link
                                role="menuitem"
                                href={`/admin/robots/${encodeURIComponent(r.slug)}/edit`}
                                className="block px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
                                onClick={() => setMenuOpenSlug(null)}
                              >
                                Edit
                              </Link>
                            </li>
                            <li role="none">
                              {r.status === "published" ? (
                                <button
                                  type="button"
                                  role="menuitem"
                                  className="w-full px-3 py-2 text-left text-sm text-amber-200 hover:bg-zinc-800"
                                  onClick={() =>
                                    openModal({ kind: "to-draft", row: r })
                                  }
                                >
                                  Move to draft
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  role="menuitem"
                                  className="w-full px-3 py-2 text-left text-sm text-emerald-200 hover:bg-zinc-800"
                                  onClick={() =>
                                    openModal({ kind: "to-published", row: r })
                                  }
                                >
                                  Publish
                                </button>
                              )}
                            </li>
                            <li role="none">
                              <button
                                type="button"
                                role="menuitem"
                                className="w-full px-3 py-2 text-left text-sm text-red-300 hover:bg-zinc-800"
                                onClick={() =>
                                  openModal({ kind: "delete", row: r })
                                }
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  )
}
