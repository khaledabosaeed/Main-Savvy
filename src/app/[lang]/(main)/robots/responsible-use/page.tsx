import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import RobotResponsibleUsePage from "@/components/robots/RobotResponsibleUsePage/RobotResponsibleUsePage"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface ResponsibleUsePageProps {
  params: Promise<{ lang: string }>
}

export default async function ResponsibleUsePage({ params }: ResponsibleUsePageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotResponsibleUsePage />
      </PageTransition>
    </>
  )
}
