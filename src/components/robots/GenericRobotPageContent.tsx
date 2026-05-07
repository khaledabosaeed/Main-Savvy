"use client"

import RobotHero from "./RobotHero"
import RobotProductDetails from "./RobotProductDetails"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import {
  getRobotHeroContent,
  getRobotProductContent,
  type Language,
  type PuduRobotSlug,
} from "@/lib/robots-locale"

interface GenericRobotPageContentProps {
  slug: PuduRobotSlug
  lang: Language
}

export default function GenericRobotPageContent({ slug, lang }: GenericRobotPageContentProps) {
  const dict = useLocaleDictionary()
  const heroContent = getRobotHeroContent(slug, dict)
  const product = getRobotProductContent(slug, dict)
  const poster = product.images[0]

  return (
    <>
      <RobotHero
        videoSrc={heroContent.videoSrc}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        priceStartsFrom={heroContent.priceStartsFrom}
        buttonText={heroContent.buttonText}
        productLink={`/${lang}/contact`}
        textPlacement={heroContent.textPlacement}
        poster={poster}
      />
      <RobotProductDetails slug={slug} showSpecs />
    </>
  )
}
