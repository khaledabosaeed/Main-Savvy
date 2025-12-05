export type Language = "en" | "ar"

export interface NewsArticle {
  id: number
  title: string
  date: string
  image: string
  category?: string
  excerpt?: string
  slug?: string
}

export const newsContent = {
  en: {
    title: "Savvy News",
    subtitle: "Our latest news.. so you stay in touch step by step",
    
    // News Articles
    articles: [
      {
        id: 1,
        title: "How do modern innovations contribute to enhancing visitor experience in exhibitions?",
        date: "December 5, 2024",
        image: "/news/news-1.jpg",
        category: "Innovation",
      },
      {
        id: 2,
        title: "Smart AI tools: How do they transform external interactions into a reliable resource?",
        date: "December 3, 2024",
        image: "/news/news-2.jpg",
        category: "AI",
      },
      {
        id: 3,
        title: "Thinking without borders: a practical solution that helps companies serve today and grow tomorrow",
        date: "December 1, 2024",
        image: "/news/news-3.jpg",
        category: "Innovation",
      },
      {
        id: 4,
        title: "How did the development of the Egyptian Museum and exhibitions transform the first public launch to global?",
        date: "November 28, 2024",
        image: "/news/news-1.jpg",
        category: "Projects",
      },
      {
        id: 5,
        title: "How does smart advertising showcase the future of interactive advertising?",
        date: "November 25, 2024",
        image: "/news/news-2.jpg",
        category: "Media",
      },
    ],
  },
  ar: {
    title: "اخبار سافي",
    subtitle: "آخر اخبارنا.. عشان تكون محط خطانا بخطوة",
    
    // مقالات الأخبار
    articles: [
      {
        id: 1,
        title: "كيف تقدم الابتكارات الحديثة تجربة الزائر في المعارض الحديثة؟",
        date: "ديسمبر 5, 2024",
        image: "/news/news-1.jpg",
        category: "ابتكار",
        slug: "interactive-displays-future",
      },
      {
        id: 2,
        title: "ادوات الذكاء الذكية: كيف تتحول التفاعلات الخارجية إلى مصدرة ذكية؟",
        date: "ديسمبر 3, 2024",
        image: "/news/news-2.jpg",
        category: "ذكاء اصطناعي",
        slug: "ai-smart-tools",
      },
      {
        id: 3,
        title: "الابتكار بدون تعقيد: حلول عملية تخدم الشركات اليوم وتطور اعمال الغد",
        date: "ديسمبر 1, 2024",
        image: "/news/news-3.jpg",
        category: "ابتكار",
        slug: "interactive-displays-future",
      },
      {
        id: 4,
        title: "كيف نصنع المصر والمعروضات الأولى للاطلاع بجودة؟",
        date: "نوفمبر 28, 2024",
        image: "/news/news-1.jpg",
        category: "مشاريع",
        slug: "interactive-displays-future",
      },
      {
        id: 5,
        title: "كيف تقدم شاشات الاعلانية مستقبل الاعلان التفاعلي؟",
        date: "نوفمبر 25, 2024",
        image: "/news/news-2.jpg",
        category: "إعلام",
        slug: "interactive-displays-future",
      },
    ],
  },
}

export const getNewsContent = (lang: Language, key: keyof typeof newsContent.en) => {
  return newsContent[lang][key]
}

