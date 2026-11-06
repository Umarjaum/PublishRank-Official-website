import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { newsArticles, newsBySlug } from "@/lib/news-content";

// Every public page of the site, in editorial priority order.
const LASTMOD = "2026-11-06";
export const publicPaths = [
  "/",
  "/features",
  "/download",
  "/wordpress-org-release",
  "/documentation",
  "/comparisons",
  "/resources",
  "/support",
  "/about",
  "/enterprise",
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

const priority = (p: string) =>
  p === "/"
    ? "1.0"
    : [
          "/features",
          "/download",
          "/wordpress-org-release",
          "/documentation",
          "/enterprise",
          "/news",
        ].includes(p)
      ? "0.9"
      : ["/privacy", "/terms", "/cookies", "/disclaimer", "/security", "/accessibility"].includes(p)
        ? "0.3"
        : "0.7";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const lastmod = LASTMOD;
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths
          .map((p) => {
            const article = p.startsWith("/news/") ? newsBySlug[p.slice("/news/".length)] : null;
            const pageLastmod = article?.updated ?? lastmod;
            return `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${pageLastmod}</lastmod><priority>${priority(p)}</priority></url>`;
          })
          .join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
