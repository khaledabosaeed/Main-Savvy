import PageTransition from "@/components/shared/PageTransition/PageTransition"
import PrivacyPage from "@/components/privacy-page/PrivacyPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface PrivacyPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة الخصوصية
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

export default async function Privacy({ params }: PrivacyPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <PrivacyPage lang={currentLang} />

      </PageTransition>
    </>
  )
}

