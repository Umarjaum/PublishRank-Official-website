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
      { kind: "feature", text: "RSS Feeds screen with attribution lines, a news feed and validation." },
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
