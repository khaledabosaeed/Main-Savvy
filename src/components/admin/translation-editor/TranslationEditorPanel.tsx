import type { RefObject } from "react"
import { isPlainObject } from "./json-helpers"
import { applyRobotsRobotPageEdit } from "./robot-helpers"
import type { JsonValue, RobotPageEntry, RobotSidebarPage, ToastState } from "./types"
import { ValueField } from "./ValueField"

export function TranslationEditorPanel({
  editorScrollRef,
  loading,
  content,
  activeSection,
  robotPageFocus,
  selectedRobotEntry,
  robotsScopedSlice,
  dirty,
  topLevelKeys,
  toast,
  error,
  onContentChange,
}: {
  editorScrollRef: RefObject<HTMLDivElement | null>
  loading: boolean
  content: Record<string, JsonValue> | null
  activeSection: string | null
  robotPageFocus: RobotSidebarPage | null
  selectedRobotEntry?: RobotPageEntry
  robotsScopedSlice: Record<string, JsonValue> | null
  dirty: boolean
  topLevelKeys: string[]
  toast: ToastState
  error: string | null
  onContentChange: (content: Record<string, JsonValue> | null) => void
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-zinc-950 md:h-full">
      {toast && (
        <div
          className={`mx-4 mt-4 shrink-0 rounded-lg border px-4 py-3 text-sm md:mx-6 ${
            toast.type === "ok"
              ? "border-emerald-900/60 bg-emerald-950/50 text-emerald-100"
              : "border-red-900/60 bg-red-950/50 text-red-100"
          }`}
        >
          {toast.text}
        </div>
      )}
      {error && (
        <div className="mx-4 mt-4 shrink-0 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200 md:mx-6">
          {error}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col">
        {!loading && content && activeSection && (
          <>
            <div
              ref={editorScrollRef}
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 py-4 md:px-6"
            >
              <div className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center gap-2 border-b border-zinc-800/90 bg-zinc-950 px-4 py-3 md:-mx-6 md:px-6">
                <span className="rounded-md bg-zinc-800 px-2 py-1 font-mono text-sm text-primary">
                  {activeSection}
                </span>
                {activeSection === "robots" && robotPageFocus !== null && (
                  <span className="text-sm text-zinc-400">
                    · {selectedRobotEntry?.title ?? robotPageFocus}
                    {selectedRobotEntry?.source === "custom" &&
                      selectedRobotEntry.status && (
                        <span
                          className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            selectedRobotEntry.status === "draft"
                              ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25"
                              : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
                          }`}
                        >
                          {selectedRobotEntry.status}
                        </span>
                      )}
                  </span>
                )}
                {dirty && (
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                    Unsaved
                  </span>
                )}
              </div>
              {activeSection === "robots" && robotPageFocus !== null ? (
                <>
                  {robotsScopedSlice &&
                    Object.keys(robotsScopedSlice).length === 0 && (
                      <p className="mb-4 text-sm text-amber-200/90">
                        No robot-specific blocks found in locale data for this
                        page yet (check{" "}
                        <code className="rounded bg-zinc-800 px-1 text-xs">
                          hero
                        </code>
                        ,{" "}
                        <code className="rounded bg-zinc-800 px-1 text-xs">
                          product
                        </code>
                        , etc.).
                      </p>
                    )}
                  <ValueField
                    path="robots"
                    value={robotsScopedSlice ?? {}}
                    depth={0}
                    onChange={(next) => {
                      onContentChange(
                        (() => {
                          if (!content || !isPlainObject(content.robots)) return content
                          const full = content.robots as Record<string, JsonValue>
                          const updated = applyRobotsRobotPageEdit(
                            full,
                            robotPageFocus,
                            next as Record<string, JsonValue>
                          )
                          return { ...content, robots: updated }
                        })()
                      )
                    }}
                  />
                </>
              ) : (
                <ValueField
                  path={activeSection}
                  value={content[activeSection]}
                  depth={0}
                  onChange={(next) => {
                    onContentChange({ ...content, [activeSection]: next })
                  }}
                />
              )}
            </div>
            {dirty && (
              <p className="border-t border-zinc-800/80 px-4 py-3 text-xs text-zinc-500 md:px-6">
                Use <strong className="text-zinc-400">Save</strong> in the top bar
                to publish this section to the live site.
              </p>
            )}
          </>
        )}

        {!loading && content && !activeSection && topLevelKeys.length === 0 && (
          <p className="p-6 text-sm text-zinc-500">No translation data.</p>
        )}
      </div>
    </div>
  )
}
