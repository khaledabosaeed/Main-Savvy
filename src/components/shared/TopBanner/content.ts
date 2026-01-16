export type Language = "en" | "ar"

export const topBannerContent = {
    en: {
        text: "Contact us now ",
    },
    ar: {
        text: "تواصل معنا الآن ",
    },
}

export function getTopBannerContent(lang: Language, key: keyof typeof topBannerContent.en): string {
    const content = topBannerContent[lang]
    return (content[key as keyof typeof content] as string) || topBannerContent.en[key]
}
