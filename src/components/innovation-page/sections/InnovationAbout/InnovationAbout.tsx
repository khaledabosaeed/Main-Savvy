"use client"

import PageAbout from "@/components/shared/PageAbout/PageAbout"
import type { Language } from "./content"
import { getInnovationAboutContent } from "./content"

interface InnovationAboutProps {
  lang: Language
}

export default function InnovationAbout({ lang }: InnovationAboutProps) {
  const t = (key: keyof typeof import("./content").innovationAboutContent.en) =>
    getInnovationAboutContent(lang, key)

  const images = [
    { src: "/innovation/about/1.jpg", alt: "AI Innovation" },
    { src: "/innovation/about/2.png", alt: "Smart Technology" },
    { src: "/innovation/about/3.jpg", alt: "Sustainable Energy" },
    { src: "/innovation/about/4.jpg", alt: "Robotics" },
  ]

  return (
    <PageAbout
      title={t("title")}
      description={t("description")}
      images={images}
    />
  )
}
