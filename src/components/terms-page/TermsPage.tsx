"use client"

import { motion } from "framer-motion"
import { FileText, Mail, Phone } from "lucide-react"
import type { Language } from "./content"
import { getTermsContent } from "./content"

interface TermsPageProps {
  lang: Language
}

export default function TermsPage({ lang }: TermsPageProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").termsContent.en) =>
    getTermsContent(lang, key)

  const sections = [
    {
      title: t("acceptanceTitle"),
      content: t("acceptanceContent"),
    },
    {
      title: t("permittedUseTitle"),
      content: t("permittedContent"),
      list: t("permittedList") as string[],
    },
    {
      title: t("intellectualPropertyTitle"),
      content: t("intellectualPropertyContent"),
    },
    {
      title: t("userTeamTitle"),
      content: t("userTeamContent"),
      list: t("userTeamList") as string[],
    },
    {
      title: t("paymentTitle"),
      content: t("paymentContent"),
      list: t("paymentList") as string[],
    },
    {
      title: t("modificationsTitle"),
      content: t("modificationsContent"),
    },
    {
      title: t("terminationTitle"),
      content: t("terminationContent"),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-[#3960F9]/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10 text-[#3960F9]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("lastUpdated")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container px-6">
          <div className={`max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                {/* Section Title */}
                <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {section.title}
                </h2>

                {/* Section Content */}
                <p className={`text-gray-700 leading-relaxed text-lg mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {section.content}
                </p>

                {/* List if exists */}
                {section.list && (
                  <ul className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {section.list.map((item: string, i: number) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-2 h-2 bg-[#3960F9] rounded-full mt-2 flex-shrink-0" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Divider */}
                {index < sections.length - 1 && (
                  <div className="mt-12 border-b border-gray-200" />
                )}
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl"
            >
              <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t("contactTitle")}
              </h2>
              <p className={`text-gray-700 leading-relaxed text-lg mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t("contactContent")}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <motion.a
                  href={`mailto:${t("contactEmail")}`}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-12 h-12 bg-[#3960F9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#3960F9]" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm text-gray-600 mb-1">
                      {isRTL ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <p className="font-semibold text-gray-900">{t("contactEmail")}</p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href={`tel:${t("contactPhone")}`}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-12 h-12 bg-[#3960F9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#3960F9]" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm text-gray-600 mb-1">
                      {isRTL ? "رقم الهاتف" : "Phone"}
                    </p>
                    <p className="font-semibold text-gray-900" dir="ltr">{t("contactPhone")}</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-br from-[#3960F9] to-[#2848C7]">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center text-white max-w-3xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isRTL
                ? "هل تريد معرفة المزيد؟"
                : "Want to Know More?"}
            </h2>
            <p className="text-lg mb-8 text-white/90">
              {isRTL
                ? "تواصل معنا لمعرفة المزيد عن خدماتنا وشروطنا"
                : "Contact us to learn more about our services and terms"}
            </p>
            <motion.a
              href={`/${lang}/contact`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white text-[#3960F9] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </motion.a>
          </motion.div>
        </div>
      </section> */}
    </div>
  )
}

