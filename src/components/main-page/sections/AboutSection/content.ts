export type Language = "en" | "ar"

export const aboutContent = {
  en: {
    title: "Who We Are?",
    description: "Savvy is a company that develops pioneering trademarks, and helps businesses expand their vision and marketing properly through sustainable marketing and combining them into sustainable programs. We provide a strong technical environment that includes digital, events, campaigns, publications, energy, and services provided under the BOOT brand for digital sustainability.",
  },
  ar: {
    title: "من نحن؟",
    description: "سافي شركة تُظهر العلامات التجارية بقوة وتوفر لها مسار استدامة ربحية. نساعد الشركات على إبراز هويتها وتسويقها بالشكل الصحيح، ودمجها في برامج الاستدامة، وبناء عوائد مالية من التحول الأخضر. نقدم حلولاً تقنية تشمل الروبوتات، الطاقة، الشاشات، والحملات ضمن برنامج موحّد اسمه “BOOT” للاستدامة الربحية.",
  },
}

export function getAboutContent(lang: Language, key: keyof typeof aboutContent.en): string {
  const content = aboutContent[lang]
  return (content[key as keyof typeof content] as string) || aboutContent.en[key]
}
