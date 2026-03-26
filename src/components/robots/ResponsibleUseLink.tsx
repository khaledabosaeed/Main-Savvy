"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function ResponsibleUseLink() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  return (
    <div
      className={`max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4 text-center ${isRTL ? "rtl" : "ltr"}`}
    >
      <Link
        href={`/${lang}/robots/responsible-use`}
        className="text-sm text-gray-500 hover:text-primary transition-colors underline underline-offset-2"
      >
        {t("robots.responsibleUseLabel")}
      </Link>
    </div>
  )
}
