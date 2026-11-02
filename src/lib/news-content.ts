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
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  readTime: string;
  keywords: string;
  schemaType?: "NewsArticle" | "Article";
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
    imageWidth: 1800,
    imageHeight: 1202,
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
    imageWidth: 1500,
    imageHeight: 998,
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
    imageWidth: 1500,
    imageHeight: 1126,
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
  {
    slug: "publisher-content-governance-measurement",
    title: "Publisher content governance: measure what your team can improve",
    dek: "A practical scorecard for connecting editorial ownership, technical quality and archive maintenance without turning SEO into a vanity metric.",
    category: "Governance",
    published: "2026-09-12",
    updated: "2026-09-12",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-newsroom.jpg",
    imageWidth: 1800,
    imageHeight: 1202,
    imageAlt: "Editors reviewing a publishing workflow together",
    readTime: "6 min read",
    keywords: "publisher content governance, editorial SEO measurement, archive quality scorecard",
    sections: [
      {
        heading: "Give every quality signal an owner",
        paragraphs: [
          "A publishing team can only improve what it can see and assign. Decide who owns article-level review, publisher identity, structured data, sitemap exclusions, redirects, corrections and template changes before a problem arrives.",
          "Ownership does not mean one person does every task. It means the final decision has a home, the handoff is documented and an exception can be escalated without guesswork.",
        ],
      },
      {
        heading: "Use a small, durable scorecard",
        paragraphs: [
          "Start with signals the team can influence: one canonical URL, accurate authorship, visible dates, a useful image, valid article markup, intended sitemap membership and a working internal-link path. Sample new stories, evergreen stories and recently changed templates.",
          "Do not confuse completeness with performance. A clean technical output is a foundation for discovery; it is not proof that a story will rank or receive traffic.",
        ],
        bullets: [
          "Foundation: identity, templates, canonicals and sitemap ownership",
          "Story: headline, summary, author, dates, images and links",
          "Archive: corrections, redirects, stale facts and broken destinations",
        ],
      },
      {
        heading: "Turn exceptions into a learning loop",
        paragraphs: [
          "When a story misses a check, record the cause rather than only fixing the symptom. A missing byline may point to an editorial handoff; duplicate schema may point to a theme conflict; an excluded URL may reveal an unclear archive rule.",
          "Review the exception log at the end of a release cycle. Repeated exceptions are candidates for better defaults, clearer training or a small product improvement.",
        ],
      },
      {
        heading: "Keep the archive useful to people",
        paragraphs: [
          "Archive governance is ultimately a reader service. Revisit important pages for stale facts, broken links, missing context and outdated images. Keep URLs stable when the work remains relevant and explain substantive corrections when they affect the reader’s understanding.",
          "The strongest operating model is one that protects editorial trust while making technical quality easier to repeat.",
        ],
      },
    ],
  },
  {
    slug: "publishrank-newsroom-workflow",
    title: "From draft to desk: inside the PublishRank newsroom workflow",
    dek: "A closer look at how assigned editorial roles, story ownership and article-level SEO checks fit together inside WordPress.",
    category: "Product features",
    published: "2026-11-02",
    updated: "2026-11-02",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-newsroom.jpg",
    imageWidth: 1800,
    imageHeight: 1202,
    imageAlt: "Glass-walled office corridors and shared editorial workspaces",
    readTime: "5 min read",
    keywords: "PublishRank newsroom, editorial roles, article SEO workflow",
    schemaType: "Article",
    sections: [
      {
        heading: "Keep story ownership visible",
        paragraphs: [
          "PublishRank's dedicated newsroom module is designed to keep editorial responsibility close to the WordPress stories it supports. Editors, reporters and contributors can be assigned roles so teams have a clearer place to manage story ownership and publishing handoffs.",
          "That structure is useful when several people touch a story, but it does not replace a newsroom's own commissioning, fact-checking or approval standards. Teams should confirm that their configured roles match their actual editorial policy.",
        ],
      },
      {
        heading: "Bring practical SEO checks into the draft review",
        paragraphs: [
          "Article SEO Intelligence reviews elements such as headlines, descriptions, headings, readability, featured images, bylines, dates and links. The checks can help an editor notice missing details before publication; they are not a forecast of search ranking or audience response.",
        ],
        bullets: [
          "Review core story metadata and visible editorial details",
          "Use desktop and mobile search and social previews as a quick presentation check",
          "Inspect canonical settings and generated structured data before a page goes live",
        ],
      },
      {
        heading: "Make the handoff easier to repeat",
        paragraphs: [
          "The value of an editorial workflow is consistency. A team can decide who checks the byline, who confirms the featured image and who reviews the final public URL, then apply those responsibilities story after story. PublishRank brings those checks into the same WordPress environment as the newsroom workflow.",
          "A preview is only a preview. Editors should still verify the published page, check that caches have cleared and confirm that the visible story matches the metadata and schema sent to search and social platforms.",
        ],
      },
    ],
  },
  {
    slug: "publishrank-schema-aggregator-explained",
    title: "One place to inspect the graph: the PublishRank Schema Aggregator",
    dek: "How a machine-readable schema endpoint can help site owners audit the structured data their WordPress templates produce.",
    category: "Product features",
    published: "2026-11-02",
    updated: "2026-11-02",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-developer.jpg",
    imageWidth: 1500,
    imageHeight: 998,
    imageAlt: "Open laptop displaying a code editor on a bright desk",
    readTime: "4 min read",
    keywords: "PublishRank Schema Aggregator, WordPress structured data endpoint, schema audit",
    schemaType: "Article",
    sections: [
      {
        heading: "Treat structured data as something to inspect",
        paragraphs: [
          "Structured data connects a publication, its authors, articles and other page entities in a machine-readable format. PublishRank's Schema Aggregator endpoint is intended to make the generated graph easier for site owners to review across their WordPress templates.",
          "The endpoint is an inspection aid, not a shortcut to a rich result. Search platforms decide how to use structured data, and a syntactically valid graph does not establish that its claims are accurate or that a page qualifies for a particular display.",
        ],
      },
      {
        heading: "Check relationships as well as syntax",
        paragraphs: [
          "During a review, confirm that the site and publisher identities point to the intended organization, author information is genuine, and each article uses a type that matches what readers can see. Check images, dates, canonical URLs and breadcrumbs after template or plugin changes.",
          "The Schema Aggregator can give technical teams one useful place to examine output, while editorial owners remain responsible for the facts and relationships described by the markup.",
        ],
      },
      {
        heading: "Add it to a safe release check",
        paragraphs: [
          "Test the endpoint on staging first, compare it with representative public pages and investigate duplicate output from a theme or another SEO plugin. Record the expected graph before a release so regressions are easier to spot.",
          "After a change, validate the rendered page as well as the endpoint. The page visitors receive remains the source of truth; an aggregation view cannot correct inaccurate editorial information on its own.",
        ],
        bullets: [
          "Choose representative article and archive templates",
          "Check entity names, dates, URLs and image references",
          "Resolve duplicate providers before assigning one source of truth",
        ],
      },
    ],
  },
  {
    slug: "publishrank-sitemaps-and-archive-tools",
    title: "After publish: sitemap and archive tools for publisher maintenance",
    dek: "A practical tour of PublishRank's sitemap checks, redirect workflow and archive-maintenance tools for WordPress publishers.",
    category: "Product features",
    published: "2026-11-02",
    updated: "2026-11-02",
    author: "PublishRank Editorial Desk",
    image: "/media/publishrank-writing.jpg",
    imageWidth: 1500,
    imageHeight: 1126,
    imageAlt: "A pen poised over a notebook page on a desk",
    readTime: "5 min read",
    keywords: "PublishRank sitemaps, redirect maintenance, publisher archive health",
    schemaType: "Article",
    sections: [
      {
        heading: "Review what a sitemap actually exposes",
        paragraphs: [
          "PublishRank provides XML sitemap output, including news, image and video sitemap options where configured. Sitemap Health is intended to help owners review XML structure, duplicate URLs, child references and content eligibility before submitting an address to search platforms.",
          "A sitemap is a discovery hint, not an indexing command. Decide which content belongs in each output, confirm publication details for recent news and keep private or excluded material out of public sitemaps.",
        ],
      },
      {
        heading: "Keep useful paths working after publication",
        paragraphs: [
          "Redirect management helps site owners send visitors from a changed or retired URL to a genuinely equivalent destination. An optional 404 Monitor can help identify missing-page issues; review each case before adding a redirect instead of forwarding every missing URL to the homepage.",
          "Internal-link tools and bulk metadata editing support routine archive work. Use them to find opportunities and manage repeatable updates, then review the affected pages to preserve context and accuracy.",
        ],
      },
      {
        heading: "Preserve originals and verify the final output",
        paragraphs: [
          "PublishRank's documented image optimization can create smaller attachment files while retaining originals. Optional social-image watermarking is a separate control and depends on the image-processing support available on the WordPress host.",
          "After a release, open representative article, category and sitemap URLs in a fresh session. Check the final HTML, redirects and XML output rather than relying only on settings or a dashboard status.",
        ],
        bullets: [
          "Audit sitemap XML, duplicate URLs and child references",
          "Review missing pages before creating redirects",
          "Recheck representative pages after template or content changes",
        ],
      },
    ],
  },
];

export const newsroomArticles = [...newsArticles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function formatEditorialDate(value: string, style: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en-US", {
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export const newsBySlug = Object.fromEntries(
  newsArticles.map((article) => [article.slug, article]),
) as Record<string, NewsArticle>;

export function editorialArticleSchema(article: NewsArticle) {
  const url = absoluteUrl(`/news/${article.slug}`);
  return {
    "@type": article.schemaType ?? "NewsArticle",
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
    image: [
      {
        "@type": "ImageObject",
        url: absoluteUrl(article.image),
        width: article.imageWidth,
        height: article.imageHeight,
        caption: article.imageAlt,
      },
      absoluteUrl(OG_IMAGE_PATH),
    ],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    keywords: article.keywords,
    inLanguage: "en-US",
  };
}
