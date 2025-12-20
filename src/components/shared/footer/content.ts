export type Language = "en" | "ar"

export const footerContent = {
en: {
    // Savvy World Section
    savvyWorld: "Smart World",
    aboutSavvy: "About Savvy",
    tools: "Automation Tools",
    aiCenter: "AI Workflow Builder",
    integrationCenter: "Integration Hub",

    // Smart AI Section
    smartAI: "Smart Exhibition",
    section1: "Section 1",
    section2: "Section 2",
    section3: "Section 3",
    section4: "Section 4",

    // Intelligent Advertising Section
    intelligentAdvertising: "Intelligent Media",

    // Exhibition Section
    exhibition: "Smart Innovation",

    // Social Media Section
    socialMedia: "Social Media",
    linkedin: "LinkedIn",
    twitter: "Twitter / X",
    facebook: "Facebook",
    instagram: "Instagram",

    // Copyright
    copyright: "© Savvy World 2025. All rights reserved",
},

  ar: {
    // Savvy World Section
    savvyWorld: "عالم ذكي",
    aboutSavvy: "حول ساففي",
    tools: "أدوات الأتمتة",
    aiCenter: "منشئ سير العمل الذكاء الاصطناعي",
    integrationCenter: "مركز التكامل",

    // Smart AI Section
    smartAI: "معرض ذكي",
    section1: "القسم 1",
    section2: "القسم 2",
    section3: "القسم 3",
    section4: "القسم 4",

    // Intelligent Advertising Section
    intelligentAdvertising: "وسائل الإعلام الذكية",

    // Exhibition Section
    exhibition: "الابتكار الذكي",

    // Social Media Section
    socialMedia: "وسائل التواصل الاجتماعي",
    linkedin: "لينكد إن",
    twitter: "تويتر / X",
    facebook: "فيسبوك",
    instagram: "انستغرام",

    // Copyright
    copyright: "© عالم ساففي 2025 جميع الحقوق محفوظة",
  },
}

export function getFooterContent(lang: Language, key: keyof typeof footerContent.en): string {
  const content = footerContent[lang]
  return (content[key as keyof typeof content] as string) || footerContent.en[key]
}
