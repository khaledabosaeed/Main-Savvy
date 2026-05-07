import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import GenericRobotPageContent from "@/components/robots/GenericRobotPageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { isPuduRobotSlug, type PuduRobotSlug } from "@/lib/robots-locale"
import { notFound } from "next/navigation"

interface RobotSlugPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export default async function RobotDynamicSlugPage({ params }: RobotSlugPageProps) {
  const { lang, slug } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  if (!isPuduRobotSlug(slug)) {
    notFound()
  }

  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <GenericRobotPageContent slug={slug as PuduRobotSlug} lang={lang} />
      </PageTransition>
    </>
  )
}
