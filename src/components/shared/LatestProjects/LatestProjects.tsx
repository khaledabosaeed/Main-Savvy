"use client"

import { useState, memo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Counter from "../Counter"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getLatestProjectsContent } from "./content"
import {
  fadeInUp,
  viewportConfig,
  crossfade,
  sectionSlideUp,
} from "@/lib/animations"

interface Project {
  id: number
  title: string
  description: string
  image: string
}

function LatestProjects() {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").latestProjectsContent.en) => getLatestProjectsContent(lang, key)

  const [activeProject, setActiveProject] = useState(0)

  const projects: Project[] = [
    {
      id: 0,
      title: t("project1Title"),
      description: t("project1Description"),
      image: "/expo/hero/hero.jpg",
    },
    {
      id: 1,
      title: t("project2Title"),
      description: t("project2Description"),
      image: "/placeholder-project-2.jpg",
    },
    {
      id: 2,
      title: t("project3Title"),
      description: t("project3Description"),
      image: "/placeholder-project-3.jpg",
    },
  ]

  const currentProject = projects[activeProject]

  const handleNext = useCallback(() => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const handlePrev = useCallback(() => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  const handleTabClick = useCallback((index: number) => {
    setActiveProject(index)
  }, [])

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        {/* Title and Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`text-center mb-6 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className={`flex gap-8 mb-12 justify-center border-b border-gray-200 pb-4`}
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => handleTabClick(index)}
              className={`relative px-2 py-2 text-sm md:text-base font-medium transition-colors ${activeProject === index
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
                }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {project.title}
              {activeProject === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content - Image and Text Side by Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Image Section */}
            <motion.div
              className={`relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl ${isRTL ? 'md:order-2' : 'md:order-1'}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Content Section */}
            <div className={`${isRTL ? 'md:order-1 text-right' : 'md:order-2 text-left'} space-y-6`}>
              <motion.h3
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {currentProject.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-gray-600 leading-relaxed"
              >
                {currentProject.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#3960F9] text-white rounded-lg font-medium text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow"
                >
                  {t("ctaButton")}
                </motion.button>
              </motion.div>

              {/* Statistics - Horizontal Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {/* Stat 1 */}
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-baseline gap-1 mb-1">
                    <Counter
                      to={8000}
                      className="text-3xl md:text-4xl font-bold text-gray-900"
                      formatter={(n) => `${Math.floor(n)}+`}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    {t("stat3Description")}
                  </p>
                </div>

                {/* Stat 2 */}
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-baseline gap-1 mb-1">
                    <Counter
                      to={60}
                      className="text-3xl md:text-4xl font-bold text-gray-900"
                      formatter={(n) => `${Math.floor(n)}+`}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    {t("stat2Description")}
                  </p>
                </div>

                {/* Stat 3 */}
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-baseline gap-1 mb-1">
                    <Counter
                      to={250}
                      className="text-3xl md:text-4xl font-bold text-gray-900"
                      formatter={(n) => `${Math.floor(n)}`}
                    />
                    <span className="text-xl md:text-2xl font-bold text-gray-900">
                      {t("stat1Label")}+
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    {t("stat1Description")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(LatestProjects)
