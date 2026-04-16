"use client"

import { useTranslation } from "react-i18next"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import RobotHero from "./RobotHero"
import G1ScrollVideoSection from "./G1ScrollVideoSection"
import RobotVideoSection from "./RobotVideoSection"
import G1FlexibleCarousel from "./G1FlexibleCarousel"
import G1ParameterSection from "./G1ParameterSection"
import SpecsTable from "./SpecsTable"
import { getRobotHeroContent } from "@/lib/robots-locale"
import FormattedText from "@/components/shared/FormattedText"
import type { RobotSlug, Language } from "@/lib/robots-locale"

interface RobotPageContentProps {
  slug: RobotSlug
  lang: Language
}

export default function RobotPageContent({ slug, lang }: RobotPageContentProps) {
  const dict = useLocaleDictionary()
  const { t } = useTranslation()
  const heroContent = getRobotHeroContent(slug, dict)

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
              <G1ParameterSection />
              <div className="mt-8">
                <h2
                  className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  <FormattedText text={t("common.specifications")} as="span" />
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
              <FormattedText text={t("common.specifications")} as="span" />
            </h2>
            <SpecsTable slug="h2" lang={lang} singleColumn />
          </div>
        </section>
        </>
      )}
    </>
  )
}
