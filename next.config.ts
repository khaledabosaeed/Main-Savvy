import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = []
const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim()
const r2EndpointUrl = process.env.R2_ENDPOINT?.trim()

remotePatterns.push({
  protocol: "https",
  hostname: "ik.imagekit.io",
  pathname: "/**",
})

remotePatterns.push({
  protocol: "https",
  hostname: "cdn.savvyworld.ai",
  pathname: "/**",
})

remotePatterns.push({
  protocol: "https",
  hostname: "pub-ff1ecaf91dc54382914edbd33fecd6c7.r2.dev",
  pathname: "/**",
})

if (r2PublicUrl) {
  try {
    const url = new URL(r2PublicUrl)
    remotePatterns.push({
      protocol: url.protocol === "http:" ? "http" : "https",
      hostname: url.hostname,
      pathname: "/**",
    })
  } catch {
    // Ignore invalid build-time env; runtime API routes will surface the config error.
  }
}

if (r2EndpointUrl) {
  try {
    const url = new URL(r2EndpointUrl)
    remotePatterns.push({
      protocol: url.protocol === "http:" ? "http" : "https",
      hostname: url.hostname,
      pathname: "/**",
    })
  } catch {
    // Ignore invalid build-time env; runtime API routes will surface the config error.
  }
}

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    remotePatterns,
  },
};

export default nextConfig;
  
