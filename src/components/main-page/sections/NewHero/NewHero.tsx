/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getHeroContent } from "./content"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").heroContent.en) => getHeroContent(lang, key)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Enhanced animation variants - Sequence: Image -> Blur -> Text
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  const blurVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.3,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[120px]">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white" />

      {/* Large radial glow behind image area */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32 flex-1" suppressHydrationWarning>
        <div className={`max-w-5xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Main Heading - Single Line */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {t("welcomeText")}{" "}
            <span className="text-gray-700">
              {t("savvyWorld")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-base md:text-lg text-gray-600 mb-4 max-w-3xl mx-auto"
          >
            {t("description")}
          </motion.p>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base text-gray-500 mb-8 max-w-3xl mx-auto"
          >
            {t("subDescription")}
          </motion.p>

          {/* Robot Image with edge blending */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="relative w-full max-w-3xl mx-auto mb-4"
          >
            <div className="relative">
              <Image
                src="/home-page/hero/new.png"
                alt="Robot hand with coffee"
                width={900}
                height={900}
                className="object-contain w-full h-auto drop-shadow-2xl relative z-10"
                priority
              />
              {/* Original blur effect behind image - blue to purple */}
              <motion.div
                variants={blurVariants}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
                className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-b from-blue-200 to-purple-200"
              />
              {/* Subtle edge fade to blend with background */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  maskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, black 40%, black 60%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, black 40%, black 60%, transparent 95%)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-blue-50/20 via-transparent to-white/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fade effect at bottom of section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-30"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(255, 255, 255, 0.4) 30%,
              rgba(255, 255, 255, 0.8) 60%,
              rgb(255, 255, 255) 100%
            )
          `
        }}
      />
    </section>
  )
}
