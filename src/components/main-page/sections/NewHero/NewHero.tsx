/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getHeroContent } from "./content"
import {
  staggerContainer,
  scaleIn,
} from "@/lib/animations"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").heroContent.en) => getHeroContent(lang, key)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Parallax effect for background
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  const partners = [
    "/home-page/hero/1.svg",
    "/home-page/hero/2.svg",
    "/home-page/hero/3.svg",
    "/home-page/hero/4.svg",
  ]

  // Enhanced animation variants
  const badgeVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
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
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src="/home-page/hero/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-black/50"
          style={{ opacity }}
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 py-32" suppressHydrationWarning>
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Top Badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 cursor-default"
          >
            <span className="text-white text-sm">
              {lang === "ar" ? "تعلم المزيد" : "Learn Unique"}
            </span>
            <span className="text-white/60 text-sm">•</span>
            <span className="text-white text-sm">
              {lang === "ar" ? "تجربة التقنيات الذكية الاحترافية" : "Experience Professional Smart Technologies"}
            </span>
          </motion.div>

          {/* Main Heading with Word Animation */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            {t("welcomeText").split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}{" "}
            <motion.span
              variants={wordVariants}
              className="text-primary inline-block"
            >
              {t("savvyWorld")}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl mx-auto"
          >
            {t("description")}
          </motion.p>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto"
          >
            {t("subDescription")}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
          >
            <motion.button
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t("ctaButton")}
            </motion.button>
          </motion.div>

          {/* Partners */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.2)",
                    transition: { duration: 0.3 }
                  }}
                  className="transition-all cursor-pointer"
                >
                  <Image
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
