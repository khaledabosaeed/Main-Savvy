import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy/WhySavvy"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import GallerySection from "@/components/main-page/sections/GallerySection/GallerySection"
import UnrealHero from "@/components/media-page/sections/UnrealHero/UnrealHero"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Media
const headerTextsEn = {
  content: "Content",
  gallery: "Gallery",
  "why-savvy": "Why Savvy",
  news: "News",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  news: "الأخبار",
  gallery: "معرض الميديا",
  "why-savvy": "لماذا ساڤي",
  content: "الخدمات",
  contactUs: "تواصل معنا",
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/media/media.svg" logoHref="#hero"/>
      <PageTransition>
        <section id="hero">
          <UnrealHero  />
        </section>


        <section id="content" className="bg-white">
          <MediaContent lang={currentLang} />
        </section>

     <section id="why-savvy">
          <WhySavvy lang={currentLang} />
        </section>


        <section id="gallery">
          <GallerySection />
        </section>

   
        {/* Latest News Section */}
        {/* <section id="news">
          <LatestNews />
        </section> */}

      </PageTransition>
    </>
  )
}
