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
                icon: "/icons/expo-icon.svg", // User will add icon
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
                icon: "/icons/media-icon.svg", // User will add icon
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
                icon: "/icons/innovation-icon.svg", // User will add icon
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
                description: "ندخل أي معرض في أي تجربة ذكية. تقنيات تفاعلية تجعل علامتك التجارية لا تُنسى.",
                features: [
                    "شراكات استراتيجية",
                    "نشاطات ترويجية وهادفة",
                    "روبوت مستر سافي",
                    "تجارب تفاعلية وابتكارية للزوار"
                ],
                icon: "/icons/expo-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/expo-image.jpg", // المستخدم سيضيف الصورة
                link: "/expo",
                buttonText: "تعلم المزيد"
            },
            {
                id: "media",
                title: "سافي ميديا",
                description: "نحكي قصتك بطريقة إبداعية. من إنتاج المحتوى إلى استراتيجيات التسويق الرقمي.",
                features: [
                    "إنتاج محتوى إبداعي",
                    "استراتيجيات تسويق رقمي",
                    "إدارة وسائل التواصل الاجتماعي",
                    "تطوير الهوية التجارية"
                ],
                icon: "/icons/media-icon.svg", // المستخدم سيضيف الأيقونة
                image: "/sections/media-image.jpg", // المستخدم سيضيف الصورة
                link: "/media",
                buttonText: "تعلم المزيد"
            },
            {
                id: "innovation",
                title: "سافي إنوفيشن",
                description: "حلول تقنية ذكية تحوّل أعمالك. من الذكاء الاصطناعي إلى إنترنت الأشياء.",
                features: [
                    "حلول الذكاء الاصطناعي",
                    "إنترنت الأشياء (IoT)",
                    "تقنيات المدن الذكية",
                    "استشارات التحول الرقمي"
                ],
                icon: "/icons/innovation-icon.svg", // المستخدم سيضيف الأيقونة
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
