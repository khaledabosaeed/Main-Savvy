export type Language = "en" | "ar"

export const innovationHeroContent = {
en: {
    title: "We Put Innovation in Your Hands… Without the Complexity",
    subtitle: "Smart solutions combining modern technologies, interactive experiences, and immersive content… guiding you toward a more sustainable future, effortlessly.",
},

  ar: {
    title: "نضع الابتكار بين يديك.. بدون تعقيد",
    subtitle: "حلول ذكية تجمع بين التقنيات الحديثة والتجارب التفاعلية والمحتوى الغامر.. لنضعك على طريق مستقبل أكثر استدامة، دون أي تعقيد",
  },
}

export function getInnovationHeroContent(lang: Language, key: keyof typeof innovationHeroContent.en): string {
  const content = innovationHeroContent[lang]
  return (content[key as keyof typeof content] as string) || innovationHeroContent.en[key]
}
