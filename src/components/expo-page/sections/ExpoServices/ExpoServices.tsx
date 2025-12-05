"use client"

import PageServices, { type ServiceData } from "@/components/shared/PageServices/PageServices"
import { Monitor, Bot, Sparkles } from "lucide-react"
import type { Language } from "./content"
import { getExpoServicesContent } from "./content"

interface ExpoServicesProps {
  lang: Language
}

export default function ExpoServices({ lang }: ExpoServicesProps) {
  const t = (key: keyof typeof import("./content").expoServicesContent.en) =>
    getExpoServicesContent(lang, key)

  const services: ServiceData[] = [
    {
      id: 1,
      title: t("service1Title"),
      description: t("service1Description"),
      icon: Monitor,
    },
    {
      id: 2,
      title: t("service2Title"),
      description: t("service2Description"),
      icon: Bot,
    },
    {
      id: 3,
      title: t("service3Title"),
      description: t("service3Description"),
      icon: Sparkles,
    },
  ]

  return (
    <PageServices
      title={t("title")}
      subtitle={lang === "ar" ? "نجهّز معرضك من أول فكرة لآخر زائر" : "We bring your exhibitions from first idea to last visitor"}
      services={services}
    />
  )
}
