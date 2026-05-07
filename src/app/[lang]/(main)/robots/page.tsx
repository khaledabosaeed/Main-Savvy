import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import RobotsCatalogClient from "@/components/robots/catalog/RobotsCatalogClient"
import { robotsIndexHeaderTexts } from "@/i18n/page-header-texts"
import { getDictionary } from "@/i18n/getDictionary"
import { getRobotCatalogCards } from "@/lib/robots-locale"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface RobotsCatalogPageProps {
  params: Promise<{ lang: string }>
}

export default async function RobotsCatalogPage({ params }: RobotsCatalogPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)
  const cards = getRobotCatalogCards(dict)
  const texts = robotsIndexHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotsCatalogClient cards={cards} lang={lang} />
      </PageTransition>
    </>
  )
}
