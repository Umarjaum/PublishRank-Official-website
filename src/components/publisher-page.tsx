import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  FileText,
  Globe2,
  LifeBuoy,
  Newspaper,
  Scale,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PageFrame, PageCta } from "@/components/site-shell";
import { publisherPages, type PublisherPageKey } from "@/lib/publisher-content";
import { publisherPageProfiles } from "@/lib/publisher-page-profiles";
import newsroom from "@/assets/publishrank-newsroom.jpg.asset.json";
import writing from "@/assets/publishrank-writing.jpg.asset.json";
import developer from "@/assets/publishrank-developer.jpg.asset.json";

const images = { newsroom, writing, developer };
const alts = {
  newsroom: "Bright modern editorial workspace with desks and plants",
  writing: "Writer making handwritten editorial notes",
  developer: "Laptop and desktop development workspace",
};

const pageIcons: Record<PublisherPageKey, LucideIcon> = {
  features: Sparkles,
  documentation: BookOpen,
  comparisons: Scale,
  resources: Newspaper,
  support: LifeBuoy,
  about: Globe2,
  privacy: ShieldCheck,
  terms: FileText,
  cookies: ShieldCheck,
  disclaimer: FileText,
  security: ShieldCheck,
  accessibility: Globe2,
};

function iconForSection(title: string): LucideIcon {
  const normalized = title.toLowerCase();
  if (/local|business|location|service/.test(normalized)) return Building2;
  if (/schema|structured data|metadata|technical|crawl|sitemap|discovery/.test(normalized))
    return Globe2;
  if (/support|troubleshoot|error|install|download/.test(normalized)) return Wrench;
  if (/news|story|editor|author|report|archive|publisher/.test(normalized)) return Newspaper;
  if (/privacy|security|cookie|data|policy/.test(normalized)) return ShieldCheck;
  if (/compare|evaluation|migration|requirements/.test(normalized)) return Scale;
  if (/guide|prepare|review|validate|handbook|step/.test(normalized)) return BookOpen;
  return Sparkles;
}

const profileLabels = [
  { label: "Best for", Icon: Building2 },
  { label: "Suggested path", Icon: ArrowRight },
  { label: "You will leave with", Icon: Check },
] as const;

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
  const profile = publisherPageProfiles[pageKey];
  const PageIcon = pageIcons[pageKey];
  const profileValues = [profile.audience, profile.path, profile.outcome];

  return (
    <PageFrame showBreadcrumbs={false}>
      <section
        className="relative isolate overflow-hidden border-b bg-brand-soft"
        aria-labelledby="page-title"
        data-gsap-reveal
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        />
        <div className="site-width py-8 md:py-10">
          <img
            src={images[page.image].url}
            alt={alts[page.image]}
            width={1500}
            height={700}
            className="mb-7 aspect-[2.8/1] w-full rounded-2xl object-cover shadow-[var(--shadow-window)]"
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
          <div className="mt-7 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-background text-brand shadow-[var(--shadow-card)]">
              <PageIcon aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              {page.eyebrow}
            </p>
          </div>
          <h1
            id="page-title"
            className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl"
          >
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {page.intro}
          </p>
          <div className="mt-8 grid max-w-5xl gap-3 md:grid-cols-3">
            {profileLabels.map(({ label, Icon }, index) => (
              <article
                key={label}
                className="group rounded-2xl border border-brand/10 bg-background/85 p-4 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-0.5 hover:border-brand/30"
              >
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{profileValues[index]}</p>
              </article>
            ))}
          </div>
          {page.updated && (
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {page.updated}</p>
          )}
        </div>
      </section>

      {children && <div className="site-width py-8 md:py-10">{children}</div>}

      <div className="site-width grid min-w-0 gap-8 py-8 md:py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="min-w-0 self-start lg:sticky lg:top-24">
          <nav
            aria-label="On this page"
            className="rounded-2xl border bg-card p-4 shadow-[var(--shadow-card)] lg:border-l-2 lg:border-l-brand lg:pl-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wide text-brand">
                On this page
              </h2>
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold text-brand">
                {page.sections.length} sections
              </span>
            </div>
            <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {page.sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    className="group flex min-h-10 items-center gap-2 rounded-lg px-2 py-1 text-sm leading-relaxed text-muted-foreground transition-colors hover:bg-brand-soft hover:text-brand"
                    href={`#section-${i}`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-background font-mono text-[10px] font-bold text-brand group-hover:border-brand/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="grid gap-4">
            {page.sections.map((section, i) => {
              const SectionIcon = iconForSection(section.title);
              return (
                <section
                  id={`section-${i}`}
                  key={section.title}
                  className="group relative scroll-mt-28 overflow-hidden rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] transition duration-200 hover:border-brand/25 hover:shadow-[var(--shadow-window)] md:p-7"
                  data-gsap-reveal
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand/70 via-brand/20 to-transparent"
                  />
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand transition-transform duration-200 group-hover:scale-105">
                      <SectionIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                        Section {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold leading-snug md:text-2xl">
                        {section.title}
                      </h2>
                      <div className="mt-3 max-w-3xl space-y-3">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="leading-7 text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {section.bullets && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 rounded-xl border bg-background p-3 text-sm font-medium leading-relaxed"
                            >
                              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                                <Check aria-hidden="true" className="h-3 w-3" />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
          <nav aria-label="Related pages" className="mt-8 grid gap-3 border-t pt-6 sm:grid-cols-2">
            <Link
              to="/features"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
            >
              Explore features
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/documentation"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
            >
              Read the handbook
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
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
