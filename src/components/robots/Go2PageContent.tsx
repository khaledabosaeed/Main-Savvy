"use client"

import RobotHero from "./RobotHero"
import RobotVideoSection from "./RobotVideoSection"
import RobotSingleImageSection from "./RobotSingleImageSection"
import Go2FlexibleSection from "./Go2FlexibleSection"
import { getRobotHeroContent, getRobotImageSectionsBeforeVideo, getRobotImageSectionsBeforeTable } from "@/lib/robots-locale"
import type { Language } from "@/lib/robots-locale"

interface Go2PageContentProps {
  lang: Language
}

export default function Go2PageContent({ lang }: Go2PageContentProps) {
  const heroContent = getRobotHeroContent("go2", lang)
  const beforeVideo = getRobotImageSectionsBeforeVideo("go2", lang)
  const beforeTable = getRobotImageSectionsBeforeTable("go2", lang)

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

      {beforeTable.length > 0 && (
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
          </div>
        </section>
      )}
    </>
  )
}
