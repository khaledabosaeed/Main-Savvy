export type Language = "en" | "ar"

export const mediaServicesContent = {
en: {
    title: "Elevate Your Brand with Growth-Driven Strategies",
    subtitle: "Driven by innovation, we enhance your brand presence and expand your business reach to achieve its full growth potential.",
    service1: "Media Facades and Giant Screens",
    service2: "Outdoor Advertising",
    service3: "On-Site 4K Filming",
    service4: "Animation and Infographic Videos",
    service5: "Fast Production",
    service6: "Social Media (AR / EN)",
    service7: "Partnerships with Social Media Influencers",
    service8: "50-Square-Meter Screen (Used for Real Estate Filming)",
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
