const SEARCH_VALUE_PREVIEW_MAX = 160

function truncateForPreview(s: string, max = SEARCH_VALUE_PREVIEW_MAX): string {
  if (s.length <= max) return s
  return `${s.slice(0, max - 1)}…`
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function HighlightedSearchValue({
  text,
  query,
}: {
  text: string
  query: string
}) {
  const q = query.trim()
  const display = truncateForPreview(text)
  if (!q) {
    return <span className="break-words">{display}</span>
  }
  const re = new RegExp(`(${escapeRegExp(q)})`, "gi")
  const parts = display.split(re)
  return (
    <span className="break-words">
      {parts.map((part, idx) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={idx}
            className="rounded bg-amber-400/30 px-0.5 text-amber-200"
          >
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </span>
  )
}
