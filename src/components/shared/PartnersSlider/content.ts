export type Language = "en" | "ar"

export const partnersContent = {
    en: {
        heading: "Companies that trusted us to create different experiences.. You're next",
    },
    ar: {
        heading: "شركاء وثقوا بنا لصناعة تجارب مختلفة.. أنت التالي",
        
    },

}

export function getPartnersContent(lang: Language, key: keyof typeof partnersContent.en): string {
    const content = partnersContent[lang]
    return (content[key as keyof typeof content] as string) || partnersContent.en[key]
}
