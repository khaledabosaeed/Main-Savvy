"use client"

import { useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import { richTextToPlainText } from "@/lib/rich-text"
import {
  filterRobotCardsByCategory,
  type RobotCard,
  type RobotCategory,
} from "@/lib/robots-locale"
import RobotStoreCard from "@/components/robots/RobotStoreCard"

type FilterKey = RobotCategory | "all"

const FILTERS: { key: FilterKey; labelKey: string }[] = [
  { key: "all", labelKey: "robots.categoryAll" },
  { key: "industrial", labelKey: "robots.categoryIndustrial" },
  { key: "service", labelKey: "robots.categoryService" },
  { key: "educational", labelKey: "robots.categoryEducational" },
  { key: "entertainment", labelKey: "robots.categoryEntertainment" },
]

export default function RobotsCatalogClient({
  cards,
  lang,
}: {
  cards: RobotCard[]
  lang: "en" | "ar"
}) {
  const { t } = useTranslation()
  const [category, setCategory] = useState<FilterKey>("all")
  const [query, setQuery] = useState("")
  const isRTL = lang === "ar"

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, "")
      if (
        raw === "industrial" ||
        raw === "service" ||
        raw === "educational" ||
        raw === "entertainment"
      ) {
        setCategory(raw)
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  const filtered = useMemo(() => {
    const byCat = filterRobotCardsByCategory(cards, category)
    const q = query.trim().toLowerCase()
    if (!q) return byCat
    return byCat.filter((c) => {
      const hay = `${richTextToPlainText(c.name)} ${richTextToPlainText(c.description)}`.toLowerCase()
      return hay.includes(q)
    })
  }, [cards, category, query])

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-28 pb-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-4">
          <FormattedText text={t("robots.catalogPageTitle")} as="span" />
        </h1>

        <div className="max-w-xl mx-auto mt-8 mb-10">
          <label htmlFor="robot-search" className="sr-only">
            <FormattedText text={t("robots.catalogSearchPlaceholder")} as="span" />
          </label>
          <input
            id="robot-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("robots.catalogSearchPlaceholder")}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div
          className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-12 ${isRTL ? "flex-row-reverse" : ""}`}
          role="tablist"
          aria-label={t("robots.catalogPageTitle")}
        >
          {FILTERS.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={category === key}
              onClick={() => {
                setCategory(key)
                if (typeof window !== "undefined") {
                  if (key === "all") {
                    window.history.replaceState(null, "", `#`)
                  } else {
                    window.history.replaceState(null, "", `#${key}`)
                  }
                }
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-6 md:py-2.5 md:text-base ${
                category === key
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary/40"
              }`}
            >
              <FormattedText text={t(labelKey)} as="span" />
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-12">
            <FormattedText text={t("robots.noCatalogResults")} as="span" />
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {filtered.map((card) => (
              <div
                key={`${card.id}-${card.link}`}
                className="h-full transition-transform duration-300 hover:-translate-y-[10px]"
              >
                <RobotStoreCard card={card} lang={lang} isRTL={isRTL} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
