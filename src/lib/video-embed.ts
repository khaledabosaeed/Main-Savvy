export type ResolvedVideo =
  | { kind: "direct"; src: string }
  | { kind: "youtube"; embedSrc: string }
  | { kind: "vimeo"; embedSrc: string }

/**
 * Direct `.mp4` / R2 / CDN URLs work in `<video src>`.
 * YouTube / Vimeo page links need `<iframe>` embeds — plain `<video>` will not play them.
 */
export function resolveVideoUrl(
  raw: string,
  opts?: {
    /** Hide chrome on embed (hero background). Default false = show controls where applicable. */
    embedMinimal?: boolean
  }
): ResolvedVideo | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const ytFromQuery = trimmed.match(/[?&]v=([\w-]{11})/i)
  const ytFromShort = trimmed.match(/youtu\.be\/([\w-]{11})/i)
  const ytFromEmbed = trimmed.match(/youtube\.com\/embed\/([\w-]{11})/i)
  const ytFromShorts = trimmed.match(/youtube\.com\/shorts\/([\w-]{11})/i)
  const yid =
    ytFromQuery?.[1] ??
    ytFromShort?.[1] ??
    ytFromEmbed?.[1] ??
    ytFromShorts?.[1]
  if (yid) {
    const controls = opts?.embedMinimal ? 0 : 1
    const modest = opts?.embedMinimal ? 1 : 0
    const embedSrc = `https://www.youtube.com/embed/${yid}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${yid}&controls=${controls}&modestbranding=${modest}`
    return { kind: "youtube", embedSrc }
  }

  const vm = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  if (vm?.[1]) {
    const id = vm[1]
    const embedSrc = opts?.embedMinimal
      ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`
      : `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&controls=1`
    return { kind: "vimeo", embedSrc }
  }

  return { kind: "direct", src: trimmed }
}

/** True when `url` looks like a direct video file (MP4/WebM…), including many R2/CDN URLs. */
export function isLikelyDirectVideoFileUrl(url: string): boolean {
  const t = url.trim()
  if (!t) return false
  const path = t.split(/[?#]/)[0]?.toLowerCase() ?? ""
  if (/\.(mp4|webm|mov|m4v|ogv|mkv|avi)(\?|$)/i.test(path)) return true
  return false
}
