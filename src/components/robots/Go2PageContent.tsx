"use client"

import RobotHero from "./RobotHero"
import RobotVideoSection from "./RobotVideoSection"
import RobotSingleImageSection from "./RobotSingleImageSection"
import Go2FlexibleSection from "./Go2FlexibleSection"
import SpecsTable from "./SpecsTable"
import {
  getRobotHeroContent,
  getRobotImageSectionsBeforeVideo,
  getRobotImageSectionsBeforeTable,
  getRobotSpecsContent,
} from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"
import en from "@/../public/locales/en.json"
import ar from "@/../public/locales/ar.json"

interface Go2PageContentProps {
  lang: Language
}

export default function Go2PageContent({ lang }: Go2PageContentProps) {
  const heroContent = getRobotHeroContent("go2", lang)
  const beforeVideo = getRobotImageSectionsBeforeVideo("go2", lang)
  const beforeTable = getRobotImageSectionsBeforeTable("go2", lang)
  const hasSpecs = !!getRobotSpecsContent("go2", lang)

  return (
    <>
      <RobotHero
        videoSrc={heroContent.videoSrc}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        priceStartsFrom={heroContent.priceStartsFrom}
        buttonText={heroContent.buttonText}
        productLink={`/${lang}/robots/go2/product`}
        textPlacement={heroContent.textPlacement}
      />
      <RobotVideoSection slug="go2" lang={lang} />
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
            <Go2FlexibleSection lang={lang} />

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
                {(lang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
              </h2>
              <SpecsTable slug="go2" lang={lang} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
