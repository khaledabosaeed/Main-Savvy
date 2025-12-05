export type Language = "en" | "ar"

export const expoPartnersContent = {
    en: {
        title: "Our Partners Create With Us",
        subtitle: "Proven experiences in memory",
    },
    ar: {
        title: "شركاؤنا يصنعون معنا",
        subtitle: "تجارب تثبت في الذاكرة",
    },
}

export function getExpoPartnersContent(lang: Language, key: keyof typeof expoPartnersContent.en): string {
    const content = expoPartnersContent[lang]
    return (content[key as keyof typeof content] as string) || expoPartnersContent.en[key]
}
