import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PageFrame, PageCta } from "@/components/site-shell";
import { publisherPages, type PublisherPageKey } from "@/lib/publisher-content";
import newsroom from "@/assets/publishrank-newsroom.jpg.asset.json";
import writing from "@/assets/publishrank-writing.jpg.asset.json";
import developer from "@/assets/publishrank-developer.jpg.asset.json";

const images = { newsroom, writing, developer };
const alts = {
  newsroom: "Bright modern editorial workspace with desks and plants",
  writing: "Writer making handwritten editorial notes",
  developer: "Laptop and desktop development workspace",
};
const pageProfiles: Record<PublisherPageKey, { audience: string; path: string; outcome: string }> =
  {
    features: {
      audience: "Newsrooms, publishers and WordPress site owners",
      path: "Start with article review, then connect schema, sitemaps and archive maintenance.",
      outcome: "A clearer view of the tools available across the publishing lifecycle.",
    },
    documentation: {
      audience: "Editors, administrators and technical implementers",
      path: "Prepare the site, configure the foundation, validate representative URLs and maintain it.",
      outcome: "A repeatable setup and release process rather than a collection of settings.",
    },
    comparisons: {
      audience: "Teams evaluating or migrating WordPress SEO plugins",
      path: "Define requirements, test the same stories, compare output and plan migration conservatively.",
      outcome: "A fair evaluation based on your real workflow, theme and archive.",
    },
    resources: {
      audience: "Editors, independent publishers and content operations teams",
      path: "Improve story quality, discovery signals, authorship, images and archive habits together.",
      outcome: "Practical publishing decisions that compound without inflated promises.",
    },
    support: {
      audience: "Site owners troubleshooting a live or staging WordPress installation",
      path: "Reproduce one issue, inspect the rendered output, remove conflicts and document the result.",
      outcome: "A focused diagnostic report and a safer path to resolution.",
    },
    about: {
      audience: "Publishers deciding whether the project fits their values and workflow",
      path: "Understand the project, its capabilities, its limitations and its open-source context.",
      outcome: "An informed starting point without invented company or performance claims.",
    },
    privacy: {
      audience: "Visitors and site operators reviewing website data handling",
      path: "Separate website behavior from plugin behavior, then review contact and hosting details.",
      outcome: "A clearer baseline for an operator-approved privacy policy.",
    },
    terms: {
      audience: "Visitors reviewing scope, downloads and product limitations",
      path: "Read the website scope, plugin licensing boundary, acceptable use and disclaimers.",
      outcome: "Plain-language context while binding operator terms are maintained separately.",
    },
  };

export function PublisherPage({
  pageKey,
  children,
  after,
}: {
  pageKey: PublisherPageKey;
  children?: ReactNode;
  after?: ReactNode;
}) {
  const page = publisherPages[pageKey];
  if (!page) return null;
  const profile = pageProfiles[pageKey];

  return (
    <PageFrame>
      <section className="border-b bg-brand-soft" aria-labelledby="page-title">
        <div className="site-width py-8 md:py-10">
          <img
            src={images[page.image].url}
            alt={alts[page.image]}
            width={1500}
            height={700}
            className="mb-7 aspect-[2.8/1] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
            fetchPriority="high"
          />
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-foreground">
                {page.eyebrow}
              </li>
            </ol>
          </nav>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-wide text-brand">
            {page.eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl"
          >
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {page.intro}
          </p>
          <div className="mt-8 grid max-w-5xl gap-3 border-t pt-5 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand">
                Best for
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.audience}</p>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand">
                Suggested path
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.path}</p>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand">
                You will leave with
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.outcome}</p>
            </div>
          </div>
          {"updated" in page && page.updated && (
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {page.updated}</p>
          )}
        </div>
      </section>

      {children && <div className="site-width py-8 md:py-10">{children}</div>}

      <div className="site-width grid min-w-0 gap-8 py-8 md:py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="min-w-0 self-start lg:sticky lg:top-24">
          <nav
            aria-label="On this page"
            className="rounded-lg border bg-card p-4 lg:border-l-2 lg:border-l-brand lg:pl-5"
          >
            <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-brand">
              On this page
            </h2>
            <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {page.sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    className="inline-flex min-h-10 items-center py-1 text-sm leading-relaxed hover:text-brand"
                    href={`#section-${i}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="divide-y">
            {page.sections.map((section, i) => (
              <section
                id={`section-${i}`}
                key={section.title}
                className="scroll-mt-28 py-7 first:pt-0 md:py-8"
              >
                <h2 className="text-2xl font-extrabold">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-3xl leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 rounded-md border bg-card p-3 text-sm font-semibold leading-relaxed"
                      >
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <nav aria-label="Related pages" className="mt-8 grid gap-3 border-t pt-6 sm:grid-cols-2">
            <Link
              to="/features"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand"
            >
              Explore features
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/documentation"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand"
            >
              Read the handbook
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand"
            >
              Contact us
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
      {after}
      <PageCta />
    </PageFrame>
  );
}
