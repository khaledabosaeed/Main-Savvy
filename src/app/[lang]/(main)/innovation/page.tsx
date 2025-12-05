import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationHero from "@/components/innovation-page/sections/InnovationHero/InnovationHero"
import InnovationAbout from "@/components/innovation-page/sections/InnovationAbout/InnovationAbout"
import InnovationServices from "@/components/innovation-page/sections/InnovationServices/InnovationServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface InnovationPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بهذه الصفحة
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
  about: "عن الابتكار",
  services: "الخدمات",
  projects: "المشاريع",
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function InnovationPage({ params }: InnovationPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"

  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      {/* UnifiedHeader للدعم الديناميكي */}
      <UnifiedHeader texts={texts} />

      <PageTransition>
        <section id="hero">
          <InnovationHero />
        </section>

        <section id="about">
          <InnovationAbout lang={currentLang} />
        </section>

        <section id="services">
          <InnovationServices lang={currentLang} />
        </section>

        <section id="projects">
          <LatestProjects />
        </section>
      </PageTransition>
    </>
  )
}
