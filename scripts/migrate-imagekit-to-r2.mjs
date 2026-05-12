#!/usr/bin/env node

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { createClient } from "@supabase/supabase-js"
import fs from "node:fs/promises"
import path from "node:path"

try {
  process.loadEnvFile?.(".env")
} catch {
  // The script can also run with env vars provided by the shell or deployment.
}

const APPLY = process.argv.includes("--apply")
const REWRITE_ONLY = process.argv.includes("--rewrite-only")
const IMAGEKIT_URL_RE =
  /https:\/\/ik\.imagekit\.io\/gxer1rrzy\/[^\s"'<>),]+/g

function env(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not set`)
  return value
}

function optionalEnv(name) {
  return process.env[name]?.trim() || ""
}

function sanitizeSegment(segment) {
  return (
    decodeURIComponent(segment)
      .replace(/[/\\]+/g, "_")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 120) || "asset"
  )
}

function keyFromImageKitUrl(rawUrl) {
  const url = new URL(rawUrl)
  const segments = url.pathname
    .split("/")
    .filter(Boolean)
    .filter((segment, index) => index !== 0 && !segment.startsWith("tr:"))
    .map(sanitizeSegment)

  const keySegments = segments.length > 0 ? segments : ["asset"]
  return keySegments.join("/")
}

function publicUrlForKey(key) {
  const base = env("NEXT_PUBLIC_R2_PUBLIC_URL").replace(/\/+$/, "")
  const encodedKey = key
    .replace(/^\/+/, "")
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")
  return `${base}/${encodedKey}`
}

function uniqueUrlsFromJson(value) {
  const text = JSON.stringify(value)
  return [...new Set(text.match(IMAGEKIT_URL_RE) ?? [])]
}

function replaceUrlsDeep(value, mapping) {
  if (typeof value === "string") {
    let next = value
    for (const [from, to] of mapping) {
      next = next.split(from).join(to)
    }
    return next
  }
  if (Array.isArray(value)) return value.map((item) => replaceUrlsDeep(item, mapping))
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceUrlsDeep(item, mapping)])
    )
  }
  return value
}

function r2Client() {
  return new S3Client({
    region: "auto",
    endpoint: env("R2_ENDPOINT"),
    credentials: {
      accessKeyId: env("R2_ACCESS_KEY_ID"),
      secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    },
  })
}

async function uploadUrlToR2(client, sourceUrl, key) {
  let res
  try {
    res = await fetch(sourceUrl, {
      headers: {
        "User-Agent": "savvy-imagekit-to-r2-migration/1.0",
      },
    })
  } catch (e) {
    const cause = e instanceof Error ? e.cause : undefined
    const detail =
      cause instanceof Error
        ? `${e.message}: ${cause.message}`
        : e instanceof Error
          ? e.message
          : String(e)
    throw new Error(`Download failed before response: ${detail}`)
  }
  if (!res.ok) {
    throw new Error(`Download failed ${res.status}`)
  }

  const contentType = res.headers.get("content-type") || "application/octet-stream"
  const body = Buffer.from(await res.arrayBuffer())
  await client.send(
    new PutObjectCommand({
      Bucket: env("R2_BUCKET_NAME"),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  )
}

async function buildMapping(urls) {
  const client = APPLY ? r2Client() : null
  const mapping = new Map()
  const failures = []

  for (const sourceUrl of urls) {
    const key = keyFromImageKitUrl(sourceUrl)
    const targetUrl = publicUrlForKey(key)
    console.log(`${APPLY ? "Migrating" : "Would migrate"} ${sourceUrl} -> ${targetUrl}`)

    if (APPLY && !REWRITE_ONLY) {
      try {
        await uploadUrlToR2(client, sourceUrl, key)
      } catch (e) {
        failures.push({
          sourceUrl,
          message: e instanceof Error ? e.message : String(e),
        })
        continue
      }
    }

    mapping.set(sourceUrl, targetUrl)
  }

  return { mapping, failures }
}

async function migrateLocalFiles() {
  const dir = path.join(process.cwd(), "public", "locales")
  let names = []
  try {
    names = await fs.readdir(dir)
  } catch {
    return { urls: [], apply: async () => {} }
  }

  const files = names
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(dir, name))
  const docs = []
  const urls = []

  for (const filePath of files) {
    const content = JSON.parse(await fs.readFile(filePath, "utf8"))
    const found = uniqueUrlsFromJson(content)
    urls.push(...found)
    docs.push({ filePath, content, count: found.length })
  }

  return {
    urls,
    apply: async (mapping) => {
      for (const doc of docs) {
        if (doc.count === 0) continue
        const next = replaceUrlsDeep(doc.content, mapping)
        await fs.writeFile(doc.filePath, `${JSON.stringify(next, null, 2)}\n`)
        console.log(`Updated ${path.relative(process.cwd(), doc.filePath)}`)
      }
    },
  }
}

async function migrateSupabaseRows() {
  const url = optionalEnv("NEXT_PUBLIC_SUPABASE_URL")
  const key = optionalEnv("SUPABASE_SERVICE_ROLE_KEY")
  if (!url || !key) {
    return { urls: [], apply: async () => {} }
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from("translations")
    .select("locale, content")

  if (error) throw error

  const rows = data ?? []
  const urls = []
  for (const row of rows) {
    urls.push(...uniqueUrlsFromJson(row.content))
  }

  return {
    urls,
    apply: async (mapping) => {
      for (const row of rows) {
        const found = uniqueUrlsFromJson(row.content)
        if (found.length === 0) continue
        const next = replaceUrlsDeep(row.content, mapping)
        const { error: upError } = await supabase
          .from("translations")
          .upsert(
            {
              locale: row.locale,
              content: next,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "locale" }
          )
        if (upError) throw upError
        console.log(`Updated Supabase translations row: ${row.locale}`)
      }
    },
  }
}

async function main() {
  console.log(APPLY ? "Running migration with writes enabled." : "Dry run only. Re-run with --apply to upload and rewrite.")

  const local = await migrateLocalFiles()
  const supabase = await migrateSupabaseRows()
  const urls = [...new Set([...local.urls, ...supabase.urls])]

  if (urls.length === 0) {
    console.log("No ImageKit URLs found.")
    return
  }

  const { mapping, failures } = await buildMapping(urls)
  console.log(`Prepared ${mapping.size} URL replacements.`)

  if (failures.length > 0) {
    console.log("Failures:")
    for (const failure of failures) {
      console.log(`- ${failure.sourceUrl}: ${failure.message}`)
    }
  }

  if (!APPLY) return

  if (mapping.size === 0) {
    console.log("No rows updated because no URLs were successfully migrated.")
    return
  }

  await local.apply(mapping)
  await supabase.apply(mapping)
  console.log("Done. Redeploy or revalidate the translations cache after confirming the migrated media.")
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
