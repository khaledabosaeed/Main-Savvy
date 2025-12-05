import PageTransition from "@/components/shared/PageTransition/PageTransition"
import PrivacyPage from "@/components/privacy-page/PrivacyPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"

interface PrivacyPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة الخصوصية
const headerTextsEn = {
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  ourServices: "خدماتنا",
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
        <PromoSection />

      </PageTransition>
    </>
  )
}

