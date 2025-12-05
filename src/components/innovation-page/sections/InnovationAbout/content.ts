export type Language = "en" | "ar"

export const innovationAboutContent = {
  en: {
    title: "Smart Solutions for Tomorrow",
    description: "Savvy Innovation transforms ideas into reality through advanced AI, sustainable energy solutions, and cutting-edge robotics that shape the future of technology.",
  },
  ar: {
    title: "سافي إنوفيشن برنامج بحث وتطوير يضم روبوت مستر سافي، مع شاشات تتبع الكاميرا وخرائط AR. نطوّر محتوى ذكيًا بلوحات فورية، وننفّذ تجارب للمنازل الذكية، مع التزام كامل بـ PDPL. نختبر ونحسّن باستمرار وفق الاستخدام الحقيقي.",
    description: "تحول Savvy Innovation الأفكار إلى واقع من خلال الذكاء الاصطناعي المتقدم، وحلول الطاقة المستدامة، والروبوتات المتطورة التي تشكل مستقبل التكنولوجيا.",
  },
}

export function getInnovationAboutContent(lang: Language, key: keyof typeof innovationAboutContent.en): string {
  const content = innovationAboutContent[lang]
  return (content[key as keyof typeof content] as string) || innovationAboutContent.en[key]
}
