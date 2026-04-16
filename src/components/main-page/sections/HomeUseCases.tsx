"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"
import FormattedText from "@/components/shared/FormattedText"

type UseCaseItem = {
  title: string
  outcome: string
  metric: string
  link: string
}

export default function HomeUseCases() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const raw = t("home.useCases.items", { returnObjects: true })
  const items = (Array.isArray(raw) ? raw : []) as UseCaseItem[]

  return (
    <section
      id="useCases"
      className="py-14 md:py-20 bg-gray-50/80"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            <FormattedText text={t("home.useCases.title")} />
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            <FormattedText text={t("home.useCases.subtitle")} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                <FormattedText text={item.title} />
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 mb-4">
                <FormattedText text={item.outcome} />
              </p>
              <p className="text-primary font-semibold text-sm mb-6">
                <FormattedText text={item.metric} />
              </p>
              <Link
                href={`/${lang}${item.link.startsWith("/") ? item.link : `/${item.link}`}`}
                className={`inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mt-auto ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span>
                  <FormattedText text={t("common.learnMore")} as="span" />
                </span>
                <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
