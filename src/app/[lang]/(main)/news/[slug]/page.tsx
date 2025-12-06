import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticlePage from "@/components/article-page/ArticlePage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"

interface ArticlePageProps {
  params: Promise<{
    lang: string
    slug: string
  }>
}

// نصوص الهيدر
const headerTextsEn = {
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function Article({ params }: ArticlePageProps) {
  const { lang, slug } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <ArticlePage lang={currentLang} slug={slug} />
      </PageTransition>
    </>
  )
}

