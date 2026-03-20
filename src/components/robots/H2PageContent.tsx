"use client"

import RobotHero from "./RobotHero"
import RobotVideoSection from "./RobotVideoSection"
import RobotSingleImageSection from "./RobotSingleImageSection"
import SpecsTable from "./SpecsTable"
import {
  getRobotHeroContent,
  getRobotImageSectionsBeforeVideo,
  getRobotImageSectionsBeforeTable,
} from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"
import en from "@/../public/locales/en.json"
import ar from "@/../public/locales/ar.json"

interface H2PageContentProps {
  lang: Language
}

export default function H2PageContent({ lang }: H2PageContentProps) {
  const heroContent = getRobotHeroContent("h2", lang)

  return (
    <>
      <RobotHero
        videoSrc={heroContent.videoSrc}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        priceStartsFrom={heroContent.priceStartsFrom}
        buttonText={heroContent.buttonText}
        productLink={`/${lang}/robots/h2/product`}
        textPlacement={heroContent.textPlacement}
      />
            <RobotVideoSection slug="h2" lang={lang} />

      {getRobotImageSectionsBeforeVideo("h2", lang).map((item) => (
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
          {getRobotImageSectionsBeforeTable("h2", lang).map((item) => (
            <RobotSingleImageSection
              key={item.image}
              title={item.title}
              image={item.image}
              lang={lang}
            />
          ))}
          <div className="mt-8">
            <h2
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              {(lang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
            </h2>
            <SpecsTable slug="h2" lang={lang} />
          </div>
        </div>
      </section>
    </>
  )
}
