"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import type { Language } from "./content"
import { newsContent, type NewsArticle } from "./content"

interface NewsPageProps {
  lang: Language
}

export default function NewsPage({ lang }: NewsPageProps) {
  const isRTL = lang === "ar"
  const content = newsContent[lang]
  const articles = content.articles as NewsArticle[]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-3xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {content.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20">
        <div className="container px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {articles.map((article, index) => (
              <Link 
                key={article.id} 
                href={article.slug ? `/${lang}/news/${article.slug}` : `/${lang}/news`}
              >
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer ${isRTL ? 'rtl' : 'ltr'}`}
                >
                  <div className={`flex flex-col md:flex-row gap-8 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="md:w-1/3 flex-shrink-0"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className={`flex-1 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
                    {/* Category & Date */}
                    <div className={`flex items-center gap-4 mb-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {article.category && (
                        <span className="px-3 py-1 bg-[#3960F9]/10 text-[#3960F9] rounded-full font-medium">
                          {article.category}
                        </span>
                      )}
                      <div className={`flex items-center gap-2 text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#3960F9] transition-colors">
                      {article.title}
                    </h2>

                    {/* Read More */}
                    <motion.button
                      whileHover={{ x: isRTL ? -5 : 5 }}
                      className={`text-[#3960F9] font-semibold flex items-center gap-2 ${isRTL ? 'flex-row-reverse self-end' : 'self-start'}`}
                    >
                      <span>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                        />
                      </svg>
                    </motion.button>
                  </div>
                  </div>

                  {/* Divider */}
                  {index < articles.length - 1 && (
                    <div className="mt-8 border-b border-gray-200" />
                  )}
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

