export type Language = "en" | "ar"

export const savvySectionsContent = {
    en: {
        sectionTitle: "Savvy World Sections",
        cards: [
            {
                id: "expo",
                title: "Savvy Expo",
                description: "Enter any exhibition as a unique experience. Interactive technologies that make your brand unforgettable.",
                features: [
                    "Strategic partnerships",
                    "Promotional and targeted activities",
                    "Mr. Savvy robot",
                    "Interactive and innovative exhibition experiences"
                ],
                icon: "/home-page/icons/expo-icon.svg", // User will add icon
                image: "/sections/expo-image.jpg", // User will add image
                link: "/expo",
                buttonText: "Learn More"
            },
            {
                id: "media",
                title: "Savvy Media",
                description: "We tell your story in a creative way. From content creation to digital marketing strategies.",
                features: [
                    "Creative content production",
                    "Digital marketing strategies",
                    "Social media management",
                    "Brand identity development"
                ],
                icon: "/home-page/icons/media-icon.svg", // User will add icon
                image: "/sections/media-image.jpg", // User will add image
                link: "/media",
                buttonText: "Learn More"
            },
            {
                id: "innovation",
                title: "Savvy Innovation",
                description: "Smart technology solutions that transform your business. From AI to IoT.",
                features: [
                    "Artificial intelligence solutions",
                    "Internet of Things (IoT)",
                    "Smart city technologies",
                    "Digital transformation consulting"
                ],
                icon: "/home-page/icons/innovation-icon.svg", // User will add icon
                image: "/sections/innovation-image.jpg", // User will add image
                link: "/innovation",
                buttonText: "Learn More"
            }
        ]
    },
    ar: {
        sectionTitle: "أقسام سافي ووورلد",
        cards: [
            {
                id: "expo",
                title: "سافي اكسبو",
                description: "نحوّل أي معرض إلى تجربةتفاعلية يعيشها الزوار بشكل لا يُنسى",
                features: [
                    "شراكات استراتيجية",
                    "نشاطات ترفيهية وهادفة",
                    "روبوت مستر سافي",
                    "تجارب تفاعلية وابتكارية للزوار"
                ],
                icon: "/home-page/icons/expo-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/expo-image.jpg", // المستخدم سيضيف الصورة
                link: "/expo",
                buttonText: "تعلم المزيد"
            },
            {
                id: "media",
                title: "سافي ميديا",
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
                title: "سافي ابتكار",
                description: "نربط الابتكار بالواقع. روبوت، ذكاء، واستدامة بشكل مبسّط لمنح تجربة متكاملة",
                features: [
                    "خاصية الاستهداف ذكـي",
                    "مراقبـة محتوى",
                    "محتوى مناسب للمتلقي",
                    "روبوت مستر سافي",
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
