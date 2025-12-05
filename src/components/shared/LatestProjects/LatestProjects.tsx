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
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background with brand color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        {/* Enhanced Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-16 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "60px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-[#3960F9] rounded-full mb-6 shadow-lg"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </motion.div>

        {/* Enhanced Navigation Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className={`flex gap-6 mb-16 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'} flex-wrap`}
          style={{ willChange: 'transform, opacity' }}
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => handleTabClick(index)}
              className={`relative group px-4 py-3 ${isRTL ? 'text-right' : 'text-left'}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`flex items-baseline gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.span
                  animate={{
                    scale: activeProject === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm font-bold transition-all ${activeProject === index 
                    ? "text-[#3960F9]" 
                    : "text-gray-400"
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <span
                  className={`text-lg font-bold transition-all ${activeProject === index
                    ? "text-[#3960F9]"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {project.title}
                </span>
              </div>
              {activeProject === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#3960F9] rounded-full shadow-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {/* Hover background */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-[#3960F9]/5 rounded-xl -z-10"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Main Content Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mb-20"
        >
          <div className="relative w-full h-[500px] md:h-[700px] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                variants={crossfade}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Enhanced Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#3960F9]/10 to-transparent" />
                
                {/* Project Info Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <motion.h3
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  >
                    {currentProject.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-2xl"
                  >
                    {currentProject.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Arrows */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.15, x: isRTL ? 4 : -4 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:shadow-2xl border-2 border-white/20 ${isRTL ? 'right-6' : 'left-6'
                }`}
              aria-label="Previous project"
            >
              <ChevronLeft className={`w-7 h-7 text-gray-900 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.15, x: isRTL ? -4 : 4 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:shadow-2xl border-2 border-white/20 ${isRTL ? 'left-6' : 'right-6'
                }`}
              aria-label="Next project"
            >
              <ChevronRight className={`w-7 h-7 text-gray-900 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Progress indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeProject === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Stat 1 */}
          <motion.div
            className={`${isRTL ? 'rtl text-right' : 'ltr text-left'} relative group`}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-[#3960F9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-3">
                  <Counter
                    to={250}
                    className="text-5xl md:text-6xl font-bold text-[#3960F9]"
                    formatter={(n) => `${Math.floor(n)}+`}
                  />
                  <span className="text-3xl md:text-4xl font-bold text-[#3960F9]">
                    {t("stat1Label")}
                  </span>
                </div>
                <p className="text-base md:text-lg text-gray-600 font-medium">
                  {t("stat1Description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className={`${isRTL ? 'rtl text-right' : 'ltr text-left'} relative group`}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-[#3960F9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-3">
                  <Counter
                    to={60}
                    className="text-5xl md:text-6xl font-bold text-[#3960F9]"
                    formatter={(n) => `${Math.floor(n)}+`}
                  />
                </div>
                <p className="text-base md:text-lg text-gray-600 font-medium">
                  {t("stat2Description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            className={`${isRTL ? 'rtl text-right' : 'ltr text-left'} relative group`}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-[#3960F9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-3">
                  <Counter
                    to={8000}
                    className="text-5xl md:text-6xl font-bold text-[#3960F9]"
                    formatter={(n) => `${Math.floor(n)}+`}
                  />
                </div>
                <p className="text-base md:text-lg text-gray-600 font-medium">
                  {t("stat3Description")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(LatestProjects)
