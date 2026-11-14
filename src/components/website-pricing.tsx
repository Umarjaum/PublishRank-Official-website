import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  COUNTRY_CURRENCIES,
  WEBSITE_PLANS,
  type UsdRatePayload,
  type WebsitePlanId,
} from "@/lib/website-pricing-data";

type Props = {
  selectedPlan: WebsitePlanId;
  onSelectPlan: (plan: WebsitePlanId) => void;
};

const inclusions: Record<WebsitePlanId, string[]> = {
  basic: [
    "One-page, mobile-friendly Next.js website",
    "Core technical SEO setup for the page",
    "Page title, meta description, canonical and social metadata",
    "XML sitemap and robots.txt setup",
    "Vercel deployment setup included",
  ],
  enterprise: [
    "Up to five responsive Next.js pages",
    "Reusable visual system and page sections",
    "Per-page SEO metadata, sitemap and social previews",
    "Structured data where it fits the content",
    "One basic Vercel serverless function if agreed in scope",
    "One year of email support for the delivered site",
  ],
};

function readBrowserRegion(): string | undefined {
  if (typeof navigator === "undefined") return undefined;
  return navigator.language.split(/[-_]/)[1]?.toUpperCase();
}

export function WebsitePricing({ selectedPlan, onSelectPlan }: Props) {
  const [countryCode, setCountryCode] = useState("US");
  const [rateData, setRateData] = useState<UsdRatePayload | null>(null);
  const [ratesUnavailable, setRatesUnavailable] = useState(false);
  const [loadingRates, setLoadingRates] = useState(true);
  const country =
    COUNTRY_CURRENCIES.find((item) => item.countryCode === countryCode) ?? COUNTRY_CURRENCIES[0];

  useEffect(() => {
    const region = readBrowserRegion();
    if (region && COUNTRY_CURRENCIES.some((item) => item.countryCode === region)) {
      setCountryCode(region);
    }

    const controller = new AbortController();
    fetch("/api/currency-rates", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Rates unavailable");
        return (await response.json()) as UsdRatePayload;
      })
      .then((data) => {
        if (!data || data.base !== "USD" || !data.rates || typeof data.rates["USD"] !== "number") {
          throw new Error("Invalid rate payload");
        }
        setRateData(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRatesUnavailable(true);
      })
      .finally(() => setLoadingRates(false));

    return () => controller.abort();
  }, []);

  const selectedRate = rateData?.rates[country.currency];
  const conversionAvailable =
    country.currency === "USD" || (typeof selectedRate === "number" && selectedRate > 0);
  const displayCurrency = conversionAvailable ? country.currency : "USD";
  const displayLocale = conversionAvailable ? country.locale : "en-US";
  const usdToSelected = conversionAvailable && country.currency !== "USD" ? selectedRate! : 1;
  const formatPrice = (amountUsd: number) =>
    new Intl.NumberFormat(displayLocale, { style: "currency", currency: displayCurrency }).format(
      amountUsd * usdToSelected,
    );

  function choosePlan(plan: WebsitePlanId) {
    onSelectPlan(plan);
    const intake = document.getElementById("website-intake");
    if (intake) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      intake.scrollIntoView({ behavior, block: "start" });
    }
  }

  return (
    <section
      className="site-width scroll-mt-24 py-12 md:py-16"
      aria-labelledby="website-packages-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
          Simple one-time pricing
        </p>
        <h2 id="website-packages-title" className="mt-2 text-3xl font-extrabold md:text-4xl">
          Choose the size that fits.
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Both packages use Next.js and come with a practical SEO foundation. The Enterprise package
          adds more pages and one year of email support.
        </p>
      </div>

      <div className="mx-auto mt-7 flex max-w-2xl flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <label htmlFor="pricing-country" className="text-sm font-semibold">
          Show an estimate for
        </label>
        <select
          id="pricing-country"
          value={countryCode}
          onChange={(event) => setCountryCode(event.currentTarget.value)}
          className="h-11 min-w-64 rounded-md border border-input bg-background px-3 text-sm shadow-xs"
          aria-label="Select your country to display an indicative local currency price"
        >
          {COUNTRY_CURRENCIES.map((item) => (
            <option key={item.countryCode} value={item.countryCode}>
              {item.country} — {item.currency}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-2">
        {(Object.keys(WEBSITE_PLANS) as WebsitePlanId[]).map((planId) => {
          const plan = WEBSITE_PLANS[planId];
          const selected = selectedPlan === planId;
          return (
            <article
              key={planId}
              className={`flex flex-col rounded-3xl border bg-card p-6 shadow-[var(--shadow-card)] md:p-8 ${selected ? "border-brand ring-2 ring-brand/20" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                    {planId === "basic" ? "Start small" : "For a larger site"}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold">{plan.name}</h3>
                </div>
                {selected && (
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.scope}</p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-5xl font-black tracking-tight">
                  {formatPrice(plan.usdPrice)}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">one-time</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Base price: ${plan.usdPrice} USD once
              </p>
              <ul className="mt-6 grid flex-1 gap-3 text-sm leading-6">
                {inclusions[planId].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {planId === "enterprise" && (
                <p className="mt-5 rounded-xl bg-brand-soft p-4 text-sm font-semibold leading-6">
                  1 year of email support is included. Add another year for{" "}
                  {formatPrice(WEBSITE_PLANS.enterprise.supportRenewalUsd)} per year.
                </p>
              )}
              {planId === "basic" && (
                <p className="mt-5 rounded-xl bg-muted/50 p-4 text-sm leading-6 text-muted-foreground">
                  Ongoing support is not included in Basic. We’ll confirm what is covered before
                  work starts.
                </p>
              )}
              <Button
                type="button"
                className="mt-6 min-h-12 rounded-full"
                variant={selected ? "default" : "outline"}
                aria-pressed={selected}
                onClick={() => choosePlan(planId)}
              >
                {selected
                  ? "Continue with this package"
                  : `Choose ${planId === "basic" ? "Basic" : "Enterprise"}`}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-6 max-w-5xl rounded-2xl border bg-muted/30 p-5 text-sm leading-6 text-muted-foreground">
        <p aria-live="polite">
          {loadingRates ? (
            <>
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" aria-hidden="true" />
              Loading current reference rates…
            </>
          ) : ratesUnavailable ? (
            "Rate conversion is temporarily unavailable; USD prices are shown where a conversion cannot be made."
          ) : rateData?.date ? (
            `Indicative prices use reference rates dated ${rateData.date}.`
          ) : (
            "Prices are shown in the selected currency where a rate is available."
          )}
          {!conversionAvailable &&
            ` ${country.currency} conversion is unavailable, so this estimate is shown in USD.`}
        </p>
        <p className="mt-2">
          Conversions update when the reference-rate source publishes new data. They are estimates,
          not live trading quotes or a final payment amount. Rates are provided by{" "}
          <a
            href="https://frankfurter.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand underline underline-offset-2"
          >
            Frankfurter
          </a>
          .
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-5xl rounded-2xl border border-amber-600/30 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
        <p className="font-extrabold">Vercel hosting terms matter for business sites.</p>
        <p className="mt-1">
          Vercel deployment setup is included in the service price. Vercel’s free Hobby plan is
          limited to personal or non-commercial use, so a commercial business site may require a
          paid Vercel plan. The Vercel account, domain, hosting plan, and any usage charges are
          separate and paid by the site owner. See{" "}
          <a
            href="https://vercel.com/legal/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2"
          >
            Vercel’s terms
          </a>
          .
        </p>
      </div>
    </section>
  );
}
