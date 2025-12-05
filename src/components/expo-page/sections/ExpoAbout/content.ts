export type Language = "en" | "ar"

export const expoAboutContent = {
  en: {
    title: "From Specialized Screens to Interactive Experiences",
    description: "Savvy transforms event activities into unforgettable experiences through specialized screens, Roar robot engagement strategies, maintaining visitor focus throughout.",
  },
  ar: {
    title: "نوفر حلول مبتكرة وذكية لإدارة الفعاليات من خلال توفير أنشطة تفاعلية تصنع ثقافة تفاعلية مميزة، بالاضافة لتوفير أحدث التقنيات من الروبوتات والشاشات التفاعلية داخل الفعاليات",
    description: "بصنع فعاليات لجذب الزوار، وخلق لحظات لا تنسى، والحفاظ بتركيز الزوار على أولوياتك.",
  },
}

export function getExpoAboutContent(lang: Language, key: keyof typeof expoAboutContent.en): string {
  const content = expoAboutContent[lang]
  return (content[key as keyof typeof content] as string) || expoAboutContent.en[key]
}
