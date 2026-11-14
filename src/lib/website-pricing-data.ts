export const WEBSITE_PLANS = {
  basic: {
    id: "basic",
    name: "Basic website",
    usdPrice: 2,
    scope: "One responsive page for a business, service, portfolio, product, or campaign.",
    support: "No ongoing support included.",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise website",
    usdPrice: 10,
    scope: "Up to five responsive pages, a reusable design system, and one year of email support.",
    support: "One year included; extend for another year for $1 USD.",
    supportRenewalUsd: 1,
  },
} as const;

export type WebsitePlanId = keyof typeof WEBSITE_PLANS;

export const COUNTRY_CURRENCIES = [
  { countryCode: "US", country: "United States", currency: "USD", locale: "en-US" },
  { countryCode: "GB", country: "United Kingdom", currency: "GBP", locale: "en-GB" },
  { countryCode: "CA", country: "Canada", currency: "CAD", locale: "en-CA" },
  { countryCode: "AU", country: "Australia", currency: "AUD", locale: "en-AU" },
  { countryCode: "NZ", country: "New Zealand", currency: "NZD", locale: "en-NZ" },
  { countryCode: "IN", country: "India", currency: "INR", locale: "en-IN" },
  { countryCode: "JP", country: "Japan", currency: "JPY", locale: "ja-JP" },
  { countryCode: "CN", country: "China", currency: "CNY", locale: "zh-CN" },
  { countryCode: "HK", country: "Hong Kong", currency: "HKD", locale: "zh-HK" },
  { countryCode: "SG", country: "Singapore", currency: "SGD", locale: "en-SG" },
  { countryCode: "MY", country: "Malaysia", currency: "MYR", locale: "ms-MY" },
  { countryCode: "PH", country: "Philippines", currency: "PHP", locale: "en-PH" },
  { countryCode: "ID", country: "Indonesia", currency: "IDR", locale: "id-ID" },
  { countryCode: "TH", country: "Thailand", currency: "THB", locale: "th-TH" },
  { countryCode: "VN", country: "Vietnam", currency: "VND", locale: "vi-VN" },
  { countryCode: "KR", country: "South Korea", currency: "KRW", locale: "ko-KR" },
  { countryCode: "BR", country: "Brazil", currency: "BRL", locale: "pt-BR" },
  { countryCode: "MX", country: "Mexico", currency: "MXN", locale: "es-MX" },
  { countryCode: "AR", country: "Argentina", currency: "ARS", locale: "es-AR" },
  { countryCode: "ZA", country: "South Africa", currency: "ZAR", locale: "en-ZA" },
  { countryCode: "NG", country: "Nigeria", currency: "NGN", locale: "en-NG" },
  { countryCode: "KE", country: "Kenya", currency: "KES", locale: "en-KE" },
  { countryCode: "EG", country: "Egypt", currency: "EGP", locale: "ar-EG" },
  { countryCode: "AE", country: "United Arab Emirates", currency: "AED", locale: "en-AE" },
  { countryCode: "SA", country: "Saudi Arabia", currency: "SAR", locale: "ar-SA" },
  { countryCode: "PL", country: "Poland", currency: "PLN", locale: "pl-PL" },
  { countryCode: "SE", country: "Sweden", currency: "SEK", locale: "sv-SE" },
  { countryCode: "NO", country: "Norway", currency: "NOK", locale: "nb-NO" },
  { countryCode: "CH", country: "Switzerland", currency: "CHF", locale: "de-CH" },
  { countryCode: "TR", country: "Türkiye", currency: "TRY", locale: "tr-TR" },
  { countryCode: "IL", country: "Israel", currency: "ILS", locale: "he-IL" },
  { countryCode: "DE", country: "Germany", currency: "EUR", locale: "de-DE" },
  { countryCode: "FR", country: "France", currency: "EUR", locale: "fr-FR" },
  { countryCode: "ES", country: "Spain", currency: "EUR", locale: "es-ES" },
  { countryCode: "IT", country: "Italy", currency: "EUR", locale: "it-IT" },
  { countryCode: "NL", country: "Netherlands", currency: "EUR", locale: "nl-NL" },
  { countryCode: "IE", country: "Ireland", currency: "EUR", locale: "en-IE" },
  { countryCode: "PT", country: "Portugal", currency: "EUR", locale: "pt-PT" },
  { countryCode: "BE", country: "Belgium", currency: "EUR", locale: "nl-BE" },
  { countryCode: "AT", country: "Austria", currency: "EUR", locale: "de-AT" },
  { countryCode: "FI", country: "Finland", currency: "EUR", locale: "fi-FI" },
  { countryCode: "GR", country: "Greece", currency: "EUR", locale: "el-GR" },
] as const;

export const FRANKFURTER_QUOTE_CODES = [
  ...new Set(COUNTRY_CURRENCIES.map((item) => item.currency).filter((code) => code !== "USD")),
];

export type UsdRateRow = { date: string; base: string; quote: string; rate: number };
export type UsdRatePayload = { base: "USD"; date: string; rates: Record<string, number> };

export function normalizeUsdRateRows(payload: unknown): UsdRatePayload {
  if (!Array.isArray(payload)) throw new Error("Unexpected currency-rate response.");

  const rates: Record<string, number> = { USD: 1 };
  const dates: string[] = [];
  for (const candidate of payload) {
    if (!candidate || typeof candidate !== "object") continue;
    const row = candidate as Partial<UsdRateRow>;
    if (row.base !== "USD" || typeof row.quote !== "string") continue;
    if (!(FRANKFURTER_QUOTE_CODES as readonly string[]).includes(row.quote)) continue;
    if (typeof row.rate !== "number" || !Number.isFinite(row.rate) || row.rate <= 0) continue;
    if (typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) continue;
    rates[row.quote] = row.rate;
    dates.push(row.date);
  }

  if (dates.length === 0) throw new Error("No usable currency rates were returned.");
  return { base: "USD", date: dates.sort().at(-1)!, rates };
}
