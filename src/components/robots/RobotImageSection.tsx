"use client"

import Image from "next/image"
import FormattedText from "@/components/shared/FormattedText"
import {
  normalizeRobotImageSlides,
  type RobotImageSlide,
} from "@/lib/robots-custom-page"
import { richTextToPlainText } from "@/lib/rich-text"

export interface RobotImageSectionProps {
  title?: string
  images: RobotImageSlide[]
}

const TITLE_CLASSES =
  "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center"

export default function RobotImageSection({
  title,
  images,
}: RobotImageSectionProps) {
  const slides = normalizeRobotImageSlides(images).filter((s) => s.url.trim())

  if (!slides.length) return null

  const sectionHeading = title?.trim()

  return (
    <div className="w-full flex flex-col gap-10 md:gap-14">
      {sectionHeading && (
        <h3 className={TITLE_CLASSES}>
          <FormattedText text={sectionHeading} as="span" />
        </h3>
      )}
      <div className="flex flex-col gap-10 md:gap-14">
        {slides.map((slide, i) => {
          const caption = slide.title?.trim()
          const altTail = caption || sectionHeading || "Robot image"
          return (
            <section key={`${slide.url}-${i}`} className="w-full">
              {caption && (
                <h3 className={TITLE_CLASSES}>
                  <FormattedText text={caption} as="span" />
                </h3>
              )}
              <div className="relative w-full overflow-hidden rounded-xl">
                <Image
                  src={slide.url}
                  alt={richTextToPlainText(altTail)}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
