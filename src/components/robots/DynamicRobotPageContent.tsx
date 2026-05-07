"use client"

import RobotHero from "./RobotHero"
import RobotImageSection from "./RobotImageSection"
import DynamicRobotProductSection from "./DynamicRobotProductSection"
import DynamicSpecsSection from "./DynamicSpecsSection"
import DynamicCarouselSection from "./DynamicCarouselSection"
import { ScrollVideoBlock } from "@/components/robots/ScrollVideoBlock"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "@/lib/robots-locale"
import {
  getCustomPageForSlug,
  type RobotPageSectionData,
} from "@/lib/robots-custom-page"

export default function DynamicRobotPageContent({
  slug,
}: {
  slug: string
}) {
  const dict = useLocaleDictionary()
  const { language } = useLanguage()
  const lang = language as Language

  const page = getCustomPageForSlug(dict, slug)
  if (!page) return null

  const sections = page.sections.filter((s) => s.type !== "catalogCard")

  return (
    <>
      {sections.map((section, index) => (
        <SectionRenderer
          key={`${section.type}-${index}`}
          section={section}
          slug={slug}
          lang={lang}
        />
      ))}
    </>
  )
}

function SectionRenderer({
  section,
  slug,
  lang,
}: {
  section: RobotPageSectionData
  slug: string
  lang: Language
}) {
  const isRTL = lang === "ar"

  switch (section.type) {
    case "hero": {
      const poster = section.posterImage?.trim() || undefined
      return (
        <RobotHero
          videoSrc={section.videoSrc}
          title={section.title}
          subtitle={section.subtitle}
          buttonText={section.buttonText}
          productLink={`/${lang}/robots/${slug}/product`}
          textPlacement={section.textPlacement}
          poster={poster}
          features={section.features}
          isRTL={isRTL}
        />
      )
    }
    case "product":
      return (
        <DynamicRobotProductSection
          section={section}
          routeSlug={slug}
          lang={lang}
        />
      )
    case "specs":
      return <DynamicSpecsSection data={section} lang={lang} />
    case "scrollVideo":
      return (
        <section className="relative w-full bg-black py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-20">
            {section.items.map((item, index) => (
              <ScrollVideoBlock
                key={index}
                item={{
                  scrollVideoSrc: item.videoSrc,
                  scrollTitle: item.title,
                  scrollSubtitle: item.subtitle,
                }}
                isRTL={isRTL}
              />
            ))}
          </div>
        </section>
      )
    case "image":
      return (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <RobotImageSection
            title={section.title}
            images={section.images}
            lang={lang}
          />
        </section>
      )
    case "carousel":
      return <DynamicCarouselSection data={section} lang={lang} />
    default:
      return null
  }
}
