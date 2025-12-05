"use client"

import { useState, useEffect } from "react"
import NewHero from "@/components/main-page/sections/NewHero/NewHero"
import SavvySections from "@/components/main-page/sections/SavvySections/SavvySections"
import GallerySection from "@/components/main-page/sections/GallerySection/GallerySection"
import LatestNews from "@/components/main-page/sections/LatestNews/LatestNews"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"
import ToolsSection from "@/components/main-page/sections/ToolsSection/ToolsSection"
import WhySavvy from "@/components/main-page/sections/WhySavvy/WhySavvy"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import CTA from "@/components/main-page/sections/CTA/CTA"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import TopBanner from "@/components/shared/TopBanner/TopBanner"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"
import { useLanguage } from "@/contexts/LanguageContext"

// نصوص الهيدر بالإنجليزية
const headerTextsEn = {
  whoWeAre: "Our Partners",
  ourServices: "Our Sections",
  whySavvy: "Data Expo",
  latestProjects: "Latest Projects",
  contactUs: "Contact Us",
}

// نصوص الهيدر بالعربية
const headerTextsAr = {
  whoWeAre: "شركائنا",
  ourServices: "أقسامنا",
  whySavvy: "معرض البيانات",
  latestProjects: "آخر مشاريعنا",
  contactUs: "تواصل معنا",
}

export default function Home() {
  const { language } = useLanguage()
  const lang = language as "en" | "ar"
  const texts = lang === "ar" ? headerTextsAr : headerTextsEn
  const [showBadge, setShowBadge] = useState(true)

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
      <UnifiedHeader texts={texts} showBadge={showBadge} hasBanner={true} />

      {/* Sections مرتبطة بالـ navbar عبر نفس أسماء المفاتيح */}
      <section id="whoWeAre">
        <NewHero />
      </section>

      {/* Partners Slider - outside hero section */}
      <PartnersSlider />

      <section id="about">
        <SavvySections />
      </section>

      <section id="services">
        <GallerySection />
      </section>

      {/* Latest News Section */}
      <LatestNews />

      {/* Promo Section */}
      <PromoSection />

      {/* 
      <section id="tools">
        <ToolsSection />
      </section> */}

      {/* <section id="whySavvy">
        <WhySavvy />
      </section> */}

      {/* <section id="latestProjects">
        <LatestProjects />
      </section>

      <section id="contactUs">
        <CTA />
      </section> */}
    </>
  )
}
