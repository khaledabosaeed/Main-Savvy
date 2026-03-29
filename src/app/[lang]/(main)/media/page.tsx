import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import MadiaProjects from "@/components/shared/mdia-projects/LatestProjects"
import UnrealHero from "@/components/media-page/sections/UnrealHero"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}


export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const dict = currentLang === "ar" ? ar : en
  const c = dict.common

  const texts = {
    main: c.main,
    news: c.news,
    gallery: c.gallery,
    "why-savvy": c.whySavvy,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/media/media.svg" logoHref="#hero" />
      <PageTransition>
        <MadiaProjects />

        <section id="content" className="bg-white">
          <MediaContent />
        </section>
        <section id="hero">
          <UnrealHero />
        </section>

        <section id="why-savvy">
          <WhySavvy />
        </section>
      </PageTransition>
    </>
  )
}
