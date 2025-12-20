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
    title: "Our Past Exhibitions",
    subtitle: "Experience from the exhibition floor… not just design.",

    projects: [
      {
        title: "Global PropTech Summit",
        description: "Savvy World participated in the Global PropTech Summit as one of the leading entities driving technological transformation in the real estate sector in Saudi Arabia. Our presence was not just participation, but a live showcase of the future of smart cities, demonstrating how sustainability, AI, and robotics can come together in a single system supporting Saudi Vision 2030.",

        image: "/expo/hero/hero.jpg",
        ctaButton: "Global PropTech Summit",
        statistics: [
          {
            value: 8000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 60,
            description: "Booths",
            formatter: "+"
          },
          {
            value: 250,
            label: "Million",
            description: "Interactions across all social platforms",
            formatter: "+"
          }
        ]
      },
      {
        title: '"Customer First" Exhibition - Jeddah',
        description: "In Jeddah, the Customer First Exhibition was a marketing/real estate event for NHC, presenting residential units within the company's projects.",
        image: "/expo/hero/jadh.png",
        ctaButton: '"Customer First" Exhibition - Jeddah',
        statistics: [
          {
            value: 7886,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 147,
            description: "Valuable Prizes",
            formatter: ""
          },
          {
            value: 133,
            label: "Bookings",
            description: "From real estate developers and banks",
            formatter: ""
          }
        ]
      },
      {
        title: '"Customer First" Exhibition - Khobar',
        description: "In Khobar, the exhibition served as a marketing/sales opportunity for residential projects, with discounts, special offers, and multiple prizes, featuring NHC as the showcasing entity.",
              image: "/expo/hero/khobar.jpg",
        ctaButton: '"Customer First" Exhibition - Khobar',
        statistics: [
          {
            value: 4000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 15,
            description: "Sales",
            formatter: "M+"
          },
          {
            value: 120,
            label: "Valuable Prizes",
            description: "Online Engagement",
            formatter: ""
          }
        ]
      },
      {
        title: "Al-Khozama Exhibition",
        description: "The Al-Khozama event witnessed wide attendance and significant engagement, with valuable prizes awarded in a distinctive atmosphere. The event also launched a dedicated employee loyalty program in collaboration with Samsung.",
                image: "/expo/hero/khazama.png",
        ctaButton: "Al-Khozama Exhibition",
        statistics: [
          {
            value: 50,
            description: "Valuable Prizes",
            formatter: ""
          },
          {
            value: 1500,
            description: "Employees",
            formatter: "+"
          },
          {
            label: "Samsung Employee Loyalty Program Activated",
            description: "",
            formatter: ""
          }
        ]
      },
    ] as ProjectData[]
  },
  
  ar: {
    title: "معارضنا السابقة",
    subtitle: "خبرة من أرض المعارض .. وليست مجرد تصميم.",
    
    projects: [
      {
        title: "القمة العالمية للبروبتيك",
description: "ساڤي وورلد شاركت في القمة العالمية للبروبتك أحد أبرز الجهات التي تقود التحول التقني في قطاع العقار داخل المملكة.وجودنا في القمة لم يكن مجرد مشاركة .. بل كان عرضًا حيًا لمستقبل المدن الذكية، وكيف يمكن الجمع بين الاستدامة، الذكاء الاصطناعي، والروبوتات في منظومة واحدة تخدم رؤية السعودية 2030.",
        image: "/expo/hero/hero.jpg",
        ctaButton: " القمة العالمية للبروبتيك",
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
        ctaButton: "معرض \"العميل اولاً\" - جدة",
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
              image: "/expo/hero/khobar.jpg",
        ctaButton: "معرض  \"العميل اولاً\" - الخُبر",
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
                image: "/expo/hero/khazama.png",


        ctaButton: "معرض الخزامى",
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

