"use client"

import PageServices, { type ServiceData } from "@/components/shared/PageServices/PageServices"
import { Monitor, Bot } from "lucide-react"
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
      icon: Monitor,
    },
    {
      id: 2,
      title: t("service2Title"),
      icon: Bot,
    },
  ]

  return (
    <PageServices

      title={t("title")}
      services={services}
      image="/expo/hero/hero.jpg"
    />
  )
}
