"use client"

import RobotHero from "../RobotHero"
import { getRobotHeroContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface Go2PageContentProps {
  lang: Language
}

export default function Go2PageContent({ lang }: Go2PageContentProps) {
  const heroContent = getRobotHeroContent("go2", lang)

  return (
    <RobotHero
      videoSrc={heroContent.videoSrc}
      title={heroContent.title}
      subtitle={heroContent.subtitle}
      priceStartsFrom={heroContent.priceStartsFrom}
      buttonText={heroContent.buttonText}
      productLink={`/${lang}/robots/go2/product`}
      textPlacement={heroContent.textPlacement}
    />
  )
}
