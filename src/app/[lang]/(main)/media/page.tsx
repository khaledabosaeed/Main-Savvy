import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy/WhySavvy"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import MadiaProjects from "@/components/shared/mdia-projects/LatestProjects"

import UnrealHero from "@/components/media-page/sections/UnrealHero/UnrealHero"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/ImageSlider/PartnersSlider"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Media
const headerTextsEn = {
  // content: "Content",
  main: "Home",
  news: "News",
  gallery: "Our Gallery",
  "why-savvy": "Why Savvy",
  ourRobots: "Robots",
  contactUs: "Contact Us",

}

const headerTextsAr = {
  // gallery: "معرض الصور",
  main: "الرئيسية",
  news: "الأخبار",
  "why-savvy": "لماذا ساڤي",
  content: "المحتوى",
  ourRobots: "الروبوتات",
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

      <MadiaProjects  />

      <section id="content" className="bg-white">
          <MediaContent lang={currentLang} />
        </section>
        <section id="hero">
          <UnrealHero  />
        </section>




     <section id="why-savvy">
          <WhySavvy lang={currentLang} />
        </section>




      </PageTransition>
    </>
  )
}
