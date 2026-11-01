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

All download buttons link directly to
`https://github.com/Umarjaum/PublishRank/releases/latest/download/PublishRank.zip`.
Publish each release with an asset named exactly `PublishRank.zip` so the link keeps working.
The requested `releases/PublishRank_latest/PublishRank_latest.zip` URL currently returns 404;
GitHub’s working direct asset route uses `/releases/download/<tag>/<asset>` and the `latest` alias.

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

## Content to review before launch

- `src/lib/showcase-content.ts` — the testimonials are drafts with role-based attributions. Replace them with real, verified reviews, and only add the review count and rating to structured data once you can back them with exact figures.
- Legal pages (`privacy`, `terms`, `cookies`, `disclaimer`, `security`, `accessibility`) are general-purpose and are not legal advice. Have them reviewed for your jurisdiction and add an operator name and address if required.
- Unsplash photo IDs should be confirmed once in a browser.

## SEO

Every page has a distinct title and description, absolute canonical URL, Open Graph and Twitter tags with the 1200×630 share card, and JSON-LD (WebSite, Organization, WebPage, BreadcrumbList; SoftwareApplication and FAQPage on the relevant pages). `/sitemap.xml`, `/robots.txt` and `/llms.txt` are included and linked from the responsive footer. The shared header includes keyboard-operable desktop mega menus and mobile disclosure menus; content pages use breadcrumb navigation, section headings and a responsive on-page contents index.
