import { Search } from "lucide-react"
import type { RefObject } from "react"
import { HighlightedSearchValue } from "./HighlightedSearchValue"
import { formatPathDisplay } from "./json-helpers"
import { GROUP_LABELS, GROUP_ORDER } from "./section-groups"
import type {
  GroupId,
  LocaleTab,
  PreviewTarget,
  RobotPageEntry,
  RobotSidebarPage,
  SearchMatch,
} from "./types"

export function TranslationSidebar({
  sectionNavRef,
  loading,
  locale,
  search,
  searchMatches,
  topLevelKeys,
  filteredKeys,
  grouped,
  activeSection,
  robotPageFocus,
  robotPageEntries,
  updatedAt,
  isSectionDirty,
  onLocaleChange,
  onSearchChange,
  onActiveSectionChange,
  onRobotPageFocusChange,
  onPreviewTargetChange,
  onScrollToFieldPathChange,
}: {
  sectionNavRef: RefObject<HTMLElement | null>
  loading: boolean
  locale: LocaleTab
  search: string
  searchMatches: SearchMatch[] | null
  topLevelKeys: string[]
  filteredKeys: string[]
  grouped: Map<GroupId, string[]>
  activeSection: string | null
  robotPageFocus: RobotSidebarPage | null
  robotPageEntries: RobotPageEntry[]
  updatedAt: string | null
  isSectionDirty: (section: string) => boolean
  onLocaleChange: (locale: LocaleTab) => void
  onSearchChange: (search: string) => void
  onActiveSectionChange: (section: string | null) => void
  onRobotPageFocusChange: (page: RobotSidebarPage | null) => void
  onPreviewTargetChange: (target: PreviewTarget) => void
  onScrollToFieldPathChange: (path: string) => void
}) {
  const hasSearch = Boolean(search.trim())

  return (
    <aside className="flex max-h-[40vh] w-full min-h-0 shrink-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/40 md:h-full md:max-h-none md:w-72 md:shrink-0 md:border-r">
      <div className="border-b border-zinc-800 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Language
        </p>
        <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
          {(["en", "ar"] as const).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => onLocaleChange(loc)}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                locale === loc
                  ? "bg-primary text-white shadow"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-zinc-800 p-3">
        <label
          htmlFor="section-search-sidebar"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Search (name or text)
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            aria-hidden
          />
          <input
            id="section-search-sidebar"
            type="search"
            placeholder="Section name or text inside…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      <nav
        ref={sectionNavRef}
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-2 pb-4"
      >
        {loading && (
          <p className="px-2 py-4 text-sm text-zinc-500">Loading…</p>
        )}
        {!loading && !hasSearch && (
          <div className="mb-4 border-b border-zinc-800 pb-3">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Robot pages
            </p>
            <ul className="space-y-1">
              {robotPageEntries.map((entry) => {
                const pageSelected =
                  activeSection === "robots" && robotPageFocus === entry.target
                return (
                  <li key={entry.target}>
                    <button
                      type="button"
                      onClick={() => {
                        onPreviewTargetChange(entry.target)
                        onRobotPageFocusChange(entry.target)
                        onActiveSectionChange("robots")
                      }}
                      className={`flex w-full flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                        pageSelected
                          ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate font-semibold leading-tight">
                          {entry.title}
                        </span>
                        {entry.source === "custom" && (
                          <span
                            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                              entry.status === "draft"
                                ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25"
                                : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
                            }`}
                          >
                            {entry.status}
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] font-normal leading-snug text-zinc-500">
                        {entry.description}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {!loading && hasSearch && searchMatches && (
          <>
            {searchMatches.length === 0 && (
              <p className="px-2 py-4 text-sm text-amber-200/90">
                No matches for “{search.trim()}”.
              </p>
            )}
            {searchMatches.length > 0 && (
              <div className="mb-2 px-2">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  Matches ({searchMatches.length})
                </p>
                <ul className="space-y-1">
                  {searchMatches.map((m, i) => {
                    const isActive = activeSection === m.section
                    return (
                      <li key={`${m.section}-${m.path}-${i}`}>
                        <button
                          type="button"
                          data-section={m.section}
                          onClick={() => onScrollToFieldPathChange(m.path)}
                          className={`flex w-full flex-col gap-1 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                            isActive
                              ? "bg-primary/20 ring-1 ring-primary/40"
                              : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                              {m.section}
                            </span>
                            <span className="min-w-0 truncate font-mono text-[11px] text-zinc-500">
                              {formatPathDisplay(m.path)}
                            </span>
                          </div>
                          <div className="text-xs leading-snug text-zinc-200">
                            <HighlightedSearchValue text={m.value} query={search} />
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </>
        )}
        {!loading &&
          !hasSearch &&
          topLevelKeys.length > 0 &&
          filteredKeys.length === 0 && (
            <p className="px-2 py-4 text-sm text-amber-200/90">
              No section name or text matches “{search.trim()}”.
            </p>
          )}
        {!loading &&
          !hasSearch &&
          GROUP_ORDER.map((gid) => {
            const keys = grouped.get(gid) ?? []
            if (keys.length === 0) return null
            return (
              <div key={gid} className="mb-4">
                <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  {GROUP_LABELS[gid]}
                </p>
                <ul className="space-y-0.5">
                  {keys.map((key) => {
                    const isActive = activeSection === key
                    const unsaved = isSectionDirty(key)
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          data-section={key}
                          onClick={() => {
                            onActiveSectionChange(key)
                            onRobotPageFocusChange(null)
                            if (key === "robots") {
                              onPreviewTargetChange("robots")
                            }
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                            isActive
                              ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              unsaved ? "bg-amber-400" : "bg-transparent"
                            }`}
                            title={unsaved ? "Unsaved changes" : undefined}
                            aria-hidden
                          />
                          <span className="truncate font-mono text-[13px]">
                            {key}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </nav>
      {updatedAt && (
        <p className="shrink-0 border-t border-zinc-800 px-3 py-2 text-[10px] leading-relaxed text-zinc-600">
          Locale last saved: {new Date(updatedAt).toLocaleString()}
        </p>
      )}
    </aside>
  )
}
