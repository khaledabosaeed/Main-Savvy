"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRef } from "react"
import { 
  heroTitleReveal, 
  heroImageReveal, 
  staggerContainer,
  blurSlideUp 
} from "@/lib/animations"

export type Language = "en" | "ar"

interface PageHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  icon?: React.ReactNode
}

export default function PageHero({ title, subtitle, backgroundImage, icon }: PageHeroProps) {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const containerRef = useRef(null)
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 scale-110"
      >
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/30 to-transparent"
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3960F9]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3960F9]/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content - Centered */}
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`text-center text-white max-w-5xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border-2 border-white/30 shadow-2xl"
            >
              {icon}
            </motion.div>
          )}

          {/* Title with smooth reveal animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white drop-shadow-2xl"
          >
            {title}
          </motion.h1>

          {/* Decorative Line with smooth reveal */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 rounded-full"
            style={{ width: "120px" }}
          />

          {/* Subtitle with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/95 max-w-3xl mx-auto font-light"
            style={{
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {subtitle}
          </motion.p>

          {/* Scroll Indicator with smooth fade in */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="flex flex-col items-center gap-2 text-white/70"
            >
              <span className="text-sm uppercase tracking-wider">
                {isRTL ? "تمرير" : "Scroll"}
              </span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
