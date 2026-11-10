// Single source of truth for site-wide constants.
export const SITE_URL = "https://publishrankseo.vercel.app";
export const SITE_NAME = "PublishRank";
export const UMARJAUM_URL = "https://umarjaum.vercel.app";
export const UMARJAUM_EMAIL = "UmarJaum@gmail.com";
export const SITE_TAGLINE = "Beyond Basic SEO for Publishers";
export const SITE_DESCRIPTION =
  "Free, open-source WordPress publishing tools beyond basic SEO: Mastodon publishing, a Schema Aggregator endpoint, news sitemaps and optional llms.txt discovery. Broader AI features are rolling out soon.";
export const CURRENT_RELEASE = "2.19.2";
export const REPO_URL = "https://github.com/Umarjaum/PublishRank";
export const RELEASES_URL = `${REPO_URL}/releases`;
export const ISSUES_URL = `${REPO_URL}/issues`;
export const PUBLISHRANK_WORDPRESS_PLUGIN_URL = "https://wordpress.org/plugins/publishrank/";
export const PUBLISHRANK_WORDPRESS_SUPPORT_URL =
  "https://wordpress.org/support/plugin/publishrank/";
export const WORDPRESS_RELEASE_TAGS = [
  "WordPress.org plugin",
  "WordPress SEO",
  "Publisher SEO",
  "News SEO",
  "Open-source WordPress plugin",
  "Editorial workflow",
] as const;
// Pin the official download to the verified v2.19.2 GitHub release asset.
export const DOWNLOAD_URL =
  "https://github.com/Umarjaum/PublishRank/releases/download/v2.19.2/PublishRank-v2.19.2.zip";
export const OG_IMAGE_PATH = "/brand/publishrank-og-share-card.jpg";
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_ALT = "PublishRank — SEO tools for publishers and newsrooms.";
export const LOGO_GIF = "/brand/publishrank-logo-animated.gif";
export const LOGO_MARK = "/brand/publishrank-logo-mark.png";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

export function umarjaumPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${UMARJAUM_URL}/#person`,
    name: "Muhammad Umar Jabbar",
    alternateName: "UmarJaum",
    url: UMARJAUM_URL,
    email: UMARJAUM_EMAIL,
    jobTitle: "CEO and Developer of PublishRank",
    sameAs: [
      UMARJAUM_URL,
      "https://github.com/Umarjaum",
      "https://x.com/UmarJaum",
      "https://www.facebook.com/umarjaumofficial",
      "https://mastodon.social/@UmarJaum",
    ],
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}

export function publishRankOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "PublishRank",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: { "@id": `${UMARJAUM_URL}/#person` },
    email: UMARJAUM_EMAIL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/android-chrome-512x512.png`, width: 512, height: 512 },
    image: OG_IMAGE,
    contactPoint: [{ "@type": "ContactPoint", contactType: "technical support", email: UMARJAUM_EMAIL, availableLanguage: ["English"] }],
    sameAs: [REPO_URL, PUBLISHRANK_WORDPRESS_PLUGIN_URL, UMARJAUM_URL],
  };
}
