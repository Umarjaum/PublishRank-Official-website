import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Braces, CalendarDays, Download, Megaphone, ShieldCheck } from "lucide-react";
import { PageFrame, PageCta } from "@/components/site-shell";
import { announcements, FEED_PATH } from "@/lib/publishrank-feed";
import { formatEditorialDate } from "@/lib/news-content";
import { pageSeo } from "@/lib/page-seo";
import {
  CHANGE_KIND_LABELS,
  latestRelease,
  releaseAnchor,
  releases,
  type ChangeKind,
} from "@/lib/releases";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/changelog")({
  head: () =>
    pageSeo(
      "/changelog",
      "What's New in PublishRank — Release History",
      `Release notes for every PublishRank version, starting with ${latestRelease.version}: new features, improvements, security changes and compatibility.`,
      {
        keywords: "PublishRank changelog, PublishRank release notes, WordPress SEO plugin updates",
        extraSchema: [
          {
            "@type": "ItemList",
            name: "PublishRank releases",
            itemListElement: releases.map((release, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: release.title,
              url: `${absoluteUrl("/changelog")}#${releaseAnchor(release.version)}`,
            })),
          },
        ],
      },
    ),
  component: ChangelogPage,
});

const KIND_ORDER: ChangeKind[] = ["feature", "improvement", "security", "fix", "compatibility"];

function ChangelogPage() {
  const [filter, setFilter] = useState<ChangeKind | "all">("all");
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const release of releases)
      for (const change of release.changes) out[change.kind] = (out[change.kind] ?? 0) + 1;
    return out;
  }, []);

  return (
    <PageFrame>
      <section className="release-hero" data-gsap-reveal>
        <div className="site-width grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,.7fr)] lg:items-end">
          <div>
            <p className="eyebrow">What's new · Release history</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Every PublishRank release, <span className="text-brand">in one place.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              The same release notes appear inside the plugin on the News &amp; What's New screen,
              so your team sees changes where they work.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/download" className="btn-brand">
                <Download className="h-4 w-4" aria-hidden="true" /> Download {latestRelease.version}
              </Link>
              <a href={FEED_PATH} className="btn-quiet">
                <Braces className="h-4 w-4" aria-hidden="true" /> JSON feed
              </a>
            </div>
          </div>
          <div className="release-latest-card">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Latest release
            </p>
            <p className="mt-2 text-5xl font-extrabold tracking-tight">{latestRelease.version}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {latestRelease.date
                ? formatEditorialDate(latestRelease.date, "long")
                : "Date not recorded"}
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-sm">
              <div>
                <dt className="text-muted-foreground">WordPress</dt>
                <dd className="font-bold">{latestRelease.minimumWp}+</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">PHP</dt>
                <dd className="font-bold">{latestRelease.minimumPhp}+</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Tested to</dt>
                <dd className="font-bold">{latestRelease.testedUpTo}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {announcements.length > 0 && (
        <section className="site-width pt-10" aria-label="Announcements" data-gsap-reveal>
          {announcements.map((a) => (
            <a key={a.id} href={a.path} className="announcement-bar">
              <Megaphone className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="min-w-0">
                <strong className="block">{a.title}</strong>
                <span className="text-sm text-muted-foreground">{a.summary}</span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          ))}
        </section>
      )}

      <section className="site-width py-12" aria-labelledby="history-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="history-title" className="text-2xl font-extrabold md:text-3xl">
            Release history
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter changes">
            {(["all", ...KIND_ORDER] as const).map((kind) => (
              <button
                key={kind}
                type="button"
                aria-pressed={filter === kind}
                onClick={() => setFilter(kind)}
                className="filter-chip"
              >
                {kind === "all" ? "All changes" : CHANGE_KIND_LABELS[kind]}
                {kind !== "all" && <span className="filter-chip-count">{counts[kind] ?? 0}</span>}
              </button>
            ))}
          </div>
        </div>

        <ol className="release-timeline mt-8">
          {releases.map((release, index) => {
            const changes = release.changes.filter((c) => filter === "all" || c.kind === filter);
            return (
              <li
                key={release.version}
                id={releaseAnchor(release.version)}
                className="release-item"
                data-gsap-reveal
              >
                <div className="release-dot" aria-hidden="true" />
                <article className="release-card">
                  <header className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                        Version {release.version}
                        {index === 0 && <span className="release-current">Current</span>}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold md:text-2xl">{release.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {release.date
                        ? formatEditorialDate(release.date, "long")
                        : "Date not recorded"}
                      {" · "}WP {release.minimumWp}+ · PHP {release.minimumPhp}+
                    </p>
                  </header>
                  <p className="mt-3 leading-7 text-muted-foreground">{release.summary}</p>
                  {changes.length > 0 ? (
                    <ul className="mt-5 grid gap-2.5">
                      {changes.map((change) => (
                        <li key={change.text} className="flex gap-3 text-sm leading-6">
                          <span className={`change-tag change-tag--${change.kind}`}>
                            {CHANGE_KIND_LABELS[change.kind]}
                          </span>
                          <span>{change.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm text-muted-foreground">
                      No {CHANGE_KIND_LABELS[filter as ChangeKind].toLowerCase()} changes in this
                      release.
                    </p>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="site-width pb-14" aria-labelledby="feed-title">
        <div className="feed-panel">
          <ShieldCheck className="h-6 w-6 text-brand" aria-hidden="true" />
          <div>
            <h2 id="feed-title" className="text-lg font-extrabold">
              One source for the website and the plugin
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Releases, news and notices are published once and served as validated JSON at{" "}
              <a
                href={FEED_PATH}
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                {FEED_PATH}
              </a>
              . The plugin reads it over verified HTTPS, sends nothing about your site, and the feed
              can never change settings or install code.
            </p>
          </div>
        </div>
      </section>
      <PageCta />
    </PageFrame>
  );
}
