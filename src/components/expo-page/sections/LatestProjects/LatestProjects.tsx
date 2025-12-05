"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Language } from "./content"
import { getLatestProjectsContent } from "./content"

interface LatestProjectsProps {
  lang: Language
}

export default function LatestProjects({ lang }: LatestProjectsProps) {
  const isRTL = lang === "ar"
  const [activeTab, setActiveTab] = useState(0)
  const t = (key: keyof typeof import("./content").latestProjectsContent.en) => getLatestProjectsContent(lang, key)

  const tabs = [
    { id: 0, label: t("tab1") },
    { id: 1, label: t("tab2") },
    { id: 2, label: t("tab3") },
  ]

  const projects = [
    {
      title: t("project1Title"),
      description: t("project1Description"),
      image: "/expo-project-1.jpg",
    },
    {
      title: t("project2Title"),
      description: t("project2Description"),
      image: "/expo-project-2.jpg",
    },
    {
      title: t("project3Title"),
      description: t("project3Description"),
      image: "/expo-project-3.jpg",
    },
  ]

  const stats = [
    { label: t("stats1Label"), value: t("stats1Value"), icon: "👤" },
    { label: t("stats2Label"), value: t("stats2Value"), icon: "🏢" },
    { label: t("stats3Label"), value: t("stats3Value"), icon: "📱" },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-12 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className={`flex justify-center gap-4 mb-12 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Slider */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={projects[activeTab].image}
                  alt={projects[activeTab].title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveTab((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors`}
          >
            {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setActiveTab((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors`}
          >
            {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center ${isRTL ? 'rtl' : 'ltr'}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
