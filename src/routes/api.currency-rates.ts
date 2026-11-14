import { createFileRoute } from "@tanstack/react-router";
import { FRANKFURTER_QUOTE_CODES, normalizeUsdRateRows } from "@/lib/website-pricing-data";

const json = (body: unknown, status = 200, cache = "no-store") =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cache,
    },
  });

export const Route = createFileRoute("/api/currency-rates")({
  server: {
    handlers: {
      GET: async () => {
        const url = new URL("https://api.frankfurter.dev/v2/rates");
        url.searchParams.set("base", "USD");
        url.searchParams.set("quotes", FRANKFURTER_QUOTE_CODES.join(","));

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);
        try {
          const response = await fetch(url, {
            headers: { accept: "application/json" },
            signal: controller.signal,
          });
          if (!response.ok) {
            console.error("Currency-rate provider returned an error", response.status);
            return json({ error: "Currency estimates are temporarily unavailable." }, 503);
          }
          const rates = normalizeUsdRateRows(await response.json());
          return json(
            rates,
            200,
            "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          );
        } catch (error) {
          console.error("Currency-rate request failed", error);
          return json({ error: "Currency estimates are temporarily unavailable." }, 503);
        } finally {
          clearTimeout(timer);
        }
      },
      POST: () => json({ error: "Method not allowed." }, 405),
    },
  },
});
