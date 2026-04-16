"use client"

import { useTranslation } from "react-i18next"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import RobotHero from "./RobotHero"
import RobotVideoSection from "./RobotVideoSection"
import RobotSingleImageSection from "./RobotSingleImageSection"
import SpecsTable from "./SpecsTable"
import RobotProductDetails from "./RobotProductDetails"
import {
  getRobotHeroContent,
  getRobotImageSectionsBeforeVideo,
  getRobotImageSectionsBeforeTable,
  getRobotSpecsContent,
} from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"
import FormattedText from "@/components/shared/FormattedText"

interface R1PageContentProps {
  lang: Language
}

export default function R1PageContent({ lang }: R1PageContentProps) {
  const dict = useLocaleDictionary()
  const { t } = useTranslation()
  const heroContent = getRobotHeroContent("r1", dict)
  const beforeVideo = getRobotImageSectionsBeforeVideo("r1", dict)
  const beforeTable = getRobotImageSectionsBeforeTable("r1", dict)
  const hasSpecs = !!getRobotSpecsContent("r1", dict)

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
      <RobotVideoSection slug="r1" lang={lang} />
      {beforeVideo.map((item) => (
        <section key={item.image} className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <RobotSingleImageSection
              title={item.title}
              image={item.image}
              lang={lang}
            />
          </div>
        </section>
      ))}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10 space-y-12">
          {beforeTable.map((item) => (
            <RobotSingleImageSection
              key={item.image}
              title={item.title}
              image={item.image}
              lang={lang}
            />
          ))}
          {hasSpecs && (
            <div className="mt-16">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center`}
              >
                <FormattedText text={t("common.specifications")} as="span" />
              </h2>
              <SpecsTable slug="r1" lang={lang} />
            </div>
          )}
        </div>
        <RobotProductDetails slug="r1" showSpecs={false} />

      </section>
    </>
  )
}
