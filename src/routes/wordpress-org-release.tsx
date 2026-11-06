import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, ExternalLink, Github, ShieldAlert } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageSeo } from "@/lib/page-seo";
import {
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  REPO_URL,
  RELEASES_URL,
  WORDPRESS_RELEASE_TAGS,
} from "@/lib/site";

const launchFeatures = [
  {
    title: "SEO metadata and social previews",
    description:
      "Manage SEO titles, descriptions, canonical URLs, robots directives, Open Graph and X/Twitter metadata.",
  },
  {
    title: "Connected structured data",
    description:
      "Configure connected JSON-LD schema for organizations, people, webpages, articles, breadcrumbs and supported content types.",
  },
  {
    title: "XML and News sitemaps",
    description:
      "Create XML sitemaps for supported content and media, including a Google News sitemap with configurable publishing settings.",
  },
  {
    title: "Publisher and editorial tools",
    description:
      "Review editorial SEO, internal links, sitemap diagnostics and publisher workflows designed for newsroom teams.",
  },
  {
    title: "Redirects and archive maintenance",
    description:
      "Use redirect management and a local 404 monitor to review broken paths and maintain site navigation.",
  },
  {
    title: "Optional discovery tools",
    description:
      "Enable optional IndexNow submissions and configure llms.txt resources when they fit your site's needs.",
  },
] as const;

export const Route = createFileRoute("/wordpress-org-release")({
  head: () =>
    pageSeo(
      "/wordpress-org-release",
      "PublishRank Is Officially on WordPress.org",
      "PublishRank is a free, open-source WordPress SEO plugin listed in the official WordPress.org directory. Explore its publisher-focused features, installation options and official release links.",
      {
        keywords: WORDPRESS_RELEASE_TAGS.join(", "),
        ogType: "article",
        articleSection: "PublishRank release",
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
              Official WordPress.org release
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
              PublishRank is now listed in the WordPress.org plugin directory
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              PublishRank is a free, open-source WordPress SEO plugin built for publishers,
              newsrooms, bloggers and editorial teams. The official directory listing gives
              WordPress site owners a direct place to review the plugin and install it from their
              dashboard.
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
                Built for publishing workflows
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
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
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
