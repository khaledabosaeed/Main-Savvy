import {
  normalizeRobotImageSlides,
  type RobotPageSectionData,
} from "@/lib/robots-custom-page"

function nonEmptyUrl(s: string | undefined): boolean {
  return typeof s === "string" && s.trim().length > 0
}

function mergeUrlArraysPreferAr(
  ar: string[],
  en: string[]
): string[] {
  const len = Math.max(ar.length, en.length)
  const out: string[] = []
  for (let i = 0; i < len; i++) {
    const a = (ar[i] ?? "").trim()
    const e = (en[i] ?? "").trim()
    out.push(a || e || "")
  }
  return out
}

/**
 * On create flows: mirror media URLs from `from` onto `to`, keeping `to`'s copy fields.
 * No-op when section types mismatch.
 */
export function applySharedMedia(
  from: RobotPageSectionData,
  to: RobotPageSectionData
): RobotPageSectionData {
  if (from.type !== to.type) return to

  switch (from.type) {
    case "hero": {
      const tTo = to as Extract<RobotPageSectionData, { type: "hero" }>
      const f = from
      return {
        ...tTo,
        videoSrc: f.videoSrc,
        posterImage: f.posterImage,
        textPlacement: f.textPlacement,
      }
    }
    case "product": {
      const tTo = to as Extract<RobotPageSectionData, { type: "product" }>
      const images = [...from.images]
      const versions = tTo.versions.map((tv, i) => {
        const fv = from.versions[i]
        return fv ? { ...tv, images: [...(fv.images ?? [])] } : tv
      })
      return { ...tTo, images, versions }
    }
    case "specs": {
      const tTo = to as Extract<RobotPageSectionData, { type: "specs" }>
      return {
        ...tTo,
        sections: tTo.sections.map((tb, i) => {
          const fb = from.sections[i]
          return fb ? { ...tb, headerImage: fb.headerImage } : tb
        }),
      }
    }
    case "scrollVideo": {
      const tTo = to as Extract<RobotPageSectionData, { type: "scrollVideo" }>
      return {
        ...tTo,
        items: tTo.items.map((ti, i) => {
          const fi = from.items[i]
          return fi ? { ...ti, videoSrc: fi.videoSrc } : ti
        }),
      }
    }
    case "image": {
      const f = from as Extract<RobotPageSectionData, { type: "image" }>
      const tTo = to as Extract<RobotPageSectionData, { type: "image" }>
      const fromItems = normalizeRobotImageSlides(f.images)
      const peerItems = normalizeRobotImageSlides(tTo.images)
      const images = fromItems.map((srcSlide, i) => {
        const peerTitle = peerItems[i]?.title?.trim()
        const fromTitle = srcSlide.title?.trim()
        const title = peerTitle || fromTitle || undefined
        return { url: srcSlide.url, ...(title ? { title } : {}) }
      })
      return { ...tTo, images }
    }
    case "carousel": {
      const tFrom = from as Extract<RobotPageSectionData, { type: "carousel" }>
      const tTo = to as Extract<RobotPageSectionData, { type: "carousel" }>
      return { ...tTo, images: [...tFrom.images] }
    }
    case "catalogCard": {
      const tFrom = from as Extract<RobotPageSectionData, { type: "catalogCard" }>
      const tTo = to as Extract<RobotPageSectionData, { type: "catalogCard" }>
      return { ...tTo, image: tFrom.image }
    }
    default:
      return to
  }
}

/**
 * Before saving a new robot: fill empty AR media from EN sections (aligned by index).
 */
export function mergeEmptyArMediaFromEn(
  sectionsEn: RobotPageSectionData[],
  sectionsAr: RobotPageSectionData[]
): RobotPageSectionData[] {
  return sectionsAr.map((arSec, i): RobotPageSectionData => {
    const enSec = sectionsEn[i]
    if (!enSec || enSec.type !== arSec.type) return arSec

    switch (arSec.type) {
      case "hero": {
        if (enSec.type !== "hero") return arSec
        const arVid = (arSec.videoSrc ?? "").trim()
        const enVid = (enSec.videoSrc ?? "").trim()
        const arPoster = (arSec.posterImage ?? "").trim()
        const enPoster = (enSec.posterImage ?? "").trim()
        return {
          ...arSec,
          videoSrc: arVid || enVid,
          posterImage: arPoster || enPoster,
          textPlacement:
            arSec.textPlacement ??
            enSec.textPlacement,
        }
      }
      case "product": {
        if (enSec.type !== "product") return arSec
        const images = mergeUrlArraysPreferAr(arSec.images, enSec.images)
        const versions = arSec.versions.map((tv, vi) => {
          const ev = enSec.versions[vi]
          const mergedImages = mergeUrlArraysPreferAr(
            tv.images ?? [],
            ev?.images ?? []
          )
          return { ...tv, images: mergedImages }
        })
        return { ...arSec, images, versions }
      }
      case "specs": {
        if (enSec.type !== "specs") return arSec
        const sections = arSec.sections.map((tb, si) => {
          const eb = enSec.sections[si]
          const arHi = tb.headerImage
          const enHi = eb?.headerImage
          return {
            ...tb,
            headerImage: nonEmptyUrl(arHi)
              ? arHi
              : nonEmptyUrl(enHi)
                ? enHi
                : undefined,
          }
        })
        return { ...arSec, sections }
      }
      case "scrollVideo": {
        if (enSec.type !== "scrollVideo") return arSec
        const items = arSec.items.map((ti, ii) => {
          const ei = enSec.items[ii]
          const ars = ti.videoSrc?.trim()
          const es = ei?.videoSrc?.trim()
          return { ...ti, videoSrc: ars || es || "" }
        })
        return { ...arSec, items }
      }
      case "image": {
        if (enSec.type !== "image") return arSec
        const arSlides = normalizeRobotImageSlides(arSec.images)
        const enSlides = normalizeRobotImageSlides(enSec.images)
        const len = Math.max(arSlides.length, enSlides.length)
        const images = Array.from({ length: len }, (_, i) => {
          const a = arSlides[i]
          const e = enSlides[i]
          const url = (a?.url ?? "").trim() || (e?.url ?? "").trim() || ""
          const arTitle = (a?.title ?? "").trim()
          const enTitle = (e?.title ?? "").trim()
          const title = arTitle || enTitle || undefined
          return { url, ...(title ? { title } : {}) }
        })
        return { ...arSec, images }
      }
      case "carousel": {
        if (enSec.type !== "carousel") return arSec
        return {
          ...arSec,
          images: mergeUrlArraysPreferAr(arSec.images, enSec.images),
        }
      }
      case "catalogCard": {
        if (enSec.type !== "catalogCard") return arSec
        const arImg = arSec.image.trim()
        const enImg = enSec.image.trim()
        return {
          ...arSec,
          image: arImg || enImg || "",
        }
      }
      default:
        return arSec
    }
  })
}
