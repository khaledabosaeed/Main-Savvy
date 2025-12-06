/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getHeroContent } from "./content"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").heroContent.en) => getHeroContent(lang, key)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Enhanced animation variants with beautiful entrance effect
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85,
      y: 60,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const blurVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.15,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col pt-[120px] overflow-visible md:overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-50 via-blue-50/30 to-white" />

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
            className="text-sm md:text-base text-gray-500 mb-3 max-w-3xl mx-auto"
          >
            {t("subDescription")}
          </motion.p>

          {/* Robot Image with enhanced blending */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as any }
            }}
            className="relative w-full max-w-5xl mx-auto mb-4"
            style={{ perspective: '1000px' }}
          >
            <div className="relative">

{/* Main Image wrapper */}
<div className="relative z-10">

  {/* Top fog overlay ON TOP of image */}
  <div
    className="absolute top-0 left-0 right-0 pointer-events-none z-30"
    style={{
      height: "45%",
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0))",
      filter: "blur(35px)",
      opacity: 0.85,
    }}
  />

  {/* Main Image with enhanced styling */}
  <Image
    src="/home-page/hero/new.png"
    alt="Robot hand with coffee"
    width={1200}
    height={1200}
    className="object-contain w-full h-auto relative z-10"
    priority
    style={{
      filter: "brightness(1.05) contrast(1.02) saturate(0.95)",
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.95) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.95) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
    }}
  />

  {/* Gradient overlay at bottom */}
  <div
    className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
    style={{
      background:
        "linear-gradient(to bottom, transparent 0%, rgba(147, 197, 253, 0.05) 40%, rgba(196, 181, 253, 0.08) 70%, rgba(255, 255, 255, 0.15) 100%)",
      mixBlendMode: "multiply",
      opacity: 0.4,
    }}
  />

  {/* Soft glow behind hands */}
  <div
    className="absolute inset-0 -z-10"
    style={{
      filter: "blur(40px)",
      opacity: 0.12,
      background:
        "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 40%, transparent 70%)",
    }}
  />
</div>

{/* Enhanced depth layer */}
<div
  className="absolute top-2 left-1/2 -translate-x-1/2 w-[95%] h-[95%] -z-20 opacity-15"
  style={{
    filter: "blur(30px)",
    background:
      "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
  }}
/>

{/* Background animated blur */}
<motion.div
  variants={blurVariants}
  initial="hidden"
  animate={animate ? "visible" : "hidden"}
  className="absolute inset-0 -z-30 blur-3xl"
  style={{
    background:
      "linear-gradient(to bottom, rgba(147, 197, 253, 0.15) 0%, rgba(196, 181, 253, 0.12) 100%)",
  }}
/>

{/* Ground shadow */}
<div
  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 -z-40"
  style={{
    background:
      "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0.2) 50%, transparent 100%)",
    filter: "blur(40px)",
  }}
/>
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
