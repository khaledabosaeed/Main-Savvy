export type Language = "en" | "ar"

export const latestProjectsContent = {
  en: {
    title: "Latest Projects",

    tab1: "Global Probotics Summit",
    tab2: "Jameel Awal Exhibition",
    tab3: "Khazama Expo",

    project1Title: "Global Probotics Summit",
    project1Description: "International robotics and technology summit featuring cutting-edge innovations.",

    project2Title: "Jameel Awal Exhibition",
    project2Description: "First innovative technology exhibition showcasing future solutions.",

    project3Title: "Khazama Expo",
    project3Description: "Large-scale technology and innovation showcase event.",

    stats1Label: "Visitors",
    stats1Value: "8000+",

    stats2Label: "Company Visits",
    stats2Value: "60+",

    stats3Label: "Social Media Impressions",
    stats3Value: "250+ Million",
  },
  ar: {
    title: "أخر مشاريعنا",

    tab1: "القمة العالمية للبروبوتيك",
    tab2: "معرض \"الجميل اوًلاً\"",
    tab3: "معرض الخزامة",

    project1Title: "القمة العالمية للبروبوتيك",
    project1Description: "قمة دولية للروبوتات والتكنولوجيا تعرض أحدث الابتكارات.",

    project2Title: "معرض \"الجميل اوًلاً\"",
    project2Description: "أول معرض تقني مبتكر يعرض حلول المستقبل.",

    project3Title: "معرض الخزامة",
    project3Description: "حدث واسع النطاق لعرض التكنولوجيا والابتكار.",

    stats1Label: "زوار",
    stats1Value: "8000+",

    stats2Label: "زيارة للشركات",
    stats2Value: "60+",

    stats3Label: "المشاهدات عبر منصات التواصل الاجتماعي",
    stats3Value: "250+ مليون",
  },
}

export function getLatestProjectsContent(lang: Language, key: keyof typeof latestProjectsContent.en): string {
  const content = latestProjectsContent[lang]
  return (content[key as keyof typeof content] as string) || latestProjectsContent.en[key]
}
