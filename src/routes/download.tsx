import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  ExternalLink,
  Github,
} from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { DownloadLink } from "@/components/download-link";
import { pageSeo } from "@/lib/page-seo";
import {
  CURRENT_RELEASE,
  DOWNLOAD_URL,
  LOGO_GIF,
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  RELEASES_URL,
  DOWNLOAD_FILE,
} from "@/lib/site";
import { softwareSchema } from "@/lib/showcase-content";

export const Route = createFileRoute("/download")({
  head: () =>
    pageSeo(
      "/download",
      "Download the Free WordPress SEO Plugin",
      `Download PublishRank ${CURRENT_RELEASE}: WordPress SEO for every site, with Local SEO for 134 selectable business options across 14 niches.`,
      {
        extraSchema: [softwareSchema],
        keywords: `download PublishRank, WordPress.org plugin, WordPress SEO plugin download, news SEO plugin, ${DOWNLOAD_FILE}`,
      },
    ),
  component: DownloadPage,
});

const steps = [
  [
    "Back up and use staging",
    "Make a current backup and, if possible, install on a staging copy of your site first.",
  ],
  [
    "Download the ZIP",
    `Select Download PublishRank. This site serves ${DOWNLOAD_FILE}. Do not unzip it.`,
  ],
  [
    "Upload in WordPress",
    `Go to Plugins → Add New → Upload Plugin, choose ${DOWNLOAD_FILE} and select Install Now.`,
  ],
  [
    "Activate and run the Setup Wizard",
    "Activate the plugin, open PublishRank → Dashboard and confirm your site identity, business details where relevant, and title separator.",
  ],
  [
    "Check Technical health",
    "Review the pass, warning and recommendation labels, then resolve any other SEO plugin conflicts.",
  ],
  [
    "Submit your sitemap",
    "Open Sitemap health, copy your sitemap index and submit it in your own Search Console account.",
  ],
] as const;

function DownloadPage() {
  const [started, setStarted] = useState(false);
  return (
    <PageFrame>
      <section className="bg-brand-soft border-b">
        <div className="site-width grid items-center gap-8 py-12 md:grid-cols-[auto_1fr]">
          <img
            src={LOGO_GIF}
            alt="PublishRank animated logo"
            width={140}
            height={140}
            className="rounded-3xl shadow-[var(--shadow-window)]"
            style={{ width: 140, height: 140 }}
          />
          <div>
            <p className="text-xs font-extrabold uppercase text-brand">
              Latest release · v{CURRENT_RELEASE}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Download PublishRank</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Free, open-source WordPress SEO for businesses and websites of every kind. Version{" "}
              {CURRENT_RELEASE} brings a tidier dashboard and a movable Gutenberg SEO editor with
              live Google and social previews. It also strengthens Media Link Manager, 404 diagnosis
              and bulk editing, refines Schema Studio and improves video sitemap discovery. The
              release report describes sandbox testing and its limits.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <DownloadLink
                onClick={() => setStarted(true)}
                className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3 text-primary-foreground shadow-[var(--shadow-card)] hover:bg-brand-deep"
              >
                <Download className="h-5 w-5" />
                <span className="leading-tight">
                  <span className="block font-bold">Download PublishRank</span>
                  <span className="text-xs opacity-80">
                    PublishRank {CURRENT_RELEASE} · Free & Open Source
                  </span>
                </span>
              </DownloadLink>
              <a
                href={DOWNLOAD_URL}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
              >
                Direct ZIP download
              </a>
              <a
                href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
              >
                Install from WordPress.org <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-brand"
              >
                <Github className="h-4 w-4" />
                All releases on GitHub
              </a>
            </div>
            <div aria-live="polite" className="mt-4 min-h-6 text-sm">
              {started && (
                <p role="status" className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Your download should start in a moment. If nothing happens,{" "}
                  <a
                    className="font-bold text-brand underline"
                    href={RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    open the releases page
                  </a>{" "}
                  and choose {DOWNLOAD_FILE}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="site-width grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-extrabold">Install in six steps</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Want to see each screen?{" "}
            <Link to="/install" className="font-bold text-brand underline-offset-4 hover:underline">
              Follow the illustrated installation guide
            </Link>
            .
          </p>
          <ol className="mt-6 grid gap-4">
            {steps.map(([t, d], i) => (
              <li
                key={t}
                className="flex gap-4 rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            to="/documentation"
            className="mt-8 inline-flex items-center gap-2 font-bold text-brand"
          >
            <BookOpen className="h-4 w-4" />
            Read the full handbook
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <aside className="grid content-start gap-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-extrabold">What you get</h2>
            <ul className="mt-4 grid gap-3 text-sm font-semibold">
              {[
                "More than 40 WordPress SEO tools for business, site and publishing workflows",
                "Mastodon sharing, profile verification and a copyable rel=me HTML-head snippet",
                "Administrator-only Mastodon token reveal and resilient post confirmation",
                `New in ${CURRENT_RELEASE}: a movable Gutenberg SEO editor with live Google and social previews`,
                "Media Link Manager with dry-run URL migration, collision checks, verification, redirects and rollback",
                "404 diagnosis and source-page discovery with redirects for high-confidence fixes",
                "Bulk SEO editing with review-before-save, conflict checks, undo history and safeguarded CSV",
                "Schema Studio refinements and YouTube/Vimeo video sitemap discovery",
                "Responsive and accessibility refinements; the supplied automated checks were spot checks, not a full WCAG audit",
                "News and XML sitemaps, connected structured data, metadata and social previews",
                "SEO Inspector, redirects, 404 monitoring, WooCommerce SEO and optional publishing workflows",
                "Free core edition, open source",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-brand/20 bg-brand-soft p-6">
            <h2 className="text-xl font-extrabold">Install from your WordPress dashboard</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              You can find the official listing in WordPress under Plugins → Add New. Search for
              PublishRank, open its WordPress.org page, then install and activate it.
            </p>
            <a
              href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-bold text-brand hover:underline"
            >
              Open the official plugin page <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-extrabold">Before you install</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Check the supported WordPress and PHP requirements shown on the release page,
              deactivate other SEO plugins that print titles, schema or sitemaps, and test rendered
              output on staging.
            </p>
          </div>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Download not working?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>
                Open the{" "}
                <a
                  className="font-bold text-brand"
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  releases page
                </a>{" "}
                and choose {DOWNLOAD_FILE}.
              </li>
              <li>Try another browser or disable content blockers for github.com.</li>
              <li>
                If a release is missing, tell us on the{" "}
                <Link className="font-bold text-brand" to="/contact">
                  contact form
                </Link>
                .
              </li>
            </ul>
            <p className="mt-3 break-all text-xs text-muted-foreground">
              Direct ZIP URL:{" "}
              <a className="font-semibold text-brand underline" href={DOWNLOAD_URL}>
                {DOWNLOAD_URL}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </PageFrame>
  );
}
