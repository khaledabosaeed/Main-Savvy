import PageTransition from "@/components/shared/PageTransition/PageTransition"
import NewsPage from "@/components/news-page/NewsPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"

interface NewsPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة الأخبار
const headerTextsEn = {
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  ourServices: "خدماتنا",
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
        <PromoSection />
      </PageTransition>
    </>
  )
}

