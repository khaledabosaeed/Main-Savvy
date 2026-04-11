"use client"

import RobotHero from "./RobotHero"
import G1ScrollVideoSection from "./G1ScrollVideoSection"
import RobotVideoSection from "./RobotVideoSection"
import G1FlexibleCarousel from "./G1FlexibleCarousel"
import G1ParameterSection from "./G1ParameterSection"
import SpecsTable from "./SpecsTable"
import { getRobotHeroContent } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"
import en from "@/../public/locales/en.json"
import ar from "@/../public/locales/ar.json"

interface RobotPageContentProps {
  slug: RobotSlug
  lang: Language
}

export default function RobotPageContent({ slug, lang }: RobotPageContentProps) {
  const heroContent = getRobotHeroContent(slug, lang)

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
      />
      {slug === "g1" && (
        <>
          <G1FlexibleCarousel lang={lang} />
          <G1ScrollVideoSection lang={lang} />
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6 md:px-10">
              <G1ParameterSection lang={lang} />
              <div className="mt-8">
                <h2
                  className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {(lang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
                </h2>
                <SpecsTable slug="g1" lang={lang} />
              </div>
            </div>
          </section>
        </>
      )}
      {slug === "h2" && (
        <>  
          <RobotVideoSection slug="h2" lang={lang} />
          <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <h2
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              {(lang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
            </h2>
            <SpecsTable slug="h2" lang={lang} singleColumn />
          </div>
        </section>
        </>
      )}
    </>
  )
}
