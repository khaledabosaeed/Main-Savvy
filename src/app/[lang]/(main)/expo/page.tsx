import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ExpoHero from "@/components/expo-page/sections/ExpoHero/ExpoHero"
import ExpoServices from "@/components/expo-page/sections/ExpoServices/ExpoServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners/ExpoPartners"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/ImageSlider/PartnersSlider"

interface ExpoPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Expo
const headerTextsEn = {
  services: "Services",
  projects: "Latest Projects",
  partners: "Partners",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  partners: "الشركاء",
  projects: "معارضنا السابقة ",
  services: "الخدمات",
  contactUs: "تواصل معنا",
}

export default async function ExpoPage({ params }: ExpoPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  // Example images array - customize as needed
  const sliderImages: ImageItem[] = Array.from({ length: 29 }, (_, i) => ({
    name: `Image ${i + 1}`,
    logo: `/media/slider/${i + 1}.png`,
  }))

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
                   {/* Latest News Section */}
        <section id="news">
          <ImageSlider images={sliderImages} />
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
