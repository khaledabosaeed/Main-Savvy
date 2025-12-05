"use client"

import { motion } from "framer-motion"
import type { Language } from "./content"
import { getWhySavvyText } from "./content"

interface WhySavvyProps {
  lang: Language
}

export default function WhySavvy({ lang }: WhySavvyProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").whySavvyContent.en) =>
    getWhySavvyText(lang, key)

  const features = [
    {
      number: "01",
      title: t("feature1Title"),
      description: t("feature1Description"),
    },
    {
      number: "02",
      title: t("feature2Title"),
      description: t("feature2Description"),
    },
    {
      number: "03",
      title: t("feature3Title"),
      description: t("feature3Description"),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-[#F2F2F2]">
      <div className="container px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* المميزات */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`text-center`}
            >
              {/* الرقم */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <span className="text-3xl font-bold text-[#3960F9]">
                  {feature.number}
                </span>
              </motion.div>

              {/* العنوان */}
              <h3 className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-center' : 'text-center'}`}>
                {feature.title}
              </h3>

              {/* الوصف */}
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-center' : 'text-center'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

