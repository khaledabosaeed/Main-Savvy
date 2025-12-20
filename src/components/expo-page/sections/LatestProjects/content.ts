export type Language = "en" | "ar"

export const latestProjectsContent = {
en: {
    title: "Our Latest Projects",

    tab1: "Global Robotics Summit",
    tab2: '"Al-Jameel First" Exhibition',
    tab3: "Al-Khozama Exhibition",

    project1Title: "Global Robotics Summit",
    project1Description: "An international robotics and technology summit showcasing the latest innovations.",

    project2Title: '"Al-Jameel First" Exhibition',
    project2Description: "The first innovative tech exhibition presenting solutions for the future.",

    project3Title: "Al-Khozama Exhibition",
    project3Description: "A large-scale event displaying technology and innovation.",

    stats1Label: "Visitors",
    stats1Value: "8000+",

    stats2Label: "Company Visits",
    stats2Value: "60+",

    stats3Label: "Social Media Views",
    stats3Value: "250+ million",
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
