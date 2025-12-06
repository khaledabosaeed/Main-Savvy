import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaHero from "@/components/media-page/sections/MediaHero/MediaHero"
import MediaContent from "@/components/media-page/sections/MediaContent/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy/WhySavvy"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import GallerySection from "@/components/main-page/sections/GallerySection/GallerySection"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Media
const headerTextsEn = {
  hero: "Hero",
  content: "Content",
  gallery: "Gallery",
  "why-savvy": "Why Savvy",
  news: "News",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  hero: "الرئيسية",
  content: "المحتوى",
  gallery: "معرض الميديا",
  "why-savvy": "لماذا سافي",
  news: "الأخبار",
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
    
        <section id="gallery">
          <GallerySection />
        </section>

        <section id="why-savvy">
          <WhySavvy lang={currentLang} />
        </section>

        {/* Latest News Section */}
        <section id="news">
          <LatestNews />
        </section>

      </PageTransition>
    </>
  )
}
