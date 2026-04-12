"use client"

import { ScrollVideoBlock } from "@/components/robots/ScrollVideoBlock"
import { getG1ScrollSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface G1ScrollVideoSectionProps {
  lang: Language
}

export default function G1ScrollVideoSection({ lang }: G1ScrollVideoSectionProps) {
  const items = getG1ScrollSectionContent(lang)
  if (items.length === 0) return null

  const isRTL = lang === "ar"

  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="container mx-auto flex flex-col gap-16 px-4 md:gap-20 md:px-6">
        {items.map((item, index) => (
          <ScrollVideoBlock key={index} item={item} isRTL={isRTL} />
        ))}
      </div>
    </section>
  )
}
  