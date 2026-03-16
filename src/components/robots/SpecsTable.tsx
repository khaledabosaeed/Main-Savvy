"use client"

import type { Language } from "@/lib/robots-locale"
import { getRobotSpecsContent } from "@/lib/robots-locale"

export interface SpecsTableProps {
  slug: "g1" | "h1" | "go2" | "r1"
  lang: Language
  /** When true, show only one value column (single product). When false, show comparison columns. */
  singleColumn?: boolean
  /** When singleColumn, which value index to show. Default 0. Use 1 for G1 EDU when comparing G1 vs G1 EDU. */
  valueColumnIndex?: number
}

export default function SpecsTable({
  slug,
  lang,
  singleColumn = false,
  valueColumnIndex = 0,
}: SpecsTableProps) {
  const content = getRobotSpecsContent(slug, lang)
  if (!content) return null

  const isRTL = lang === "ar"

  const firstColLabel = content.specLabel

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="space-y-6">
      <div className="h-1 w-full rounded-t-xl bg-gradient-to-r from-violet-500 to-blue-500" />
      <div className="space-y-6 pt-2">
      {content.sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="overflow-hidden rounded-xl bg-neutral-900"
        >
          {/* Section label - vertical block header */}
          <div className="border-b border-neutral-700 bg-neutral-800/80 px-5 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300/90">
              {section.label}
            </h3>
          </div>
          {/* Table for this section */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th
                    className={`h-12 px-5 py-3 text-sm font-semibold text-white ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {singleColumn ? content.specLabel : firstColLabel}
                  </th>
                  {singleColumn ? (
                    <th
                      className={`h-12 px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {content.columnHeaders?.[valueColumnIndex] ?? content.valueLabel}
                    </th>
                  ) : (
                    content.columnHeaders?.map((h, i) => (
                      <th
                        key={i}
                        className={`h-12 px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent ${
                          i < (content.columnHeaders?.length ?? 0) - 1 ? "border-r border-neutral-700" : ""
                        } ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {h}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-neutral-700/80 last:border-b-0 hover:bg-neutral-800/30 transition-colors"
                  >
                    <td
                      className={`border-r border-neutral-700/60 px-5 py-4 text-sm text-neutral-300 align-top ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {row.name}
                    </td>
                    {singleColumn ? (
                      <td
                        className={`px-5 py-4 text-sm text-neutral-200 whitespace-pre-line align-top ${
                          row.highlight
                            ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-semibold text-transparent"
                            : ""
                        } ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {row.values[valueColumnIndex] ?? "/"}
                      </td>
                    ) : (
                      row.values.map((val, vIdx) => (
                        <td
                          key={vIdx}
                          className={`px-5 py-4 text-sm text-neutral-200 whitespace-pre-line align-top ${
                            vIdx < (row.values.length - 1) ? "border-r border-neutral-700/60" : ""
                          } ${
                            row.highlight
                              ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-semibold text-transparent"
                              : ""
                          } ${isRTL ? "text-right" : "text-left"}`}
                        >
                          {val ?? "/"}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
