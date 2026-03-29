"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import type { RobotCard } from "@/lib/robots-locale"

export default function RobotCardsSection() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const { robots, viewPricingText } = useMemo(() => {
    const raw = t("robots.cards", { returnObjects: true })
    const robots = (Array.isArray(raw) ? raw : []) as RobotCard[]
    return {
      robots,
      viewPricingText: t("robots.viewPricingText"),
    }
  }, [t])

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {robots.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-6">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <h3
                className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {card.name}
              </h3>

              <p
                className={`text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {card.description}
              </p>

              <div className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Link
                  href={`/${lang}${card.link}`}
                  className="inline-block w-fit px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                >
                  {card.buttonText}
                </Link>
                {card.productLink && (
                  <Link
                    href={`/${lang}${card.productLink}`}
                    className="inline-block w-fit px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {viewPricingText}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
