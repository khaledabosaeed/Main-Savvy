"use client"

import Image from "next/image"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { getG1ParameterSectionContent } from "@/lib/robots-locale"

export default function G1ParameterSection() {
  const dict = useLocaleDictionary()
  const content = getG1ParameterSectionContent(dict)
  if (!content) return null


  return (
    <section className="w-full">
      <h3
        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center`}
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
