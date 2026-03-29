import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationHero from "@/components/innovation-page/sections/InnovationHero"
import InnovationSolutions from "@/components/innovation-page/sections/InnovationSolutions"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners"
import RobotsSection from "@/components/main-page/sections/RobotsSection"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface InnovationPageProps {
  params: Promise<{
    lang: string
  }>
}


export default async function InnovationPage({ params }: InnovationPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const dict = currentLang === "ar" ? ar : en
  const c = dict.common

  const texts = {
    main: c.main,
    solutions: c.solutions,
    partners: c.partnersLabel,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/innovation/invo.svg" logoHref="#hero" />

      <PageTransition>
        <section id="hero">
          <InnovationHero />
        </section>

        <section id="solutions">
          <InnovationSolutions />
        </section>

        <section id="partners">
          <ExpoPartners />
        </section>

        <section id="robots">
          <RobotsSection />
        </section>
      </PageTransition>
    </>
  )
}
