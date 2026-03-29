"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import type { RobotCard } from "@/lib/robots-locale"

export default function RobotsSection() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"

  const content = useMemo(() => {
    const raw = t("robots.cards", { returnObjects: true })
    const robots = (Array.isArray(raw) ? raw : []) as RobotCard[]
    return {
      sectionTitle: t("robots.heading"),
      robots,
    }
  }, [t])

  const isMobile = useIsMobile()
  const isRTL = lang === "ar"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="robots" className="w-full py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-primary"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.sectionTitle}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {content.robots.map((card) => (
            <motion.a
              href={`/${lang}${card.link}`}
              key={card.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {card.name}
                </h3>
                {/* <p className="text-gray-600 text-sm line-clamp-2">
                  {card.description}
                </p> */}

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href={`/${lang}${card.link}`}
                    className={`inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group w-fit ${isRTL ? "flex-row-reverse" : ""}`}
                    onClick={(e) => e.stopPropagation()}
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
                  </Link>
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 md:h-5 overflow-hidden"
                aria-hidden
              >
                <Image
                  src="/home-page/services/footer.svg"
                  alt=""
                  width={isMobile ? 500 : 800}
                  height={20}
                  className="absolute inset-0 h-full w-full object-cover object-bottom"
                  loading="lazy"
                />
                <div className="absolute inset-0 " />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
