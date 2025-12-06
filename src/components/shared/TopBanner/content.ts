export type Language = "en" | "ar"

export const topBannerContent = {
    en: {
        text: "Ready to join us in the next research? ",
    },
    ar: {
        text: "جاهز شاركنا البحث القادم؟  ",
    },
}

export function getTopBannerContent(lang: Language, key: keyof typeof topBannerContent.en): string {
    const content = topBannerContent[lang]
    return (content[key as keyof typeof content] as string) || topBannerContent.en[key]
}
