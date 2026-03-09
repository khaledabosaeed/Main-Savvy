"use client"

import RobotHero from "./RobotHero"
import { getRobotHeroContent } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"

interface RobotPageContentProps {
  slug: RobotSlug
  lang: Language
}

export default function RobotPageContent({ slug, lang }: RobotPageContentProps) {
  const heroContent = getRobotHeroContent(slug, lang)

  return (
    <RobotHero
      videoSrc={heroContent.videoSrc}
      title={heroContent.title}
      subtitle={heroContent.subtitle}
      priceStartsFrom={heroContent.priceStartsFrom}
      buttonText={heroContent.buttonText}
      productLink={`/${lang}/robots/${slug}/product`}
      textPlacement={heroContent.textPlacement}
    />
  )
}
