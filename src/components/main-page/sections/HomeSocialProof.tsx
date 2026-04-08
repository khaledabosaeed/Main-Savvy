"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"

type Stat = { value: string; label: string }

export default function HomeSocialProof() {
  const { t } = useTranslation()
  const raw = t("home.socialProof.stats", { returnObjects: true })
  const stats = (Array.isArray(raw) ? raw : []) as Stat[]

  return (
    <section id="socialProof" className="bg-white pb-4 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-12"
        >
          {t("home.socialProof.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-gray-50/90 px-6 py-8 text-center shadow-sm"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <PartnersSlider />
    </section>
  )
}
