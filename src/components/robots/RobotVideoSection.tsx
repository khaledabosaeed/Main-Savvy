"use client"

import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { ScrollVideoBlock } from "@/components/robots/ScrollVideoBlock"
import { getRobotScrollSectionContent } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"

interface RobotVideoSectionProps {
  slug: RobotSlug
  lang: Language
}

export default function RobotVideoSection({ slug, lang }: RobotVideoSectionProps) {
  const dict = useLocaleDictionary()
  const items = getRobotScrollSectionContent(slug, dict)
  if (items.length === 0) return null

  const isRTL = lang === "ar"

  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-20">
        {items.map((item, index) => (
          <ScrollVideoBlock key={index} item={item} isRTL={isRTL} />
        ))}
      </div>
    </section>
  )
}
