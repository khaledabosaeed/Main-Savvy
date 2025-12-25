export type Language = "en" | "ar"

export const partnersContent = {
    en: {
        heading: "Our activations",
    },
    ar: {
        heading: "فعالياتنا",
        
    },

}

export function getPartnersContent(lang: Language, key: keyof typeof partnersContent.en): string {
    const content = partnersContent[lang]
    return (content[key as keyof typeof content] as string) || partnersContent.en[key]
}
