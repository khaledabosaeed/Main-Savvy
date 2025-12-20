export type Language = "en" | "ar"

export const savvySectionsContent = {
 en: {
  sectionTitle: "Savvy World Sections",
  cards: [
    {
      id: "expo",
      title: "Savvy Expo",
      description: "We transform any exhibition into an interactive experience visitors will never forget",
      features: [
        "Strategic partnerships",
        "Engaging and purposeful activities",
        "mr.savvy robot",
        "Innovative and interactive visitor experiences"
      ],
      icon: "/home-page/icons/expo-icon.svg",
      image: "/sections/expo-image.jpg",
      link: "/expo",
      buttonText: "Learn more"
    },
    {
      id: "media",
      title: "Savvy Media",
      description: "We turn facades into attraction points and a continuous, effective revenue source",
      features: [
        "Brand building",
        "Digital marketing",
        "Creative content production",
        "Digital marketing",
        "Large-scale screens on building facades promoting your brand"
      ],
      icon: "/home-page/icons/media-icon.svg",
      image: "/sections/media-image.jpg",
      link: "/media",
      buttonText: "Learn more"
    },
    {
      id: "innovation",
      title: "Savvy Innovation",
      description: "We connect innovation with reality — robotics, intelligence, and sustainability delivered in a simple, integrated experience",
      features: [
        "Smart targeting capabilities",
        "Content monitoring",
        "Audience-tailored content",
        "mr.savvy robot",
        "Developing innovative solutions for building sustainable cities"
      ],
      icon: "/home-page/icons/innovation-icon.svg",
      image: "/sections/innovation-image.jpg",
      link: "/innovation",
      buttonText: "Learn more"
    }
  ]
}
,
    ar: {
        sectionTitle: "أقسام ساڤي وورلد",
        cards: [
            {
                id: "expo",
                title: "ساڤي اكسبو",
                description: "نحوّل أي معرض إلى تجربة تفاعلية يعيشها الزوار بشكل لا يُنسى",
                features: [
                    "شراكات استراتيجية",
                    "نشاطات ترفيهية وهادفة",
                    "روبوت مستر ساڤي",
                    "تجارب تفاعلية وابتكارية للزوار"
                ],
                icon: "/home-page/icons/expo-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/expo-image.jpg", // المستخدم سيضيف الصورة
                link: "/expo",
                buttonText: "تعلم المزيد"
            },
            {
                id: "media",
                title: "ساڤي ميديا",
                description: "نحوّل الواجهة إلى نقطة جذب. ومصدر دخل مستمر وفعّال",
                features: [
                    "بناء العلامات التجارية",
                    "تسويق الكتروني",
                    "صناعة محتوى مختِلف ",
                    "تسويق الكتروني",
                    "شاشات ضخمة على واجهات المباني تروّج علامتك التجارية"
                ],
                icon: "/home-page/icons/media-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/media-image.jpg", // المستخدم سيضيف الصورة
                link: "/media",
                buttonText: "تعلم المزيد"
            },
            {
                id: "innovation",
                title: "ساڤي ابتكار",
                description: "نربط الابتكار بالواقع. روبوت، ذكاء، واستدامة بشكل مبسّط لمنح تجربة متكاملة",
                features: [
                    "خاصية الاستهداف ذكـي",
                    "مراقبـة محتوى",
                    "محتوى مناسب للمتلقي",
                    "روبوت مستر ساڤي",
                    "تطوير حلول مبتكرة لبناء مدن مستدامة"
                ],
                icon: "/home-page/icons/innovation-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/innovation-image.jpg", // المستخدم سيضيف الصورة
                link: "/innovation",
                buttonText: "تعلم المزيد"
            }
        ]
    }
}

export function getSavvySectionsContent(lang: Language) {
    return savvySectionsContent[lang] || savvySectionsContent.en
}
