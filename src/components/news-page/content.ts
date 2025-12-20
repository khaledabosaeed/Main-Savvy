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
    subtitle: "Our latest updates… keeping you in the loop every step of the way",
    
    // News Articles
    articles: [
      {
        id: 1,
        title: "How Modern Innovations Enhance Visitor Experiences at Contemporary Exhibitions",
        date: "December 5, 2024",
        image: "/news/news-1.jpg",
        category: "Innovation",
        slug: "interactive-displays-future",
      },
      {
        id: 2,
        title: "Smart AI Tools: Turning Outdoor Interactions into Intelligent Insights",
        date: "December 3, 2024",
        image: "/news/news-2.jpg",
        category: "Artificial Intelligence",
        slug: "ai-smart-tools",
      },
      {
        id: 3,
        title: "Innovation Made Simple: Practical Solutions for Today’s Companies and Tomorrow’s Growth",
        date: "December 1, 2024",
        image: "/news/news-3.jpg",
        category: "Innovation",
        slug: "interactive-displays-future",
      },
      {
        id: 4,
        title: "How to Create High-Quality Exhibits and Displays for First Impressions",
        date: "November 28, 2024",
        image: "/news/news-1.jpg",
        category: "Projects",
        slug: "interactive-displays-future",
      },
      {
        id: 5,
        title: "How Advertising Screens Are Shaping the Future of Interactive Marketing",
        date: "November 25, 2024",
        image: "/news/news-2.jpg",
        category: "Media",
        slug: "interactive-displays-future",
      },
    ],
},

  ar: {
    title: "اخبار ساڤي",
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

