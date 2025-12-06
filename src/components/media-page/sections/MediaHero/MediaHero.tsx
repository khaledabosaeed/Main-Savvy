/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { Language } from "./content"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface MediaHeroProps {
  lang: Language
}

// بيانات الرسوم البيانية
const viewerData = [
  { month: 'Jan', viewers: 24500 },
  { month: 'Feb', viewers: 19000 },
  { month: 'Mar', viewers: 14000 },
  { month: 'Apr', viewers: 19500 },
  { month: 'May', viewers: 23000 },
  { month: 'Jun', viewers: 18500 },
]

const locationData = [
  { name: 'الرياض', value: 50, color: '#3960F9', label: '50%' },
  { name: 'جدة', value: 40, color: '#1E40AF', label: '40%' },
  { name: 'الدمام', value: 10, color: '#1E293B', label: '10%' },
]

// بيانات خريطة الحرارة - 7 أيام × 28 أسبوع (لتناسب الإطار)
const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 10))
  }))
}

const heatmapData = generateHeatmapData()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

export default function MediaHero({ lang }: MediaHeroProps) {
  const isRTL = lang === "ar"
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6 + custom * 0.15,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    }),
  }

  return (
    <section 
      className="relative py-20 md:py-32 bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* خلفية متحركة محسّنة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#3960F9] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-6">
        {/* القسم النصي */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {isRTL 
              ? "حوّل واجهتك إلى منصة جذب.. ونشاشة تتكلم بدل عنك"
              : "Transform your interface into an attraction platform.. A screen that speaks for you"
            }
          </motion.h1>
          
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto mb-8"
          >
            {isRTL
              ? "حول حضورك إلى رسالة بصرية فريقة.. بمحتوى غامر ونشاطات تعمل 24/7 تبرز علامتك في كل لحظة"
              : "Transform your presence into a unique visual message with immersive content and 24/7 activities that highlight your brand every moment"
            }
          </motion.p>
          
          {/* الأزرار */}
          <motion.div
            variants={buttonsVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <motion.a
              href={`/${lang}/contact`}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(57, 96, 249, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#3960F9] text-white rounded-xl font-bold text-lg hover:bg-[#2848C7] transition-all shadow-lg"
            >
              {isRTL ? "تعلّم المزيد" : "Learn More"}
            </motion.a>
            <motion.a
              href={`/${lang}/contact`}
              whileHover={{ scale: 1.05, borderColor: "#3960F9" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-bold text-lg hover:border-[#3960F9] hover:text-[#3960F9] transition-all"
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </motion.a>
          </motion.div>
        </div>

        {/* حاوية قسم الإحصائيات */}
        <div className="bg-[#F0F5F4] mt-50 h-[600px] rounded-4xl p-8 md:p-16 max-w-7xl mx-auto overflow-visible md:relative">
          {/* قسم الإحصائيات */} 
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:relative md:min-h-[600px] relative">
          
          {/* مقياس جنس المشاهدين */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
            style={{ top: '-230px' }}

            className="bg-white rounded-3xl absolute p-8 top-[-50px] shadow-lg border border-gray-100 hover:border-[#3960F9]/30 transition-colors md:absolute md:-top-8 md:right-0 md:w-[calc(50%-1rem)] md:z-10"
          >
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">{isRTL ? "جنس المشاهدين" : "Viewer Gender"}</p>
              <div className="relative w-64 h-48 mx-auto flex items-center justify-center">
                {/* مقياس دائري مع خطوط شعاعية */}
                <svg viewBox="0 0 200 160" className="w-full h-full">
                  {/* الخطوط الشعاعية - الخلفية الرمادية */}
                  {Array.from({ length: 25 }).map((_, i) => {
                    const angle = -180 + (i * 180 / 24)
                    const angleRad = (angle * Math.PI) / 180
                    const x1 = 100 + Math.cos(angleRad) * 55
                    const y1 = 120 + Math.sin(angleRad) * 55
                    const x2 = 100 + Math.cos(angleRad) * 75
                    const y2 = 120 + Math.sin(angleRad) * 75
                    const isActive = i <= 16 // 64% من 25 خط = ~16 خط
                    
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isActive ? "#3960F9" : "#E5E7EB"}
                        strokeWidth={isActive ? "4" : "3"}
                        strokeLinecap="round"
                      />
                    )
                  })}
                  
                  {/* النص المركزي */}
                  <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#6B7280" fontWeight="500">
                    {isRTL ? "الذكور" : "Male"}
                  </text>
                  <text x="100" y="135" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#111827">
                    64%
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* الرسم البياني الشريطي - عدد المشاهدين */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
            style={{ top: '-200px' }}
            className="bg-white rounded-3xl absolute p-8 top-[-50px] shadow-lg border border-gray-100 hover:border-[#3960F9]/30 transition-colors md:absolute md:-top-8 md:left-0 md:w-[calc(50%-1rem)] md:z-10"
          >
            <div className={`text-center mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-600 text-sm mb-1">{isRTL ? "عدد المشاهدين" : "Number of Viewers"}</p>
              <p className="text-4xl font-bold text-gray-900">60,000</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={viewerData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Bar dataKey="viewers" fill="#3960F9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* خريطة الحرارة */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#3960F9]/30 transition-colors overflow-hidden md:absolute md:-bottom-8 md:right-0 md:w-[calc(50%-1rem)] md:z-10"
          >
            <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-900 font-bold text-lg mb-1">
                {isRTL ? "خريطة الحركة" : "Activity Heatmap"}
              </p>
            </div>
            <div className="space-y-1 overflow-hidden">
              {heatmapData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 items-center">
                  <span className="text-xs text-gray-500 w-8 shrink-0">{row.day}</span>
                  <div className="flex gap-1">
                    {row.data.map((value, colIndex) => (
                      <div
                        key={colIndex}
                        className="w-5 h-5 rounded-md transition-all hover:scale-105 relative shrink-0"
                        style={{
                          backgroundColor: value === 0 ? '#E5E7EB' : `rgba(57, 96, 249, ${0.15 + (value / 10) * 0.85})`,
                        }}
                        title={`${row.day} - Week ${colIndex + 1}: ${value}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-1 items-center pt-3">
                <span className="text-xs text-gray-500 w-8 shrink-0"></span>
                <div className="flex gap-1 justify-between flex-1">
                  {months.map((month, index) => (
                    <span 
                      key={index} 
                      className="text-xs text-gray-500 text-center"
                      style={{ width: `${100 / months.length}%` }}
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 mt-6 justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs text-gray-500">{isRTL ? "أقل" : "Less"}</span>
              <div className="flex gap-1 items-center">
                <div className="w-3 h-3 rounded-sm bg-[#E5E7EB]" />
                {[0.3, 0.5, 0.7, 1].map((opacity, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: `rgba(57, 96, 249, ${opacity})` }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{isRTL ? "أكثر" : "More"}</span>
            </div>
          </motion.div>

          {/* الرسم البياني الدائري - حركة المشاهدين */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#3960F9]/30 transition-colors md:absolute md:-bottom-8 md:left-0 md:w-[calc(50%-1rem)] md:z-10"
          >
            <div className={`mb-6 text-center`}>
              <p className="text-gray-900 font-bold text-lg">
                {isRTL ? "حركة المشاهدين حسب الموقع" : "Viewer Movement by Location"}
              </p>
            </div>
            <div className={`flex items-center justify-between gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* النسب على اليسار */}
              <div className={`flex flex-col gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
                {locationData.map((item, index) => (
                  <div key={index} className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{item.value}%</p>
                  </div>
                ))}
              </div>
              
              {/* الرسم الدائري على اليمين */}
              <div className="shrink-0">
                <ResponsiveContainer width={260} height={260}>
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      paddingAngle={0}
                      dataKey="value"
                      label={({ value }) => `${value}%`}
                      labelLine={false}
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
