import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import H2PageContent from "@/components/robots/H2PageContent"
import { robotsRouteHeaderTexts } from "@/lib/robots-route-header"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface H2PageProps {
  params: Promise<{ lang: string }>
}

export default async function H2Page({ params }: H2PageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = await robotsRouteHeaderTexts(lang)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <H2PageContent lang={lang} />
      </PageTransition>
    </>
  )
}
