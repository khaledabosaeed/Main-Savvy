"use client"

import Image from "next/image"
import { getG1ParameterSectionContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface G1ParameterSectionProps {
  lang: Language
}

export default function G1ParameterSection({ lang }: G1ParameterSectionProps) {
  const content = getG1ParameterSectionContent(lang)
  if (!content) return null

  const isRTL = lang === "ar"

  return (
    <section className="w-full">
      <h3
        className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {content.header}
      </h3>
      {content.image && (
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={content.image}
            alt={content.header}
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}
    </section>
  )
}
