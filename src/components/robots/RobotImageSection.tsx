"use client"

import Image from "next/image"
import type { Language } from "@/lib/robots-locale"

export interface RobotImageSectionProps {
  title?: string
  images: string[]
  lang: Language
}

export default function RobotImageSection({
  title,
  images,
  lang,
}: RobotImageSectionProps) {
  const isRTL = lang === "ar"

  if (!images?.length) return null

  return (
    <section className="w-full">
      {title && (
        <h3
          className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4 md:gap-6">
        {images.map((src) => (
          <div
            key={src}
            className="relative w-full overflow-hidden rounded-xl aspect-[4/3]"
          >
            <Image
              src={src}
              alt={title ?? "Robot"}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
