"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

export default function RobotResponsibleUsePage() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const sections = useMemo(() => {
    const list = (key: string): string[] => {
      const v = t(key, { returnObjects: true })
      return Array.isArray(v) ? (v as string[]) : []
    }
    const ru = "robots.responsibleUse"
    return [
      {
        title: t(`${ru}.ipTitle`),
        content: t(`${ru}.ipContent`),
        list: [] as string[],
      },
      {
        title: t(`${ru}.operationTitle`),
        content: t(`${ru}.operationContent`),
        list: [] as string[],
      },
      {
        title: t(`${ru}.requirementsTitle`),
        content: "",
        list: list(`${ru}.requirementsList`),
      },
      {
        title: t(`${ru}.safetyTitle`),
        content: t(`${ru}.safetyContent`),
        list: [] as string[],
      },
      {
        title: t(`${ru}.notesTitle`),
        content: "",
        list: list(`${ru}.notesList`),
      },
    ]
  }, [t])

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
              <FormattedText text={t("robots.responsibleUse.title")} as="span" />
            </h1>
            <p className="text-gray-600 text-lg">
              <FormattedText text={t("robots.responsibleUse.lastUpdated")} as="span" />
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div className={`max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`} dir={dir} lang={langAttr}>
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
                  <FormattedText text={section.title} as="span" />
                </h2>

                {section.content ? (
                  <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line text-start">
                    <FormattedText text={section.content} as="span" />
                  </p>
                ) : null}

                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3 mb-6 text-start">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className={`text-gray-700 text-lg flex gap-2 items-start ${
                          isRTL ? "" : ""
                        }`}
                      >
                        <span className="text-primary shrink-0 mt-0.5">•</span>
                        <span className="flex-1">
                          <FormattedText text={item} as="span" />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {index < sections.length - 1 && <div className="mt-12 border-b border-gray-200" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
