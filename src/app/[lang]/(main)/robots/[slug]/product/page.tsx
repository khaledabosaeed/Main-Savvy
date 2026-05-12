import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import DynamicRobotProductSection from "@/components/robots/DynamicRobotProductSection"
import RobotProductDetails from "@/components/robots/RobotProductDetails"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { hasLocaleRobotDefinition } from "@/lib/robots-locale"
import { getDictionary } from "@/i18n/getDictionary"
import {
  getCustomPageForSlug,
  type ProductSectionData,
} from "@/lib/robots-custom-page"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export default async function RobotProductPage({ params }: Props) {
  const { lang, slug } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)
  const customPage = getCustomPageForSlug(dict, slug)
  console.log("robot product page: customPage", customPage )
  let productFromCustom: ProductSectionData | undefined
  if (customPage) {
    const raw = customPage.sections.find((s) => s.type === "product")
    if (raw?.type === "product") productFromCustom = raw
  }

  const texts = await robotsRouteHeaderTexts(lang)

  if (productFromCustom) {
    return (
      <>
        <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
        <PageTransition>
          <DynamicRobotProductSection
            section={productFromCustom}
            routeSlug={slug}
            lang={lang}
          />
        </PageTransition>
      </>
    )
  }

  if (hasLocaleRobotDefinition(dict, slug)) {
    return (
      <>
        <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
        <PageTransition>
          <RobotProductDetails slug={slug} showSpecs />
        </PageTransition>
      </>
    )
  }

  notFound()
}
