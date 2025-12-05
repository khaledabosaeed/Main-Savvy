export type Language = "en" | "ar"

export const mediaAboutContent = {
  en: {
    title: "We Produce Professional Content",
    description: "Including 4K video production, motion graphics design, screen and social media designs, quick video editing, content management, publication, sponsored ads, influencer collaboration, and effective media coverage.",
  },
  ar: {
    title: "نوفر حلول إعلامية مبتكرة ، من خلال توفير شاشات ومساحات إعلانية خارجية وداخلية في أفضل المواقع الجغرافية، بالاضافة لتوفير حلول المحتوى والتسويق والانتشار من خلال مجموعة من الخبراء والمختصين في هذا المجال.",
    description: "موشن غرافيك، وتصاميم للشاشات والسوشيال، مع مونتاج سريع، ومدير نشر المحتوى، الإعلانات الممولة، المؤثرين، والتغطيات الإعلامية بفعالية.",
  },
}

export function getMediaAboutContent(lang: Language, key: keyof typeof mediaAboutContent.en): string {
  const content = mediaAboutContent[lang]
  return (content[key as keyof typeof content] as string) || mediaAboutContent.en[key]
}
