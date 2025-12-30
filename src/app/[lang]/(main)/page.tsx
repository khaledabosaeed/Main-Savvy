"use client"

import { useState, useEffect } from "react"
import NewHero from "@/components/main-page/sections/NewHero/NewHero"
import SavvySections from "@/components/main-page/sections/SavvySections/SavvySections"
import GallerySection from "@/components/main-page/sections/GallerySection/GallerySection"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import TopBanner from "@/components/shared/TopBanner/TopBanner"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"
import { useLanguage } from "@/contexts/LanguageContext"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/ImageSlider/PartnersSlider"

// نصوص الهيدر بالإنجليزية
const headerTextsEn = {
  projects: "Latest Projects",
  about: "Our Sections",
  services: "Gallery",
  contactUs: "Contact Us",
}

// نصوص الهيدر بالعربية
const headerTextsAr = {
  // news: "آخر الأخبار",
  projects: "معارضنا السابقة",
  services: "معرض الصور",
  about: "أقسامنا",
  contactUs: "تواصل معنا",

}

export default function Home() {
  const { language } = useLanguage()
  const lang = language as "en" | "ar"
  const texts = lang === "ar" ? headerTextsAr : headerTextsEn
  const [showBadge, setShowBadge] = useState(true)

  // Example images array - customize as needed
  const sliderImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
    name: `Image ${i + 1}`,
    logo: `/home-page/gallery/image-${i + 1}.jpg`,
  }))


  useEffect(() => {
    const handleScroll = () => {
      // Hide badge when scrolled past hero section (approximately)
      setShowBadge(window.scrollY < 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Banner */}
      <TopBanner />

      {/* UnifiedHeader الديناميكي */}
      <UnifiedHeader texts={texts} showBadge={showBadge} hasBanner={true} logoSrc="/Savvy 2 1.svg" logoAlt="Savvy" />

      {/* Sections مرتبطة بالـ navbar عبر نفس أسماء المفاتيح */}
      <section id="whoWeAre">
        <NewHero />
      </section>

      {/* Partners Slider - outside hero section */}
      <PartnersSlider />

      <section id="about">
        <SavvySections />
      </section>

      <section id="news">
          <ImageSlider images={sliderImages} heading={ lang === "ar" ? "معرض الصور" : "Our Gallery"} />
        </section>
      {/* <section id="services">
        <GallerySection />
      </section> */}

        <section id="projects">
          <LatestProjects />
        </section>
      {/* Latest News Section */}
      {/* <section id="news">
        <LatestNews />
      </section> */}

      



    </>
  )
}
