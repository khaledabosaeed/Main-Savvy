import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ExpoHero from "@/components/expo-page/sections/ExpoHero/ExpoHero"
import ExpoAbout from "@/components/expo-page/sections/ExpoAbout/ExpoAbout"
import ExpoServices from "@/components/expo-page/sections/ExpoServices/ExpoServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface ExpoPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Expo
const headerTextsEn = {
  hero: "Hero",
  about: "About",
  services: "Services",
  projects: "Projects",
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  hero: "الرئيسية",
  about: "عن المعارض",
  services: "الخدمات",
  projects: "المشاريع",
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function ExpoPage({ params }: ExpoPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} />
      <PageTransition>
        <section id="hero">
          <ExpoHero lang={currentLang} />
        </section>
        <section id="about">
          <ExpoAbout lang={currentLang} />
        </section>
        <section id="services">
          <ExpoServices lang={currentLang} />
        </section>
        <section id="projects">
          <LatestProjects />
        </section>
      </PageTransition>
    </>
  )
}
