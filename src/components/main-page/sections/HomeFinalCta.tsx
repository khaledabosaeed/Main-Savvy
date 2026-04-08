"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function HomeFinalCta() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  return (
    <section
      id="finalCta"
      className="py-16 md:py-24 bg-primary text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5"
        >
          {t("home.finalCta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-white/90 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed"
        >
          {t("home.finalCta.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-white text-primary px-8 py-3.5 md:px-10 md:py-4 text-base font-semibold shadow-lg hover:bg-gray-100 transition-colors"
          >
            {t("home.finalCta.button")}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
