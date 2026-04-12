import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import R1PageContent from "@/components/robots/R1PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface R1PageProps {
  params: Promise<{ lang: string }>
}

export default async function R1Page({ params }: R1PageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <R1PageContent lang={lang} />
      </PageTransition>
    </>
  )
}
