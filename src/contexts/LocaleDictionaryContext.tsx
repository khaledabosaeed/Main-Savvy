"use client"

import { createContext, useContext } from "react"
import type { LocaleDictionary } from "@/i18n/getDictionary"

const LocaleDictionaryContext = createContext<LocaleDictionary | null>(null)

export function LocaleDictionaryProvider({
  value,
  children,
}: {
  value: LocaleDictionary
  children: React.ReactNode
}) {
  return (
    <LocaleDictionaryContext.Provider value={value}>
      {children}
    </LocaleDictionaryContext.Provider>
  )
}

export function useLocaleDictionary(): LocaleDictionary {
  const ctx = useContext(LocaleDictionaryContext)
  if (!ctx) {
    throw new Error(
      "useLocaleDictionary must be used within LocaleDictionaryProvider"
    )
  }
  return ctx
}
