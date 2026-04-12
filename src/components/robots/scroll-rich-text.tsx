import type { ReactNode } from "react"

/**
 * Renders `**segments**` as bold white on a muted gray base (Apple-style spec callouts).
 */
export function parseScrollHighlights(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index))
    }
    nodes.push(
      <span key={key++} className="font-bold text-white">
        {m[1]}
      </span>
    )
    last = m.index + m[0].length
  }
  if (last < text.length) {
    nodes.push(text.slice(last))
  }
  return nodes
}

export function hasScrollHighlights(text: string): boolean {
  return /\*\*[^*]+\*\*/.test(text)
}
