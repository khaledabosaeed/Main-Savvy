export type Language = "en" | "ar"

export const servicesGridContent = {
en: {
  title: "Savvy Services",
  subtitle: "We offer a wide range of solutions designed to support businesses, enhance experiences, and deliver value across every touchpoint.",

  // Savvy Innovation
  innovationTitle: "Savvy Innovation",
  innovationDescription: "We provide sustainable energy services, electric vehicle charging solutions, and advanced AI solutions for businesses.",
  innovationButton: "Learn more",

  // Savvy Expo
  expoTitle: "Savvy Expo",
  expoDescription: "We focus on building strategic partnerships while delivering engaging entertainment activities, creating environments that attract audiences and generate meaningful impact through curated activations.",
  expoButton: "Learn more",

  // Savvy Media
  mediaTitle: "Savvy Media",
  mediaDescription: "Our media division offers a range of premium services, including large-scale advertising display systems that strengthen brand presence, in addition to a dedicated content creation and brand marketing unit that maximizes reach and visibility.",
  mediaButton: "Learn more",
},

  ar: {
    title: "خدمات ساڤي",
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
