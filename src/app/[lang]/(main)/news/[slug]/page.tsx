import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticlePage from "@/components/article-page/ArticlePage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface ArticlePageProps {
  params: Promise<{
    lang: string
    slug: string
  }>
}

// نصوص الهيدر
const headerTextsEn = {
  main: "Home",
  news: "News",
  ourServices: "Our Services",
  ourRobots: "Robots",
  contactUs: "Contact Us",

}

const headerTextsAr = {
  main: "الرئيسية",
  news: "الأخبار",
  ourServices: "خدماتنا",
  ourRobots: "الروبوتات",
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

