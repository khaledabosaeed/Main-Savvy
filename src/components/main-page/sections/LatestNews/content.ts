export type Language = "en" | "ar"

export interface NewsCard {
    id: string
    title: string
    date: string
    image: string
    buttonText: string
    link: string
}

export const latestNewsContent = {
    en: {
        sectionTitle: "Latest News.. Step by step with us.",
        cards: [
            {
                id: "news-1",
                title: "How to build interactive future activities?",
                date: "October 12",
                image: "/news/news-1.jpg",
                buttonText: "News",
                link: "/news/1"
            },
            {
                id: "news-2",
                title: "How to design images and videos for the first impression?",
                date: "October 3",
                image: "/news/news-2.jpg",
                buttonText: "Media",
                link: "/news/2"
            },
            {
                id: "news-3",
                title: "How does technology change the future of events?",
                date: "October 5",
                image: "/news/news-3.jpg",
                buttonText: "News",
                link: "/news/3"
            }
        ] as NewsCard[]
    },
    ar: {
        sectionTitle: "آخر أخبارنا.. عشان تكون معنا خطوة بخطوة.",
        cards: [
            {
                id: "news-1",
                title: "كيف تغير المناشط التفاعلية مستقبل الفعاليات؟",
                date: "12 أكتوبر",
                image: "/news/news-1.jpg",
                buttonText: "أخبار",
                link: "/news/1"
            },
            {
                id: "news-2",
                title: "كيف تصنع الصور والفيديوهات الأولى الطباع بدهي؟",
                date: "3 أكتوبر",
                image: "/news/news-2.jpg",
                buttonText: "ميديا",
                link: "/news/2"
            },
            {
                id: "news-3",
                title: "كيف تغير الروبوتات تجربة الزوار في المعارض والحدث؟",
                date: "5 أكتوبر",
                image: "/news/news-3.jpg",
                buttonText: "أخبار",
                link: "/news/3"
            }
        ] as NewsCard[]
    }
}

export function getLatestNewsContent(lang: Language) {
    return latestNewsContent[lang] || latestNewsContent.en
}
