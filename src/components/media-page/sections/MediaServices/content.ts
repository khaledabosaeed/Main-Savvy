export type Language = "en" | "ar"

export const mediaServicesContent = {
  en: {
    title: "Elevate your brand through strategies designed for growth.",
    subtitle: "Driven by innovation, we work to enhance your brand's presence and expand your business scope to achieve full growth potential.",

    service1: "Media interfaces and giant screens",
    service2: "Outdoor advertising",
    service3: "On-site 4K photography",
    service4: "Animation videos and infographics",
    service5: "Fast production",
    service6: "Social media (AR / EN)",
    service7: "Partnerships with social media influencers",
    service8: "50 square meter screen (used for real estate photography)",
  },
  ar: {
    title: "ارفع مستوى علامتك التجارية من خلال استراتيجيات مصممة لتحقيق النمو.",
    subtitle: "انطلاقًا من الابتكار، نعمل على تعزيز حضور علامتك التجارية وتوسيع نطاق أعمالك لتحقيق إمكانات النمو الكاملة",
    service1: "واجهات إعلامية وشاشات عملاقة",
    service2: "الإعلانات الخارجية",
    service3: "تصوير 4K في الموقع",
    service4: "فيديوهات انیمیشن والرسوم البيانية",
    service5: "الإنتاج السريع",
    service6: "وسائل التواصل الاجتماعي (AR / EN)",
    service7: "شراكات مع مؤثرين التواصل الاجتماعي",
    service8: "شاشة 50 متر مربع ( تستخدم لتصوير العقارات)",
  },
}

export function getMediaServicesContent(
  lang: Language, 
  key: keyof typeof mediaServicesContent.en
): string {
  const content = mediaServicesContent[lang]
  return (content[key] as string) || (mediaServicesContent.en[key] as string)
}
