import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import RobotHeroSlider from "@/components/robots/RobotHeroSlider"
import RobotsSection from "@/components/main-page/sections/RobotsSection"
import ResponsibleUseLink from "@/components/robots/ResponsibleUseLink"
import { getDictionary } from "@/i18n/getDictionary"
import { robotsIndexHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface RobotsPageProps {
  params: Promise<{ lang: string }>
}

export default async function RobotsPage({ params }: RobotsPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = getDictionary(lang)
  const texts = robotsIndexHeaderTexts(dict)

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
