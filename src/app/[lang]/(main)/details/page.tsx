import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticleDetailPage from "@/components/article-detail-page/ArticleDetailPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"

interface ArticlePageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر
const headerTextsEn = {
  main: "Home",
  // news: "News",
  ourServices: "Our Services",
  ourRobots: "Robots",
  contactUs: "Contact Us",

}

const headerTextsAr = {
  main: "الرئيسية",
  // news: "الأخبار",
  ourServices: "خدماتنا",
  ourRobots: "الروبوتات",
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
      </PageTransition>
    </>
  )
}

