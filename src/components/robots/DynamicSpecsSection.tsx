"use client"

import Image from "next/image"
import type { Language } from "@/lib/robots-locale"
import type { SpecsSectionData } from "@/lib/robots-custom-page"

export default function DynamicSpecsSection({
  data,
  lang,
}: {
  data: SpecsSectionData
  lang: Language
}) {
  const isRTL = lang === "ar"

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="space-y-6 py-16 md:py-24 bg-neutral-950 px-4 md:px-6">
      <div className="h-1 w-full max-w-6xl mx-auto rounded-t-xl bg-gradient-to-r from-violet-500 to-blue-500" />
      <div className="space-y-6 pt-2 max-w-6xl mx-auto">
        {data.sections.map((block, sIdx) => (
          <div
            key={sIdx}
            className="overflow-hidden rounded-xl bg-neutral-900"
          >
            <div className="border-b border-neutral-700 bg-neutral-800/80 px-3 py-3 md:px-5 md:py-4">
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-300/90">
                {block.header}
              </h3>
            </div>
            {block.headerImage && (
              <div className="relative h-40 w-full bg-neutral-800">
                <Image
                  src={block.headerImage}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-0 border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-neutral-700">
                    {block.columns.map((col, i) => (
                      <th
                        key={i}
                        className={`h-12 px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold text-white ${
                          i < block.columns.length - 1
                            ? isRTL
                              ? "border-l border-neutral-700"
                              : "border-r border-neutral-700"
                            : ""
                        } ${i === 0 ? "text-left" : "text-center"}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b border-neutral-700/80 last:border-b-0 hover:bg-neutral-800/30 transition-colors"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm text-neutral-200 whitespace-pre-line align-top ${
                            cIdx < row.length - 1
                              ? isRTL
                                ? "border-l border-neutral-700/60"
                                : "border-r border-neutral-700/60"
                              : ""
                          } ${cIdx === 0 ? (isRTL ? "text-right" : "text-left") : "text-center"}`}
                        >
                          {cell}
                        </td>
                      ))}
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
