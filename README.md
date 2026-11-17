# PublishRank website

Marketing, documentation and download site for the PublishRank WordPress SEO plugin.
Live URL: https://publishrankseo.vercel.app/

Stack: TanStack Start (React 19, SSR) + Tailwind v4 + shadcn/ui, built with Vite and deployed to Vercel through Nitro.

## Run locally

```bash
bun install
bun run dev        # development server
bun run test       # routing + content tests
bun run build:vercel
```

## Deploy to Vercel

1. Push this folder to a GitHub repository and import it in Vercel (framework preset: Other).
2. `vercel.json` already sets the build command to `NITRO_PRESET=vercel vite build`. The Lovable config defaults Nitro to Cloudflare, so this variable selects the Vercel output.
3. Add the environment variables below, then redeploy.
4. Set the project's production domain to `publishrankseo.vercel.app`.
5. Submit `https://publishrankseo.vercel.app/sitemap.xml` in Google Search Console.

### Contact form environment variables

| Variable             | Purpose                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `RESEND_API_KEY`     | API key from https://resend.com                                   |
| `CONTACT_TO_EMAIL`   | Inbox that receives messages                                      |
| `CONTACT_FROM_EMAIL` | Optional verified sender (defaults to Resend's onboarding sender) |

Until both required variables are set, `/api/contact` answers 503 and the form shows a clear message with a GitHub issues fallback. Nothing is sent and no address is exposed.

## Download button

The website’s current versioned download target is
`https://github.com/Umarjaum/PublishRank/releases/download/v2.20.19/publishrank-2.20.19.zip`.
When publishing a new version, update `DOWNLOAD_URL`, `CURRENT_RELEASE`, and the matching test and
`public/llms.txt` entry together so the visible version label and downloaded package stay aligned.

## Branding assets (`public/`)

| File                                                                                               | Use                                                                                                                                     |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `brand/publishrank-logo-animated.gif`                                                              | Splash loader, route-pending spinner, footer, download/contact/404/error pages                                                          |
| `brand/publishrank-logo-mark.png`                                                                  | Static logo mark                                                                                                                        |
| `brand/publishrank_logo_landscape.jpg`, `brand/publishrank_favicon_square.png`                     | Supplied landscape wordmark and square brand mark, shown in the home brand-card carousel                                                |
| `brand/wordpress_menu_icon_white_*.png`                                                            | Supplied white WordPress menu icon sizes; the 256px version appears in the home brand-card carousel                                     |
| `brand/publishrank-hero-banner.jpg`                                                                | Home brand-card carousel                                                                                                                |
| `brand/publishrank-features-showcase.jpg`                                                          | Home brand-card carousel, Features page                                                                                                 |
| `brand/publishrank-og-share-card.jpg`                                                              | Open Graph / Twitter card image, home carousel                                                                                          |
| `media/screens/*`                                                                                  | Plugin screenshot carousel, including the supplied SEO statistics dashboard; screenshot and logo cards use descriptive alternative text |
| `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `site.webmanifest` | Favicon set generated from the animated logo                                                                                            |

Photos in the "Made for the Way Newsrooms Work" gallery are hotlinked from Unsplash (`src/lib/showcase-content.ts`) with a local fallback image if one fails to load.

## Actual interface screenshots

The `public/media/screens/` gallery contains real PublishRank WordPress-admin captures from a local test site with demo content. The same captures are used in the GitHub plugin README and WordPress.org screenshots:

- [Dashboard](public/media/screens/publishrank-2.25.0/01-publishrank-dashboard.webp)
- [Features](public/media/screens/publishrank-2.25.0/07-publishrank-features.webp)
- [Schema settings](public/media/screens/publishrank-2.25.0/12-publishrank-schema.webp)
- [SEO Score](public/media/screens/publishrank-2.25.0/10-publishrank-seo-score.webp)
- [Newsroom](public/media/screens/publishrank-2.25.0/19-publishrank-newsroom.webp)

The captures are presented as interface evidence and are not generated product mockups.

## Content to review before launch

- Publish no testimonial, star rating, or review count unless the review is real, permissioned, and the displayed total can be independently verified.
- Legal pages (`privacy`, `terms`, `cookies`, `disclaimer`, `security`, `accessibility`) are general-purpose and are not legal advice. Have them reviewed for your jurisdiction and add an operator name and address if required.
- Unsplash photo IDs should be confirmed once in a browser.

## SEO

Every page has a distinct title and description, absolute canonical URL, Open Graph and Twitter tags with the 1200×640 share card, and JSON-LD (WebSite, Organization, WebPage, BreadcrumbList; SoftwareApplication and FAQPage on the relevant pages). `/sitemap.xml`, `/news-sitemap.xml`, `/robots.txt` and `/llms.txt` remain available to crawlers and direct requests, but are intentionally not visible in the site footer or page navigation. The shared header includes keyboard-operable desktop mega menus and mobile disclosure menus; content pages use breadcrumb navigation, section headings and a responsive on-page contents index.

## Legal routes, News SEO and motion

The Cookies, Disclaimer, Security and Accessibility pages use the shared `PublisherPage` renderer. Add every new `PublisherPageKey` to both the content catalog and `publisherPageProfiles`; the typed profile record prevents missing renderer data from causing route crashes.

The Newsroom uses a newspaper-style masthead, lead story, latest-stories column and desk sections. News articles emit article-specific Open Graph/X metadata, a large representative hero image, publication and modification dates, byline and `NewsArticle` JSON-LD. Evergreen PublishRank feature explainers use generic `Article` JSON-LD and are deliberately excluded from the Google News sitemap. `/news-sitemap.xml` includes only eligible NewsArticle entries published within the previous 48 hours; an empty valid sitemap is expected when no article is recent. `robots.txt` advertises both sitemap endpoints. These technical signals support crawl discovery and eligibility but cannot guarantee indexing, Google News inclusion or Discover placement.

The website currently displays no Google AdSense or other advertising network. Privacy, cookies, terms and disclaimer pages state the current no-ads status and require the site operator to update disclosures, consent controls and opt-out choices before introducing personalized advertising. Do not add `ads.txt` until a real Google publisher ID is available; never ship a placeholder publisher ID.

The shared footer exposes a setup/download call to action, newsroom and support destinations, legal pages and both sitemap links. `MotionEnhancer` uses GSAP and ScrollTrigger for small, once-only reveals on marked elements. Content remains visible in initial HTML, and the effect is disabled when the visitor requests reduced motion.
