"use client"

import Image from "next/image"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import type { Language, RobotSlug } from "@/lib/robots-locale"
import { getRobotSpecsContent } from "@/lib/robots-locale"

export interface SpecsTableProps {
  slug: RobotSlug
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
  const dict = useLocaleDictionary()
  const content = getRobotSpecsContent(slug, dict)
  if (!content) return null

  const isRTL = lang === "ar"
  const normalizeCellText = (text?: string) =>
    (text ?? "/")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
  const renderSpecValue = (value?: string) => {
    const displayValue = normalizeCellText(value)
    if (isRTL) {
      return (
        <bdi className="block whitespace-pre-line max-w-full">{displayValue}</bdi>
      )
    }
    return (
      <span dir="ltr" className="block whitespace-pre-line">
        {displayValue}
      </span>
    )
  }
  const renderSpecName = (name?: string) => (
    <span
      dir={isRTL ? "rtl" : "ltr"}
      className="block whitespace-pre-line [unicode-bidi:isolate]"
    >
      {normalizeCellText(name)}
    </span>
  )

  const firstColLabel = content.specLabel
  const headerImage = content.headerImage
  const columnPrices = content.columnPrices
  const hasColumnPriceRow = !!(columnPrices && columnPrices.length > 0)
  const priceLabel = content.priceLabel
  const modelLabel = content.modelLabel
  const hasHeaderImage = !!headerImage
  const firstColumnWidthClass =
    "w-[120px] min-w-[120px] max-w-[120px] md:w-[300px] md:min-w-[300px] md:max-w-[300px]"

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
          <div className="border-b border-neutral-700 bg-neutral-800/80 px-3 py-3 md:px-5 md:py-4">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-300/90">
              {section.label}
            </h3>
          </div>
          {/* Table for this section */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-0 border-collapse table-fixed">
              <thead>
                {hasHeaderImage && sIdx === 0 && content.columnHeaders && content.columnHeaders.length > 0 && (
                  <>
                    <tr className="border-b border-neutral-700">
                      <th
                        rowSpan={hasColumnPriceRow ? 2 : 1}
                        className={`${firstColumnWidthClass} px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold text-white align-top ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        <span className="block">{modelLabel ?? firstColLabel}</span>
                        {priceLabel && (
                          <span className="block text-xs font-normal text-neutral-400 mt-1">{priceLabel}</span>
                        )}
                      </th>
                      {content.columnHeaders.map((h, i) => (
                        <th
                          key={i}
                          className={`px-2 py-2 md:px-5 md:py-3 text-center ${
                            i < content.columnHeaders!.length - 1
                              ? isRTL
                                ? "border-l border-neutral-700"
                                : "border-r border-neutral-700"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col items-center gap-4">
                            <div className="relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0">
                              <Image
                                src={headerImage!}
                                alt={h}
                                fill
                                className="object-contain"
                                sizes="128px"
                              />
                            </div>
                            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                              {h}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                    {hasColumnPriceRow && (
                      <tr className="border-b border-neutral-700">
                        {columnPrices.map((price, i) => (
                          <th
                            key={i}
                            className={`px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent text-center ${
                              i < columnPrices.length - 1
                                ? isRTL
                                  ? "border-l border-neutral-700"
                                  : "border-r border-neutral-700"
                                : ""
                            }`}
                          >
                            {isRTL ? <bdi>{price}</bdi> : price}
                          </th>
                        ))}
                      </tr>
                    )}
                  </>
                )}
                {(!hasHeaderImage || sIdx > 0 || !content.columnHeaders?.length) && (
                  <tr className="border-b border-neutral-700">
                    <th
                      className={`${firstColumnWidthClass} h-12 px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold text-white ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {singleColumn ? content.specLabel : firstColLabel}
                    </th>
                    {singleColumn ? (
                      <th
                        className={`h-12 px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent text-center`}
                      >
                        {content.columnHeaders?.[valueColumnIndex] ?? content.valueLabel}
                      </th>
                    ) : (
                      content.columnHeaders?.map((h, i) => (
                        <th
                          key={i}
                          className={`h-12 px-2 py-2 md:px-5 md:py-3 text-xs md:text-sm font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent ${
                            i < (content.columnHeaders?.length ?? 0) - 1
                              ? isRTL
                                ? "border-l border-neutral-700"
                                : "border-r border-neutral-700"
                              : ""
                          } text-center`}
                        >
                          {h}
                        </th>
                      ))
                    )}
                  </tr>
                )}
              </thead>
              <tbody>
                {section.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-neutral-700/80 last:border-b-0 hover:bg-neutral-800/30 transition-colors"
                  >
                    <td
                      className={`${firstColumnWidthClass} ${
                        isRTL ? "border-l" : "border-r"
                      } border-neutral-700/60 px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm text-neutral-300 align-top ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {renderSpecName(row.name)}
                    </td>
                    {singleColumn ? (
                      <td
                        className={`px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm text-neutral-200 whitespace-pre-line align-top ${
                          row.highlight
                            ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-semibold text-transparent"
                            : ""
                        } text-center`}
                      >
                        {renderSpecValue(row.values[valueColumnIndex])}
                      </td>
                    ) : (
                      Array.from(
                        { length: content.columnHeaders?.length ?? row.values.length },
                        (_, vIdx) => row.values[vIdx] ?? "/",
                      ).map((val, vIdx, vals) => (
                        <td
                          key={vIdx}
                          className={`px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm text-neutral-200 whitespace-pre-line align-top  ${
                            vIdx < (vals.length - 1)
                              ? isRTL
                                ? "border-l border-neutral-700/60"
                                : "border-r border-neutral-700/60"
                              : ""
                          } ${
                            row.highlight
                              ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-semibold text-transparent"
                              : ""
                          } text-center`}
                        >
                          {renderSpecValue(val)}
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
