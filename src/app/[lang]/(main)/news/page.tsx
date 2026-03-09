import PageTransition from "@/components/shared/PageTransition/PageTransition"
import NewsPage from "@/components/news-page/NewsPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface NewsPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة الأخبار
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

export default async function News({ params }: NewsPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <NewsPage lang={currentLang} />
      </PageTransition>
    </>
  )
}

