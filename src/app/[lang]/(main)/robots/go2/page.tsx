import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import Go2PageContent from "@/components/robots/Go2PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface Go2PageProps {
  params: Promise<{ lang: string }>
}

export default async function Go2Page({ params }: Go2PageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <Go2PageContent lang={lang} />
      </PageTransition>
    </>
  )
}
