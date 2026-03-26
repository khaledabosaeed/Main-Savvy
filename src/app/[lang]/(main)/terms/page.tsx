import PageTransition from "@/components/shared/PageTransition/PageTransition"
import TermsPage from "@/components/terms-page/TermsPage"
import UnifiedHeader from "@/components/shared/header/UnifiedHeader"
import en from "../../../../../public/locales/en.json"
import ar from "../../../../../public/locales/ar.json"

interface TermsPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Terms({ params }: TermsPageProps) {
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
        <TermsPage />
      </PageTransition>
    </>
  )
}
