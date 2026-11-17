import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { newsArticles, newsBySlug } from "@/lib/news-content";

// Every public page of the site, in editorial priority order.
export const publicPaths = [
  "/",
  "/features",
  "/download",
  "/wordpress-org-release",
  "/changelog",
  "/documentation",
  "/comparisons",
  "/resources",
  "/support",
  "/about",
  "/enterprise",
  "/website-creation",
  "/news",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/security",
  "/accessibility",
  ...newsArticles.map((article) => `/news/${article.slug}`),
];

export function createSitemapXml(): string {
  const urls = publicPaths
    .map((path) => {
      const article = path.startsWith("/news/") ? newsBySlug[path.slice("/news/".length)] : null;
      const location = `${SITE_URL}${path === "/" ? "/" : path}`;
      const lastmod = article?.updated ? `<lastmod>${article.updated}</lastmod>` : "";
      return `  <url><loc>${location}</loc>${lastmod}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(createSitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        }),
    },
  },
});
