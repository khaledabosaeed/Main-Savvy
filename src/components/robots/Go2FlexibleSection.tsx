"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { getGo2FlexibleSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface Go2FlexibleSectionProps {
  lang: Language
}

export default function Go2FlexibleSection({ lang }: Go2FlexibleSectionProps) {
  const dict = useLocaleDictionary()
  const content = getGo2FlexibleSectionContent(dict)
  const cards = content.cards ?? []
  const [currentIndex, setCurrentIndex] = useState(0)
  const isRTL = lang === "ar"
  const currentCard = cards[currentIndex]

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    )
  }, [cards.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === cards.length - 1 ? 0 : prev + 1
    )
  }, [cards.length])

  if (cards.length === 0) return null

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-10 md:gap-12">
        {content.header != null && content.header !== "" && (
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {content.header}
          </h2>
        )}
        {content.subtext != null && content.subtext !== "" && (
          <p className="text-lg md:text-xl text-neutral-600 text-center max-w-2xl" dir={isRTL ? "rtl" : "ltr"}>
            {content.subtext}
          </p>
        )}

        <div className="w-full max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden rounded-2xl" dir="ltr">
            <div className="flex gap-4 md:gap-6 items-stretch justify-center px-2 md:px-4 h-48 sm:h-56 md:h-64 lg:h-72">
              {(() => {
                const n = cards.length
                const prevIdx = (currentIndex - 1 + n) % n
                const nextIdx = (currentIndex + 1) % n
                const displayOrder = [prevIdx, currentIndex, nextIdx]
                return displayOrder.map((i) => {
                  const isActive = i === currentIndex
                  const card = cards[i]
                  return (
                    <button
                      key={`slide-${i}`}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-[width,transform,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActive
                          ? "w-[70%] md:w-[55%] scale-100 opacity-100 ring-2 ring-black/20 ring-offset-2"
                          : "w-[15%] md:w-[22%] scale-90 opacity-70 hover:opacity-85"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <Image
                          src={card.image}
                          alt={card.title ?? ""}
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

          {(currentCard?.title != null || currentCard?.description != null) && (
            <div className="mt-6 text-center space-y-2 transition-opacity duration-500 ease-out" dir={isRTL ? "rtl" : "ltr"}>
              {currentCard?.title != null && currentCard.title !== "" && (
                <h3 className="text-xl font-semibold text-black">{currentCard.title}</h3>
              )}
              {currentCard?.description != null && currentCard.description !== "" && (
                <p className="text-neutral-600 max-w-2xl mx-auto">{currentCard.description}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="h-1 rounded-full transition-all duration-300 ease-out"
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
