import {
  CURRENT_RELEASE,
  DOWNLOAD_URL,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_URL,
  UMARJAUM_URL,
  DOWNLOAD_FILE,
} from "@/lib/site";
import { featuredProductScreenshots } from "@/lib/product-screenshots";

export const screenshots = featuredProductScreenshots;

export const brandCards = [
  {
    src: "/brand/publishrank-hero-banner.jpg",
    title: "WordPress SEO for every kind of site",
    alt: "PublishRank hero banner showing a search performance dashboard",
    width: 1920,
    height: 1088,
  },
  {
    src: "/brand/publishrank-features-showcase.jpg",
    title: "SEO tools across your WordPress site",
    alt: "PublishRank WordPress SEO feature cards for sitemaps, structured data and technical discovery",
    width: 1600,
    height: 912,
  },
  {
    src: "/brand/publishrank-og-share-card.jpg",
    title: "Built for WordPress site teams",
    alt: "PublishRank SEO for WordPress, with technical, business and editorial tools.",
    width: 1200,
    height: 640,
  },
  {
    src: "/brand/publishrank_logo_landscape.jpg",
    title: "PublishRank logo",
    alt: "White PublishRank P mark and wordmark on a burgundy background",
    width: 1600,
    height: 640,
    imageClassName: "aspect-video w-full bg-ink object-contain",
  },
  {
    src: "/brand/publishrank_favicon_square.png",
    title: "PublishRank brand mark",
    alt: "White PublishRank P monogram centered on a burgundy rounded square",
    width: 1024,
    height: 1024,
    imageClassName: "aspect-video w-full bg-card object-contain",
  },
  {
    src: "/brand/wordpress_menu_icon_white_256.png",
    title: "WordPress menu icon",
    alt: "White PublishRank P monogram for WordPress navigation menus, displayed on a dark background",
    width: 256,
    height: 256,
    imageClassName: "aspect-video w-full bg-ink p-12 object-contain",
  },
] as const;

// Photos hotlinked from Unsplash (free under the Unsplash License). `fallback` is used if one fails to load.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`;
export const showcasePhotos = [
  {
    src: u("1504711434969-e33886168f5c"),
    title: "Stories that deserve to be found",
    alt: "Reading the news",
  },
  {
    src: u("1460925895917-afdab827c52f"),
    title: "Search performance, understood",
    alt: "Laptop displaying analytics charts",
  },
  {
    src: u("1522071820081-009f0129c71c"),
    title: "Editorial teams in one workflow",
    alt: "Team collaborating around laptops",
  },
  {
    src: u("1432821596592-e2c18b78144f"),
    title: "Writers first, technical second",
    alt: "Writing in a notebook at a desk",
  },
] as const;
export const photoFallback = "/brand/publishrank-features-showcase.jpg";

export const faqs = [
  {
    q: "Is PublishRank really free?",
    a: "Yes. PublishRank is a free, open-source WordPress SEO plugin. You can download the latest release directly from GitHub without creating an account.",
  },
  {
    q: "How do I install it?",
    a: `Download ${DOWNLOAD_FILE}, then in WordPress go to Plugins → Add New → Upload Plugin, choose the ZIP, install and activate. Follow the illustrated guide at ${SITE_URL}/install, then run the Setup Wizard. Test on a staging copy first.`,
  },
  {
    q: "Can I use it alongside Yoast SEO or Rank Math?",
    a: "Run only one plugin as the owner of titles, canonicals, schema and sitemaps. PublishRank’s Technical health panel flags other SEO plugins so you can avoid duplicate output.",
  },
  {
    q: "Does it guarantee rankings, rich results or Google News inclusion?",
    a: "No. Sitemaps, schema and metadata help search engines understand and discover your content, but no plugin can guarantee rankings, rich results, Discover placement or AI citations.",
  },
  {
    q: "Will it migrate my existing SEO settings?",
    a: "Yes. PublishRank includes field-aware import and export for Yoast SEO and Rank Math, with dry-run previews, selected-field controls, merge or overwrite policies, rollback snapshots and normalized JSON portability between sites. Test on staging first and validate titles, descriptions, canonicals, robots, social metadata and focus keywords before switching production output.",
  },
  {
    q: "What does the download contain?",
    a: `The WordPress plugin package for the current release, ${DOWNLOAD_FILE}. If a download does not start, open the GitHub releases page and choose the current asset manually.`,
  },
  {
    q: "Does the plugin send my site data anywhere?",
    a: "Optional integrations such as IndexNow, Search Console reports and Google’s Preferred Sources script contact those services only when you enable and configure them. Review each feature before enabling it.",
  },
  {
    q: "How do I get help?",
    a: "Start with the documentation and troubleshooting guide, then use the contact form or open an issue on GitHub with the affected URL and steps to reproduce.",
  },
] as const;

export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const softwareSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "PublishRank SEO for WordPress",
  alternateName: "PublishRank SEO",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "WordPress SEO plugin",
  operatingSystem: "WordPress",
  softwareVersion: CURRENT_RELEASE,
  isAccessibleForFree: true,
  description: SITE_DESCRIPTION,
  downloadUrl: DOWNLOAD_URL,
  releaseNotes: `${REPO_URL}/releases/tag/v${CURRENT_RELEASE}`,
  creator: { "@id": `${UMARJAUM_URL}/#person`, name: "Muhammad Umar Jabbar", url: UMARJAUM_URL },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
    name: "PublishRank SEO for WordPress",
    url: SITE_URL,
  },
  featureList: [
    "Traffic Guard site protection and event review",
    "FAQ block and reusable collections",
    "Source Directory for editorial teams",
    "SEO Inspector and schema validation",
    "News and XML sitemaps",
    "Connected JSON-LD schema",
    "SEO metadata and social previews",
    "Redirects and 404 monitoring",
    "Newsroom editorial workflows",
    "Crawl optimization and robots controls",
  ],
  sameAs: [REPO_URL, UMARJAUM_URL, "https://wordpress.org/plugins/publishrank/"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  image: `${SITE_URL}/brand/publishrank-og-share-card.jpg`,
};
