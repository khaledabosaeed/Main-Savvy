import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ExpoHero from "@/components/expo-page/sections/ExpoHero/ExpoHero"
import ExpoServices from "@/components/expo-page/sections/ExpoServices/ExpoServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners/ExpoPartners"

interface ExpoPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Expo
const headerTextsEn = {
  hero: "Hero",
  services: "Services",
  projects: "Projects",
  partners: "Partners",
  news: "News",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  news: "الأخبار",
  partners: "الشركاء",
  projects: "المشاريع",
  services: "الخدمات",
  hero: "الرئيسية",
  contactUs: "تواصل معنا",
}

export default async function ExpoPage({ params }: ExpoPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/expo/expo.svg" logoAlt="Savvy" logoHref="#hero" />
      <PageTransition>
        <section id="hero">
          <ExpoHero lang={currentLang} />
        </section>

        <section id="services">
          <ExpoServices lang={currentLang} />
        </section>
        <section id="projects">
          <LatestProjects />
        </section>

        {/* Partners Section */}
        <section id="partners">
          <ExpoPartners />
        </section>

        {/* Latest News Section */}
        <section id="news">
          <LatestNews />
        </section>

      </PageTransition>
    </>
  )
}
