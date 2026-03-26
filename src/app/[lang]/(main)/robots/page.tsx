import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import RobotHeroSlider from "@/components/robots/RobotHeroSlider"
import RobotsSection from "@/components/main-page/sections/RobotsSection/RobotsSection"
import ResponsibleUseLink from "@/components/robots/ResponsibleUseLink"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface RobotsPageProps {
  params: Promise<{ lang: string }>
}

export default async function RobotsPage({ params }: RobotsPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const dict = currentLang === "ar" ? ar : en
  const h = robotsRouteHeaderTexts(currentLang)
  const texts = {
    main: h.main,
    ourRobots: dict.common.savvyEStore,
    contactUs: h.contactUs,
  }

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <RobotHeroSlider />
        <RobotsSection />
        <ResponsibleUseLink />
      </PageTransition>
    </>
  )
}
