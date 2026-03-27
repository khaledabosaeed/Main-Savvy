import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import H2PageContent from "@/components/robots/H2PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface H2PageProps {
  params: Promise<{ lang: string }>
}

export default async function H2Page({ params }: H2PageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <H2PageContent lang={currentLang} />
      </PageTransition>
    </>
  )
}
