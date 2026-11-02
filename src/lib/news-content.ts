import { absoluteUrl, OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

export type NewsArticle = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  published: string;
  updated: string;
  author: string;
  image: string;
  imageAlt: string;
  readTime: string;
  keywords: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "enterprise-publisher-seo-operating-model",
    title: "The enterprise publisher SEO operating model: from story desk to archive",
    dek: "A practical framework for making technical SEO a repeatable newsroom habit without slowing down the people who publish.",
    category: "Strategy",
    published: "2026-10-28",
    updated: "2026-10-28",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-newsroom.jpg",
    imageAlt: "Editorial team working together in a bright newsroom",
    readTime: "8 min read",
    keywords: "enterprise publisher SEO, newsroom SEO workflow, news SEO operating model",
    sections: [
      {
        heading: "Why enterprise SEO needs an operating model",
        paragraphs: [
          "Large publishing organizations rarely have one SEO problem. They have a chain of handoffs: editorial planning, commissioning, reporting, editing, publishing, distribution and archive maintenance. Each handoff can improve or weaken the information search engines receive.",
          "An operating model turns those handoffs into clear ownership. Writers focus on the story, editors verify the public-facing facts, and technical teams own templates, redirects, crawl controls and validation. The goal is not to make every editor a technical SEO specialist; it is to make the right checks visible at the right moment.",
        ],
      },
      {
        heading: "A three-layer workflow",
        paragraphs: [
          "Start with three layers: publication foundations, article-level review and archive stewardship. Foundations define the publisher, authors, canonical rules, sitemaps and schema defaults. Article review checks what a reader will see before publication. Stewardship keeps links, metadata and structured data accurate after the news cycle ends.",
        ],
        bullets: [
          "Foundation: identity, templates, ownership and discovery outputs",
          "Story: headline, summary, byline, dates, images, links and article type",
          "Archive: redirects, corrections, internal links, stale facts and technical health",
        ],
      },
      {
        heading: "What good governance looks like",
        paragraphs: [
          "Governance should be observable. Maintain a short release checklist, sample representative URLs after template changes and record who owns the final decision. Use dashboards and diagnostics as evidence, not as a substitute for editorial judgment.",
          "A publisher should also define limits. A sitemap does not guarantee indexing, schema does not guarantee a rich result, and a score is not a ranking forecast. Clear limitations protect trust across editorial, product and leadership teams.",
        ],
      },
      {
        heading: "The PublishRank approach",
        paragraphs: [
          "PublishRank brings story checks, publisher identity, structured data, sitemap health, redirect maintenance and crawl controls into one WordPress workflow. It is designed to give publishers a durable starting point while keeping configuration and validation visible.",
          "Teams should still test on staging, inspect rendered HTML and consult the current guidance from each search platform. The best implementation is the one your newsroom can understand, verify and maintain.",
        ],
      },
    ],
  },
  {
    slug: "news-sitemap-schema-checklist",
    title: "News sitemap and article schema checklist for modern publishers",
    dek: "Use this pre-publication and post-publication checklist to keep discovery signals aligned with the article readers actually see.",
    category: "Technical SEO",
    published: "2026-10-15",
    updated: "2026-10-22",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-developer.jpg",
    imageAlt: "Developer reviewing a publishing analytics interface",
    readTime: "6 min read",
    keywords: "news sitemap checklist, NewsArticle schema, publisher structured data",
    sections: [
      {
        heading: "Start with the canonical article",
        paragraphs: [
          "Before checking markup, confirm the page you want readers and crawlers to use. The canonical URL should be stable, accessible and representative of the article. Avoid treating alternate parameters, preview URLs or unrelated archive pages as the primary destination.",
          "Then review the visible page: title, author, date, image, article body and publisher information. Structured data should describe that experience rather than introduce facts that are not visible or supported.",
        ],
      },
      {
        heading: "News sitemap essentials",
        paragraphs: [
          "A news sitemap is a discovery aid for eligible recent articles. Confirm that the sitemap is reachable, returns valid XML, references the correct host and includes only URLs your publication intends to expose. Review publication name, language, dates and exclusions.",
          "Keep XML and news sitemap ownership clear when more than one SEO plugin or theme extension is active. Duplicate sitemap output can make troubleshooting harder and can expose inconsistent metadata.",
        ],
      },
      {
        heading: "Article schema essentials",
        paragraphs: [
          "Choose the article type that matches the story. Use accurate headline, image, datePublished, dateModified, author and publisher properties. Connect images and people to real entities and keep corrections reflected in the page and the markup.",
          "Validation tools can identify syntax and eligibility issues, but they cannot judge whether a headline is accurate or whether an author relationship is truthful. Editorial review remains the source of truth.",
        ],
      },
      {
        heading: "A release-day verification pass",
        paragraphs: [
          "After publication, open the live URL in a fresh session and inspect the rendered HTML. Check the canonical link, robots directives, JSON-LD, sitemap membership, social preview and mobile presentation. Capture the result in your release checklist when the story is high priority.",
        ],
      },
    ],
  },
  {
    slug: "content-operations-discoverability",
    title: "Content operations that compound discoverability over time",
    dek: "Enterprise growth comes from thousands of small publishing decisions. Make those decisions easier to repeat, measure and improve.",
    category: "Operations",
    published: "2026-09-30",
    updated: "2026-09-30",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-writing.jpg",
    imageAlt: "Writer making notes beside a laptop",
    readTime: "7 min read",
    keywords: "content operations, editorial SEO process, archive maintenance",
    sections: [
      {
        heading: "Discoverability is an operations problem",
        paragraphs: [
          "Search visibility is often discussed as a launch task, but publishers earn durable discoverability through operations. The team needs a way to brief stories, review the output, handle corrections and maintain older work without relying on one expert’s memory.",
          "A simple process beats an ambitious process nobody follows. Start by making the highest-value checks visible in the tools your team already uses.",
        ],
      },
      {
        heading: "Build the minimum viable checklist",
        paragraphs: [
          "For every story, review the headline, summary, byline, dates, featured image, canonical URL, internal links and article type. For every release, review a representative URL, sitemap output and template-level schema. For every archive cycle, review broken links, redirects and outdated facts.",
        ],
      },
      {
        heading: "Measure the process, not just traffic",
        paragraphs: [
          "Traffic is important, but it is a lagging indicator influenced by many external forces. Track the percentage of stories with complete authorship, clean canonicals, valid images and correct sitemap inclusion. These signals help teams identify friction before it becomes a visibility problem.",
          "Use search performance reports as evidence about outcomes, not as a reason to rewrite every headline toward a number. Editorial quality and reader trust remain the long-term asset.",
        ],
      },
      {
        heading: "Make handoffs explicit",
        paragraphs: [
          "Document who owns publication defaults, technical templates, newsroom permissions, redirects, incident response and post-publication corrections. PublishRank’s publisher-first model is built around these handoffs so the team can see where a decision belongs.",
        ],
      },
    ],
  },
];

export const newsBySlug = Object.fromEntries(
  newsArticles.map((article) => [article.slug, article]),
) as Record<string, NewsArticle>;

export function newsArticleSchema(article: NewsArticle) {
  const url = absoluteUrl(`/news/${article.slug}`);
  return {
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.dek,
    datePublished: article.published,
    dateModified: article.updated,
    author: { "@type": "Organization", name: article.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png") },
    },
    image: [absoluteUrl(article.image), absoluteUrl(OG_IMAGE_PATH)],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    keywords: article.keywords,
    inLanguage: "en-US",
  };
}
