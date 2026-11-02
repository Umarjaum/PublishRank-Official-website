import { createFileRoute } from "@tanstack/react-router";
import { newsArticles } from "@/lib/news-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createNewsSitemapXml(now = Date.now()) {
  const recentArticles = newsArticles.filter((article) => {
    const publishedAt = Date.parse(`${article.published}T00:00:00Z`);
    return (
      article.schemaType !== "Article" &&
      Number.isFinite(publishedAt) &&
      publishedAt <= now &&
      now - publishedAt <= NEWS_WINDOW_MS
    );
  });
  const urls = recentArticles
    .map(
      (article) => `  <url>
    <loc>${SITE_URL}/news/${xmlEscape(article.slug)}</loc>
    <news:news>
      <news:publication><news:name>${xmlEscape(SITE_NAME)}</news:name><news:language>en</news:language></news:publication>
      <news:publication_date>${xmlEscape(article.published)}</news:publication_date>
      <news:title>${xmlEscape(article.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls ? `${urls}\n` : ""}</urlset>
`;
}

export const Route = createFileRoute("/news-sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(createNewsSitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800, s-maxage=1800",
          },
        }),
    },
  },
});
