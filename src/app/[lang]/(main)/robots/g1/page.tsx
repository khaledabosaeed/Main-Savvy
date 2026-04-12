import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import G1PageContent from "@/components/robots/G1PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface G1PageProps {
  params: Promise<{ lang: string }>
}

export default async function G1Page({ params }: G1PageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <G1PageContent lang={lang} />
      </PageTransition>
    </>
  )
}
