export type Language = "en" | "ar"

export interface ProjectStatistic {
  value: number
  label?: string
  description: string
  formatter?: string // "+" or "million" etc
}

export interface ProjectData {
  title: string
  description: string
  image: string
  ctaButton: string
  statistics: ProjectStatistic[]
}

export const latestProjectsContent = {
  en: {
    title: "Our Latest Projects",
    subtitle: "Experience from the first exhibition - not just design",

    projects: [
      {
        title: "Global Robotics Summit",
        description: "A comprehensive robotics exhibition showcasing the latest innovations in AI and automation.",
        image: "/expo/hero/hero.jpg",
        ctaButton: "Read More About Global Robotics",
        statistics: [
          {
            value: 8000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 60,
            description: "Company Corners",
            formatter: "+"
          },
          {
            value: 250,
            label: "Million",
            description: "Views across social media platforms",
            formatter: "+"
          }
        ]
      },
      {
        title: "Customer First Exhibition",
        description: "An innovative exhibition focused on customer experience and digital transformation.",
        image: "/placeholder-project-2.jpg",
        ctaButton: "Read More About Customer First",
        statistics: [
          {
            value: 5000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 40,
            description: "Company Corners",
            formatter: "+"
          },
          {
            value: 150,
            label: "Million",
            description: "Social Media Reach",
            formatter: "+"
          }
        ]
      },
      {
        title: "Al-Khuzama Exhibition",
        description: "A cultural and technological exhibition celebrating innovation and heritage.",
        image: "/placeholder-project-3.jpg",
        ctaButton: "Read More About Al-Khuzama",
        statistics: [
          {
            value: 6000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 35,
            description: "Company Corners",
            formatter: "+"
          },
          {
            value: 200,
            label: "Million",
            description: "Online Engagement",
            formatter: "+"
          }
        ]
      }
    ] as ProjectData[]
  },
  ar: {
    title: "معارضنا السابقة",
    subtitle: "خبرة من أرض المعارض .. وليست مجرد تصميم.",

    projects: [
      {
        title: "القمة العالمية للبروبتيك",
        description: "سافي وورلد شاركت في القمة العالمية للبروبتك كأحد أبرز الجهات التي تقود التحول التقني في قطاع العقار داخل المملكة.وجودنا في القمة لم يكن مجرد مشاركة .. بل كان عرضًا حيًا لمستقبل المدن الذكية، وكيف يمكن الجمع بين الاستدامة، الذكاء الاصطناعي، والروبوتات في منظومة واحدة تخدم رؤية السعودية 2030.",

        image: "/expo/hero/hero.jpg",
        ctaButton: "اقرأ دروبا في القمة العالمية للبروبتيك",
        statistics: [
          {
            value: 8000,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 60,
            description: "بوث",
            formatter: "+"
          },
          {
            value: 250,
            label: "مليون",
            description: "تفاعل على جميع منصات التواصل",
            formatter: "+"
          }
        ]
      },
      {
        title: "معرض \"العميل اولاً\" - جدة",
        description: "في جدة، معرض العميل أولاً كان فعالية تسويقية/عقارية لـ NHC، يقدّم وحدات سكنية ضمن مشاريع الشركة،",
        image: "/expo/hero/jadh.png",
        ctaButton: "اقرأ المزيد عن معرض العميل أولاً",
        statistics: [
          {
            value: 7886,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 147,
            description: "جائزة قيمة",
            formatter: ""
          },
          {
            value: 133,
            label: "حجز",
            description: "من المطوريين العقاريين والبنوك ",
            formatter: ""
          }
        ]
      },
  
      {
        title: "معرض  \"العميل اولاً\" - الخُبر",
        description: "في الخبر، المعرض بدا كفرصة تسويقية/عروض تملك ضمن مشاريع سكنيي, بتخفيضات وعروض خاصة وعدة جوائز، مع مشاركة الNHC كجهة عرض",
        image: "/expo/hero/khazama.png",
        ctaButton: "اقرأ المزيد عن معرض الخزامه",
        statistics: [
          {
            value: 4000,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 15,
            description: "مبيعات ",
            formatter: "M+"
          },
          {
            value: 120,
            label: "جائزة قيمة  ",
            description: "تفاعل على الإنترنت",
            formatter: ""
          }
        ]
      }
      , {
        title: "معرض الخزامى",
        description: "شهدت فعالية الخزامى حضوراً واسعاً وتفاعلاً كبيراً، حيث قدّمت جوائز قيّمة ضمن أجواء مميزة، كما جرى خلالها إطلاق برنامج ولاء مخصّص للموظفين بالتعاون مع شركة سامسونج..",
        image: "/expo/hero/khobar.jpg",
        ctaButton: "اقرأ المزيد عن معرض الخزامه",
        statistics: [
          {
            value: 50,
            description: "جائزة قيمة",
            formatter: ""
          },
          {
            value: 1500,
            description: "موظف",
            formatter: "+"
          },
          {
            label: "تفعيل برنامج ولاء الموظفين من سامسونج",
            description: "",
            formatter: ""
          }
        ]
      },
    ] as ProjectData[]
  },
}

export function getProjects(lang: Language): ProjectData[] {
  return latestProjectsContent[lang].projects
}

export function getLatestProjectsTitle(lang: Language): string {
  return latestProjectsContent[lang].title
}

export function getLatestProjectsSubtitle(lang: Language): string {
  return latestProjectsContent[lang].subtitle
}

