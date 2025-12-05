import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticleDetailPage from "@/components/article-detail-page/ArticleDetailPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"

interface ArticlePageProps {
  params: Promise<{
    lang: string
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <ArticleDetailPage lang={currentLang} />
        <PromoSection />
      </PageTransition>
    </>
  )
}

