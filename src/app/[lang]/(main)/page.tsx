"use client"

import { useState, useEffect } from "react"
import NewHero from "@/components/main-page/sections/NewHero/NewHero"
import SavvySections from "@/components/main-page/sections/SavvySections/SavvySections"

import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import TopBanner from "@/components/shared/TopBanner/TopBanner"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"
import { useLanguage } from "@/contexts/LanguageContext"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/ImageSlider/PartnersSlider"
import RobotsSection from "@/components/main-page/sections/RobotsSection/RobotsSection"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const texts = {
    main: t("common.main"),
    news: t("common.news"),
    projects: t("common.projects"),
    services: t("common.services"),
    about: t("common.about"),
    ourRobots: t("common.robots"),
    contactUs: t("common.contactUs"),
  }
  const [showBadge, setShowBadge] = useState(true)


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

  useEffect(() => {
    // Ensure page starts at top on initial load/refresh
    if (typeof window !== 'undefined') {
      // Disable browser scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      
      // Scroll to top immediately on mount/refresh
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      // Also use Lenis if available (after a small delay to ensure it's initialized)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 0)
    }

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

      <section id="robots">
        <RobotsSection />
      </section>

      <section id="services">
          <ImageSlider images={images} heading={t("common.gallery")} />
        </section>


        <section id="projects">
          <LatestProjects />
        </section>


      



    </>
  )
}
