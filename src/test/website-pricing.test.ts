import { describe, expect, it } from "vitest";
import { contactRecipientForTopic } from "@/lib/contact-recipient";
import { contactSchema, WEBSITE_CREATION_TOPIC } from "@/lib/contact-schema";
import {
  COUNTRY_CURRENCIES,
  FRANKFURTER_QUOTE_CODES,
  normalizeUsdRateRows,
  WEBSITE_PLANS,
} from "@/lib/website-pricing-data";

describe("website creation pricing", () => {
  it("keeps the published USD prices and enterprise support renewal explicit", () => {
    expect(WEBSITE_PLANS.basic.usdPrice).toBe(2);
    expect(WEBSITE_PLANS.enterprise.usdPrice).toBe(10);
    expect(WEBSITE_PLANS.enterprise.supportRenewalUsd).toBe(1);
  });

  it("offers country choices whose currencies are included in the rates request", () => {
    const requested = new Set(FRANKFURTER_QUOTE_CODES);
    expect(
      COUNTRY_CURRENCIES.some((item) => item.countryCode === "US" && item.currency === "USD"),
    ).toBe(true);
    for (const item of COUNTRY_CURRENCIES) {
      if (item.currency !== "USD") expect(requested.has(item.currency)).toBe(true);
    }
  });

  it("normalizes only valid USD-base rates and always includes USD at 1", () => {
    const result = normalizeUsdRateRows([
      { date: "2026-11-12", base: "USD", quote: "GBP", rate: 0.77 },
      { date: "2026-11-13", base: "USD", quote: "EUR", rate: 0.91 },
      { date: "2026-11-13", base: "EUR", quote: "CAD", rate: 1.5 },
      { date: "2026-11-13", base: "USD", quote: "FAKE", rate: 100 },
      { date: "2026-11-13", base: "USD", quote: "JPY", rate: -1 },
    ]);

    expect(result.base).toBe("USD");
    expect(result.date).toBe("2026-11-13");
    expect(result.rates).toEqual({ USD: 1, GBP: 0.77, EUR: 0.91 });
  });

  it("rejects malformed or empty upstream rate payloads", () => {
    expect(() => normalizeUsdRateRows({ rates: {} })).toThrow();
    expect(() =>
      normalizeUsdRateRows([{ date: "bad", base: "USD", quote: "GBP", rate: 0.77 }]),
    ).toThrow();
  });

  it("accepts the website-creation topic using the shared contact schema", () => {
    expect(
      contactSchema.safeParse({
        name: "Ada",
        email: "ada@example.com",
        topic: WEBSITE_CREATION_TOPIC,
        message: "A structured website project brief with enough detail.",
        consent: true,
      }).success,
    ).toBe(true);
  });

  it("routes website briefs to the requested inbox and preserves the general recipient", () => {
    expect(contactRecipientForTopic(WEBSITE_CREATION_TOPIC, "general@example.com")).toBe(
      "publishrankseo@gmail.com",
    );
    expect(contactRecipientForTopic("Bug report", "general@example.com")).toBe(
      "general@example.com",
    );
    expect(contactRecipientForTopic("Bug report", undefined)).toBeUndefined();
  });
});
