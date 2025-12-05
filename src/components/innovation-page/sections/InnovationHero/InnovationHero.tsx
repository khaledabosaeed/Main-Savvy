"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getInnovationHeroContent } from "./content"

export default function InnovationHero() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").innovationHeroContent.en) =>
    getInnovationHeroContent(lang, key)
  
  const containerRef = useRef(null)
  const [key, setKey] = useState(0)
  
  // Re-trigger animations on language change
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [lang])
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  // Badge animation (same as main hero)
  const badgeVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // Title with word-by-word animation (same as main hero)
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 scale-110"
      >
        <Image
          src="/innovation/hero/hero.jpg"
          alt="Innovation Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30" />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-tl from-[#3960F9]/40 to-transparent"
        />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3960F9]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content - Right Aligned */}
      <div className="container relative z-10 py-32">
        <motion.div
          key={key}
          initial="hidden"
          animate="visible"
          className={`max-w-3xl ${isRTL ? 'mr-0 text-right' : 'ml-auto text-right'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Badge */}
          <motion.div
            // variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 cursor-default ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Lightbulb className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {isRTL ? "الابتكار والتقنية" : "Innovation & Technology"}
            </span>
          </motion.div>

          {/* Title with word animation */}
          <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t("title").split(" ").map((word, index) => (
              <motion.span
                key={index}
                // variants={wordVariants}
                className={`inline-block ${isRTL ? 'ml-3' : 'mr-3'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`h-1 bg-gradient-to-l from-[#3960F9] to-transparent mb-6 rounded-full ${isRTL ? 'origin-left ml-auto' : 'origin-right ml-auto'}`}
            style={{ width: "200px" }}
          />

          {/* Subtitle */}
          <motion.p
            // variants={subtitleVariants}
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl ml-auto leading-relaxed"
            style={{
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.button
              className={`px-8 py-4 bg-[#3960F9] text-white rounded-full font-semibold hover:bg-[#2848C7] transition-all shadow-lg hover:shadow-[#3960F9]/50 inline-flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{isRTL ? "استكشف الابتكار" : "Explore Innovation"}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
