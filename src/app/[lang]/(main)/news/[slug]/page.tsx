import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticlePage from "@/components/article-page/ArticlePage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { newsSectionHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: Promise<{ lang: string; slug: string }>
}

export default async function Article({ params }: ArticlePageProps) {
  const { lang, slug } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = newsSectionHeaderTexts(getDictionary(lang))

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <ArticlePage lang={lang} slug={slug} />
      </PageTransition>
    </>
  )
}
