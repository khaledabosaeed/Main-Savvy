import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import RobotProductDetails from "@/components/robots/RobotProductDetails"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface ProductPageProps {
  params: Promise<{ lang: string }>
}

export default async function G1ProductPage({ params }: ProductPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotProductDetails slug="g1" />
      </PageTransition>
    </>
  )
}
