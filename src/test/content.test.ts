import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { featureCatalog, featureCount } from "@/lib/feature-catalog";
import { editorialArticleSchema, newsArticles } from "@/lib/news-content";
import { INSTALLATION_SCREENSHOT_VERSION, installationSteps } from "@/lib/installation-guide";
import { pageSeo } from "@/lib/page-seo";
import { publisherPages } from "@/lib/publisher-content";
import { publisherPageProfiles } from "@/lib/publisher-page-profiles";
import { allProductScreenshots, productScreenshotGroups } from "@/lib/product-screenshots";
import {
  CURRENT_RELEASE,
  DOWNLOAD_URL,
  HOME_SEO_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
} from "@/lib/site";
import { brandCards, screenshots, softwareSchema } from "@/lib/showcase-content";
import { createNewsSitemapXml } from "@/routes/news-sitemap[.]xml";
import { createSitemapXml } from "@/routes/sitemap[.]xml";

describe("content", () => {
  it("documents the expanded feature catalog and complete Local SEO registry", () => {
    expect(featureCount).toBeGreaterThan(558);
    expect(featureCatalog.every((category) => category.items.length > 0)).toBe(true);
    expect(featureCatalog.some((category) => category.id === "verified-l")).toBe(true);
    const localSeo = featureCatalog.find((category) => category.id === "verified-c");
    expect(localSeo?.items.some((item) => item.includes("134 registry options"))).toBe(true);
    expect(localSeo?.items.some((item) => item.includes("Retail & shopping (30)"))).toBe(true);
  });

  it("points downloads at the versioned 2.26.2 release package", () => {
    expect(DOWNLOAD_URL).toBe("/downloads/PublishRank-2.26.2.zip");
    expect(CURRENT_RELEASE).toBe("2.26.2");
  });

  it("includes a supplied screenshot for every installation guide step", () => {
    expect(installationSteps).toHaveLength(14);
    expect(installationSteps[0]?.number).toBe(2);
    expect(installationSteps.at(-1)?.number).toBe(15);
    for (const step of installationSteps) {
      expect(
        existsSync(
          join(
            process.cwd(),
            "public",
            "media",
            "installation",
            INSTALLATION_SCREENSHOT_VERSION,
            step.image,
          ),
        ),
      ).toBe(true);
    }
  });

  it("positions the current product for every WordPress site and business", () => {
    expect(SITE_TAGLINE.toLowerCase()).toContain("every website");
    expect(SITE_DESCRIPTION.toLowerCase()).toContain("free, open-source wordpress seo plugin");
    expect(HOME_SEO_DESCRIPTION.toLowerCase()).toContain("publishrank seo");
    expect(HOME_SEO_DESCRIPTION.toLowerCase()).toContain("wordpress seo plugin");
    expect(publisherPages.features.title.toLowerCase()).toContain("every website");
    expect(publisherPages.features.intro.toLowerCase()).toContain("businesses");
    expect(publisherPages.features.sections[0]?.title.toLowerCase()).toContain(
      "134 business types",
    );
    expect(String(softwareSchema.description).toLowerCase()).not.toContain("in development");
  });

  it("documents WP Hide Login and the Mastodon verification snippet", () => {
    const login = featureCatalog.find((category) => category.id === "login");
    expect(login?.badge).toBeUndefined();
    expect(login?.summary.toLowerCase()).not.toContain("new in");
    const current = featureCatalog.find((category) => category.id === "release-2.26.2");
    expect(current?.badge).toBe("CURRENT · 2.26.2");
    expect(current?.items.join(" ")).toContain("Classic Editor");
    expect(current?.items.join(" ")).toContain("publishrank/v1 REST API");
    expect(current?.items.join(" ")).toContain("PHP 7.4 runtime");
    const previous261 = featureCatalog.find((category) => category.id === "release-2.26.1");
    expect(previous261?.badge).toBe("2.26.1");
    expect(previous261?.items.join(" ")).toContain("persistent PublishRank SEO sidebar");
    const previous = featureCatalog.find((category) => category.id === "release-2.26.0");
    expect(previous?.badge).toBe("2.26.0");
    expect(previous?.items.join(" ")).toContain("246 catalogued Schema.org types");
    const release = featureCatalog.find((category) => category.id === "release-2.21.0");
    expect(release?.badge).toBe("2.21.0");
    expect(release?.items).toHaveLength(14);
    expect(release?.items.join(" ")).toContain("Site Navigation SEO");
    const featureText = publisherPages.features.sections
      .flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])])
      .join(" ")
      .toLowerCase();
    expect(featureText).toContain('copyable <link rel="me">');
    expect(featureText).toContain("separate from the shared wordpress settings screen");
  });

  it("publicly highlights Mastodon, Schema Aggregator, llms.txt and the AI rollout", () => {
    const featureText = publisherPages.features.sections
      .flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])])
      .join(" ")
      .toLowerCase();
    expect(featureText).toContain("mastodon");
    expect(featureText).toContain("schema aggregator endpoint");
    expect(featureText).toContain("llms.txt");
    expect(featureText).toContain("rolling out soon");
  });

  it("has complete content and render profiles for every legal page", () => {
    for (const key of [
      "privacy",
      "terms",
      "cookies",
      "disclaimer",
      "security",
      "accessibility",
    ] as const) {
      expect(publisherPages[key].sections.length).toBeGreaterThan(0);
      expect(publisherPageProfiles[key].audience).not.toBe("");
      expect(publisherPageProfiles[key].path).not.toBe("");
      expect(publisherPageProfiles[key].outcome).not.toBe("");
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
    expect(meta.find((item) => item["property"] === "og:url")?.["content"]).toBe(
      seo.links[0]?.href,
    );
    expect(meta.find((item) => item["property"] === "og:title")?.["content"]).toContain("Features");
    expect(meta.find((item) => item["property"] === "og:description")?.["content"]).toBe("Desc");
    expect(meta.find((item) => item["name"] === "twitter:card")?.["content"]).toBe(
      "summary_large_image",
    );
    expect(meta.find((item) => item["property"] === "og:image")?.["content"]).toMatch(
      /^https:\/\/publishrankseo\.vercel\.app\//,
    );
    expect(meta.find((item) => item["property"] === "og:image:height")?.["content"]).toBe("640");
    const schema = JSON.parse(seo.scripts[0]?.children as string) as {
      "@graph": Array<{ "@type": string }>;
    };
    expect(schema["@graph"].map((node) => node["@type"])).toEqual(
      expect.arrayContaining(["WebPage", "BreadcrumbList"]),
    );
  });

  it("emits story-specific large-image article metadata and NewsArticle schema", () => {
    const article = newsArticles[0];
    expect(article).toBeDefined();
    const seo = pageSeo(`/news/${article!.slug}`, article!.title, article!.dek, {
      ogType: "article",
      image: article!.image,
      imageAlt: article!.imageAlt,
      imageWidth: article!.imageWidth,
      imageHeight: article!.imageHeight,
      publishedTime: article!.published,
      modifiedTime: article!.updated,
      articleSection: article!.category,
      articleAuthor: article!.author,
      extraSchema: [editorialArticleSchema(article!)],
    });
    const meta = seo.meta as Array<Record<string, string>>;
    expect(meta.find((item) => item["property"] === "og:type")?.["content"]).toBe("article");
    expect(meta.find((item) => item["property"] === "og:image")?.["content"]).toBe(
      `https://publishrankseo.vercel.app${article!.image}`,
    );
    expect(meta.find((item) => item["property"] === "og:image:width")?.["content"]).toBe(
      String(article!.imageWidth),
    );
    expect(meta.find((item) => item["property"] === "article:published_time")?.["content"]).toBe(
      article!.published,
    );
    const schema = JSON.parse(seo.scripts[0]?.children as string) as {
      "@graph": Array<{ "@type": string; image?: Array<{ width?: number }> }>;
    };
    expect(schema["@graph"].map((node) => node["@type"])).toContain("NewsArticle");
    expect(
      schema["@graph"].find((node) => node["@type"] === "NewsArticle")?.image?.[0]?.width,
    ).toBe(article!.imageWidth);
  });

  it("includes only articles published in the previous 48 hours in the News sitemap", () => {
    const article = newsArticles[0]!;
    const publishedAt = Date.parse(`${article.published}T00:00:00Z`);
    expect(createNewsSitemapXml(publishedAt + 24 * 60 * 60 * 1000)).toContain(article.slug);
    const expiredXml = createNewsSitemapXml(publishedAt + 49 * 60 * 60 * 1000);
    expect(expiredXml).not.toContain(article.slug);
    expect(expiredXml).toContain("<urlset");
  });

  it("adds feature explainers as evergreen Articles, not NewsArticle sitemap entries", () => {
    const featureArticles = newsArticles.filter(
      (article) => article.category === "Product features",
    );
    expect(featureArticles).toHaveLength(3);
    for (const article of featureArticles) {
      expect(article.schemaType).toBe("Article");
      expect(article.sections.length).toBeGreaterThan(0);
      expect(article.imageAlt.trim()).not.toBe("");
      expect(editorialArticleSchema(article)["@type"]).toBe("Article");
    }
    const currentNewsSitemap = createNewsSitemapXml(Date.parse("2026-11-02T12:00:00Z"));
    for (const article of featureArticles) {
      expect(currentNewsSitemap).not.toContain(article.slug);
    }
  });

  it("emits editorial dates and a complete dedicated video sitemap entry", () => {
    const xml = createSitemapXml();
    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]!);
    const home = entries.find((entry) =>
      entry.includes("<loc>https://publishrankseo.vercel.app/</loc>"),
    );
    expect(home).toBeDefined();
    expect(home).not.toContain("<lastmod>");
    expect(xml).not.toContain("2026-11-06");

    const video = entries.find((entry) =>
      entry.includes("<loc>https://publishrankseo.vercel.app/video</loc>"),
    );
    expect(video).toBeDefined();
    expect(video).toContain("<lastmod>2026-11-20</lastmod>");
    expect(video).toContain("<video:title>What's new in PublishRank SEO 2.26.0</video:title>");
    expect(video).toContain(
      "<video:thumbnail_loc>https://publishrankseo.vercel.app/media/publishrank-2.26.0-whats-new-poster.jpg</video:thumbnail_loc>",
    );
    expect(video).toContain(
      "<video:content_loc>https://publishrankseo.vercel.app/media/publishrank-2.26.0-whats-new.mp4</video:content_loc>",
    );
    expect(video).toContain("<video:duration>90</video:duration>");
    expect(video).toContain(
      "<video:publication_date>2026-11-20T04:16:00+00:00</video:publication_date>",
    );
    expect(video).toContain(
      "<video:title>PublishRank SEO for WordPress — product introduction</video:title>",
    );
    expect(video).toContain(
      "<video:thumbnail_loc>https://publishrankseo.vercel.app/media/publishrank-introduction-v2-poster.jpg</video:thumbnail_loc>",
    );
    expect(video).toContain(
      "<video:content_loc>https://publishrankseo.vercel.app/media/publishrank-introduction-v2.mp4</video:content_loc>",
    );
    expect(video).toContain("<video:duration>15</video:duration>");
    expect(video).toContain(
      "<video:publication_date>2026-11-12T09:40:29+00:00</video:publication_date>",
    );

    const datedArticle = newsArticles.find((article) => article.updated);
    if (datedArticle) {
      expect(xml).toContain(`<lastmod>${datedArticle.updated}</lastmod>`);
    }
  });

  it("provides descriptive alt text for screenshot and brand-card images", () => {
    expect([...screenshots, ...brandCards].every((image) => image.alt.trim().length > 0)).toBe(
      true,
    );
    expect(screenshots.some((image) => image.src.endsWith("/publishrank-seo-dashboard.jpg"))).toBe(
      true,
    );
    expect(productScreenshotGroups).toHaveLength(7);
    expect(allProductScreenshots).toHaveLength(50);
    expect(new Set(allProductScreenshots.map((image) => image.src)).size).toBe(50);
    // All supplied desktop screenshots are current 2.26.0 captures.
    expect(
      allProductScreenshots.every((image) => existsSync(join(process.cwd(), "public", image.src))),
    ).toBe(true);
    expect(
      allProductScreenshots.every(
        (image) =>
          image.src.startsWith("/media/screens/publishrank-2.26.0/") && image.version === "2.26.0",
      ),
    ).toBe(true);
    expect(
      allProductScreenshots.every((image) => image.width === 1280 && image.height === 900),
    ).toBe(true);
    expect(brandCards.some((image) => image.src === "/brand/publishrank_logo_landscape.jpg")).toBe(
      true,
    );
  });
});
