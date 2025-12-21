export type Language = "en" | "ar"

export const termsContent = {
en: {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated: December 2024",

    acceptanceTitle: "Acceptance of Terms",
    acceptanceContent: "By using the Savvy World website or any of its pages and services, you agree to comply with these terms. If you do not agree with any part of them, please do not use the site.",

    permittedUseTitle: "Permitted Use",
    permittedContent: "You are allowed to use the site for the following purposes only:",
    permittedList: [
      "Browsing and learning about Savvy World’s services",
      "Contacting us through official forms",
      "Registering for events or expressing interest in projects",
      "Reading displayed content (news, images, exhibitions, solutions, services)"
    ],

    intellectualPropertyTitle: "Intellectual Property",
    intellectualPropertyContent: "All content published on the site is owned by Savvy World and includes:",
    intellectualPropertyList: [
      "Texts",
      "Images",
      "Designs",
      "Logos",
      "Videos"
    ],
    intellectualPropertyFooter: "Creative content related to mr.savvy, robots, and solutions — any content from Savvy exhibitions, media, or innovation — may not be used without prior written permission.",

    userTeamTitle: "Accuracy of Information",
    userTeamContent: "We strive to provide accurate and up-to-date information, but:",
    userTeamList: [
      "Content or services may change without notice",
      "Some pages may contain experimental or preliminary information",
      "We do not guarantee the site is error-free or uninterrupted",
      "Use of any information is at your own risk."
    ],

    modificationsTitle: "Modifications to Terms",
    modificationsContent: "We reserve the right to modify the terms of use at any time. Continued use of the site after changes constitutes explicit acceptance of the new version.",

    terminationTitle: "Termination",
    terminationContent: "We may suspend or prevent your use of the site if you violate any of the stated terms. This may occur without prior notice.",
},
ar: {
    title: "الشروط والأحكام",
    lastUpdated: "آخر تحديث: ديسمبر 2024",
    acceptanceTitle: "قبول الشروط",
    acceptanceContent: "باستخدامك لموقع ساڤي وورلد أو أي من صفحاته وخدماته، فإنك توافق على الالتزام بهذه الشروط.إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.",


    permittedUseTitle: "الاستخدام المسموح",
    permittedContent: "يسمح لك باستخدام الموقع للأغراض التالية فقط:",
    permittedList: [
      "الاستعراض والتعرّف على خدمات ساڤي وورلد",
      " التواصل معنا عبر النماذج الرسمية",
      "التسجيل في الفعاليات أو الاهتمام بالمشاريع",
      "قراءة المحتوى المعروض (أخبار، صور، معارض، حلول، خدمات.)"
    ],

    intellectualPropertyTitle: " الملكية الفكرية",
    intellectualPropertyContent: "كل المحتوى المنشور على الموقع مملوك لـ ساڤي وورلد، ويتضمن:",
    intellectualPropertyList: [
      "النصوص",
      "الصور",
      "التصاميم",
      "الشعارات",
      "الفيديوهات"
    ],

    intellectualPropertyFooter: " المحتوى الإبداعي المرتبط بمستر ساڤي والروبوتات والحلول أي محتوى خاص بمعارض ساڤي، الميديا، والابتكار لا يجوز استخدام أي جزء من هذا المحتوى دون إذن كتابي مسبق." ,
    userTeamTitle: "دقّة المعلومات",
    userTeamContent: "نحن نسعى لتقديم معلومات دقيقة ومحدثة، لكن:",
    userTeamList: [
      "قد يتغير المحتوى أو الخدمات دون إشعار",
      "قد تحتوي بعض الصفحات على معلومات تجريبية أو مبدئية",
      "لا نضمن خلوّ الموقع من الأخطاء أو الانقطاعات",
      "استخدامك لأي معلومة على مسؤوليتك الشخصية."
    ],

    modificationsTitle: "التعديلات على الشروط",
    modificationsContent: "نحتفظ بالحق في تعديل شروط الاستخدام في أي وقت.يُعتبر استمرارك في استخدام الموقع بعد التغيير موافقة صريحة على النسخة الجديدة.",

    terminationTitle: "الإنهاء",
    terminationContent: "يمكننا تعليق أو منع استخدامك للموقع إذا خالفت أي شرط من الشروط المذكورة.قد يحدث ذلك دون إشعار مسبق.",
  }
}

export function getTermsContent<K extends keyof typeof termsContent.en>(
  lang: Language,
  key: K
): typeof termsContent.en[K] {
  return termsContent[lang][key]
}
