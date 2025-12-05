export type Language = "en" | "ar"

export const toolsContent = {
  en: {
    title: "Savvy Roles",

    // National Role
    nationalTitle: "National Role",
    nationalDescription: "Savvy supports Saudi Arabia in achieving Vision 2030 vision with over 2000 days of professional national strategic projects with MX integration and BOOT program.",

    // Marketing Role
    marketingTitle: "Marketing Role",
    marketingDescription: "We provide smart services, digital consulting, partnerships, and services aligned with your goals that lead to effective and sustainable growth of the brand.",

    // Commercial Role
    commercialTitle: "Commercial Role",
    commercialDescription: "Digital transformation solutions for premium commercial entities that provide space experience across MX technology and innovative business models.",
  },
  ar: {
    title: "أدوار سافي",

    // National Role
    nationalTitle: "دور وطني",
    nationalDescription: "تمكين الشركات من مساهمة فعّالة في رؤية 2030 وهدف 2060 عبر حلول استدامة واضحة وسهلة.",

    // Marketing Role
    marketingTitle: "دور تسويقي",
    marketingDescription: "تقديم حملات واستراتيجيات تُبرز العملاء كقادة استدامة وتمنحهم حضوراً أقوى في السوق.",

    // Commercial Role
    commercialTitle: "دور تجاري",
    commercialDescription: "تحويل التحول الأخضر إلى دخل فعلي عبر كفاءة الطاقة، الشراكات، أرصدة الكربون، الإعلانات، وروبوت Mr. Savvy..",
  },
}

export function getToolsContent(lang: Language, key: keyof typeof toolsContent.en): string {
  const content = toolsContent[lang]
  return (content[key as keyof typeof content] as string) || toolsContent.en[key]
}
