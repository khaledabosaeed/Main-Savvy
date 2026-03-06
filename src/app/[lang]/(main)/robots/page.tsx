import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import RobotsListing from "@/components/robots/RobotsListing"
import type { Language } from "@/data/robots"

interface RobotsPageProps {
  params: Promise<{ lang: string }>
}

const headerTextsEn = {
  main: "Home",
  news: "News",
  projects: "Latest Projects",
  services: "Gallery",
  about: "Our Sections",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  main: "الرئيسية",
  news: "الأخبار",
  projects: "معارضنا السابقة",
  services: "معرض الصور",
  about: "أقسامنا",
  contactUs: "تواصل معنا",
}

export default async function RobotsPage({ params }: RobotsPageProps) {
  const { lang } = await params
  const currentLang = lang as Language
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <RobotsListing lang={currentLang} />
      </PageTransition>
    </>
  )
}
