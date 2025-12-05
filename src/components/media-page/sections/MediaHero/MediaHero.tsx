"use client"

import { motion } from "framer-motion"
import type { Language } from "./content"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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
  { name: 'مدخل', value: 50, color: '#1E40AF' },
  { name: 'موقع 1', value: 40, color: '#3960F9' },
  { name: 'موقع 2', value: 10, color: '#1E293B' },
]

// بيانات خريطة الحرارة
const heatmapData = [
  { day: 'Mon', data: [1, 3, 5, 7, 9, 7, 5, 3, 8, 6, 4, 9] },
  { day: 'Tue', data: [2, 4, 6, 8, 7, 5, 3, 9, 7, 5, 3, 8] },
  { day: 'Wed', data: [9, 7, 5, 3, 8, 6, 4, 9, 7, 5, 3, 1] },
  { day: 'Thu', data: [1, 9, 7, 5, 3, 8, 6, 4, 9, 7, 5, 3] },
  { day: 'Fri', data: [2, 1, 9, 7, 5, 3, 8, 6, 4, 9, 7, 5] },
  { day: 'Sat', data: [5, 2, 1, 9, 7, 5, 3, 8, 6, 4, 9, 7] },
  { day: 'Sun', data: [7, 5, 2, 1, 9, 7, 5, 3, 8, 6, 4, 9] },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function MediaHero({ lang }: MediaHeroProps) {
  const isRTL = lang === "ar"

  return (
    <section 
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#3960F9] rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-6">
        {/* القسم النصي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {isRTL 
              ? "حوّل واجهتك الى منصة جذب.. وشاشة تتكلم بدل عنك"
              : "Transform your interface into an attraction platform.. A screen that speaks for you"
            }
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto mb-8">
            {isRTL
              ? "حول حضورك إلى رسالة بصرية قوية، بمحتوى غني ومقاطع فيديلا 24/7 تبرز علامتك في كل لحظة"
              : "Transform your presence into a powerful visual message with rich content and 24/7 videos highlighting your brand every moment"
            }
          </p>
          
          {/* الأزرار */}
          <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#3960F9] text-white rounded-full font-bold text-lg hover:bg-[#2848C7] transition-all shadow-lg"
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold text-lg hover:border-[#3960F9] hover:text-[#3960F9] transition-all"
            >
              {isRTL ? "تعلم المزيد" : "Learn More"}
            </motion.button>
          </div>
        </motion.div>

        {/* قسم الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* الرسم البياني الشريطي - عدد المشاهدين */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className={`text-center mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-600 text-sm mb-1">{isRTL ? "عدد المشاهدين" : "Number of Viewers"}</p>
              <p className="text-4xl font-bold text-gray-900">60,000</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={viewerData}>
                <Bar dataKey="viewers" fill="#3960F9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* مقياس جنس المشاهدين */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">{isRTL ? "جنس المشاهدين" : "Viewer Gender"}</p>
              <div className="relative w-64 h-64 mx-auto">
                {/* مقياس دائري مخصص */}
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  {/* الخلفية */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  {/* التقدم */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#3960F9"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                  />
                  {/* النص */}
                  <text x="100" y="90" textAnchor="middle" fontSize="14" fill="#6B7280">
                    {isRTL ? "الذكور" : "Male"}
                  </text>
                  <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#111827">
                    64%
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* الرسم البياني الدائري - حركة المشاهدين */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-900 font-bold text-lg mb-1">
                {isRTL ? "حركة المشاهدين حسب الموقع" : "Viewer Movement by Location"}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className={`space-y-2 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                {locationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* خريطة الحرارة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-900 font-bold text-lg mb-1">
                {isRTL ? "خريطة الحركة" : "Activity Heatmap"}
              </p>
            </div>
            <div className="space-y-1">
              {heatmapData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 items-center">
                  <span className="text-xs text-gray-500 w-8">{row.day}</span>
                  {row.data.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className="w-6 h-6 rounded-sm transition-all hover:scale-110"
                      style={{
                        backgroundColor: `rgba(57, 96, 249, ${value / 10})`,
                      }}
                      title={`${row.day} - ${months[colIndex]}: ${value}`}
                    />
                  ))}
                </div>
              ))}
              <div className="flex gap-1 items-center pt-2">
                <span className="text-xs text-gray-500 w-8"></span>
                {months.map((month, index) => (
                  <span key={index} className="text-xs text-gray-500 w-6 text-center">
                    {month.substring(0, 1)}
                  </span>
                ))}
              </div>
            </div>
            <div className={`flex items-center gap-2 mt-4 justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs text-gray-500">{isRTL ? "أقل" : "Less"}</span>
              <div className="flex gap-1">
                {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: `rgba(57, 96, 249, ${opacity})` }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{isRTL ? "أكثر" : "More"}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
