"use client"

import { getG1ScrollSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface G1ScrollVideoSectionProps {
  lang: Language
}

export default function G1ScrollVideoSection({ lang }: G1ScrollVideoSectionProps) {
  const content = getG1ScrollSectionContent(lang)
  const isRTL = lang === "ar"

  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-8 md:gap-10">
        <div
          className="w-full max-w-4xl mx-auto text-center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {content.scrollTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {content.scrollSubtitle}
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl mx-auto"
          style={{
            width: "min(700px, 85vw)",
            height: "min(400px, 50vh)",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={content.scrollVideoSrc}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
  