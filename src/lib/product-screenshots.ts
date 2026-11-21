export type ProductScreenshot = {
  src: string;
  title: string;
  text: string;
  alt: string;
  width: number;
  height: number;
  /** Plugin version the screen was captured on. */
  version: string;
};

export type ProductScreenshotGroup = {
  id: string;
  title: string;
  description: string;
  screenshots: ProductScreenshot[];
};

export const SCREENSHOT_VERSION = "2.26.0";

/** Real 2.26.0 interface captures from the local WordPress test site (1280×900, demo data). */
const current = (filename: string, title: string, text?: string): ProductScreenshot => ({
  src: `/media/screens/publishrank-${SCREENSHOT_VERSION}/${filename}.jpg`,
  title,
  text:
    text ?? `Actual ${title} screen from the PublishRank ${SCREENSHOT_VERSION} WordPress admin.`,
  alt: `PublishRank ${title} screen captured on a local WordPress test site with demo content.`,
  width: 1280,
  height: 900,
  version: SCREENSHOT_VERSION,
});

export const productScreenshotGroups: ProductScreenshotGroup[] = [
  {
    id: "new-in-2-26",
    title: "Historical captures · 2.26.0",
    description:
      "Schema Studio, detailed diagnostics, Local SEO locations, the refreshed dashboard and onboarding.",
    screenshots: [
      current(
        "publishrank-schema-studio",
        "Schema Studio",
        "Build and preview reusable structured-data templates.",
      ),
      current(
        "publishrank-seo-inspector",
        "SEO Inspector",
        "Review page signals and structured data.",
      ),
      current(
        "publishrank-local-seo",
        "Local SEO",
        "Manage business profiles and multiple locations.",
      ),
      current(
        "publishrank-seo-dashboard",
        "SEO dashboard",
        "Review publishing activity and site status.",
      ),
      current(
        "publishrank-onboarding",
        "Setup wizard",
        "Configure a site with the updated onboarding flow.",
      ),
      current(
        "publishrank-seo-diagnostics",
        "Schema diagnostics",
        "Inspect structured-data errors and warnings.",
      ),
    ],
  },
  {
    id: "dashboard-access",
    title: "Dashboard, access & publishing",
    description:
      "Feature controls, security, publishing workflows, documentation and verification.",
    screenshots: [
      current("publishrank-access-shield", "Access Shield"),
      current("publishrank-modules", "Feature modules"),
      current("publishrank-roles", "Roles and permissions"),
      current("publishrank-publisher-toolkit", "Publisher Toolkit"),
      current("publishrank-publishing-desk", "Publishing Desk"),
      current("publishrank-documentation", "Documentation and help"),
      current("publishrank-verification", "Site verification"),
    ],
  },
  {
    id: "search-discovery",
    title: "Search & discovery",
    description: "Sitemaps, schema, search integrations, feeds and crawler-facing controls.",
    screenshots: [
      current("publishrank-sitemap-health", "Sitemap hub"),
      current("publishrank-schema", "Schema markup"),
      current("publishrank-search-console", "Google Search Console"),
      current("publishrank-google-preferred-sources", "Google Preferred Sources"),
      current("publishrank-site-navigation", "Site navigation"),
      current("publishrank-breadcrumbs", "Breadcrumbs"),
      current("publishrank-feeds", "RSS and JSON feeds"),
      current("publishrank-indexnow", "IndexNow"),
      current("publishrank-baidu", "Baidu"),
      current("publishrank-llms-txt", "llms.txt"),
    ],
  },
  {
    id: "content-commerce",
    title: "Content, commerce & social",
    description:
      "On-page checks, author expertise, image tools, WooCommerce and publishing channels.",
    screenshots: [
      current("publishrank-seo-score", "SEO score"),
      current("publishrank-author-expertise", "Author expertise"),
      current("publishrank-seo-internal-links", "Internal links"),
      current("publishrank-link-intelligence", "Link intelligence"),
      current("publishrank-woocommerce", "WooCommerce SEO"),
      current("publishrank-image-optimizer", "Image optimizer"),
      current("publishrank-crawl-optimization", "Crawl optimization"),
      current("publishrank-ai-visibility", "AI visibility"),
      current("publishrank-mastodon", "Mastodon"),
    ],
  },
  {
    id: "measure-maintain",
    title: "Measure, protect & maintain",
    description: "Analytics, diagnostics, traffic controls, redirects and configuration history.",
    screenshots: [
      current("publishrank-analytics", "Analytics"),
      current("publishrank-insights", "Insights"),
      current("publishrank-seo-404", "404 monitor"),
      current("publishrank-seo-config-history", "Configuration history"),
      current("publishrank-seo-portability", "SEO portability"),
      current("publishrank-seo-redirects", "Redirects"),
      current("publishrank-seo-robots", "Robots.txt"),
      current("publishrank-theme-seo", "Theme SEO"),
      current("publishrank-traffic-guard", "Traffic Guard"),
    ],
  },
  {
    id: "newsroom",
    title: "Newsroom",
    description: "The editorial workspace, planning board, calendar, activity and team settings.",
    screenshots: [
      current("uj-newsroom", "Newsroom workspace"),
      current("uj-newsroom-board", "Newsroom planning board"),
      current("uj-newsroom-calendar", "Newsroom calendar"),
      current("uj-newsroom-activity", "Newsroom activity"),
      current("uj-newsroom-notifications", "Newsroom notifications"),
      current("uj-newsroom-roles", "Newsroom roles"),
      current("uj-newsroom-settings", "Newsroom settings"),
    ],
  },
  {
    id: "help-updates",
    title: "Help & updates",
    description: "Release announcements and the overall PublishRank interface.",
    screenshots: [
      current("publishrank-whats-new", "What’s new"),
      current("publishrank", "PublishRank overview"),
    ],
  },
];

export const allProductScreenshots = productScreenshotGroups.flatMap((group) => group.screenshots);

const featuredFilenames = [
  "publishrank-seo-dashboard.jpg",
  "publishrank-schema-studio.jpg",
  "publishrank-local-seo.jpg",
  "publishrank-traffic-guard.jpg",
  "publishrank-analytics.jpg",
];

export const featuredProductScreenshots = featuredFilenames.map((filename) => {
  const found = allProductScreenshots.find((image) => image.src.endsWith(`/${filename}`));
  if (!found) throw new Error(`Missing featured PublishRank screenshot: ${filename}`);
  return found;
});
