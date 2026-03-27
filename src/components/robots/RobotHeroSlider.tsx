"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getRobotSliderSlides, getRobotLabel } from "@/lib/robots-locale"

/** Shared container: matches navbar (max-w-7xl, px-4 md:px-6 lg:px-8) */
const HERO_CONTAINER = "max-w-7xl mx-auto px-4 md:px-6 lg:px-8"

/** Hero CTA — brand tokens only; motion-safe micro-interactions */
const heroCtaBase =
  "inline-flex w-full sm:w-auto min-w-0 items-center justify-center gap-2 rounded-full font-semibold text-center " +
  "text-sm sm:text-base leading-tight px-5 md:px-6 lg:px-7 " +
  "min-h-[44px] md:min-h-[48px] lg:min-h-[52px] " +
  "transition-all duration-300 ease-out " +
  "motion-safe:hover:-translate-y-px motion-safe:hover:scale-[1.02] active:scale-[0.98] " +
  "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"

const heroCtaSecondary =
  `${heroCtaBase} ` +
  "bg-primary/15 backdrop-blur-md text-white border border-primary/45 " +
  "shadow-md shadow-black/20 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] " +
  "hover:bg-primary/25 hover:border-primary/65 hover:shadow-lg hover:shadow-black/30 " +
  "focus-visible:ring-white/90 focus-visible:ring-offset-black/50"

export default function RobotHeroSlider() {
  const { language } = useLanguage()
  const lang = language as "en" | "ar"
  const slides = getRobotSliderSlides(lang)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const isRTL = lang === "ar"
  const currentSlide = slides[currentIndex]

  // Keyboard navigation - RTL: ArrowRight=prev, ArrowLeft=next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRTL) {
        if (e.key === "ArrowRight") goToPrev()
        if (e.key === "ArrowLeft") goToNext()
      } else {
        if (e.key === "ArrowLeft") goToPrev()
        if (e.key === "ArrowRight") goToNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrev, goToNext, isRTL])

  return (
    <section className="relative h-screen min-h-[100dvh] overflow-hidden">
      {/* Background - full screen image/video */}
      <div className="absolute inset-0 z-0">
        {currentSlide.backgroundVideo ? (
          <video
            key={currentSlide.id}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
            src={currentSlide.backgroundVideo}
          />
        ) : (
          <Image
            key={currentSlide.id}
            src={currentSlide.backgroundImage || currentSlide.image}
            alt=""
            fill
            className="object-cover brightness-[0.9]"
            sizes="100vw"
            priority
          />
        )}
        {/* Base dark overlay */}
        <div
          className="absolute inset-0 bg-black/30 pointer-events-none"
          aria-hidden
        />
        {/* Gradient overlay for text readability - RTL: from right; LTR: from left */}
        <div
          className={`absolute inset-y-0 w-[min(65%,700px)] pointer-events-none ${
            isRTL
              ? "right-0 bg-gradient-to-l from-black/75 via-black/45 to-transparent"
              : "left-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent"
          }`}
          aria-hidden
        />
      </div>

      {/* Content - structured container, aligned with navbar */}
      <div className="relative z-10 h-full flex items-center">
        <div className={`w-full ${HERO_CONTAINER}`}>
          <div
            className={`flex flex-col max-w-2xl gap-2.5 md:gap-6 py-24 md:py-32 ${
              isRTL ? "items-end text-right ms-auto me-0" : "items-start text-left me-auto ms-0"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2.5 md:gap-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.4)]">
                  {currentSlide.name}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.7),0_2px_12px_rgba(0,0,0,0.5)]">
                  {currentSlide.description}
                </p>
      
                {/* Mobile: arrows at end of block; desktop uses edge arrows */}
                <div
                  dir={isRTL ? "rtl" : "ltr"}
                  className="flex md:hidden w-full items-center justify-between"
                >
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="p-2 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    aria-label={isRTL ? "الشريحة السابقة" : "Previous slide"}
                  >
                    {isRTL ? (
                      <ChevronRight className="w-7 h-7" strokeWidth={1.5} />
                    ) : (
                      <ChevronLeft className="w-7 h-7" strokeWidth={1.5} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="p-2 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    aria-label={isRTL ? "الشريحة التالية" : "Next slide"}
                  >
                    {isRTL ? (
                      <ChevronLeft className="w-7 h-7" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight className="w-7 h-7" strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                <div
                  className={`flex w-full max-w-xl flex-row items-center justify-between gap-3 sm:gap-4 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <Link
                    href={`/${lang}${currentSlide.link}`}
                    className={`inline-flex min-w-0 shrink items-center gap-2 text-sm sm:text-base font-medium text-primary hover:text-primary/90 transition-colors group w-fit [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-sm ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span>{currentSlide.buttonText}</span>
                    <svg
                      className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={`/${lang}${currentSlide.link}/product`}
                    className={`${heroCtaSecondary} !w-auto shrink-0`}
                  >
                    {getRobotLabel(lang, "viewProduct")}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 p-3 items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all ${
            isRTL ? "right-4 md:right-8" : "left-4 md:left-8"
          }`}
          aria-label={isRTL ? "الشريحة السابقة" : "Previous slide"}
        >
          {isRTL ? (
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          ) : (
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={goToNext}
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 p-3 items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all ${
            isRTL ? "left-4 md:left-8" : "right-4 md:right-8"
          }`}
          aria-label={isRTL ? "الشريحة التالية" : "Next slide"}
        >
          {isRTL ? (
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          ) : (
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </section>
  )
}
