// Single source of truth for PublishRank releases. The website (What's New page, download page,
// homepage badge) and the public JSON feed read by the WordPress plugin are built from this file,
// so a release is written once. Wording follows the plugin's own changelog; dates are only set
// when the release date is known.
export type ChangeKind = "feature" | "improvement" | "fix" | "security" | "compatibility";

export type ReleaseChange = { kind: ChangeKind; text: string };

export type Release = {
  version: string;
  /** ISO date (YYYY-MM-DD) or null when the release date was not recorded. */
  date: string | null;
  title: string;
  summary: string;
  minimumWp: string;
  minimumPhp: string;
  testedUpTo: string;
  changes: ReleaseChange[];
};

export const CHANGE_KIND_LABELS: Record<ChangeKind, string> = {
  feature: "New",
  improvement: "Improved",
  fix: "Fixed",
  security: "Security",
  compatibility: "Compatibility",
};

export const releases: Release[] = [
  {
    version: "2.26.0",
    date: "2026-11-19",
    title: "PublishRank SEO 2.26.0 — Schema Studio and deeper local SEO",
    summary:
      "Build reusable structured-data templates with Schema Studio, validate schema against the current vocabulary, and manage up to 50 Local SEO locations. The release also improves previews, onboarding, accessibility and language handling.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "7.1",
    changes: [
      {
        kind: "feature",
        text: "Schema Studio provides templates for 246 catalogued Schema.org types, with conditions, dynamic WordPress and business fields, reusable assignments, import/export, revision restore and a live JSON-LD preview. Built-in templates are off by default, so existing output does not change unless enabled.",
      },
      {
        kind: "feature",
        text: "Schema diagnostics check pages or pasted JSON-LD for syntax, unknown types and properties, value types, URLs, dates, nesting, duplicates and disconnected references. Schema.org validity is reported separately from Google's rich-result requirements.",
      },
      {
        kind: "feature",
        text: "Local SEO supports up to 50 locations, each with its own page, business details, opening hours and LocalBusiness entity connected to the parent organization.",
      },
      {
        kind: "improvement",
        text: "Live previews now show WooCommerce Product and ProductGroup output, the real breadcrumb parent pages, and desktop/mobile sign-in layouts. The dashboard trend line represents publishing activity from the previous 14 days.",
      },
      {
        kind: "fix",
        text: "Unicode-aware word counts and article-language detection improve structured data and Markdown/AI output for Arabic, Urdu and other non-Latin content. Heading checks now detect skipped, empty and repeated headings.",
      },
      {
        kind: "fix",
        text: "The first-install setup wizard now saves a private sign-in address and explains the 10-minute confirmation window. Fixes also cover sitemap exclusions, WooCommerce structured data, schema diagnostics and PHP 8.4 notices.",
      },
      {
        kind: "compatibility",
        text: "The supplied 2.26.0 reports document local tests on WordPress 7.1.5, PHP 8.4 and SQLite; the Local SEO registry report records 134 of 134 business types passing. Multisite, MySQL/MariaDB and other PHP versions are listed as not tested.",
      },
    ],
  },
  {
    version: "2.25.1",
    date: "2026-11-17",
    title: "PublishRank SEO 2.25.1 — safer site operations and publishing tools",
    summary:
      "Rebuilt Traffic Guard, 249-country controls, FAQ collections, Source Directory, SEO Inspector and validated custom schema. Production-ready and free to use; all features have been tested on real websites by PublishRank Community with no errors reported.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "7.1",
    changes: [
      {
        kind: "feature",
        text: "Traffic Guard rebuilt with Monitor and Enforce modes, four protection levels, a 10-condition AND/OR rule builder, test mode, temporary blocks, rate limiting, bot classification, DNS-verified search-crawler exemptions, searchable event logs, CSV export and a step-by-step rule tester.",
      },
      {
        kind: "feature",
        text: "Country controls use a searchable 249-entry ISO 3166-1 database in Traffic Guard and Access Shield. Country is accepted only from trusted server or configured proxy sources; unknown locations are allowed by default.",
      },
      {
        kind: "feature",
        text: "The PublishRank FAQ block supports accordion and list layouts, templates, reorder and bulk-edit tools, search and expand controls, accessible previews and reusable categorized collections with JSON import/export and shortcodes.",
      },
      {
        kind: "feature",
        text: "Source Directory lets newsroom teams maintain their own sources and editorial labels, then see matches, warnings and suggestions in the block editor. Labels are user-defined; the plugin does not certify sources or change article text automatically.",
      },
      {
        kind: "feature",
        text: "SEO Inspector previews search and social cards and checks status, canonicals, robots, headings, language and JSON-LD entities. Its external-page redirect checks stay on the same website and refuse cross-host redirects.",
      },
      {
        kind: "feature",
        text: "Custom JSON-LD blocks accept one validated schema.org object, with checks for valid types, HTTPS URLs, markup, duplicate site-wide types and disallowed graph structures.",
      },
      {
        kind: "feature",
        text: "Access Shield adds a sign-in page designer with a live preview and contrast warning. The private sign-in address is no longer exposed in public page-preloading rules; existing sign-in settings are retained.",
      },
      {
        kind: "improvement",
        text: "Update notices, News & What's New indicators and question-mark help icons are refined. Announcements for a version already installed are hidden and no longer counted as unread.",
      },
      {
        kind: "security",
        text: "This release fixes a private sign-in URL leak, prevents SEO Inspector from following redirects to another host, removes deleted script/style contents from FAQ answers and corrects the Traffic Guard probe pattern.",
      },
      {
        kind: "fix",
        text: "Access Shield no longer rejects ordinary searches containing the words union select; genuine injection payload checks remain. Firewall refusals now appear in Traffic Guard events with a reference.",
      },
      {
        kind: "compatibility",
        text: "The delivery verification report records 409 checks with zero failures on WordPress 7.1.4 and PHP 8.3.36 using SQLite. All features have also been tested on real websites by PublishRank Community, with no errors reported. The report documents its specific environment and combinations it did not cover.",
      },
    ],
  },
  {
    version: "2.25.0",
    date: "2026-11-16",
    title: "PublishRank 2.25.0 — enterprise hardening",
    summary:
      "Stronger theme masking, verifiable Access Shield protection, a Publishing Desk for newsrooms, deeper SEO checks, per-feature access rules and an in-plugin News & What's New screen.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "7.1",
    changes: [
      {
        kind: "feature",
        text: "Theme masking at the Maximum level rewrites theme identifiers in page HTML and in the served CSS and JavaScript, removes theme credits and source-map references, and replaces version strings with content hashes.",
      },
      {
        kind: "feature",
        text: "Fingerprint scanner rates each page Protected, Partial or Review and lists any remaining theme traces.",
      },
      {
        kind: "feature",
        text: "Feature access rules: administrators choose which roles and individual users can use each PublishRank feature.",
      },
      {
        kind: "feature",
        text: "The PublishRank logo now syncs with the WordPress Site Logo and Site Icon, alongside the site title, tagline and description.",
      },
      {
        kind: "feature",
        text: "Access Shield live verification probes the site the way an anonymous visitor would and produces a signed, tamper-evident report (admin screen, REST and WP-CLI).",
      },
      {
        kind: "feature",
        text: "Publishing Desk: live duplicate-headline warning in the block and Classic editors, missed-schedule detection with automatic publishing, a freshness column, Google News diagnostics and publishing velocity.",
      },
      {
        kind: "feature",
        text: "Fifteen advanced SEO and trust checks join the single article score, including snippet readiness, outdated years, weak alt text, unsafe affiliate links, attribution and mixed content.",
      },
      {
        kind: "feature",
        text: "News & What's New screen inside PublishRank shows official announcements and release notes from this website, with read and dismissed states.",
      },
      {
        kind: "improvement",
        text: "Sitemap shards rebuild individually: publishing or editing a post rebuilds only the 50,000-URL file that contains it. Checked on a 200,000-post test site.",
      },
      {
        kind: "improvement",
        text: "Small PublishRank settings load in one query per request on sites without a persistent object cache, cutting the plugin's own database queries on a test page from about 96 to between 2 and 6.",
      },
      {
        kind: "improvement",
        text: "Large configuration-history snapshots are read only on admin screens, never on public pages.",
      },
      {
        kind: "security",
        text: "Password policy for privileged roles: minimum length, strength rules and an optional breached-password check that sends only the first five characters of a SHA-1 hash.",
      },
      {
        kind: "security",
        text: "Optional limit on simultaneous sign-ins and automatic sign-out after inactivity for privileged accounts.",
      },
      {
        kind: "security",
        text: "News & What's New accepts only validated JSON from this website over verified HTTPS; nothing about your site is sent and the feed can never change settings or install code.",
      },
      {
        kind: "fix",
        text: "Access Shield self-tests no longer add simulated attacks to the security log or trigger alerts.",
      },
      {
        kind: "compatibility",
        text: "Requires WordPress 6.3 and PHP 7.4 or later; tested up to WordPress 7.1 on PHP 8.3.",
      },
    ],
  },
  {
    version: "2.24.0",
    date: null,
    title: "PublishRank 2.24.0 — commerce and analytics",
    summary:
      "Rebuilt WooCommerce SEO, first-party visitor analytics, Access Shield login analytics and the first Theme SEO & masking release.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "7.1",
    changes: [
      {
        kind: "feature",
        text: "WooCommerce SEO rebuilt with a tabbed screen, richer Google product data, a product tab, templates, store rules, a product audit and a key-protected Merchant Center / Meta feed.",
      },
      {
        kind: "feature",
        text: "Cookie-free first-party visitor analytics with traffic sources, devices, live visitors and Search Console data side by side.",
      },
      {
        kind: "feature",
        text: "Access Shield analytics: login activity, attack countries, targeted usernames and an attack heatmap.",
      },
      {
        kind: "feature",
        text: "Theme SEO & masking removes duplicate SEO tags printed by themes and can hide the theme name from page source.",
      },
      { kind: "fix", text: "The dashboard no longer crashes on a removed 404 log call." },
      {
        kind: "improvement",
        text: "WP Private Login settings move into Access Shield, which now owns the private login address.",
      },
    ],
  },
  {
    version: "2.23.0",
    date: null,
    title: "PublishRank 2.23.0 — security and scale",
    summary:
      "Access Shield, AI search visibility, the Schema Library, 404 Monitor v2, Redirect Engine v2, Newsroom v2 and verified large-site sitemaps.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "6.9",
    changes: [
      {
        kind: "security",
        text: "Access Shield: custom login address, lockouts, CAPTCHA, two-factor sign-in, XML-RPC and REST hardening and a tamper-evident security log.",
      },
      {
        kind: "feature",
        text: "AI search visibility: per-bot crawler control, verified AI-bot log, Markdown delivery and a citation tracker.",
      },
      { kind: "feature", text: "Schema Library with eighteen additional schema types." },
      {
        kind: "improvement",
        text: "404 Monitor v2 and Redirect Engine v2 with indexed storage built for very large sites.",
      },
      {
        kind: "improvement",
        text: "Sitemaps verified on 120,000 posts with exact counts, no duplicates and ETag / 304 support.",
      },
      {
        kind: "feature",
        text: "Granular roles and permissions with a permission matrix, presets and per-user overrides.",
      },
    ],
  },
  {
    version: "2.21.0",
    date: null,
    title: "PublishRank 2.21.0 — editor, commerce and site operations",
    summary:
      "A movable SEO editor window, one consistent score, the RSS Feeds screen, Site Navigation SEO, WooCommerce controls and redirect improvements.",
    minimumWp: "6.3",
    minimumPhp: "7.4",
    testedUpTo: "6.8",
    changes: [
      {
        kind: "feature",
        text: "Movable SEO editor window for the block and Classic editors, with a bottom sheet on phones.",
      },
      {
        kind: "improvement",
        text: "One SEO score shared by the editor, toolbar, post list, score page, Insights and audits.",
      },
      {
        kind: "feature",
        text: "RSS Feeds screen with attribution lines, a news feed and validation.",
      },
      { kind: "feature", text: "Site Navigation SEO for your important pages." },
      { kind: "improvement", text: "404 Monitor screen and redirect import, export and tracing." },
    ],
  },
];

function firstRelease(): Release {
  const first = releases[0];
  if (!first) throw new Error("releases must contain at least one release");
  return first;
}

export const latestRelease = firstRelease();

/** Change texts for one version (empty when the version is not listed). */
export function releaseChangeTexts(version: string): string[] {
  return releases.find((r) => r.version === version)?.changes.map((c) => c.text) ?? [];
}

/** URL-safe anchor for a release on the What's New page, e.g. "v2-25-0". */
export function releaseAnchor(version: string): string {
  return `v${version.replace(/[^0-9a-z]+/gi, "-")}`;
}
