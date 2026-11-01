import { DOWNLOAD_URL, REVIEW_COUNT_LABEL } from "@/lib/site";

/**
 * DRAFT TESTIMONIALS — replace with real, verified reader reviews before launch.
 * Attributions are role-based on purpose; add real names/publications only with permission.
 */
export const testimonials = [
  {
    rating: 5,
    quote:
      "The news sitemap and article checks replaced three separate tools for our desk. Editors finally see what is missing before they hit publish.",
    author: "Managing editor",
    org: "Regional news site",
  },
  {
    rating: 5,
    quote:
      "Schema Aggregator made it easy to audit what our templates actually output. We caught a duplicate Organization block in minutes.",
    author: "Technical SEO lead",
    org: "Digital publisher",
  },
  {
    rating: 5,
    quote:
      "Setup took an afternoon. The wizard asked for our publication identity once and it carried through titles, social cards and schema.",
    author: "Founder",
    org: "Independent online newspaper",
  },
  {
    rating: 4,
    quote:
      "Newsroom roles and the planning board keep reporters and editors on the same page without leaving WordPress.",
    author: "Digital editor",
    org: "Local news organization",
  },
  {
    rating: 5,
    quote:
      "Built-in WP Hide Login cut the junk sign-in attempts we used to see every day. One less plugin to maintain.",
    author: "Site administrator",
    org: "Magazine publisher",
  },
  {
    rating: 4,
    quote:
      "Crawl Optimization gave us clear, reversible switches instead of a pile of code snippets. Everything is off until you choose it.",
    author: "Developer",
    org: "Publishing agency",
  },
  {
    rating: 5,
    quote:
      "Google Preferred Sources was a two-minute job: pick the button, choose placements, save. It just worked on our theme.",
    author: "Blogger",
    org: "Niche news blog",
  },
  {
    rating: 5,
    quote:
      "Free, open source and clearly documented. We tested on staging first, exactly as the handbook suggests, and went live a week later.",
    author: "Operations manager",
    org: "Community newspaper",
  },
] as const;

export const screenshots = [
  {
    src: "/media/screens/publishrank-dashboard-overview.webp",
    title: "Publisher dashboard",
    text: "Checklist score, news sitemap status, sitemap URLs and a searchable showcase of every tool.",
    alt: "PublishRank dashboard with configuration checklist, sitemap URLs and tool showcase",
  },
  {
    src: "/media/screens/publishrank-seo-statistics-dashboard.png",
    title: "SEO statistics dashboard",
    text: "Track clicks, impressions, click-through rate and average position across a six-month search-performance chart.",
    alt: "PublishRank SEO statistics dashboard showing 128.4K clicks, 2.1M impressions, a 6.1% average click-through rate, an average position of 8.4, and rising clicks and impressions from January through June",
    wide: true,
  },
  {
    src: "/media/screens/publishrank-technical-health.webp",
    title: "Technical health",
    text: "Pass, warning and recommendation labels for conflicts, HTTPS, sitemaps, schema and robots.txt.",
    alt: "PublishRank technical health table listing pass and warning checks",
  },
  {
    src: "/media/screens/publishrank-google-preferred-sources.webp",
    title: "Google Preferred Sources",
    text: "Generate your link, choose Google’s button or a custom one, and pick exactly where it appears.",
    alt: "PublishRank Google Preferred Sources settings screen",
  },
  {
    src: "/media/screens/publishrank-crawl-optimization.webp",
    title: "Crawl optimization",
    text: "Opt-in switches to clean discovery markup, feeds, internal search and URL parameters.",
    alt: "PublishRank crawl optimization settings with unchecked options",
  },
] as const;

export const brandCards = [
  {
    src: "/brand/publishrank-hero-banner.jpg",
    title: "Rank every story higher",
    alt: "PublishRank hero banner showing a search performance dashboard",
    width: 1920,
    height: 1088,
  },
  {
    src: "/brand/publishrank-features-showcase.jpg",
    title: "Everything a publisher needs",
    alt: "PublishRank feature cards: News Sitemaps, Schema Markup and Real-time Rank Tracking",
    width: 1600,
    height: 912,
  },
  {
    src: "/brand/publishrank-og-share-card.jpg",
    title: "Built for newsrooms",
    alt: "PublishRank share card: Built for Newsrooms. Ranked by Google.",
    width: 1200,
    height: 640,
  },
  {
    src: "/brand/publishrank_logo_landscape.jpg",
    title: "PublishRank logo",
    alt: "White PublishRank P mark and wordmark with the tagline SEO for Publishers on a burgundy background",
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
    a: "Download PublishRank.zip, then in WordPress go to Plugins → Add New → Upload Plugin, choose the ZIP, install and activate. Run the Setup Wizard to confirm your publication identity. Test on a staging copy first.",
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
    a: "Automatic migration from other SEO plugins is planned, not promised. Export your current settings, record titles and redirects, and compare output on staging before switching.",
  },
  {
    q: "What does the download contain?",
    a: "The WordPress plugin package, PublishRank.zip, from the latest GitHub release. If a download does not start, open the releases page and choose the asset manually.",
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
  "@id": "https://publishrankseo.vercel.app/#software",
  name: "PublishRank",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "WordPress SEO plugin",
  operatingSystem: "WordPress",
  description:
    "Free, open-source WordPress SEO plugin for news publishers: news sitemaps, structured data, newsroom workflow, redirects, crawl optimization and technical SEO.",
  downloadUrl: DOWNLOAD_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  image: "https://publishrankseo.vercel.app/brand/publishrank-og-share-card.jpg",
};

export const reviewSummary = {
  count: REVIEW_COUNT_LABEL,
  label: "reader reviews rated four to five stars",
};
