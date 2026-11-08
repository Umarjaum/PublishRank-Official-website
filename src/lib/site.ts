// Single source of truth for site-wide constants.
export const SITE_URL = "https://publishrankseo.vercel.app";
export const SITE_NAME = "PublishRank";
export const SITE_TAGLINE = "Enterprise SEO for Publishers";
export const SITE_DESCRIPTION =
  "Free, open-source WordPress SEO for news publishers, editorial teams and independent creators: sitemaps, schema, article workflows and technical controls.";
export const CURRENT_RELEASE = "2.18.1";
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
// The latest alias resolves to the newest published release asset named PublishRank.zip.
export const DOWNLOAD_URL =
  "https://github.com/Umarjaum/PublishRank/releases/latest/download/PublishRank.zip";
export const OG_IMAGE_PATH = "/brand/publishrank-og-share-card.jpg";
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_ALT = "PublishRank — Built for Newsrooms. Ranked by Google.";
export const LOGO_GIF = "/brand/publishrank-logo-animated.gif";
export const LOGO_MARK = "/brand/publishrank-logo-mark.png";
export const REVIEW_COUNT_LABEL = "40,000+";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}
