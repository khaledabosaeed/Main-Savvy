export type Language = "en" | "ar"

export const expoHeroContent = {
en: {
  title: "Bring your booth to life… and let the experience speak for you",
  subtitle: "mr.savvy and interactive screens give you a distinctive presence",
},

  ar: {
    title: "خلّ جناحك حيّ.. وخَلّي التجربة تحكي عنك",
    subtitle: "مستر ساڤي والشاشات يعطونك حضور مختلف",
  },
}

export function getExpoHeroContent(lang: Language, key: keyof typeof expoHeroContent.en): string {
  const content = expoHeroContent[lang]
  return (content[key as keyof typeof content] as string) || expoHeroContent.en[key]
}
