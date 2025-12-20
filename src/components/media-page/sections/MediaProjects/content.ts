export type Language = "en" | "ar"

export const mediaProjectsContent = {
en: {
    title: "Growing Your Project Is Our Priority",
    subtitle: "We are not your typical marketing team. We help brands grow through clear strategy, creative energy, and a human touch.",

    project1Title: "Media Facade Screens",
    project1Description: "Large-scale facade screens across Saudi Arabia giving your brand a striking presence in high-traffic cities.",

    project2Title: "Content and Production",
    project2Description: "Comprehensive production including 4K filming, motion graphics, screen and social media content, fast editing, paid promotion, and influencer/media management.",
},

  ar: {
    title: "نمو مشروعك هو أولويتنا",
    subtitle: "نحن لسنا فريق التسويق المعتاد. نحن نساعد العلامات التجارية على النمو من خلال استراتيجية واضحة وطاقة إبداعية ولمسة إنسانية.",

    project1Title: "شاشات ميديا فاساد",
    project1Description: "شاشات واجهات ضخمة في أنحاء السعودية تمنح علامتك حضورًا لافتًا وسط المدن عالية الحركة.",

    project2Title: "المحتوى والإنتاج",
    project2Description: "إنتاج شامل يتضمن تصوير 4K، موشن غرافيك، محتوى للشاشات والسوشيال، مونتاج سريع، ونشر مموَّل مع إدارة المؤثرين والإعلام. ",
  },
}

export function getMediaProjectsContent(lang: Language, key: keyof typeof mediaProjectsContent.en): string {
  const content = mediaProjectsContent[lang]
  return (content[key as keyof typeof content] as string) || mediaProjectsContent.en[key]
}
