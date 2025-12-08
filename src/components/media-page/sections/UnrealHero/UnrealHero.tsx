/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getUnrealHeroContent } from "./content"
import Link from "next/link"

export default function UnrealHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const content = getUnrealHeroContent(lang)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  return (
    <section className={`relative w-full h-screen bg-white flex items-center ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="relative h-full pt-50 z-10 container mx-auto px-4 md:px-6 w-full">
        <div className={`flex flex-col h-full ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 lg:gap-30 items-center`}>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="flex-1 h-full"
          >
            {/* Badge - Top Right */}
            <motion.div variants={itemVariants} className={`mb-6 ${isRTL ? '' : ''}`}>
              <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                {content.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {content.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`text-sm md:text-base text-gray-600 mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {content.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link
                href={content.primaryButtonLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-center"
              >
                {content.primaryButton}
              </Link>
              <Link
                href={content.secondaryButtonLink}
                className="inline-block bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
              >
                {content.secondaryButton}
              </Link>
            </motion.div>
          </motion.div>

          {/* Left Side - Image and Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="flex-1 flex flex-col items-center relative h-full"
          >
            {/* Main Image with overlap effect */}
            <motion.div
              variants={imageVariants}
              className="h-[440px] relative"
            >
              <div className="relative h-full inline-block  max-w-md">
                <Image
                  src="/media/hero/hero-image.png"
                  alt={content.imageAlt}
                  width={450}
                  height={624}
                  className=" h-full  object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>

              {/* Stats Badge - Overlapping bottom left */}
              <motion.div
                variants={badgeVariants}
                className={`absolute bottom-0 ${isRTL ? 'left-0' : 'left-0'} transform ${isRTL ? 'translate-x-6' : 'translate-x-6'} translate-y-12`}
              >
                <div className={`bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Logo */}


                  {/* Stats */}
                  <div className={`flex gap-20 ${isRTL ? 'flex-row-reverse' : ''}`}>

                  <div className={`flex flex-col justify-between   ${isRTL ? '' : ''}`}>
                  <Link href={`/${lang}`}>
                  <Image
                    src="/Savvy 2 1.svg"
                    alt="Savvy"
                    width={100}
                    height={70}
                    className="h-10 mb-10 md:h-13 w-auto"
                  />
                </Link>
                   <div className={`flex flex-col`}>
                      <div className="text-xs text-gray-600 ">{content.statsLabel2}</div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600">99.4%</div>
                    </div>

                    <div className="w-px bg-gray-200" />

                  </div>
                    <div className={`flex flex-col justify-end ${isRTL ? 'items-end' : 'items-start'}`}>
                      <div className="text-xs text-gray-600 mt-1">{content.statsLabel1}</div>
                      <div className="text-end text-2xl md:text-3xl font-bold text-blue-600">89</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
