import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationHero from "@/components/innovation-page/sections/InnovationHero/InnovationHero"
import InnovationSolutions from "@/components/innovation-page/sections/InnovationSolutions/InnovationSolutions"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners/ExpoPartners"

interface InnovationPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بهذه الصفحة
const headerTextsEn = {
  main: "Home",
  news: "News",
  solutions: "Solutions",
  partners: "Partners",
  contactUs: "Contact Us",

}

const headerTextsAr = {
  main: "الرئيسية",
  news: "الأخبار",
  partners: "الشركاء",
  solutions: "الحلول",
  contactUs: "تواصل معنا",

}

export default async function InnovationPage({ params }: InnovationPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"

  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      {/* UnifiedHeader للدعم الديناميكي */}
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/innovation/invo.svg" logoHref="#hero"/>

      <PageTransition>
        <section id="hero">
          <InnovationHero />
        </section>

        <section id="solutions">
          <InnovationSolutions />
        </section>

        {/* Partners Section */}
        <section id="partners">
          <ExpoPartners />
        </section>

        {/* Latest News Section */}
        {/* <section id="news">
          <LatestNews />
        </section> */}
    
  
      </PageTransition>
    </>
  )
}
