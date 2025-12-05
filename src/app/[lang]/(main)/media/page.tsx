import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaHero from "@/components/media-page/sections/MediaHero/MediaHero"
import MediaAbout from "@/components/media-page/sections/MediaAbout/MediaAbout"
import MediaProjects from "@/components/media-page/sections/MediaProjects/MediaProjects"
import MediaServices from "@/components/media-page/sections/MediaServices/MediaServices"
import MediaPartners from "@/components/media-page/sections/MediaPartners/MediaPartners"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"

interface MediaPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Media
const headerTextsEn = {
  hero: "Hero",
  about: "About",
  projects: "Projects",
  services: "Services",
  partners: "Partners",
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  hero: "الرئيسية",
  about: "عن الميديا",
  projects: "المشاريع",
  services: "الخدمات",
  partners: "الشركاء",
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} />
      <PageTransition>
        <section id="hero">
          <MediaHero lang={currentLang} />
        </section>
        <section id="about">
          <MediaAbout lang={currentLang} />
        </section>
        <section id="projects">
          <MediaProjects lang={currentLang} />
        </section>
        <section id="services">
          <MediaServices lang={currentLang} />
        </section>
        <section id="partners">
          <MediaPartners lang={currentLang} />
        </section>
      </PageTransition>
    </>
  )
}
