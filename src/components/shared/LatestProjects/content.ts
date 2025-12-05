export type Language = "en" | "ar"

export const latestProjectsContent = {
  en: {
    title: "Our Latest Projects",
    
    // Projects
    project1Title: "Global Robotics Summit",
    project1Description: "A comprehensive robotics exhibition showcasing the latest innovations in AI and automation.",
    
    project2Title: "Customer First Exhibition",
    project2Description: "An innovative exhibition focused on customer experience and digital transformation.",
    
    project3Title: "Al-Khuzama Exhibition",
    project3Description: "A cultural and technological exhibition celebrating innovation and heritage.",
    
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
    title: "آخر مشاريعنا",
    
    // Projects
    project1Title: "القمة العالمية للبروبتيك",
    project1Description: "معرض شامل للروبوتات يعرض أحدث الابتكارات في الذكاء الاصطناعي والأتمتة.",
    
    project2Title: "معرض \"العميل اولاً\"",
    project2Description: "معرض مبتكر يركز على تجربة العملاء والتحول الرقمي.",
    
    project3Title: "معرض الخزامه",
    project3Description: "معرض ثقافي وتقني يحتفل بالابتكار والتراث.",
    
    // Statistics
    stat1Value: "250+",
    stat1Label: "مليون",
    stat1Description: "المشاهدات عبر منصات التواصل الاجتماعي",
    
    stat2Value: "60+",
    stat2Description: "زوايا للشركات",
    
    stat3Value: "8000+",
    stat3Description: "زوار",
  },
}

export function getLatestProjectsContent(lang: Language, key: keyof typeof latestProjectsContent.en): string {
  const content = latestProjectsContent[lang]
  return (content[key as keyof typeof content] as string) || latestProjectsContent.en[key]
}

