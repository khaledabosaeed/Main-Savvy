export type Language = "en" | "ar"

export const termsContent = {
  en: {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated: December 2024",
    acceptanceTitle: "Acceptance of Terms",
    acceptanceContent: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    permittedUseTitle: "Permitted Use",
    permittedContent: "You are granted a limited license to access and use the services for lawful purposes only:",
    permittedList: [
      "• Personal and non-commercial use",
      "• Educational purposes",
      "• Professional research"
    ],
    intellectualPropertyTitle: "Intellectual Property Rights",
    intellectualPropertyContent: "All content included on this site is the property of Savvy or its content suppliers and is protected by applicable laws:",
    intellectualPropertyList: [
      "• Trademarks and service marks",
      "• Text, graphics, logos, and images",
      "• Software and code"
    ],
    intellectualPropertyFooter: "Unauthorized use of any content may violate copyright, trademark, and other laws.",
    userTeamTitle: "User Responsibilities",
    userTeamContent: "Users agree to:",
    userTeamList: [
      "• Provide accurate information",
      "• Maintain the security of their account",
      "• Not engage in any unlawful activities"
    ],
    modificationsTitle: "Modifications to Terms",
    modificationsContent: "We reserve the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of those changes.",
    terminationTitle: "Termination",
    terminationContent: "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.",
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
