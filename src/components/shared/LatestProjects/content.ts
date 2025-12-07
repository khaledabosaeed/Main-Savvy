export type Language = "en" | "ar"

export const latestProjectsContent = {
  en: {
    title: "Our Latest Projects",
    subtitle: "Experience from the first exhibition - not just design",

    // Projects
    project1Title: "Global Robotics Summit",
    project1Description: "A comprehensive robotics exhibition showcasing the latest innovations in AI and automation.",

    project2Title: "Customer First Exhibition",
    project2Description: "An innovative exhibition focused on customer experience and digital transformation.",

    project3Title: "Al-Khuzama Exhibition",
    project3Description: "A cultural and technological exhibition celebrating innovation and heritage.",

    // CTA Button
    ctaButton: "Read More About Global Robotics",

    // Statistics
    stat1Value: "250+",
    stat1Label: "Million",
    stat1Description: "Views across social media platforms",

    stat2Value: "60+",
    stat2Description: "Company Corners",

    stat3Value: "8000+",
    stat3Description: "Visitors",
  },
  ar: {
    title: "معارضنا السابقة",
    subtitle: "خبرة من أرض المعارض .. وليست مجرد تصميم.",

    // Projects
    project1Title: "القمة العالمية للبروبتيك",
    project1Description: "منصة عالمية تجمع مستقبل العقار والتقنية في مكان واحد، حيث يجتمع الرواد والمبتكرون لعرض أحدث حلول الذكاء الرقمي، وتقنيات التحول الرقمي، وفرص الشراكات التي تعيد تشكيل مستقبل التطوير العمراني.",

    project2Title: "معرض \"العميل اولاً\" - جدة",
    project2Description: "معرض مبتكر يركز على تجربة العملاء والتحول الرقمي.",

    project3Title: "معرض الخزامه",
    project3Description: "معرض ثقافي وتقني يحتفل بالابتكار والتراث.",

    // CTA Button
    ctaButton: "اقرأ دروبا في القمة العالمية للبروبتيك",

    // Statistics
    stat1Value: "250+",
    stat1Label: "مليون",
    stat1Description: "تفاعل على جميع منصات التواصل",

    stat2Value: "60+",
    stat2Description: "بوث",

    stat3Value: "8000+",
    stat3Description: "زائر",
  },
}

export function getLatestProjectsContent(lang: Language, key: keyof typeof latestProjectsContent.en): string {
  const content = latestProjectsContent[lang]
  return (content[key as keyof typeof content] as string) || latestProjectsContent.en[key]
}

