export type Language = "en" | "ar"

export const headerContent = {
  en: {
    whoWeAre: "Who We Are",
    ourServices: "Our Services",
    whySavvy: "Why Savvy",
    latestProjects: "Latest Projects",
    contactUs: "Contact Us",
  },
  ar: {
    whoWeAre: "من نحن",
    ourServices: "خدماتنا",
    whySavvy: "لماذا سافي",
    latestProjects: "آخر مشاريعنا",
    contactUs: "تواصل معنا",
  },
}

export function getHeaderContent(lang: Language, key: keyof typeof headerContent.en): string {
  const content = headerContent[lang]
  return (content[key as keyof typeof content] as string) || headerContent.en[key]
}
