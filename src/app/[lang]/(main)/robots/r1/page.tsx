import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import R1PageContent from "@/components/robots/R1PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface R1PageProps {
  params: Promise<{ lang: string }>
}

export default async function R1Page({ params }: R1PageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <R1PageContent lang={currentLang} />
      </PageTransition>
    </>
  )
}
