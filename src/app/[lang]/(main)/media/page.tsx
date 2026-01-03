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
  content: "Content",
  gallery: "Gallery",
  "why-savvy": "Why Savvy",
  // news: "News",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  // news: "الأخبار",
  gallery: "معرض الميديا",
  "why-savvy": "لماذا ساڤي",
  content: "الخدمات",
  contactUs: "تواصل معنا",
} 

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn


  const images: ImageItem[] =[
    {
       name: `Image 1`,
       logo:   '/home-page/gallery/image-1.jpg'
      },

    {
       name: `Image 2`,
    logo:   '/home-page/gallery/image-2.jpg'}  
,   
    {
       name: `Image 3`,
logo:   '/home-page/gallery/image-3.jpg'}    ,  
    {
       name: `Image 4`,
logo:   '/home-page/gallery/image-4.jpg'}    ,    
    {
       name: `Image 5`,
logo:   '/home-page/gallery/image-5.jpg'}    ,    
    {
       name: `Image 6`,
logo:   '/home-page/gallery/image-6.jpg'}    ,   
    {
       name: `Image 7`,
logo:   '/home-page/gallery/image-7.jpg'}
,       {
       name: `Image 7`,
logo:   '/home-page/gallery/image-8.jpg'}
,       {
       name: `Image 7`,
logo:   '/home-page/gallery/image-9.jpg'},
     {
       name: `Image 7`,
logo:   '/home-page/gallery/image-10.jpg'}, 
     {
       name: `Image 7`,
logo:   '/home-page/gallery/image-11.png'}, 
     {
       name: `Image 7`,
logo:   '/home-page/gallery/image-12.png'}

]

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/media/media.svg" logoHref="#hero"/>
      <PageTransition>
        <section id="hero">
          <UnrealHero  />
        </section>
 
        <section id="content" className="bg-white">
          <MadiaProjects  />
        </section>

        <section id="content" className="bg-white">
          <MediaContent lang={currentLang} />
        </section>

     <section id="why-savvy">
          <WhySavvy lang={currentLang} />
        </section>


      <section id="news">
          <ImageSlider images={images} heading={ lang === "ar" ? "معرض الصور" : "Our Gallery"} />
        </section>


      </PageTransition>
    </>
  )
}
