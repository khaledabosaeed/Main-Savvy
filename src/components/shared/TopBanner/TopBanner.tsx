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
        <div className="w-full bg-[#0066FF] py-2 px- text-center">
            <p className={`text-white text-sm md:text-base pr-27 ${isRTL ? 'rtl' : 'ltr'}`}>
                {t("text") } 
                <Link href="/contact" className="text-white underline"> { `${isRTL ? 'تعلم المزيد' : 'Learn More'}`}</Link>
            </p>
        </div>
    )
}
