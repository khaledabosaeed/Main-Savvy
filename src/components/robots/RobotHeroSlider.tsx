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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrev, goToNext])

  const currentSlide = slides[currentIndex]
  const isRTL = lang === "ar"

  return (
    <section className="relative h-screen min-h-[100dvh] overflow-hidden">
      {/* Background - image or video */}
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
            className="object-cover blur-[8px] scale-110"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content - Text left (en) / right (ar), Robot image right (en) / left (ar) */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10 w-full">
          <div
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
              isRTL ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text content - left for en, right for ar */}
            <div
              className={`flex-1 ${isRTL ? "md:text-right" : "md:text-left"} text-center md:text-left`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
                    {currentSlide.name}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 drop-shadow-md">
                    {currentSlide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/${lang}${currentSlide.link}`}
                      className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-xl font-semibold hover:bg-white/30 hover:border-white/60 transition-all"
                    >
                      {currentSlide.buttonText}
                    </Link>
                    <Link
                      href={`/${lang}${currentSlide.link}/product`}
                      className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      {getRobotLabel(lang, "viewProduct")}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Robot image - right for en, left for ar, fixed dimensions for consistency */}
            <div className="flex-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-[350px] h-[200px] min-w-[350px] min-h-[200px] shrink-0 overflow-hidden rounded-lg"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.name}
                    fill
                    className="object-cover object-top drop-shadow-2xl rounded-lg"
                    sizes="350px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 transition-all ${
            isRTL ? "right-4 md:right-8" : "left-4 md:left-8"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <button
          onClick={goToNext}
          className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 transition-all ${
            isRTL ? "left-4 md:left-8" : "right-4 md:right-8"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
      </div>
    </section>
  )
}
