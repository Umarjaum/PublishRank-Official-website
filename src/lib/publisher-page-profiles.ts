import type { PublisherPageKey } from "@/lib/publisher-content";

export const publisherPageProfiles: Record<
  PublisherPageKey,
  { audience: string; path: string; outcome: string }
> = {
  features: {
    audience:
      "Businesses, local service providers, online shops, publishers and every WordPress site owner",
    path: "Start with your business profile or site SEO foundation, then explore schemas, sitemaps and specialist workflows.",
    outcome: "A detailed map of sitewide SEO, 134 Local SEO business options and publisher tools.",
  },
  documentation: {
    audience: "Editors, administrators and technical implementers",
    path: "Prepare the site, configure the foundation, validate representative URLs and maintain it.",
    outcome: "A repeatable setup and release process rather than a collection of settings.",
  },
  comparisons: {
    audience: "Teams evaluating or migrating WordPress SEO plugins",
    path: "Define requirements, test the same stories, compare output and plan migration conservatively.",
    outcome: "A fair evaluation based on your real workflow, theme and archive.",
  },
  resources: {
    audience: "Editors, independent publishers and content operations teams",
    path: "Improve story quality, discovery signals, authorship, images and archive habits together.",
    outcome: "Practical publishing decisions that compound without inflated promises.",
  },
  support: {
    audience: "Site owners troubleshooting a live or staging WordPress installation",
    path: "Reproduce one issue, inspect the rendered output, remove conflicts and document the result.",
    outcome: "A focused diagnostic report and a safer path to resolution.",
  },
  about: {
    audience:
      "Businesses, publishers and site owners deciding whether the project fits their needs",
    path: "Understand the project, its capabilities, its limitations and its open-source context.",
    outcome: "An informed starting point without invented company or performance claims.",
  },
  privacy: {
    audience: "Visitors and site operators reviewing website data handling",
    path: "Separate website behavior from plugin behavior, then review contact and hosting details.",
    outcome: "A clearer baseline for an operator-approved privacy policy.",
  },
  terms: {
    audience: "Visitors reviewing scope, downloads and product limitations",
    path: "Read the website scope, plugin licensing boundary, acceptable use and disclaimers.",
    outcome: "Plain-language context while binding operator terms are maintained separately.",
  },
  cookies: {
    audience: "Visitors reviewing cookies and browser storage",
    path: "See what this website stores, what third-party resources may receive, and how to control site data.",
    outcome: "A clear summary of this website's storage behavior and its limitations.",
  },
  disclaimer: {
    audience: "Visitors evaluating product information and SEO guidance",
    path: "Review performance limitations, comparisons, testimonials and third-party references.",
    outcome: "Realistic expectations without guarantees of rankings or search placement.",
  },
  security: {
    audience: "Publishers and researchers reporting a potential vulnerability",
    path: "Find responsible reporting guidance and practical hardening recommendations.",
    outcome: "A safer, focused way to report and investigate security concerns.",
  },
  accessibility: {
    audience: "Visitors using assistive technology or alternative input methods",
    path: "Review keyboard access, reduced-motion support and ways to report barriers.",
    outcome: "An accessible path to key content and a clear feedback route.",
  },
};
