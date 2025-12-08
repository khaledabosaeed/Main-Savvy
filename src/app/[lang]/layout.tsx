import { LanguageProvider } from "@/contexts/LanguageContext";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google"
type Language = 'en' | 'ar';

// Inter for English (Latin only)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
})

// Inter for Arabic
const interArabic = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter-arabic",
})

const languages: Language[] = ['en', 'ar'];

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;

  // Validate language
  if (!languages.includes(rawLang as Language)) {
    notFound();
  }

  const lang = rawLang as Language;
  const dir = lang === "ar" ? "rtl" : "ltr"

  return (
    <LanguageProvider initialLanguage={lang}>
      <div dir={dir} className={lang === "ar" ? interArabic.className : inter.className}>
        {children}
      </div>
    </LanguageProvider>
  );
}
