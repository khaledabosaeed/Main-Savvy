export type Language = "en" | "ar"

export const servicesGridContent = {
  en: {
    title: "Savvy Services",
    subtitle: "Discover a variety of marketing and technical solutions provided by Savvy for companies and institutions",

    // Savvy Innovation
    innovationTitle: "Savvy Innovation",
    innovationDescription: "Professional technical services including smart solutions and advanced digital innovation technologies for institutional and commercial entities.",
    innovationButton: "Learn More",

    // Savvy Expo
    expoTitle: "Savvy Expo",
    expoDescription: "Organizing exhibitions and events that highlight companies' products and services, including interactive spaces through modern technical activities.",
    expoButton: "Learn More",

    // Savvy Media
    mediaTitle: "Savvy Media",
    mediaDescription: "Providing media services and advertising programs from the production of exclusive media materials including media services, exhibition events, content marketing, and brand communication initiatives.",
    mediaButton: "Learn More",
  },
  ar: {
    title: "خدمات سافي",
    subtitle: "نحن نقدم مجموعة واسعة من الحلول المصممة لدعم الشركات وتعزيز التجارب وتقديم قيمة عبر كل نقطة اتصال.",

    // Savvy Innovation
    innovationTitle: "Savvy Innovation",
    innovationDescription: "نوفر خدمات الطاقة المستدامة وحلول شحن السيارات الكهربائية وحلول الذكاء الاصطناعي المتقدمة للشركات..",
    innovationButton: "تعلم المزيد",

    // Savvy Expo
    expoTitle: "Savvy Expo",
    expoDescription: "نركز  على بناء شراكات استراتيجية مع تقديم أنشطة ترفيهية جذابة ، وخلق بيئات تجذب الجماهير وتحقق تأثيرا ذا مغزى من خلال التنشيط المنسق.",
    expoButton: "تعلم المزيد",

    // Savvy Media
    mediaTitle: "Savvy Media",
    mediaDescription: "يوفر قسم الاعلام والوسائط لدينا مجموعة من الخدمات المميزة متمثلة في انظمة عرض إعلاني مميزة وباحجام كبيرة تعزز العلامات التجارية للشركات، بالاضافة لقسم خاص بإنشاء المحتوى وتسويق العلامات التجارية وتوفير اعلى نسبة انتشار لها.",
    mediaButton: "تعلم المزيد",
  },
}

export function getServicesGridContent(lang: Language, key: keyof typeof servicesGridContent.en): string {
  const content = servicesGridContent[lang]
  return (content[key as keyof typeof content] as string) || servicesGridContent.en[key]
}
