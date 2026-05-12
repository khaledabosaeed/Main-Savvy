import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import GenericRobotPageContent from "@/components/robots/GenericRobotPageContent"
import DynamicRobotPageContent from "@/components/robots/DynamicRobotPageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { hasLocaleRobotDefinition } from "@/lib/robots-locale"
import { getDictionary } from "@/i18n/getDictionary"
import { getCustomPageForSlug } from "@/lib/robots-custom-page"
import { notFound } from "next/navigation"

interface RobotSlugPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export default async function RobotDynamicSlugPage({ params }: RobotSlugPageProps) {
  const { lang, slug } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)
  const customPage = getCustomPageForSlug(dict, slug)
  const isCustom = customPage !== null
  const isLocaleRobot = hasLocaleRobotDefinition(dict, slug)
  if (!isCustom && !isLocaleRobot) {
    notFound()
  }

  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        {isCustom ? (
          <DynamicRobotPageContent slug={slug} />
        ) : (
          <GenericRobotPageContent slug={slug} lang={lang} />
        )}
      </PageTransition>
    </>
  )
}
