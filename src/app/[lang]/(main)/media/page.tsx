import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaHero from "@/components/media-page/sections/MediaHero/MediaHero"
import MediaContent from "@/components/media-page/sections/MediaContent/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy/WhySavvy"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"
import GallerySection from "@/components/main-page/sections/GallerySection/GallerySection"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Media
const headerTextsEn = {
  hero: "Hero",
  about: "About",
  projects: "Projects",
  services: "Services",
  partners: "Partners",
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  hero: "الرئيسية",
  about: "عن الميديا",
  projects: "المشاريع",
  services: "الخدمات",
  partners: "الشركاء",
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <section id="hero">
          <MediaHero lang={currentLang} />
        </section>

        <section id="content">
          <MediaContent lang={currentLang} />
        </section>
    
      
        <GallerySection />

        <WhySavvy lang={currentLang} />
              {/* Latest News Section */}
              <LatestNews />

{/* Promo Section */}
<PromoSection />
      </PageTransition>
    </>
  )
}
