"use client"

import { motion } from "framer-motion"
import { Shield, } from "lucide-react"
import type { Language } from "./content"
import { getPrivacyContent } from "./content"

interface PrivacyPageProps {
  lang: Language
}

export default function PrivacyPage({ lang }: PrivacyPageProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").privacyContent.en) =>
    getPrivacyContent(lang, key)

  const sections = [
    {
      title: t("introTitle"),
      content: t("introContent"),
      list: t("introList") as string[],
      footer: t("introFooter"),
    },
    {
      title: t("dataCollectionTitle"),
      content: t("dataCollectionContent"),
      list: t("dataCollectionList") as string[],
    },
    {
      title: t("dataSharingTitle"),
      content: t("dataSharingContent"),
    },
    {
      title: t("noSellingTitle"),
      content: t("noSellingContent"),
    },
    {
      title: t("dataRetentionTitle"),
      content: t("dataRetentionContent"),
    },
    {
      title: t("policyChangesTitle"),
      content: t("policyChangesContent"),
    },
    {
      title: t("yourRightsTitle"),
      content: t("yourRightsContent"),
      list: t("yourRightsList") as string[],
    },
  ].filter(section => section.title && section.content)

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
                <Shield className="w-10 h-10 text-[#3960F9]" />
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
                {section.list && section.list.length > 0 && (
                  <ul className={`space-y-3 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {section.list.map((item: string, i: number) => (
                      <li
                        key={i}
                        className={`text-gray-700 text-lg ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer text if exists */}
                {section.footer && (
                  <p className={`text-gray-700 leading-relaxed text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                    {section.footer}
                  </p>
                )}

                {/* Divider */}
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

