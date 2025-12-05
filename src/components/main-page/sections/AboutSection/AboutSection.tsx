"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getAboutContent } from "./content"
import { textRevealContainer, textRevealWord, sectionSlideUp } from "@/lib/animations"

export default function AboutSection() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").aboutContent.en) => getAboutContent(lang, key)

  // Split title into words for animation
  const titleWords = t("title").split(" ")

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Animated Title */}
          <motion.h2
            variants={textRevealContainer}
            className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                variants={textRevealWord}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Description with slide up */}
          <motion.p
            variants={sectionSlideUp}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
