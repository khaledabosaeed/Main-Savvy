"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import type { RobotCard } from "@/lib/robots-locale"
import RobotStoreCard from "@/components/robots/RobotStoreCard"

type RobotsSectionProps = {
  limit?: number
  showExploreStore?: boolean
}

export default function RobotsSection({
  limit,
  showExploreStore,
}: RobotsSectionProps = {}) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"

  const content = useMemo(() => {
    const raw = t("robots.cards", { returnObjects: true })
    const robots = (Array.isArray(raw) ? raw : []) as RobotCard[]
    const capped =
      typeof limit === "number" && limit > 0 ? robots.slice(0, limit) : robots
    return {
      sectionTitle: t("robots.heading"),
      robots: capped,
    }
  }, [t, limit])

  const isRTL = lang === "ar"

  const gridClassName = `grid grid-cols-1 gap-8 md:gap-10 ${
    limit === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"
  }`

  return (
    <section id="robots" className="w-full py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-primary">
          <FormattedText text={content.sectionTitle} />
        </h2>

        <div className={gridClassName}>
          {content.robots.map((card) => (
            <div
              key={card.id}
              className="h-full transition-transform duration-300 hover:-translate-y-[10px]"
            >
              <RobotStoreCard card={card} lang={lang} isRTL={isRTL} />
            </div>
          ))}
        </div>

        {showExploreStore && (
          <div className="mt-12 md:mt-16 flex justify-center px-4">
            <Link
              href={`/${lang}/robots`}
              className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <FormattedText text={t("robots.moreRobots")} />
              <ArrowRight
                className={`h-4 w-4 shrink-0 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                aria-hidden
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
