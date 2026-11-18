import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, ExternalLink, Github, ShieldAlert } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageSeo } from "@/lib/page-seo";
import {
  SITE_URL,
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  PUBLISHRANK_WORDPRESS_SUPPORT_URL,
  REPO_URL,
  RELEASES_URL,
  CURRENT_RELEASE,
  WORDPRESS_RELEASE_TAGS,
} from "@/lib/site";

const launchFeatures: Array<{ title: string; description: string; badge?: string }> = [
  {
    title: "Traffic Guard rebuilt",
    description:
      "Use Monitor or Enforce mode, protection levels, testable multi-condition rules, temporary blocks, rate limits, DNS-verified crawler exemptions, event search and a step-by-step rule tester.",
    badge: "2.25.1",
  },
  {
    title: "249-country controls",
    description:
      "Search country names or codes in Traffic Guard and Access Shield. Country values come from trusted server-side sources; unknown locations are allowed by default.",
    badge: "2.25.1",
  },
  {
    title: "FAQ block and reusable collections",
    description:
      "Create accessible accordion or list FAQs, manage reusable collections, and emit structured data for visible questions without a rich-result promise.",
    badge: "2.25.1",
  },
  {
    title: "SEO Inspector and custom schema",
    description:
      "Preview search and social cards, inspect page signals and validate JSON-LD. Redirect checks refuse cross-host redirects; custom schema is validated before use.",
    badge: "2.25.1",
  },
  {
    title: "Source Directory for editorial teams",
    description:
      "Maintain sources and your own editorial classifications, then see matching links and caution warnings while editing. PublishRank does not certify a source.",
    badge: "2.25.1",
  },
  {
    title: "Access Shield sign-in designer",
    description:
      "Customize the protected sign-in page with a live preview and contrast warning. The release also fixes public leakage of the private sign-in address.",
    badge: "2.25.1",
  },
  {
    title: "Notifications and help",
    description:
      "See update availability, unread announcements and release news, with per-version dismissal and question-mark help icons across PublishRank screens.",
    badge: "2.25.1",
  },
  {
    title: "WooCommerce SEO, analytics and theme cleanup",
    description:
      "Rich Google product data, a product audit and a protected Merchant feed; cookie-free visitor analytics; and removal of duplicate SEO tags printed by themes.",
    badge: "2.24.0",
  },
  {
    title: "Local SEO — 134 selectable business options",
    description:
      "Choose from 134 business options across 14 niches, with type-specific fields and LocalBusiness schema mappings. The options are not 134 independent Schema.org classes.",
  },
  {
    title: "SEO metadata and connected structured data",
    description:
      "Manage titles, descriptions, canonical URLs, robots directives, Open Graph/X metadata, sitemaps and connected JSON-LD for supported content types.",
  },
  {
    title: "Redirects and site maintenance",
    description:
      "Use redirect management, the 404 Monitor and technical SEO checks to review broken paths and maintain site navigation.",
  },
  {
    title: "Publishing and newsroom tools",
    description:
      "Optional editorial workflows support publishing checks, story coordination and newsroom operations alongside general WordPress SEO.",
  },
];

export const Route = createFileRoute("/wordpress-org-release")({
  head: () =>
    pageSeo(
      "/wordpress-org-release",
      `PublishRank SEO ${CURRENT_RELEASE} — WordPress SEO Plugin`,
      `PublishRank SEO ${CURRENT_RELEASE} is a production-ready, free WordPress SEO plugin for businesses, stores, creators, publishers and websites of every kind. All features have been tested on real websites by PublishRank Community, with no errors reported.`,
      {
        rawTitle: true,
        keywords: WORDPRESS_RELEASE_TAGS.join(", "),
        ogType: "article",
        articleSection: "PublishRank release",
        imageAlt:
          "PublishRank, the free WordPress SEO plugin listed in the WordPress.org directory",
        extraSchema: [
          {
            "@type": "SoftwareApplication",
            "@id": `${SITE_URL}/wordpress-org-release#software`,
            name: "PublishRank SEO for WordPress",
            alternateName: "PublishRank SEO",
            url: `${SITE_URL}/wordpress-org-release`,
            description:
              "A production-ready, free and open-source WordPress SEO plugin for businesses, stores, creators, publishers and websites of every kind. All features have been tested on real websites by PublishRank Community, with no errors reported.",
            applicationCategory: "SEO",
            operatingSystem: "WordPress",
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              url: PUBLISHRANK_WORDPRESS_PLUGIN_URL,
            },
            featureList: launchFeatures.map((feature) => feature.title),
            sameAs: [PUBLISHRANK_WORDPRESS_PLUGIN_URL, REPO_URL],
          },
        ],
      },
    ),
  component: WordPressOrgRelease,
});

function WordPressOrgRelease() {
  return (
    <PageFrame>
      <article>
        <header className="border-b bg-brand-soft">
          <div className="site-width py-12 md:py-16">
            <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
              Official WordPress.org release · v{CURRENT_RELEASE}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
              Install PublishRank from WordPress.org
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              PublishRank SEO for WordPress is a production-ready, free and open-source plugin for
              businesses, stores, service providers, creators, publishers and sites of every kind.
              It combines technical SEO, Local SEO, WooCommerce SEO and security with optional
              newsroom workflows. Find the official listing and install it directly from your
              WordPress dashboard. All features have been tested on real websites by the PublishRank
              Community, with no errors reported.
            </p>
            <p className="mt-3 max-w-3xl text-sm font-semibold text-brand">
              New in {CURRENT_RELEASE}: rebuilt Traffic Guard, 249-country controls, an FAQ block
              and reusable collections, SEO Inspector, custom schema validation, a Source Directory
              and Access Shield sign-in designer. PublishRank is free to use and production-ready;
              the delivery report separately records 409 passing checks in its documented test
              environment.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <a
                  href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the WordPress.org listing <ExternalLink aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/download">
                  <Download aria-hidden="true" />
                  Installation options
                </Link>
              </Button>
            </div>
            <ul aria-label="PublishRank topics" className="mt-7 flex flex-wrap gap-2">
              {WORDPRESS_RELEASE_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-brand/20 bg-background px-3 py-1 text-xs font-semibold text-brand"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="site-width grid gap-12 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div>
            <section aria-labelledby="release-features-title">
              <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
                Built for business, website and publishing workflows
              </p>
              <h2 id="release-features-title" className="mt-2 text-3xl font-extrabold">
                What you can explore in PublishRank
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                The plugin brings technical SEO and editorial tools together in WordPress. Visit the
                official listing for current feature details, compatibility information and release
                notes.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {launchFeatures.map((feature) => (
                  <article key={feature.title} className="rounded-lg border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                      <div>
                        <h3 className="font-bold">{feature.title}</h3>
                        {feature.badge && (
                          <span className="mt-2 inline-flex rounded-full bg-brand px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary-foreground">
                            {feature.badge}
                          </span>
                        )}
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="directory-listing-title" className="mt-12">
              <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
                The official directory page
              </p>
              <h2 id="directory-listing-title" className="mt-2 text-2xl font-extrabold">
                A direct place to review and install PublishRank
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                The WordPress.org listing brings the plugin description, installation instructions,
                support links and development information together. Use that live page to confirm
                the latest release and compatibility details before installing, because plugin
                requirements can change over time.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <article className="rounded-lg border bg-card p-5">
                  <h3 className="font-bold">Free and open source</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    PublishRank is released under the GPLv2-or-later license. Review the listing and
                    source repository to understand the project before adding it to a site.
                  </p>
                </article>
                <article className="rounded-lg border bg-card p-5">
                  <h3 className="font-bold">Current details stay on WordPress.org</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Version, WordPress and PHP compatibility, release notes, reviews and support
                    information can change. Check the official plugin page for the latest details.
                  </p>
                </article>
                <article className="rounded-lg border bg-card p-5">
                  <h3 className="font-bold">Built for editorial operations</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Alongside metadata, schema and XML sitemaps, the listing describes tools for
                    editorial checks, newsroom coordination, redirects and site maintenance.
                  </p>
                </article>
                <article className="rounded-lg border bg-card p-5">
                  <h3 className="font-bold">A listing is not a ranking promise</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Directory availability makes the plugin discoverable and installable through
                    WordPress. It does not guarantee rankings, crawling, indexing, traffic or search
                    feature inclusion.
                  </p>
                </article>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                <a
                  href={PUBLISHRANK_WORDPRESS_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  WordPress.org support forum
                </a>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Browse the open-source project
                </a>
              </div>
            </section>

            <section aria-labelledby="install-title" className="mt-12">
              <h2 id="install-title" className="text-2xl font-extrabold">
                How to install from WordPress.org
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-muted-foreground">
                <li>In your WordPress dashboard, open Plugins → Add New.</li>
                <li>Search for PublishRank and open its official plugin listing.</li>
                <li>Select Install Now, then activate PublishRank from the Plugins screen.</li>
                <li>
                  Complete onboarding and review metadata, schema, sitemap and robots settings.
                </li>
              </ol>
              <a
                href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-bold text-brand hover:underline"
              >
                Read the official installation details{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </section>

            <section className="mt-10 rounded-lg border border-brand/20 bg-brand-soft p-6">
              <div className="flex items-start gap-3">
                <ShieldAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h2 className="text-lg font-extrabold">Before switching SEO plugins</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Back up your site, test on staging when possible, and review which plugin owns
                    titles, schema and sitemaps before changing your setup. PublishRank does not
                    guarantee rankings, crawling, indexing, traffic or inclusion in Google News.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-extrabold">Official release links</h2>
              <div className="mt-5 grid gap-4">
                <a
                  href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" /> WordPress.org plugin page
                </a>
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
                >
                  <Download aria-hidden="true" className="h-4 w-4" /> GitHub releases
                </a>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
                >
                  <Github aria-hidden="true" className="h-4 w-4" /> Browse the source code
                </a>
              </div>
            </section>
            <section className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-extrabold">Want the ZIP install?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The download page explains the GitHub ZIP option and the WordPress dashboard
                installation path.
              </p>
              <Link
                to="/download"
                className="mt-4 inline-flex items-center gap-2 font-bold text-brand hover:underline"
              >
                View installation options <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </article>
    </PageFrame>
  );
}
