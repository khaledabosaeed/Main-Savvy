"use client"

import { motion } from "framer-motion"
import { Users, Leaf, Bot, Home } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getInnovationSolutionsText } from "./content"

export default function InnovationSolutions() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").innovationSolutionsContent.en) =>
    getInnovationSolutionsText(lang, key)

  const solutions = [
    {
      icon: Users,
      title: t("solution1Title"),
      description: t("solution1Description"),
    },
    {
      icon: Leaf,
      title: t("solution2Title"),
      description: t("solution2Description"),
    },
    {
      icon: Bot,
      title: t("solution3Title"),
      description: t("solution3Description"),
    },
    {
      icon: Home,
      title: t("solution4Title"),
      description: t("solution4Description"),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-4 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </motion.div>

        {/* العنوان الفرعي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* الحلول */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {/* الأيقونة */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6"
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* العنوان */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>

                {/* الوصف */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {solution.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

