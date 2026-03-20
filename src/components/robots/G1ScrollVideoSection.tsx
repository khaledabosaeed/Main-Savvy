"use client"

import { getG1ScrollSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface G1ScrollVideoSectionProps {
  lang: Language
}

function VideoBlock({
  item,
  isRTL,
}: {
  item: { scrollVideoSrc: string; scrollTitle: string; scrollSubtitle: string }
  isRTL: boolean
}) {
  return (
    <div className="flex flex-col w-full gap-8 md:gap-10">
      <div
        className="w-full text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {item.scrollTitle}
        </h2>
        <p className="text-lg md:text-xl text-white/90 w-full">
          {item.scrollSubtitle}
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden w-full overflow-hidden aspect-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={item.scrollVideoSrc}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </div>
  )
}

export default function G1ScrollVideoSection({ lang }: G1ScrollVideoSectionProps) {
  const items = getG1ScrollSectionContent(lang)
  if (items.length === 0) return null

  const isRTL = lang === "ar"

  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 flex flex-col gap-16 md:gap-20">
        {items.map((item, index) => (
          <VideoBlock key={index} item={item} isRTL={isRTL} />
        ))}
      </div>
    </section>
  )
}
  