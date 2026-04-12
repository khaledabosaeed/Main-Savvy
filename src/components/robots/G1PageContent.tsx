"use client"

import RobotHero from "./RobotHero"
import G1ScrollVideoSection from "./G1ScrollVideoSection"
import G1FlexibleCarousel from "./G1FlexibleCarousel"
import G1ParameterSection from "./G1ParameterSection"
import SpecsTable from "./SpecsTable"
import RobotProductDetails from "./RobotProductDetails"
import { getRobotHeroContent } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"
import en from "@/../public/locales/en.json"
import ar from "@/../public/locales/ar.json"

interface G1PageContentProps {
  lang: Language
}

export default function G1PageContent({ lang }: G1PageContentProps) {
  const heroContent = getRobotHeroContent("g1", lang)

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
        features={heroContent.features}
        isRTL={lang === "ar"}
      />
      <G1ScrollVideoSection lang={lang} />
      <G1FlexibleCarousel lang={lang} />
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <G1ParameterSection lang={lang} />
          <div className="mt-16">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center`}
            >
              {(lang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
            </h2>
            <SpecsTable slug="g1" lang={lang} />
          </div>
        </div>
        <RobotProductDetails slug="g1" showSpecs={false} />

      </section>
    </>
  )
}
