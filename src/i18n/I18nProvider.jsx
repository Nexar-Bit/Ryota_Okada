import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import enCatalog from "../locales/en.catalog.js"
import jaCatalog from "../locales/ja.catalog.js"
import { resolveCatalogLocale } from "./countryToLocale.js"
import { deepMerge } from "./deepMerge.js"
import { getByPath } from "./getByPath.js"

const I18nContext = createContext(null)

function buildMessages(locale) {
  if (locale === "ja") return deepMerge(enCatalog, jaCatalog)
  return enCatalog
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() =>
    typeof navigator !== "undefined"
      ? resolveCatalogLocale(null, navigator.language)
      : "en",
  )
  const [countryCode, setCountryCode] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("https://ipapi.co/json/")
        if (!res.ok) throw new Error("geo fetch failed")
        const data = await res.json()
        if (cancelled) return
        const cc = data.country_code ?? null
        setCountryCode(cc)
        const next = resolveCatalogLocale(cc, typeof navigator !== "undefined" ? navigator.language : null)
        setLocale(next)
        document.documentElement.lang = next === "ja" ? "ja" : "en"
      } catch {
        if (cancelled) return
        const fallback = resolveCatalogLocale(
          null,
          typeof navigator !== "undefined" ? navigator.language : null,
        )
        setLocale(fallback)
        document.documentElement.lang = fallback === "ja" ? "ja" : "en"
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const messages = useMemo(() => buildMessages(locale), [locale])

  const get = useCallback((path) => {
    const v = getByPath(messages, path)
    if (v !== undefined) return v
    return getByPath(enCatalog, path)
  }, [messages])

  const t = useCallback(
    (path) => {
      const v = get(path)
      if (v === undefined || v === null) return path
      if (typeof v === "string") return v
      return path
    },
    [get],
  )

  const value = useMemo(
    () => ({
      locale,
      countryCode,
      t,
      get,
      messages,
    }),
    [locale, countryCode, t, get, messages],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
