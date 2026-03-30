import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import RobotResponsibleUsePage from "@/components/robots/RobotResponsibleUsePage"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ResponsibleUsePageProps {
  params: Promise<{ lang: string }>
}

export default async function ResponsibleUsePage({ params }: ResponsibleUsePageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotResponsibleUsePage />
      </PageTransition>
    </>
  )
}
