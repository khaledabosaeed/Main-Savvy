import PageTransition from "@/components/shared/PageTransition/PageTransition"
import NewsPage from "@/components/news-page/NewsPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { newsSectionHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface NewsPageProps {
  params: Promise<{ lang: string }>
}

export default async function News({ params }: NewsPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = newsSectionHeaderTexts(getDictionary(lang))

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <NewsPage lang={lang} />
      </PageTransition>
    </>
  )
}
