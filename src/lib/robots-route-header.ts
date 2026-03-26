import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"

/** UnifiedHeader `texts` for all /robots/* routes — matches other app pages (locale JSON). */
export function robotsRouteHeaderTexts(lang: "en" | "ar") {
  const dict = lang === "ar" ? ar : en
  const c = dict.common
  return {
    main: c.main,
    news: c.news,
    projects: c.projects,
    services: c.mediaGallery,
    about: c.about,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}
