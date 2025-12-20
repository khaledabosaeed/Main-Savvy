export type Language = "en" | "ar"

export interface Article {
  id: string
  title: string
  date: string
  image: string
  category: string
  content: {
    intro: string
    sections: {
      title: string
      content: string
      list?: string[]
    }[]
  }
}

export const articlesData: Record< Language,Record<string, Article>> = {
ar:{
    
  "interactive-displays-future": 
  {
    id: "interactive-displays-future",
    title: "كيف تغير الشاشات التفاعلية مستقبل الفعاليات؟",
    date: "ديسمبر 5, 2024",
    image: "/news/news-1.jpg",
    category: "ابتكار",
    content: {
      intro: "الشاشات التفاعلية في المعارض هي مستقبل، عملية اتصالات التفاعلية وتغيير طريقة تواصل العلامة مع الجمهور أو زوار المعارض حيث أنها تسمح بتفاعل مباشر مع المحتوى إنشاء تجربة غامرة تجذب الحضور وتزيد من فهمهم للخدمة أو منتج دون جهد وبطريقة تفاعلية آلية",
      sections: [
        {
          title: "رفع مستوى التفاعل المباشر مع الجمهور",
          content: "يوفر الشاشات التفاعلية بيانات يلزم تصميم منصة جاذبة، بينما يقدرون المحتوى من خلال الشاشات. حيث يلاء جانب تشارك فيل أو وقت التفاعلة الحالي العرض ضمن، تواصل يستدعى و أي وقت المشاريع قوق."
        },
        {
          title: "محتوى ديناميكي يتغير حسب الحدث",
          content: "يمكن تخصيص محتوى الشاشات بشكل ديناميكي لتلائم كل حدث أو فعالية. تمنح المرونة في عرض المحتوى المناسب في الوقت المناسب، وتساعد المنظمين على توصيل الرسائل المهمة بطريقة أكثر فعالية وجاذبية للجمهور المستهدف."
        },
        {
          title: "تقليل التكاليف وزيادة الكفاءة",
          content: "تقلل شاشات التفاعلية من يحتاج للمواد بالتقليدية، الخاصة بالطباعة والبرشورات والملصقات، حيث يلزم، وقل، يتحدث المحتوى. و في اي وقت شرح عناء يمتاز إيصال المعلوماتيه المسيرة المكلفة.",
          list: [
            "لا تكاليف إعادة",
            "لا بصمت المواد طبع ورق",
            "قد بصمت الصالح المحدّث المختصر الرقابة بشيء ديا المستجد"
          ]
        }
      ]
    }
  },
  "ai-smart-tools": {
    id: "ai-smart-tools",
    title: "ادوات الذكاء الذكية: كيف تتحول التفاعلات الخارجية إلى مصدرة ذكية؟",
    date: "ديسمبر 3, 2024",
    image: "/news/news-2.jpg",
    category: "ذكاء اصطناعي",
    content: {
      intro: "أدوات الذكاء الاصطناعي تحول التفاعلات الخارجية إلى مصادر ذكية للمعلومات والتحليل. من خلال معالجة البيانات وتحليلها، يمكن للشركات فهم عملائها بشكل أفضل وتقديم خدمات مخصصة.",
      sections: [
        {
          title: "معالجة البيانات بذكاء",
          content: "تستخدم أدوات الذكاء الاصطناعي خوارزميات متقدمة لمعالجة كميات هائلة من البيانات في وقت قياسي."
        },
        {
          title: "تحليل سلوك المستخدمين",
          content: "يمكن للذكاء الاصطناعي تتبع وتحليل سلوك المستخدمين لتقديم توصيات مخصصة وتحسين تجربة العملاء."
        }
      ]
    }
  }}
,
en:{
"interactive-displays-future": {
  id: "interactive-displays-future",
  title: "How Interactive Displays Are Shaping the Future of Events",
  date: "December 5, 2024",
  image: "/news/news-1.jpg",
  category: "Innovation",
  content: {
    intro: "Interactive displays at exhibitions represent the future, transforming communication and changing how brands engage with audiences or visitors. They allow direct interaction with content, creating an immersive experience that attracts attendees and enhances their understanding of a service or product effortlessly and interactively.",
    sections: [
      {
        title: "Enhancing Direct Audience Engagement",
        content: "Interactive displays provide valuable data while creating an engaging platform. Visitors interact with the screens, exploring content in real-time, which encourages communication and engagement at any moment of the event."
      },
      {
        title: "Dynamic Content Tailored to the Event",
        content: "Display content can be dynamically customized to suit each event. This flexibility ensures the right content is shown at the right time and helps organizers convey key messages more effectively and attractively to the target audience."
      },
      {
        title: "Reducing Costs and Increasing Efficiency",
        content: "Interactive displays minimize the need for traditional printed materials such as brochures and posters, saving both cost and effort. They deliver information efficiently while eliminating the hassle associated with conventional methods.",
        list: [
          "No reprinting costs",
          "No paper waste",
          "Easily updated content with real-time control"
        ]
      }
    ]
  }
},
"ai-smart-tools": {
  id: "ai-smart-tools",
  title: "Smart AI Tools: Turning Outdoor Interactions into Intelligent Insights",
  date: "December 3, 2024",
  image: "/news/news-2.jpg",
  category: "Artificial Intelligence",
  content: {
    intro: "AI tools transform outdoor interactions into intelligent sources of data and insights. By processing and analyzing information, companies can better understand their customers and deliver personalized services.",
    sections: [
      {
        title: "Smart Data Processing",
        content: "AI tools use advanced algorithms to process massive amounts of data in record time."
      },
      {
        title: "User Behavior Analysis",
        content: "AI can track and analyze user behavior to provide personalized recommendations and improve customer experiences."
      }
    ]
  }
}
} 
}

export const getArticleBySlug = (lang:Language,  slug: string): Article | null => {
  return articlesData[lang][slug] || null;
}








