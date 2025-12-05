import NewHero from "@/components/main-page/sections/NewHero/NewHero"
import AboutSection from "@/components/main-page/sections/AboutSection/AboutSection"
import ServicesGrid from "@/components/main-page/sections/ServicesGrid/ServicesGrid"
import ToolsSection from "@/components/main-page/sections/ToolsSection/ToolsSection"
import WhySavvy from "@/components/main-page/sections/WhySavvy/WhySavvy"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import CTA from "@/components/main-page/sections/CTA/CTA"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface HomeProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر بالإنجليزية
const headerTextsEn = {
  whoWeAre: "Who We Are",
  ourServices: "Our Services",
  whySavvy: "Why Savvy",
  latestProjects: "Latest Projects",
  contactUs: "Contact Us",
}

// نصوص الهيدر بالعربية
const headerTextsAr = {
  whoWeAre: "من نحن",
  ourServices: "خدماتنا",
  whySavvy: "لماذا سافي",
  latestProjects: "أحدث المشاريع",
  contactUs: "تواصل معنا",
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      {/* UnifiedHeader الديناميكي */}
      <UnifiedHeader texts={texts} />

      {/* Sections مرتبطة بالـ navbar عبر نفس أسماء المفاتيح */}
      <section id="whoWeAre">
        <NewHero />
      </section>


      {/* <section id="aboutSection">
        <AboutSection />
      </section> */}

      <section id="ourServices">
        <ServicesGrid />
      </section>

      {/* <section id="toolsSection">
        <ToolsSection />
      </section> */}

      {/* <section id="whySavvy">
        <WhySavvy />
      </section> */}

      <section id="latestProjects">
        <LatestProjects />
      </section>

      <section id="contactUs">
        <CTA />
      </section>
    </>
  )
}
