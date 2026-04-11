import { isAppLanguage } from "@/i18n/settings"
import { notFound, redirect } from "next/navigation"

interface RobotsPageProps {
  params: Promise<{ lang: string }>
}

export default async function RobotsPage({ params }: RobotsPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  redirect(`/${lang}`)
}
