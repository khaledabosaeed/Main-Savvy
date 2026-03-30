import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import RobotProductDetails from "@/components/robots/RobotProductDetails"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ lang: string }>
}

export default async function R1ProductPage({ params }: ProductPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotProductDetails slug="r1" />
      </PageTransition>
    </>
  )
}
