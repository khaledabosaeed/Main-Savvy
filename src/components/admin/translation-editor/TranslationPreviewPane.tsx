import type { LocaleTab, PreviewTarget, RobotPageEntry } from "./types"

export function TranslationPreviewPane({
  locale,
  previewTarget,
  previewEntry,
  previewPath,
  updatedAt,
  previewTick,
  onPreviewTargetChange,
  onRefreshPreview,
}: {
  locale: LocaleTab
  previewTarget: PreviewTarget
  previewEntry?: RobotPageEntry
  previewPath: string
  updatedAt: string | null
  previewTick: number
  onPreviewTargetChange: (target: PreviewTarget) => void
  onRefreshPreview: () => void
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/30 lg:border-b-0 lg:border-r">
      <div className="shrink-0 space-y-2 border-b border-zinc-800 p-2 sm:p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
          Preview
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPreviewTargetChange("home")}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition sm:text-sm ${
              previewTarget === "home"
                ? "border-primary bg-primary/20 text-white ring-1 ring-primary/40"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={onRefreshPreview}
            className="rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:text-sm"
          >
            Refresh preview
          </button>
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-500">
          Preview loads the live site from the server. Click{" "}
          <span className="font-medium text-zinc-400">Refresh</span> or save
          to see the latest published copy (unsaved edits stay in the editor
          only).
        </p>
        {previewEntry?.source === "custom" && previewEntry.status === "draft" && (
          <p className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[11px] leading-relaxed text-amber-200/90">
            This robot page is a draft, so the preview opens its admin page
            builder instead of the public site.
          </p>
        )}
      </div>
      <div className="relative min-h-0 flex-1 bg-zinc-950">
        <iframe
          key={`${previewPath}-${updatedAt ?? "init"}-${locale}-${previewTick}`}
          title="Site preview"
          src={`${previewPath}${previewPath.includes("?") ? "&" : "?"}_pv=${previewTick}&_at=${encodeURIComponent(updatedAt ?? "")}`}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  )
}
