import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationHero from "@/components/innovation-page/sections/InnovationHero/InnovationHero"
import InnovationSolutions from "@/components/innovation-page/sections/InnovationSolutions/InnovationSolutions"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners/ExpoPartners"

interface InnovationPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بهذه الصفحة
const headerTextsEn = {
  hero: "Hero",
  about: "About",
  services: "Services",
  projects: "Projects",
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  hero: "الرئيسية",
  about: "عن الابتكار",
  services: "الخدمات",
  projects: "المشاريع",
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function InnovationPage({ params }: InnovationPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"

  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      {/* UnifiedHeader للدعم الديناميكي */}
      <UnifiedHeader texts={texts} hasBanner={false} />

      <PageTransition>
        <section id="hero">
          <InnovationHero />
        </section>

        <section id="solutions">
          <InnovationSolutions />
        </section>

        {/* Partners Section */}
        <ExpoPartners />

        {/* Latest News Section */}
        <LatestNews />

        {/* Promo Section */}
        <PromoSection />
      </PageTransition>
    </>
  )
}
