import type { JsonValue } from "./types"

export function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

export function formatPathDisplay(path: string): string {
  return path.replace(/\./g, " → ")
}

export function deepEqualJson(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

export function findFieldElementByPath(path: string): HTMLElement | null {
  if (typeof document === "undefined") return null
  const el = document.getElementById(path)
  if (el) return el
  try {
    if (typeof CSS !== "undefined" && "escape" in CSS) {
      const byCss = document.querySelector(`#${CSS.escape(path)}`)
      if (byCss instanceof HTMLElement) return byCss
    }
  } catch {
    /* ignore */
  }
  const escAttr = path.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
  const byAttr = document.querySelector(`[id="${escAttr}"]`)
  if (byAttr instanceof HTMLElement) return byAttr
  const prefix = `${path}.`
  for (const node of document.querySelectorAll<HTMLElement>("[id]")) {
    if (node.id === path || node.id.startsWith(prefix)) return node
  }
  return null
}
