import { describe, expect, it } from "vitest";
import { featureCatalog, featureCount } from "@/lib/feature-catalog";
import { contactSchema } from "@/lib/contact-schema";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
import { DOWNLOAD_URL } from "@/lib/site";
import { brandCards, screenshots } from "@/lib/showcase-content";

describe("content", () => {
  it("documents all 222 features", () => {
    expect(featureCount).toBe(222);
    expect(featureCatalog.every((c) => c.items.length > 0)).toBe(true);
  });
  it("points downloads at the latest GitHub release asset", () => {
    expect(DOWNLOAD_URL).toBe(
      "https://github.com/Umarjaum/PublishRank/releases/latest/download/PublishRank.zip",
    );
  });
  it("has every legal page", () => {
    for (const k of [
      "privacy",
      "terms",
      "cookies",
      "disclaimer",
      "security",
      "accessibility",
    ] as const) {
      expect(publisherPages[k].sections.length).toBeGreaterThan(0);
    }
  });
  it("validates contact input", () => {
    const ok = {
      name: "Ada",
      email: "ada@example.com",
      topic: "Bug report",
      message: "This is a long enough message.",
      consent: true,
    };
    expect(contactSchema.safeParse(ok).success).toBe(true);
    expect(contactSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, consent: false }).success).toBe(false);
  });
  it("emits absolute canonical and share-image URLs", () => {
    const seo = pageSeo("/features", "Features", "Desc");
    expect(seo.links[0]?.href).toBe("https://publishrankseo.vercel.app/features");
    const meta = seo.meta as Array<Record<string, string>>;
    expect(meta.find((m) => m["property"] === "og:url")?.["content"]).toBe(seo.links[0]?.href);
    expect(meta.find((m) => m["property"] === "og:title")?.["content"]).toContain("Features");
    expect(meta.find((m) => m["property"] === "og:description")?.["content"]).toBe("Desc");
    expect(meta.find((m) => m["name"] === "twitter:card")?.["content"]).toBe("summary_large_image");
    expect(meta.find((m) => m["property"] === "og:image")?.["content"]).toMatch(
      /^https:\/\/publishrankseo\.vercel\.app\//,
    );
    const schema = JSON.parse(seo.scripts[0].children as string) as {
      "@graph": Array<{ "@type": string }>;
    };
    expect(schema["@graph"].map((node) => node["@type"])).toEqual(
      expect.arrayContaining(["WebPage", "BreadcrumbList"]),
    );
  });
  it("provides descriptive alt text for screenshot and brand-card images", () => {
    expect([...screenshots, ...brandCards].every((image) => image.alt.trim().length > 0)).toBe(
      true,
    );
    expect(
      screenshots.some(
        (image) => image.src === "/media/screens/publishrank-seo-statistics-dashboard.png",
      ),
    ).toBe(true);
    expect(brandCards.some((image) => image.src === "/brand/publishrank_logo_landscape.jpg")).toBe(
      true,
    );
  });
});
