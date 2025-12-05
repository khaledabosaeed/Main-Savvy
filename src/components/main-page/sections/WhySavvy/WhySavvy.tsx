"use client"

import { motion } from "framer-motion"
import { Globe, DollarSign, Target, BarChart3, Layers, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getWhySavvyContent } from "./content"
import {
  sectionSlideUp,
  waveStagger,
  staggerItem,
  iconRotate,
} from "@/lib/animations"

export default function WhySavvy() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").whySavvyContent.en) => getWhySavvyContent(lang, key)

  const features = [
    {
      icon: Globe,
      title: t("feature1Title"),
      description: t("feature1Description"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: DollarSign,
      title: t("feature2Title"),
      description: t("feature2Description"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: t("feature3Title"),
      description: t("feature3Description"),
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: t("feature4Title"),
      description: t("feature4Description"),
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Layers,
      title: t("feature5Title"),
      description: t("feature5Description"),
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Zap,
      title: t("feature6Title"),
      description: t("feature6Description"),
      gradient: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionSlideUp}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={waveStagger}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
              className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/20 transition-all group relative overflow-hidden ${isRTL ? 'rtl text-right' : 'ltr text-left'
                }`}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon with animation */}
              <motion.div
                className="mb-6 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={iconRotate}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl group-hover:bg-primary/10 transition-all"
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {feature.description}
              </p>

              {/* Corner accent */}
              <motion.div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
