export type JsonValue = unknown

export type LocaleTab = "en" | "ar"

export type RobotSidebarPage = string

export type PreviewTarget = "home" | RobotSidebarPage

export type RobotPageStatus = "draft" | "published"

export type RobotPageEntry = {
  target: RobotSidebarPage
  title: string
  description: string
  status?: RobotPageStatus
  source: "overview" | "static" | "custom"
}

export type GroupId = "site" | "home" | "pages" | "robots" | "other"

export type SearchMatch = {
  section: string
  path: string
  value: string
}

export type ToastState = {
  type: "ok" | "err"
  text: string
} | null
