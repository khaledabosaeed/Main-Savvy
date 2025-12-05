"use client"

import { motion } from "framer-motion"
import { Flag, TrendingUp, Briefcase } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getToolsContent } from "./content"
import {
  sectionSlideUp,
  iconRotate,
  cardLift,
  waveStagger,
  staggerItem,
} from "@/lib/animations"

export default function ToolsSection() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").toolsContent.en) => getToolsContent(lang, key)

  const tools = [
    {
      icon: Flag,
      title: t("nationalTitle"),
      description: t("nationalDescription"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: t("marketingTitle"),
      description: t("marketingDescription"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: Briefcase,
      title: t("commercialTitle"),
      description: t("commercialDescription"),
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionSlideUp}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={waveStagger}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden ${isRTL ? 'rtl text-right' : 'ltr text-left'
                }`}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon with animation */}
              <motion.div
                className="relative inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 group-hover:bg-primary/10 transition-colors"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={iconRotate}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <tool.icon className="w-8 h-8 text-primary group-hover:text-primary transition-colors" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tool.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${tool.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
