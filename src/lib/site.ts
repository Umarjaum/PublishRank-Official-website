// Single source of truth for site-wide constants.
import { latestRelease } from "@/lib/releases";

export const SITE_URL = "https://publishrankseo.vercel.app";
export const SITE_NAME = "PublishRank SEO for WordPress";
export const UMARJAUM_URL = "https://umarjaum.vercel.app";
export const UMARJAUM_EMAIL = "UmarJaum@gmail.com";
export const SITE_TAGLINE = "Open-Source WordPress SEO for Every Website";
export const SITE_DESCRIPTION =
  "PublishRank is a free, open-source WordPress SEO plugin for businesses, stores, service providers, creators and publishers. Release-specific test results and limitations are documented in the report for each version. Hosting, theme and plugin combinations can still affect compatibility.";
export const HOME_SEO_DESCRIPTION =
  "PublishRank SEO 2.26.2 is a free, open-source WordPress SEO plugin. Review the included validation report for the test environment, results and limits.";
/** Latest plugin version, read from the release list (src/lib/releases.ts). */
export const CURRENT_RELEASE = latestRelease.version;
export const REPO_URL = "https://github.com/Umarjaum/PublishRank";
export const RELEASES_URL = `${REPO_URL}/releases`;
export const ISSUES_URL = `${REPO_URL}/issues`;
export const PUBLISHRANK_WORDPRESS_PLUGIN_URL = "https://wordpress.org/plugins/publishrank/";
export const PUBLISHRANK_WORDPRESS_SUPPORT_URL =
  "https://wordpress.org/support/plugin/publishrank/";
export const WORDPRESS_RELEASE_TAGS = [
  "WordPress.org plugin",
  "WordPress SEO",
  "Business SEO",
  "Local SEO",
  "WooCommerce SEO",
  "Site Navigation SEO",
  "404 Monitoring",
  "RSS Feed controls",
  "News SEO",
  "Open-source WordPress plugin",
  "Editorial workflow",
  "Mastodon verification",
  "Traffic Guard",
  "Private sign-in protection",
] as const;
// The exact versioned release package, served by this website (public/downloads).
export const DOWNLOAD_FILE = `PublishRank-${CURRENT_RELEASE}.zip`;
export const DOWNLOAD_URL = `/downloads/${DOWNLOAD_FILE}`;
export const OG_IMAGE_PATH = "/brand/publishrank-og-share-card.jpg";
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_ALT =
  "PublishRank SEO for WordPress: technical SEO, Local SEO, WooCommerce SEO, security and editorial tools for websites of every kind.";
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
    jobTitle: "Founder and Developer of PublishRank SEO",
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
    alternateName: "PublishRank SEO for WordPress",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: { "@id": `${UMARJAUM_URL}/#person` },
    email: UMARJAUM_EMAIL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        email: UMARJAUM_EMAIL,
        availableLanguage: ["English"],
      },
    ],
    sameAs: [REPO_URL, PUBLISHRANK_WORDPRESS_PLUGIN_URL, UMARJAUM_URL],
  };
}
