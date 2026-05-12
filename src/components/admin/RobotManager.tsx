"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Row = {
  slug: string
  name: string
  category: string
  image: string
  status: "draft" | "published"
}

export default function RobotManager() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

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

  async function remove(slug: string) {
    if (!window.confirm(`Delete robot page “${slug}”? This cannot be undone.`)) {
      return
    }
    const res = await fetch(`/api/admin/robots/${encodeURIComponent(slug)}`, {
      method: "DELETE",
      credentials: "include",
    })
    if (!res.ok) {
      const body = (await res.json()) as { error?: string }
      alert(body.error ?? "Delete failed")
      return
    }
    void load()
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
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
        {loading && (
          <p className="text-sm text-zinc-500">Loading…</p>
        )}
        {err && (
          <p className="text-sm text-red-300">{err}</p>
        )}
        {!loading && !err && rows.length === 0 && (
          <p className="text-sm text-zinc-500">
            No custom robot pages yet. Create one to store data in Supabase and
            images on Cloudflare R2.
          </p>
        )}
        {!loading && rows.length > 0 && (
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
                  <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
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
                        className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                          r.status === "draft"
                            ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25"
                            : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/robots/${encodeURIComponent(r.slug)}/edit`}
                          className="rounded border border-zinc-600 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="rounded border border-red-900/50 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40"
                          onClick={() => void remove(r.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
