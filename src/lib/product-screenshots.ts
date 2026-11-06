type ScreenshotFolder = "desktop-1440" | "setup-wizard-desktop";

export type ProductScreenshot = {
  src: string;
  title: string;
  text: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductScreenshotGroup = {
  id: string;
  title: string;
  description: string;
  screenshots: ProductScreenshot[];
};

const screenshot = (
  folder: ScreenshotFolder,
  filename: string,
  title: string,
): ProductScreenshot => ({
  src: `/media/screens/publishrank-2.12.1/${folder}/${filename}`,
  title,
  text: `Actual ${title} screen from the PublishRank WordPress admin.`,
  alt: `PublishRank ${title} screen in the WordPress admin, captured on a local test site with demo content.`,
  width: 1440,
  height: 1000,
});

const desktop = (filename: string, title: string) => screenshot("desktop-1440", filename, title);
const wizard = (filename: string, title: string) =>
  screenshot("setup-wizard-desktop", filename, title);

export const productScreenshotGroups: ProductScreenshotGroup[] = [
  {
    id: "dashboard-setup",
    title: "Dashboard & setup wizard",
    description: "The dashboard, feature index, and first-run setup flow.",
    screenshots: [
      desktop("01-publishrank-dashboard.png", "Dashboard"),
      desktop("02-publishrank-setup-wizard-complete-summary.png", "Setup wizard summary"),
      desktop("03-publishrank-features.png", "Feature index"),
      wizard("01-publishrank-setup-wizard-step-1-welcome.png", "Setup wizard: welcome"),
      wizard(
        "02-publishrank-setup-wizard-step-2-publisher-identity.png",
        "Setup wizard: publisher identity",
      ),
      wizard(
        "03-publishrank-setup-wizard-step-3-details-saved-toast.png",
        "Setup wizard: saved publisher details",
      ),
      wizard(
        "04-publishrank-setup-wizard-step-5-search-appearance.png",
        "Setup wizard: search appearance",
      ),
      wizard("05-publishrank-setup-wizard-step-7-local-seo.png", "Setup wizard: local SEO"),
      wizard("06-publishrank-setup-wizard-step-8-review.png", "Setup wizard: review"),
      wizard(
        "07-publishrank-setup-wizard-step-8-review-filled.png",
        "Setup wizard: completed review",
      ),
      wizard(
        "08-publishrank-setup-wizard-setup-complete-celebration.png",
        "Setup wizard: setup complete",
      ),
    ],
  },
  {
    id: "general-settings",
    title: "General settings & metadata",
    description:
      "Publication-wide settings, title and meta templates, and configuration portability.",
    screenshots: [
      desktop("04-publishrank-general-settings.png", "General settings"),
      desktop("05-publishrank-general-settings-titles-and-meta.png", "Titles and meta settings"),
      desktop("06-publishrank-general-settings-import-export.png", "Settings import and export"),
      desktop(
        "41-publishrank-general-settings-sticky-save-bar.png",
        "General settings with sticky save bar",
      ),
    ],
  },
  {
    id: "search-discovery",
    title: "Search & discovery",
    description:
      "Sitemaps, structured data, search integrations, crawler controls, and discovery tools.",
    screenshots: [
      desktop("07-publishrank-sitemap-hub.png", "Sitemap hub"),
      desktop("08-publishrank-schema-markup.png", "Schema markup"),
      desktop("09-publishrank-search-console.png", "Google Search Console"),
      desktop("10-publishrank-indexnow.png", "IndexNow"),
      desktop("11-publishrank-search-engines-baidu.png", "Search engines: Baidu"),
      desktop("12-publishrank-google-preferred-sources.png", "Google Preferred Sources"),
      desktop("13-publishrank-robots-txt.png", "Robots.txt"),
      desktop("14-publishrank-crawl-optimization.png", "Crawl optimization"),
      desktop("15-publishrank-breadcrumbs.png", "Breadcrumbs"),
      desktop("16-publishrank-site-verification.png", "Site verification"),
      desktop("17-publishrank-llms-txt.png", "AI and llms.txt"),
    ],
  },
  {
    id: "content-publishing",
    title: "Content & publishing tools",
    description:
      "Tools for authors, editorial content, images, links, local SEO, and on-page scoring.",
    screenshots: [
      desktop("18-publishrank-local-seo.png", "Local SEO"),
      desktop("19-publishrank-author-expertise.png", "Author expertise"),
      desktop("20-publishrank-publisher-toolkit.png", "Publisher toolkit"),
      desktop("21-publishrank-image-optimizer.png", "Image optimizer"),
      desktop("22-publishrank-link-intelligence.png", "Link intelligence"),
      desktop("23-publishrank-internal-links.png", "Internal links"),
      desktop("28-publishrank-seo-score.png", "SEO score"),
    ],
  },
  {
    id: "measure-maintain",
    title: "Measure & maintain",
    description:
      "Site monitoring, redirects, access controls, analytics, insights, and diagnostics.",
    screenshots: [
      desktop("24-publishrank-redirects.png", "Redirects"),
      desktop("25-publishrank-404-monitor.png", "404 monitor"),
      desktop("26-publishrank-traffic-guard.png", "Traffic Guard"),
      desktop("27-publishrank-hide-login.png", "WP Hide Login"),
      desktop("29-publishrank-analytics.png", "Analytics"),
      desktop("30-publishrank-insights.png", "Insights"),
      desktop("31-publishrank-diagnostics.png", "Diagnostics"),
      desktop("32-publishrank-configuration-history.png", "Configuration history"),
    ],
  },
  {
    id: "newsroom",
    title: "Newsroom",
    description:
      "The editorial workspace, planning board, calendar, activity, notifications, and role settings.",
    screenshots: [
      desktop("34-publishrank-newsroom.png", "Newsroom workspace"),
      desktop("35-publishrank-newsroom-board.png", "Newsroom planning board"),
      desktop("36-publishrank-newsroom-calendar.png", "Newsroom calendar"),
      desktop("37-publishrank-newsroom-activity.png", "Newsroom activity"),
      desktop("38-publishrank-newsroom-notifications.png", "Newsroom notifications"),
      desktop("39-publishrank-newsroom-roles.png", "Newsroom roles"),
      desktop("40-publishrank-newsroom-settings.png", "Newsroom settings"),
    ],
  },
  {
    id: "help-support",
    title: "Help & support",
    description: "The in-dashboard help and documentation area.",
    screenshots: [desktop("33-publishrank-help-and-documentation.png", "Help and documentation")],
  },
];

export const allProductScreenshots = productScreenshotGroups.flatMap((group) => group.screenshots);

const featuredFilenames = [
  "01-publishrank-dashboard.png",
  "05-publishrank-general-settings-titles-and-meta.png",
  "10-publishrank-indexnow.png",
  "20-publishrank-publisher-toolkit.png",
  "26-publishrank-traffic-guard.png",
];

export const featuredProductScreenshots = featuredFilenames.map((filename) => {
  const found = allProductScreenshots.find((image) => image.src.endsWith(`/${filename}`));
  if (!found) throw new Error(`Missing featured PublishRank screenshot: ${filename}`);
  return found;
});
