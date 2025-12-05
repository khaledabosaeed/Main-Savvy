"use client"

import PageServices, { type ServiceData } from "@/components/shared/PageServices/PageServices"
import { Leaf, Bot, Car, Brain, Handshake } from "lucide-react"
import type { Language } from "./content"
import { getInnovationServicesContent } from "./content"

interface InnovationServicesProps {
  lang: Language
}

export default function InnovationServices({ lang }: InnovationServicesProps) {
  const t = (key: keyof typeof import("./content").innovationServicesContent.en) =>
    getInnovationServicesContent(lang, key)

  const services: ServiceData[] = [
    {
      id: 1,
      title: t("service1Title"),
      icon: Leaf,
    },
    {
      id: 2,
      title: t("service2Title"),
      icon: Bot,
    },
    {
      id: 3,
      title: t("service3Title"),
      icon: Car,
    },
    {
      id: 4,
      title: t("service4Title"),
      icon: Brain,
    },
    {
      id: 5,
      title: t("service5Title"),
      icon: Handshake,
    },
  ]

  return (
    <PageServices
      title={t("title")}
      services={services}
      image="/innovation/services/1.jpg"
    />
  )
}
