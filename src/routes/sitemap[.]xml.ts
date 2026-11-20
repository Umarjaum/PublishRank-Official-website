import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { newsArticles, newsBySlug } from "@/lib/news-content";
import { PRODUCT_VIDEO } from "@/lib/promo-video";

// Every public page of the site, in editorial priority order.
export const publicPaths = [
  "/",
  "/features",
  "/download",
  "/install",
  PRODUCT_VIDEO.path,
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

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function productVideoXml(): string {
  const video = PRODUCT_VIDEO;
  return [
    "    <video:video>",
    `      <video:thumbnail_loc>${escapeXml(`${SITE_URL}${video.thumbnailPath}`)}</video:thumbnail_loc>`,
    `      <video:title>${escapeXml(video.title)}</video:title>`,
    `      <video:description>${escapeXml(video.description)}</video:description>`,
    `      <video:content_loc>${escapeXml(`${SITE_URL}${video.filePath}`)}</video:content_loc>`,
    `      <video:duration>${video.durationSeconds}</video:duration>`,
    `      <video:publication_date>${video.uploadDate}</video:publication_date>`,
    "    </video:video>",
  ].join("\n");
}

export function createSitemapXml(): string {
  const urls = publicPaths
    .map((path) => {
      const article = path.startsWith("/news/") ? newsBySlug[path.slice("/news/".length)] : null;
      const location = `${SITE_URL}${path === "/" ? "/" : path}`;
      const lastmod =
        path === PRODUCT_VIDEO.path
          ? "<lastmod>2026-11-18</lastmod>"
          : article?.updated
            ? `<lastmod>${article.updated}</lastmod>`
            : "";
      const video = path === PRODUCT_VIDEO.path ? `\n${productVideoXml()}\n  ` : "";
      return `  <url><loc>${escapeXml(location)}</loc>${lastmod}${video}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls}\n</urlset>\n`;
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
