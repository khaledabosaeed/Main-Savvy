import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ContactPage from "@/components/contact-page/ContactPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface ContactPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Contact({ params }: ContactPageProps) {
  const { lang } = await params
  const currentLang = lang as "en" | "ar"
  const dict = currentLang === "ar" ? ar : en
  const c = dict.common
  const h = dict.header

  const texts = {
    main: c.main,
    news: c.news,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <section id="contact" className="pt-20">
          <ContactPage />
        </section>
      </PageTransition>
    </>
  )
}
