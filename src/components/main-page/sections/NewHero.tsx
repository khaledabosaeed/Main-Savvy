/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa6"
import { Check } from "lucide-react"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const valueProps = useMemo(() => {
    const raw = t("hero.valueProps", { returnObjects: true })
    return Array.isArray(raw) ? (raw as string[]) : []
  }, [t])

  const savvyWorldAccent = useMemo(() => t("hero.savvyWorld").trim(), [t])

  useEffect(() => {
    setAnimate(true)
  }, [])

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.98 : 0.96,
      y: isMobile ? 12 : 24,
      rotateX: isMobile ? 0 : 6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.35 : 0.55,
        delay: isMobile ? 0.05 : 0.12,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 14, scale: isMobile ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.28 : 0.45,
        delay: 0,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: isMobile ? 8 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.28 : 0.4,
        delay: isMobile ? 0.04 : 0.08,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const propsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isMobile ? 0.04 : 0.08,
        staggerChildren: isMobile ? 0.03 : 0.04,
      },
    },
  }

  const propItemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const socialContainerVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 0.61, 0.36, 1] as any,
        delay: 0.2,
        delayChildren: 0.06,
        staggerChildren: 0.04,
      },
    },
  }

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 4 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 520,
        damping: 22,
      } as any,
    },
  }

  return (
    <section className="relative flex flex-col pt-[100px] md:pt-[120px] overflow-visible md:overflow-hidden">
      <div className="absolute inset-0 bg-white" />

      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[60px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      )}

      <div
        className="container relative z-10 py-8 md:py-16 lg:py-24 flex-1 flex flex-col justify-center"
        suppressHydrationWarning
      >
        <div
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2"
          >
            {t("hero.welcomeText")}
            {savvyWorldAccent ? (
              <>
                {" "}
                <span className="text-primary">{savvyWorldAccent}</span>
              </>
            ) : null}
          </motion.h1>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 max-w-4xl mx-auto px-4 leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {valueProps.length > 0 && (
            <motion.div
              variants={propsContainerVariants}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl mx-auto px-4 mb-6 md:mb-8"
            >
              {valueProps.map((text, i) => (
                <motion.div
                  key={i}
                  variants={propItemVariants}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/90 px-4 py-3 md:px-5 md:py-4 text-start shadow-sm"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-gray-800 leading-snug">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 w-full max-w-md sm:max-w-none mx-auto px-4 mb-6 md:mb-8 ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-primary text-white px-8 py-3 text-sm md:text-base font-semibold shadow-md hover:opacity-95 transition-opacity"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href={`/${lang}#about`}
              className="inline-flex items-center justify-center rounded-full border-2 border-primary text-primary bg-white px-8 py-3 text-sm md:text-base font-semibold hover:bg-primary/5 transition-colors"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={
              !isMobile
                ? {
                    scale: 1.015,
                    transition: { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] as any },
                  }
                : undefined
            }
            className="relative w-full max-w-5xl mx-auto mb-2 md:mb-4 flex items-center justify-center"
            style={{ perspective: isMobile ? "none" : "1000px" }}
          >
            <div className="relative w-full flex items-center justify-center min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
              <div className="relative z-10 w-full flex items-center justify-center">
                <Image
                  src="/home-page/hero/new.png"
                  alt="Robot hand with coffee"
                  width={isMobile ? 800 : 1200}
                  height={isMobile ? 800 : 1200}
                  className="object-contain h-auto max-w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                  quality={isMobile ? 85 : 90}
                  style={{
                    filter: isMobile
                      ? "brightness(1.02) contrast(1.01)"
                      : "brightness(1.05) contrast(1.02) saturate(0.95)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                  className="absolute inset-0 z-20 pointer-events-none"
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

          <div className="relative z-20 pb-4 md:pb-6 flex justify-center">
            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              className="flex items-center gap-3  md:gap-4"
            >
              {[
                {
                  Icon: FaTiktok,
                  color: "text-black",
                  url: "https://www.tiktok.com/@mr.savvy_saudi",
                  ariaLabel: t("hero.socialTiktok"),
                },
                {
                  Icon: FaLinkedinIn,
                  color: "text-[#0077B5]",
                  url: "https://www.linkedin.com/company/savvy-world/",
                  ariaLabel: t("hero.socialLinkedin"),
                },
                {
                  Icon: FaInstagram,
                  color: "text-[#E1306C]",
                  url: "https://www.instagram.com/mr.savvy_saudi",
                  ariaLabel: t("hero.socialInstagram"),
                },
                {
                  Icon: FaSnapchatGhost,
                  color: "text-[#FFFC00] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]",
                  url: "https://www.snapchat.com/@mr.savvysaudi",
                  ariaLabel: t("hero.socialSnapchat"),
                },
              ].map(({ Icon, color, url, ariaLabel }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${color} text-4xl md:text-3xl lg:text-4xl xl:text-5xl transform transition-transform duration-300 hover:scale-110 rounded-full p-2 hover:bg-gray-100 transition-colors`}
                  aria-label={ariaLabel}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
