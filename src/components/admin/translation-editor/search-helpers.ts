import { isPlainObject } from "./json-helpers"
import type { SearchMatch } from "./types"

export function valueContainsText(value: unknown, qLower: string): boolean {
  if (!qLower) return true
  const walk = (v: unknown): boolean => {
    if (v === null || v === undefined) return false
    if (typeof v === "string") return v.toLowerCase().includes(qLower)
    if (typeof v === "number" || typeof v === "boolean") {
      return String(v).toLowerCase().includes(qLower)
    }
    if (Array.isArray(v)) return v.some(walk)
    if (typeof v === "object") {
      return Object.values(v as Record<string, unknown>).some(walk)
    }
    return false
  }
  return walk(value)
}

export function collectMatches(
  section: string,
  value: unknown,
  qLower: string
): SearchMatch[] {
  const results: SearchMatch[] = []
  const walk = (v: unknown, path: string) => {
    if (v === null || v === undefined) return
    if (typeof v === "string") {
      if (v.toLowerCase().includes(qLower)) {
        results.push({ section, path, value: v })
      }
      return
    }
    if (typeof v === "number" || typeof v === "boolean") {
      const s = String(v)
      if (s.toLowerCase().includes(qLower)) {
        results.push({ section, path, value: s })
      }
      return
    }
    if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, `${path}[${i}]`))
      return
    }
    if (isPlainObject(v)) {
      for (const [k, child] of Object.entries(v)) {
        walk(child, `${path}.${k}`)
      }
    }
  }
  walk(value, section)
  return results
}
