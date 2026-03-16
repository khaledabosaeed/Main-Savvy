"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getRobotSliderSlides, getRobotLabel } from "@/lib/robots-locale"

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
      {/* Background - full screen image/video, no blur */}
      <div className="absolute inset-0 z-0">
        {currentSlide.backgroundVideo ? (
          <video
            key={currentSlide.id}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={currentSlide.backgroundVideo}
          />
        ) : (
          <Image
            key={currentSlide.id}
            src={currentSlide.backgroundImage || currentSlide.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        {/* Dark overlay - full screen */}
        <div
          className="absolute inset-0 bg-black/40 pointer-events-none"
          aria-hidden
        />
        {/* Dark gradient overlay - stronger near text, fades across image. RTL: from right */}
        <div
          className={`absolute inset-y-0 w-[min(60%,650px)] pointer-events-none ${
            isRTL
              ? "right-0 bg-gradient-to-l from-black/75 via-black/45 to-transparent"
              : "left-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent"
          }`}
          aria-hidden
        />
      </div>

      {/* Content - text always on left, vertically centered */}
      <div className="relative z-10 h-full  flex items-center">
        <div className="flex w-full  max-w-[600px] ps-10 md:ps-16 lg:ps-24 pe-6 md:pe-10 lg:pe-16 me-auto ms-0">
          <div
            className={`flex flex-col  md:ml-[60] max-w-[600px] gap-1 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 md:space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.6),0_0_40px_rgba(0,0,0,0.4)]">
                  {currentSlide.name}
                </h1>
                <p className="text-lg md:text-xl text-white/95 max-w-[520px] leading-relaxed [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.5),0_0_24px_rgba(0,0,0,0.3)]">
                  {currentSlide.description}
                </p>
                <div
                  className={`flex flex-wrap gap-4 pt-1 ${isRTL ? "justify-start" : "justify-start"}`}
                >
                  <Link
                    href={`/${lang}${currentSlide.link}`}
                    className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-xl backdrop-blur-sm border border-white/20"
                  >
                    {currentSlide.buttonText}
                  </Link>
                  <Link
                    href={`/${lang}${currentSlide.link}/product`}
                    className="inline-block px-8 py-4 bg-white/95 text-gray-900 rounded-xl font-semibold hover:bg-white transition-all shadow-xl backdrop-blur-sm border-2 border-white"
                  >
                    {getRobotLabel(lang, "viewProduct")}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows - bottom on mobile, middle on desktop */}
        <button
          onClick={goToPrev}
          className={`absolute bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white/50 hover:border-white shadow-lg transition-all ${
            isRTL ? "right-4 md:right-8" : "left-4 md:left-8"
          }`}
          aria-label={isRTL ? "الشريحة السابقة" : "Previous slide"}
        >
          {isRTL ? (
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          )}
        </button>
        <button
          onClick={goToNext}
          className={`absolute bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white/50 hover:border-white shadow-lg transition-all ${
            isRTL ? "left-4 md:left-8" : "right-4 md:right-8"
          }`}
          aria-label={isRTL ? "الشريحة التالية" : "Next slide"}
        >
          {isRTL ? (
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          ) : (
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Slide indicators */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  )
}
