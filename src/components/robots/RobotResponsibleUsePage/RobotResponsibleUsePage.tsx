"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import type { Language, ResponsibleUseKey } from "@/lib/robots-locale"
import { getResponsibleUseContent } from "@/lib/robots-locale"

interface RobotResponsibleUsePageProps {
  lang: Language
}

export default function RobotResponsibleUsePage({ lang }: RobotResponsibleUsePageProps) {
  const isRTL = lang === "ar"
  const t = (key: ResponsibleUseKey) => getResponsibleUseContent(lang, key)

  const sections = [
    {
      title: t("ipTitle"),
      content: t("ipContent"),
      list: [] as string[],
    },
    {
      title: t("operationTitle"),
      content: t("operationContent"),
      list: [] as string[],
    },
    {
      title: t("requirementsTitle"),
      content: "",
      list: t("requirementsList") as string[],
    },
    {
      title: t("safetyTitle"),
      content: t("safetyContent"),
      list: [] as string[],
    },
    {
      title: t("notesTitle"),
      content: "",
      list: t("notesList") as string[],
    },
  ]

  const dir = isRTL ? "rtl" : "ltr"
  const langAttr = isRTL ? "ar" : "en"

  return (
    <div className="min-h-screen bg-white" dir={dir} lang={langAttr}>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="mt-20 md:mt-10 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-gray-600 text-lg">{t("lastUpdated")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div
            className={`max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
            dir={dir}
            lang={langAttr}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-start">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line text-start">
                    {section.content}
                  </p>
                )}

                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3 mb-6 text-start">
                    {section.list.map((item: string, i: number) => (
                      <li
                        key={i}
                        className={`text-gray-700 text-lg flex gap-2 items-start ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-primary shrink-0 mt-0.5">•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {index < sections.length - 1 && (
                  <div className="mt-12 border-b border-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
