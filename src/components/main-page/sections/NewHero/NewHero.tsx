/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { Language } from "./content"
import { getHeroContent } from "./content"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const isMobile = useIsMobile()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").heroContent.en) => getHeroContent(lang, key)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Enhanced animation variants with beautiful entrance effect
  // Simplified animations on mobile for better performance
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.95 : 0.85,
      y: isMobile ? 30 : 60,
      rotateX: isMobile ? 0 : 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.6 : 1.2,
        delay: isMobile ? 0.1 : 0.3,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const blurVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: isMobile ? 0.2 : 0.3,
      scale: 1,
      transition: {
        duration: isMobile ? 0.5 : 1,
        delay: isMobile ? 0.2 : 0.5,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        delay: 0,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.7,
        delay: isMobile ? 0.1 : 0.15,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col pt-[100px] md:pt-[120px] overflow-visible md:overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0  bg-white" />

      {/* Large radial glow behind image area - Hidden on mobile for performance */}
      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      )}

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20 lg:py-32 flex-1" suppressHydrationWarning>
        <div className={`max-w-5xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Main Heading - Responsive sizing */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2"
          >
            {t("welcomeText")}{" "}
            <span className="text-primary">
              {t("savvyWorld")}
            </span>
          </motion.h1>

          {/* Description - Better mobile typography */}
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-sm md:text-base lg:text-lg text-gray-600 mb-3 md:mb-4 max-w-3xl mx-auto px-4"
          >
            {t("description")}
          </motion.p>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ delay: isMobile ? 0.2 : 0.4 }}
            className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3 max-w-3xl mx-auto px-4"
          >
            {t("subDescription")}
          </motion.p>

          {/* Robot Image with enhanced blending - Optimized for mobile */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={!isMobile ? {
              scale: 1.03,
              transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as any }
            } : undefined}
            className="relative w-full max-w-5xl mx-auto mb-2 md:mb-4"
            style={{ perspective: isMobile ? 'none' : '1000px' }}
          >
            <div className="relative">

              {/* Main Image wrapper */}
              <div className="relative z-10">

                {/* Main Image with enhanced styling - Optimized sizes for mobile */}
              <Image
  src="/home-page/hero/new.png"
  alt="Robot hand with coffee"
  width={isMobile ? 800 : 1200}
  height={isMobile ? 800 : 1200}
  className="object-contain w-full h-auto relative z-10"
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
  quality={isMobile ? 85 : 90}
  style={{
    filter: isMobile ? "brightness(1.02) contrast(1.01)" : "brightness(1.05) contrast(1.02) saturate(0.95)",
    WebkitMaskImage: 
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
    maskImage: 
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
  }}
/>

                {/* Cloud overlay image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                  className="absolute top-5 left-5 right-0 inset-0 z-20 pointer-events-none"
                >
                  <Image
                    src="/home-page/hero/ghyom.png"
                    alt="Cloud effect"
                    width={isMobile ? 800 : 1200}
                    height={isMobile ? 800 : 1200}
                    className="object-contain w-full h-auto"
               
                  />
                </motion.div>
 
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
