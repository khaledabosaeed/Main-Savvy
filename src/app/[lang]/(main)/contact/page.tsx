import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ContactPage from "@/components/contact-page/ContactPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import PromoSection from "@/components/main-page/sections/PromoSection/PromoSection"

interface ContactPageProps {
  params: Promise<{
    lang: string
  }>
}

// نصوص الهيدر الخاصة بصفحة Contact
const headerTextsEn = {
  ourServices: "Our Services",
  contactUs: "Contact Us",
}

const headerTextsAr = {
  ourServices: "خدماتنا",
  contactUs: "تواصل معنا",
}

export default async function Contact({ params }: ContactPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const texts = currentLang === "ar" ? headerTextsAr : headerTextsEn

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <section id="contact" className="pt-20">
          <ContactPage lang={currentLang} />
        </section>
             {/* Latest News Section */}
             {/* <LatestNews /> */}

{/* Promo Section */}
<PromoSection />
      </PageTransition>
    </>
  )
}
