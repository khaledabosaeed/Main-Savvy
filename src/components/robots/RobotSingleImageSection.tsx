"use client"

import Image from "next/image"
import type { Language } from "@/lib/robots-locale"

export interface RobotSingleImageSectionProps {
  title?: string
  image: string
  lang: Language
}

export default function RobotSingleImageSection({
  title,
  image,
  lang,
}: RobotSingleImageSectionProps) {
  const isRTL = lang === "ar"

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
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title ?? "Robot"}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          sizes="100vw"
        />
      </div>
    </section>
  )
}
