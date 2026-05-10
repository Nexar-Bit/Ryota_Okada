/**
 * Maps ISO 3166-1 alpha-2 country codes to BCP-47 language tags.
 * Used with IP geolocation (ipapi.co) to pick a primary catalog locale.
 */
const COUNTRY_TO_LOCALE = {
  JP: "ja",
  KR: "ko",
  CN: "zh",
  TW: "zh",
  HK: "zh",
  SG: "en",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  IN: "en",
  DE: "de",
  AT: "de",
  CH: "de",
  FR: "fr",
  BE: "fr",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  BR: "pt",
  PT: "pt",
  IT: "it",
  NL: "nl",
  SE: "sv",
  NO: "no",
  DK: "da",
  FI: "fi",
  PL: "pl",
  RU: "ru",
  UA: "uk",
  TR: "tr",
  SA: "ar",
  AE: "ar",
  EG: "ar",
  IL: "he",
  TH: "th",
  VN: "vi",
  ID: "id",
  PH: "en",
  MY: "ms",
};

/** Locales we ship full UI + content translations for (others fall back to English UI text). */
export const SUPPORTED_LOCALES = new Set(["en", "ja"]);

export function countryCodeToLocale(countryCode) {
  if (!countryCode || typeof countryCode !== "string") return null;
  const upper = countryCode.toUpperCase();
  return COUNTRY_TO_LOCALE[upper] ?? null;
}

export function resolveCatalogLocale(ipCountryCode, navigatorLanguage) {
  const fromIp = countryCodeToLocale(ipCountryCode);
  const navPrimary = navigatorLanguage?.split?.("-")?.[0]?.toLowerCase() ?? null;

  if (fromIp && SUPPORTED_LOCALES.has(fromIp)) return fromIp;
  if (navPrimary && SUPPORTED_LOCALES.has(navPrimary)) return navPrimary;

  if (fromIp === "ja" || navPrimary === "ja") return "ja";

  return "en";
}
