"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getTopBannerContent } from "./content"
import Link from "next/link"

export default function TopBanner() {
    const { language } = useLanguage()
    const lang = language as Language
    const isRTL = lang === "ar"
    const t = (key: keyof typeof import("./content").topBannerContent.en) => getTopBannerContent(lang, key)

    return (
        <div className="w-full bg-[#0066FF] py-1.5 md:py-2 px-2 md:px-4 text-center">
            <p className={`text-white text-xs md:text-sm lg:text-base ${isRTL ? 'rtl' : 'ltr'}`}>
                {t("text") } 
                <Link href={`${lang}/contact`} className="text-white underline ml-1"> { `${isRTL ? 'تعلم المزيد' : 'Learn More'}`}</Link>
            </p>
        </div>
    )
}
