export type Language = "en" | "ar"

export const innovationHeroContent = {
en: {
    title: "22 years bringing global technologies to the Saudi market, positioned for real impact.",
    subtitle: "We bridge global innovation with Saudi market needs by localizing advanced technologies and engineering tailored solutions across supply chain optimization, industrial automation, energy infrastructure, inspection, and security systems, ensuring compliance, reliability, and measurable operational impact.",
},

  ar: {
    title: "٢٢ عامًا من إدخال التقنيات العالمية إلى السوق السعودي، وتوطينها لتحقيق أثر حقيقي ومستدام",
    subtitle: "نربط الابتكار المحلي و العالمي باحتياجات السوق السعودي من خلال توطين التقنيات المتقدمة وبناء وتصميم حلول متخصصة في الأتمتة الصناعية، والبنية التحتية للطاقة، وأنظمة الفحص والحماية، بما يضمن الوصول للأثر التشغيلي المستهدف",
  },
}

export function getInnovationHeroContent(lang: Language, key: keyof typeof innovationHeroContent.en): string {
  const content = innovationHeroContent[lang]
  return (content[key as keyof typeof content] as string) || innovationHeroContent.en[key]
}
