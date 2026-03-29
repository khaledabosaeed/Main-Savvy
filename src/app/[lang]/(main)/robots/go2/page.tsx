import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import Go2PageContent from "@/components/robots/Go2PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"

interface Go2PageProps {
  params: Promise<{ lang: string }>
}


export default async function Go2Page({ params }: Go2PageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = robotsRouteHeaderTexts(currentLang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <Go2PageContent lang={currentLang} />
      </PageTransition>
    </>
  )
}
