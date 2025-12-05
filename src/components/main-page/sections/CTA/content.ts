export type Language = "en" | "ar"

export const ctaContent = {
  en: {
    title: "Join the Savvy Network",
    description: "Become part of a community driving innovation and digital transformation across the region.",
    buttonText: "Get Started",
  },
  ar: {
    title: "انضم إلى شبكة سافي",
    description: "كن جزءًا من مجتمع يقود الابتكار والتحول الرقمي في جميع أنحاء المنطقة.",
    buttonText: "ابدأ الآن",
  },
}

export function getCTAContent(lang: Language, key: keyof typeof ctaContent.en): string {
  const content = ctaContent[lang]
  return (content[key as keyof typeof content] as string) || ctaContent.en[key]
}
