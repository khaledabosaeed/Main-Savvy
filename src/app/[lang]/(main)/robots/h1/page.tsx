import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import H1PageContent from "@/components/robots/H1PageContent"

interface H1PageProps {
  params: Promise<{ lang: string }>
}

const headerTextsEn = {
  main: "Home",
  news: "News",
  projects: "Latest Projects",
  services: "Gallery",
  about: "Our Sections",
  ourRobots: "Robots",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  main: "الرئيسية",
  news: "الأخبار",
  projects: "معارضنا السابقة",
  services: "معرض الصور",
  about: "أقسامنا",
  ourRobots: "الروبوتات",
  contactUs: "تواصل معنا",
}

export default async function H1Page({ params }: H1PageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <H1PageContent lang={currentLang} />
      </PageTransition>
    </>
  )
}
