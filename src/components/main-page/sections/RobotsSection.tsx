"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import type { RobotCard } from "@/lib/robots-locale"

type RobotsSectionProps = {
  limit?: number
  showExploreStore?: boolean
}

function RobotCardLink({
  card,
  lang,
  isRTL,
}: {
  card: RobotCard
  lang: "en" | "ar"
  isRTL: boolean
}) {
  return (
    <Link
      href={`/${lang}${card.link}`}
      className="group relative block h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {card.name}
        </h3>

        <div className="pt-4 border-t border-gray-200">
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors w-fit ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <span>{card.buttonText}</span>
            <svg
              className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 md:h-5 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/home-page/services/footer.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </div>
    </Link>
  )
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
          {content.sectionTitle}
        </h2>

        <div className={gridClassName}>
          {content.robots.map((card) => (
            <div
              key={card.id}
              className="h-full transition-transform duration-300 hover:-translate-y-[10px]"
            >
              <RobotCardLink card={card} lang={lang} isRTL={isRTL} />
            </div>
          ))}
        </div>

        {showExploreStore && (
          <div className="mt-12 md:mt-16 flex justify-center px-4">
            <Link
              href={`/${lang}/robots`}
              className={`inline-flex items-center justify-center rounded-full border-2 border-primary text-primary px-8 py-3.5 text-base font-semibold hover:bg-primary hover:text-white transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {t("home.robotsSection.exploreStore")}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
