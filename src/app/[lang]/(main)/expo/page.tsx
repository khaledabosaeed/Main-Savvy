import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ExpoHero from "@/components/expo-page/sections/ExpoHero"
import ExpoServices from "@/components/expo-page/sections/ExpoServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/PartnersSlider"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface ExpoPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function ExpoPage({ params }: ExpoPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const dict = currentLang === "ar" ? ar : en
  const c = dict.common

  const texts = {
    main: c.main,
    news: c.news,
    services: c.servicesLabel,
    projects: c.projects,
    partners: c.partnersLabel,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }

  const sliderImages: ImageItem[] = Array.from({ length: 29 }, (_, i) => ({
    name: `Image ${i + 1}`,
    logo: `/media/slider/${i + 1}.png`,
  }))

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/expo/expo.svg" logoAlt="Savvy" logoHref="#hero" />
      <PageTransition>
        <section id="hero">
          <ExpoHero />
        </section>

        <section id="services">
          <ExpoServices />
        </section>
        <section id="projects">
          <LatestProjects />
        </section>
        <section id="news">
          <ImageSlider images={sliderImages} />
        </section>

        <section id="partners">
          <ExpoPartners />
        </section>
      </PageTransition>
    </>
  )
}
