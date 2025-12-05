export type Language = "en" | "ar"

export const topBannerContent = {
    en: {
        text: "Ready to join us in the next research? Learn more",
    },
    ar: {
        text: "جاهز شاركنا البحث القادم؟ تعلم المزيد",
    },
}

export function getTopBannerContent(lang: Language, key: keyof typeof topBannerContent.en): string {
    const content = topBannerContent[lang]
    return (content[key as keyof typeof content] as string) || topBannerContent.en[key]
}
