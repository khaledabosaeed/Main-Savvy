import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ContactPage from "@/components/contact-page/ContactPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { contactPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const AR_CONTACT_TITLE =
  "تواصل مع ساڤي وورلد | استشارة مجانية في الروبوتات والذكاء الاصطناعي"
const AR_CONTACT_DESCRIPTION =
  "تواصل مع فريق ساڤي وورلد للحصول على استشارة مجانية في مجال الروبوتات الصناعية، الذكاء الاصطناعي المسؤول، والحلول الخضراء. نخدم الشركات في السعودية والخليج."

const EN_CONTACT_TITLE =
  "Contact Savvy World | Free consultation on robots & responsible AI"
const EN_CONTACT_DESCRIPTION =
  "Reach Savvy World for a free consultation on industrial robotics, responsible AI, and green solutions. We serve companies across Saudi Arabia and the Gulf."

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    return {}
  }

  if (lang === "ar") {
    return {
      title: { absolute: AR_CONTACT_TITLE },
      description: AR_CONTACT_DESCRIPTION,
      openGraph: {
        type: "website",
        locale: "ar_SA",
        url: "https://savvyworld.ai/ar/contact",
        title: AR_CONTACT_TITLE,
        description: AR_CONTACT_DESCRIPTION,
        siteName: "Savvy World",
      },
      twitter: {
        card: "summary_large_image",
        title: AR_CONTACT_TITLE,
        description: AR_CONTACT_DESCRIPTION,
      },
      alternates: {
        canonical: "https://savvyworld.ai/ar/contact",
        languages: {
          "ar-SA": "https://savvyworld.ai/ar/contact",
          "en-US": "https://savvyworld.ai/en/contact",
        },
      },
    }
  }

  return {
    title: { absolute: EN_CONTACT_TITLE },
    description: EN_CONTACT_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://savvyworld.ai/en/contact",
      title: EN_CONTACT_TITLE,
      description: EN_CONTACT_DESCRIPTION,
      siteName: "Savvy World",
    },
    twitter: {
      card: "summary_large_image",
      title: EN_CONTACT_TITLE,
      description: EN_CONTACT_DESCRIPTION,
    },
    alternates: {
      canonical: "https://savvyworld.ai/en/contact",
      languages: {
        "ar-SA": "https://savvyworld.ai/ar/contact",
        "en-US": "https://savvyworld.ai/en/contact",
      },
    },
  }
}

export default async function Contact({ params }: ContactPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)
  const texts = contactPageHeaderTexts(dict)

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
