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

export const SCREENSHOT_VERSION = "2.25.0";

/** Fresh 2.25.0 captures from the real WordPress test site (1440×1000, demo content). */
const current = (filename: string, title: string, text?: string): ProductScreenshot => ({
  src: `/media/screens/publishrank-${SCREENSHOT_VERSION}/${filename}.webp`,
  title,
  text: text ?? `Actual ${title} screen from the PublishRank ${SCREENSHOT_VERSION} WordPress admin.`,
  alt: `PublishRank ${title} screen in the WordPress admin, captured on a local test site with demo content.`,
  width: 1440,
  height: 1000,
  version: SCREENSHOT_VERSION,
});

/** The setup wizard was not recaptured for 2.25.0; these come from the 2.12.1 capture set. */
const wizard = (filename: string, title: string): ProductScreenshot => ({
  src: `/media/screens/publishrank-2.12.1/setup-wizard-desktop/${filename}`,
  title,
  text: `${title} — captured on PublishRank 2.12.1.`,
  alt: `PublishRank ${title} in the WordPress admin (2.12.1 capture), local test site with demo content.`,
  width: 1440,
  height: 1000,
  version: "2.12.1",
});

export const productScreenshotGroups: ProductScreenshotGroup[] = [
  {
    id: "new-in-2-25",
    title: "New in 2.25",
    description:
      "Theme masking, Access Shield verification, the Publishing Desk, feature access rules and the in-plugin News screen.",
    screenshots: [
      current("03-publishrank-theme-masking", "Theme masking", "Fingerprint scan, masking status and the server rule for direct folder probes."),
      current("04-publishrank-access-shield", "Access Shield", "Private login address, 2FA, CAPTCHA, breach-checked passwords and signed live verification."),
      current("05-publishrank-publishing-desk", "Publishing Desk", "News diagnostics, duplicate-headline checks, missed-schedule fixing and publishing velocity."),
      current("06-publishrank-roles", "Roles & permissions", "Choose which roles and individual users can use each PublishRank feature."),
      current("02-publishrank-whats-new", "News & What's New", "Release notes and announcements from the official site, cached with an offline fallback."),
    ],
  },
  {
    id: "dashboard-setup",
    title: "Dashboard, features & setup",
    description: "The dashboard, feature switches, general settings and the first-run setup flow.",
    screenshots: [
      current("01-publishrank-dashboard", "Dashboard"),
      current("07-publishrank-features", "Features"),
      current("22-publishrank-settings", "General settings"),
      wizard("01-publishrank-setup-wizard-step-1-welcome.png", "Setup wizard: welcome"),
      wizard("02-publishrank-setup-wizard-step-2-publisher-identity.png", "Setup wizard: publisher identity"),
      wizard("04-publishrank-setup-wizard-step-5-search-appearance.png", "Setup wizard: search appearance"),
      wizard("06-publishrank-setup-wizard-step-8-review.png", "Setup wizard: review"),
      wizard("08-publishrank-setup-wizard-setup-complete-celebration.png", "Setup wizard: setup complete"),
    ],
  },
  {
    id: "search-discovery",
    title: "Search & discovery",
    description: "Sitemaps, structured data, search integrations, crawler controls and AI discovery.",
    screenshots: [
      current("11-publishrank-sitemap-health", "Sitemap hub", "Sharded sitemaps — this test site serves 200,030 URLs in 50,000-URL files."),
      current("12-publishrank-schema", "Schema markup"),
      current("25-publishrank-search-console", "Google Search Console"),
      current("26-publishrank-indexnow", "IndexNow"),
      current("28-publishrank-robots", "Robots.txt"),
      current("29-publishrank-breadcrumbs", "Breadcrumbs"),
      current("14-publishrank-site-navigation", "Site navigation"),
      current("15-publishrank-feeds", "RSS feeds"),
      current("13-publishrank-ai-visibility", "AI visibility"),
      current("27-publishrank-llms-txt", "AI and llms.txt"),
    ],
  },
  {
    id: "content-commerce",
    title: "Content, local & commerce",
    description: "On-page scoring, local business profiles, WooCommerce SEO and social publishing.",
    screenshots: [
      current("10-publishrank-seo-score", "SEO score"),
      current("21-publishrank-local-seo", "Local SEO"),
      current("09-publishrank-woocommerce", "WooCommerce SEO"),
      current("30-publishrank-mastodon", "Mastodon"),
    ],
  },
  {
    id: "measure-maintain",
    title: "Measure & maintain",
    description: "Analytics, insights, redirects, 404s, traffic protection, diagnostics and change history.",
    screenshots: [
      current("08-publishrank-analytics", "Analytics"),
      current("23-publishrank-insights", "Insights"),
      current("16-publishrank-redirects", "Redirects"),
      current("17-publishrank-404-monitor", "404 monitor"),
      current("18-publishrank-traffic-guard", "Traffic Guard"),
      current("24-publishrank-diagnostics", "Diagnostics"),
      current("31-publishrank-config-history", "Configuration history"),
    ],
  },
  {
    id: "newsroom",
    title: "Newsroom",
    description: "The editorial workspace and daily planning board.",
    screenshots: [
      current("19-publishrank-newsroom", "Newsroom workspace"),
      current("20-publishrank-newsroom-board", "Newsroom planning board"),
    ],
  },
  {
    id: "help-support",
    title: "Help & support",
    description: "The in-dashboard help and documentation area.",
    screenshots: [current("32-publishrank-documentation", "Help and documentation")],
  },
];

export const allProductScreenshots = productScreenshotGroups.flatMap((group) => group.screenshots);

const featuredFilenames = [
  "01-publishrank-dashboard.webp",
  "03-publishrank-theme-masking.webp",
  "04-publishrank-access-shield.webp",
  "06-publishrank-roles.webp",
  "05-publishrank-publishing-desk.webp",
];

export const featuredProductScreenshots = featuredFilenames.map((filename) => {
  const found = allProductScreenshots.find((image) => image.src.endsWith(`/${filename}`));
  if (!found) throw new Error(`Missing featured PublishRank screenshot: ${filename}`);
  return found;
});
