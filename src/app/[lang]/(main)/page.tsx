import HomePageClient from "@/components/main-page/HomePageClient"
import { getHomePageTexts } from "@/i18n/getHomePageTexts"
import { isAppLanguage } from "@/i18n/settings"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const AR_HOME_TITLE =
  "ساڤي وورلد | روبوتات صناعية، ذكاء اصطناعي مسؤول، وحلول مستدامة — السعودية"
const AR_HOME_DESCRIPTION =
  "ساڤي وورلد: منصة سعودية متخصصة في توطين الروبوتات الصناعية والذكاء الاصطناعي المسؤول وحلول الطاقة الخضراء. شريكك نحو رؤية 2030. تواصل معنا الآن."

const EN_HOME_TITLE =
  "Savvy World | Industrial robots, responsible AI & sustainable solutions — Saudi Arabia"
const EN_HOME_DESCRIPTION =
  "Savvy World is a Saudi platform for industrial robotics, responsible AI, and green energy solutions. Your partner for Vision 2030. Contact us today."

const AR_HOME_KEYWORDS = [
  "ساڤي وورلد",
  "روبوتات صناعية السعودية",
  "ذكاء اصطناعي مسؤول",
  "أتمتة صناعية المملكة العربية السعودية",
  "حلول الطاقة المستدامة للشركات",
  "توطين التقنية رؤية 2030",
  "البنية التحتية الذكية",
  "روبوتات الحراسة والفحص",
  "شواحن السيارات الكهربائية الصناعية",
  "الطاقة الشمسية",
  "رؤية 2030",
]

const EN_HOME_KEYWORDS = [
  "Savvy World",
  "industrial robots Saudi Arabia",
  "responsible AI",
  "industrial automation KSA",
  "sustainable energy for business",
  "technology localization Vision 2030",
  "smart infrastructure",
  "security and inspection robots",
  "industrial EV charging",
]

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    return {}
  }

  if (lang === "ar") {
    return {
      title: { absolute: AR_HOME_TITLE },
      description: AR_HOME_DESCRIPTION,
      keywords: AR_HOME_KEYWORDS,
      openGraph: {
        type: "website",
        locale: "ar_SA",
        url: "https://savvyworld.ai/ar",
        title: AR_HOME_TITLE,
        description: AR_HOME_DESCRIPTION,
        siteName: "Savvy World",
      },
      twitter: {
        card: "summary_large_image",
        title: AR_HOME_TITLE,
        description: AR_HOME_DESCRIPTION,
      },
      alternates: {
        canonical: "https://savvyworld.ai/ar",
        languages: {
          "ar-SA": "https://savvyworld.ai/ar",
          "en-US": "https://savvyworld.ai/en",
        },
      },
    }
  }

  return {
    title: { absolute: EN_HOME_TITLE },
    description: EN_HOME_DESCRIPTION,
    keywords: EN_HOME_KEYWORDS,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://savvyworld.ai/en",
      title: EN_HOME_TITLE,
      description: EN_HOME_DESCRIPTION,
      siteName: "Savvy World",
    },
    twitter: {
      card: "summary_large_image",
      title: EN_HOME_TITLE,
      description: EN_HOME_DESCRIPTION,
    },
    alternates: {
      canonical: "https://savvyworld.ai/en",
      languages: {
        "ar-SA": "https://savvyworld.ai/ar",
        "en-US": "https://savvyworld.ai/en",
      },
    },
  }
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  const { texts, galleryHeading } = getHomePageTexts(lang)

  return <HomePageClient texts={texts} galleryHeading={galleryHeading} />
}
