export type Language = "en" | "ar"

export const expoPartnersContent = {
en: {
  title: "Our partners create with us",
  subtitle: "Experiences that stay in memory",
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
