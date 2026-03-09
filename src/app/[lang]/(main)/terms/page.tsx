import PageTransition from "@/components/shared/PageTransition/PageTransition"
import TermsPage from "@/components/terms-page/TermsPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface TermsPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة شروط الاستخدام
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

export default async function Terms({ params }: TermsPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <TermsPage lang={currentLang} />
      </PageTransition>
    </>
  )
}

