export type Language = "en" | "ar"

export const heroContent = {
en: {
  welcomeText: "We provide end-to-end, governed high-tech solutions designed for tomorrow’s world ..",
  savvyWorld: "",
  description:
    "An advisory boutique shop serving corporate and government sectors. Targeting to integrate advanced responsible AI technologies with strategic marketing to design scalable business models and profitable frameworks, enabling the localization of local and global innovations within the Saudi market through the most effective approaches.",
  subDescription:
    "Paving the way to onboard solutions focused on:",
  goalsTitle: "2026 Goals",
  goals: [
    "Sustainability and green solutions",
    "Net-zero carbon reduction and emissions",
    "Responsible Artificial Intelligence (AI)",
    "Governed and purpose-driven robotics",
  ],
  ctaButton: "Contact Us",
  partners: "Partners who trusted us to create different experiences… you’re next",
},

  ar: {
    welcomeText: "نُقدم حلول إستشارّية تقنية مُحوكمةتلائِم عالَم الغَد ..",
    savvyWorld: "  ",
    description:
      "منصة استشارية تقنية متخصصة في قطاع الشركات تجمع بين التقنيات الحديثة والتسويق. نبني من خلالها الخطط الاستراتيجية ونماذج العمل الربحية لتوطين التقنيات المحلية والعالمية بالسوق السعودي بالسبل الأنسب.",
    subDescription:
      "التمهيد لاستقطاب واعتماد حلول تركّز على:",
    goalsTitle: "أهداف 2026",
    goals: [
      "الاستدامة والحلول الخضراء",
      "الوصول إلى الحياد الصفري وخفض الانبعاثات الكربونية",
      "الذكاء الاصطناعي المسؤول",
      "الروبوتات المُحوكمة والهادفة ذات الأثر الإيجابي",
    ],
    ctaButton: "تواصل معنا",
    partners: "شركاء وفقونا بصناعة تجارب مختلفة.. أنت التالي",
  },
}

export type HeroStringKey = Exclude<keyof typeof heroContent.en, "goals">

export function getHeroContent(lang: Language, key: HeroStringKey): string {
  const content = heroContent[lang]
  const value = content[key as keyof typeof content]
  return (typeof value === "string" ? value : heroContent.en[key]) || ""
}
