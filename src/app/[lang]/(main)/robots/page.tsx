import PageTransition from "@/components/shared/PageTransition/PageTransition"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import RobotHeroSlider from "@/components/robots/RobotHeroSlider"
import RobotsSection from "@/components/main-page/sections/RobotsSection/RobotsSection"
import Link from "next/link"
import { getRobotLabel } from "@/lib/robots-locale"

interface RobotsPageProps {
  params: Promise<{ lang: string }>
}

const headerTextsEn = {
  main: "Home",
  // news: "News",
  // projects: "Latest Projects",
  // services: "Gallery",
  // about: "Our Sections",
  ourRobots: "Savvy eStore",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  main: "الرئيسية",
  // news: "الأخبار",
  // projects: "معارضنا السابقة",
  // services: "معرض الصور",
  // about: "أقسامنا",
  ourRobots: "متجر ساڤي",
  contactUs: "تواصل معنا",
}

export default async function RobotsPage({ params }: RobotsPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} transparentHeader />
      <PageTransition>
        <RobotHeroSlider />
        <section id="robots">
          <RobotsSection />
          <div
            className={`max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4 text-center ${
              currentLang === "ar" ? "rtl" : "ltr"
            }`}
          >
            <Link
              href={`/${currentLang}/robots/responsible-use`}
              className="text-sm text-gray-500 hover:text-primary transition-colors underline underline-offset-2"
            >
              {getRobotLabel(currentLang, "responsibleUseLabel")}
            </Link>
          </div>
        </section>
      </PageTransition>
    </>
  )
}
