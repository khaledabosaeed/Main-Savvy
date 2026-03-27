import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import G1PageContent from "@/components/robots/G1PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface G1PageProps {
  params: Promise<{ lang: string }>
}

export default async function G1Page({ params }: G1PageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <G1PageContent lang={currentLang} />
      </PageTransition>
    </>
  )
}
