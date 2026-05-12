# Innovation Page Structure

تم إنشاء صفحة Innovation بنفس بنية صفحة Expo مع جعل المكونات قابلة لإعادة الاستخدام.

## 📁 البنية الجديدة

### 1. **المكونات المشتركة (Shared Components)**
المكونات التي يمكن استخدامها في أي صفحة:

```
src/components/shared/
├── PageHero/
│   └── PageHero.tsx          # Hero section قابل لإعادة الاستخدام
├── PageAbout/
│   └── PageAbout.tsx         # About section مع الصور
└── PageServices/
    └── PageServices.tsx      # Services accordion
```

### 2. **صفحة Expo (محدثة)**
```
src/components/expo-page/sections/
├── ExpoHero/
│   ├── ExpoHero.tsx          # يستخدم PageHero
│   └── content.ts            # محتوى Expo
├── ExpoAbout/
│   ├── ExpoAbout.tsx         # يستخدم PageAbout
│   └── content.ts
└── ExpoServices/
    ├── ExpoServices.tsx      # يستخدم PageServices
    └── content.ts
```

### 3. **صفحة Innovation (جديدة)**
```
src/components/innovation-page/sections/
├── InnovationHero/
│   ├── InnovationHero.tsx    # يستخدم PageHero
│   └── content.ts            # محتوى Innovation
├── InnovationAbout/
│   ├── InnovationAbout.tsx   # يستخدم PageAbout
│   └── content.ts
└── InnovationServices/
    ├── InnovationServices.tsx # يستخدم PageServices
    └── content.ts
```

### 4. **الصفحات (Pages)**
```
src/app/[lang]/(main)/
├── expo/
│   └── page.tsx              # صفحة Expo
└── innovation/
    └── page.tsx              # صفحة Innovation (جديدة)
```

### 5. **الصور (Images)**
```
public/
├── expo/
│   ├── hero/hero.jpg
│   └── ExpoAbout/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       └── 4.jpg
└── innovation/                # جاهزة لإضافة الصور
    ├── hero/
    │   └── hero.jpg          # ضع صورة الـ Hero هنا
    ├── about/
    │   ├── 1.jpg             # ضع 4 صور هنا
    │   ├── 2.jpg
    │   ├── 3.jpg
    │   └── 4.jpg
    └── services/
        └── services.jpg      # ضع صورة الـ Services هنا
```

---

## 🎯 كيفية الاستخدام

### إنشاء صفحة جديدة

1. **إنشاء مكونات الصفحة:**
```tsx
// src/components/new-page/sections/NewPageHero/NewPageHero.tsx
import PageHero from "@/components/shared/PageHero/PageHero"
import { getNewPageHeroContent } from "./content"

export default function NewPageHero({ lang }) {
  return (
    <PageHero
      lang={lang}
      title={t("title")}
      subtitle={t("subtitle")}
      backgroundImage="/new-page/hero.jpg"
    />
  )
}
```

2. **إنشاء ملف المحتوى:**
```tsx
// src/components/new-page/sections/NewPageHero/content.ts
export const newPageHeroContent = {
  en: {
    title: "Your Title",
    subtitle: "Your Subtitle",
  },
  ar: {
    title: "العنوان",
    subtitle: "العنوان الفرعي",
  },
}
```

3. **إنشاء صفحة الراوت:**
```tsx
// src/app/[lang]/(main)/new-page/page.tsx
import NewPageHero from "@/components/new-page/sections/NewPageHero/NewPageHero"

export default async function NewPage({ params }) {
  const { lang } = await params
  return <NewPageHero lang={lang} />
}
```

---

## ✅ المزايا

1. **إعادة الاستخدام:** نفس المكونات لصفحات متعددة
2. **سهولة الصيانة:** تعديل واحد يؤثر على كل الصفحات
3. **محتوى منفصل:** كل صفحة لها محتواها الخاص
4. **نظيف ومنظم:** بنية واضحة وسهلة الفهم

---

## 📝 الخطوات التالية

1. **إضافة الصور للـ Innovation:**
   - ضع صور Hero في: `public/innovation/hero/`
   - ضع 4 صور About في: `public/innovation/about/`
   - ضع صورة Services في: `public/innovation/services/`

2. **تعديل المحتوى:**
   - عدل النصوص في ملفات `content.ts` حسب الحاجة
   - أضف أو احذف Services من `InnovationServices`

3. **الوصول للصفحات:**
   - Expo: `/en/expo` أو `/ar/expo`
   - Innovation: `/en/innovation` أو `/ar/innovation`

---

## 🔧 تخصيص المكونات

### PageHero
```tsx
<PageHero
  lang="en"
  title="Your Title"
  subtitle="Your Subtitle"
  backgroundImage="/path/to/image.jpg"
/>
```

### PageAbout
```tsx
<PageAbout
  lang="en"
  title="Your Title"
  description="Your Description"
  images={[
    { src: "/img1.jpg", alt: "Image 1" },
    { src: "/img2.jpg", alt: "Image 2" },
    { src: "/img3.jpg", alt: "Image 3" },
    { src: "/img4.jpg", alt: "Image 4" },
  ]}
/>
```

### PageServices
```tsx
<PageServices
  lang="en"
  title="Services Title"
  services={[
    {
      id: 1,
      title: "Service 1",
      description: "Description",
      icon: IconComponent,
      button: "Optional Button Text"
    }
  ]}
  image="/services-image.jpg"
  defaultExpandedId={1}
/>
```

---

تم إنشاء الصفحة بنجاح! 🎉
