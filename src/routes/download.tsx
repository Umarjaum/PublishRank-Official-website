import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowRight, BookOpen, Check, Download, Github } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { DownloadLink } from "@/components/download-link";
import { pageSeo } from "@/lib/page-seo";
import { DOWNLOAD_URL, LOGO_GIF, RELEASES_URL } from "@/lib/site";
import { softwareSchema } from "@/lib/showcase-content";

export const Route = createFileRoute("/download")({
  head: () =>
    pageSeo(
      "/download",
      "Download the Free WordPress SEO Plugin",
      "Download PublishRank, the free and open-source WordPress SEO plugin for news publishers. Get the latest release ZIP from GitHub and follow the step-by-step install guide.",
      {
        extraSchema: [softwareSchema],
        keywords:
          "download PublishRank, WordPress SEO plugin download, news SEO plugin, PublishRank.zip",
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
    "Select Download PublishRank. The file PublishRank.zip comes from the latest GitHub release. Do not unzip it.",
  ],
  [
    "Upload in WordPress",
    "Go to Plugins → Add New → Upload Plugin, choose PublishRank.zip and select Install Now.",
  ],
  [
    "Activate and run the Setup Wizard",
    "Activate the plugin, open PublishRank → Dashboard and confirm your publication identity and title separator.",
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
            <p className="text-xs font-extrabold uppercase text-brand">Latest release</p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Download PublishRank</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Free, open-source WordPress SEO for publishers. One ZIP, installed from your WordPress
              dashboard.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <DownloadLink
                onClick={() => setStarted(true)}
                className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3 text-primary-foreground shadow-[var(--shadow-card)] hover:bg-brand-deep"
              >
                <Download className="h-5 w-5" />
                <span className="leading-tight">
                  <span className="block font-bold">Download PublishRank</span>
                  <span className="text-xs opacity-80">PublishRank.zip · Free & Open Source</span>
                </span>
              </DownloadLink>
              <a
                href={DOWNLOAD_URL}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
              >
                Direct ZIP download
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
                  and choose PublishRank.zip.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="site-width grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-extrabold">Install in six steps</h2>
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
                "More than 40 built-in SEO and newsroom tools",
                "News and XML sitemaps, schema and breadcrumbs",
                "Redirects, crawl optimization and llms.txt",
                "Google Preferred Sources and WP Hide Login",
                "Free core edition, open source",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
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
                and pick PublishRank.zip.
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
