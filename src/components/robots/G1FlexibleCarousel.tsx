"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { getG1FlexibleSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface G1FlexibleCarouselProps {
  lang: Language
}

export default function G1FlexibleCarousel({ lang }: G1FlexibleCarouselProps) {
  const dict = useLocaleDictionary()
  const content = getG1FlexibleSectionContent(dict)
  const images = content.images ?? []
  const items = content.items
  const [currentIndex, setCurrentIndex] = useState(0)
  const isRTL = lang === "ar"
  const currentItem = items?.[currentIndex]

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }, [images.length])

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-10 md:gap-12">
        {content.title != null && (
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle != null && content.subtitle !== "" && (
          <p className="text-lg md:text-xl text-neutral-600 text-center" dir={isRTL ? "rtl" : "ltr"}>
            {content.subtitle}
          </p>
        )}

        <div className="w-full max-w-5xl mx-auto relative">
          {/* Carousel: dir="ltr" forces consistent layout in both en/ar */}
          <div className="relative overflow-hidden rounded-2xl" dir="ltr">
            <div className="flex gap-4 md:gap-6 items-stretch justify-center px-2 md:px-4 h-48 sm:h-56 md:h-64 lg:h-72">
              {(() => {
                const n = images.length
                const prevIdx = (currentIndex - 1 + n) % n
                const nextIdx = (currentIndex + 1) % n
                const displayOrder = [prevIdx, currentIndex, nextIdx]
                return displayOrder.map((i) => {
                  const isActive = i === currentIndex
                  const src = images[i]
                  return (
                    <button
                      key={`slide-${i}`}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`flex-shrink-0 rounded-xl overflow-hidden bg-neutral-200 transition-all duration-300 ${
                        isActive
                          ? "w-[70%] md:w-[55%] scale-100 opacity-100 ring-2 ring-black/20 ring-offset-2"
                          : "w-[15%] md:w-[22%] scale-90 opacity-70 hover:opacity-85"
                      }`}
                    >
                    <div className="relative w-full h-full rounded-xl overflow-hidden transition-all duration-300">
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 70vw, 500px"
                        />
                      </div>
                    </button>
                  )
                })
              })()}
            </div>

            {/* Arrows overlay - fixed left/right (dir="ltr" keeps them correct) */}
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700 shadow-md hover:bg-white hover:shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700 shadow-md hover:bg-white hover:shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {(currentItem?.header != null || currentItem?.subtext != null) && (
            <div className="mt-6 text-center space-y-2" dir={isRTL ? "rtl" : "ltr"}>
              {currentItem?.header != null && currentItem.header !== "" && (
                <h3 className="text-xl font-semibold text-black">{currentItem.header}</h3>
              )}
              {currentItem?.subtext != null && currentItem.subtext !== "" && (
                <p className="text-neutral-600 max-w-2xl mx-auto">{currentItem.subtext}</p>
              )}
            </div>
          )}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="h-1 rounded-full transition-all duration-200"
                  style={{
                    width: i === currentIndex ? 24 : 8,
                    backgroundColor:
                      i === currentIndex ? "#000" : "rgb(163 163 163)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
