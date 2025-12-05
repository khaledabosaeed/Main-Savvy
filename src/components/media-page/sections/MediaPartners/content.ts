export type Language = "en" | "ar"

export const mediaPartnersContent = {
  en: {
    title: "Trusted Partners in Your Success",
    subtitle: "Reliable team delivering instant results at every step.",
    button: "View More",
  },
  ar: {
    title: "شركاء موثوق بهم في نجاحك",
    subtitle: "تعرف على الفريق الذي يرشدك خلال كل خطوة.",
    button: "تواصل معنا",
  },
}

export function getMediaPartnersContent(lang: Language, key: keyof typeof mediaPartnersContent.en): string {
  const content = mediaPartnersContent[lang]
  return (content[key as keyof typeof content] as string) || mediaPartnersContent.en[key]
}
