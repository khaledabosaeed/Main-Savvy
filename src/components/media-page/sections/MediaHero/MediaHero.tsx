"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Play, Camera } from "lucide-react"
import type { Language } from "./content"
import { getMediaHeroContent } from "./content"

interface MediaHeroProps {
  lang: Language
}

export default function MediaHero({ lang }: MediaHeroProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaHeroContent.en) => getMediaHeroContent(lang, key)
  const containerRef = useRef(null)
  const [key, setKey] = useState(0)
  
  // Re-trigger animations on language change
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [lang])
  
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
    hidden: { opacity: 0, y: 30, filter: "blur(4px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

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
          src="/media/hero/hero.png"
          alt="Media Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/30 to-transparent"
        />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3960F9]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3960F9]/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content - Centered with Zoom Animation */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          key={key}
          initial="hidden"
          animate="visible"
          className="text-center"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Badge */}
          <motion.div
            // variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 cursor-default ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Camera className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {isRTL ? "الإعلام والإنتاج" : "Media & Production"}
            </span>
          </motion.div>

          {/* Title with word animation and zoom effect */}
          <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white max-w-5xl mx-auto leading-tight drop-shadow-2xl"
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
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-10 rounded-full"
            style={{ width: "120px" }}
          />

          {/* CTA Button */}
          <motion.div 
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-10 py-5 bg-[#3960F9] text-white rounded-full font-bold text-lg hover:bg-[#2848C7] transition-all shadow-2xl hover:shadow-[#3960F9]/50 inline-flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{t("button")}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                <Play className="w-5 h-5 fill-current" />
              </motion.div>
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
