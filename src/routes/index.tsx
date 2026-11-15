import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Download,
  Feather,
  ExternalLink,
  Github,
  Globe,
  Heart,
  Newspaper,
  PenTool,
  Puzzle,
  Rss,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import newsroom from "@/assets/publishrank-newsroom.jpg.asset.json";
import editorial from "@/assets/publishrank-writing.jpg.asset.json";
import dev from "@/assets/publishrank-developer.jpg.asset.json";

import { SiteHeader, SiteFooter, SkipLink } from "@/components/site-shell";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { LocalBusinessOverview } from "@/components/feature-catalog-view";
import { pageSeo } from "@/lib/page-seo";
import {
  CURRENT_RELEASE,
  HOME_SEO_DESCRIPTION,
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  WORDPRESS_RELEASE_TAGS,
} from "@/lib/site";
import { Button } from "@/components/ui/button";
import { DownloadLink } from "@/components/download-link";
import { FaqSection, ScreenshotShowcase } from "@/components/showcase";
import { faqSchema, softwareSchema } from "@/lib/showcase-content";

export const Route = createFileRoute("/")({
  head: () =>
    pageSeo("/", "WordPress SEO for Every Website and Business", HOME_SEO_DESCRIPTION, {
      extraSchema: [softwareSchema, faqSchema],
      keywords:
        "WordPress SEO for businesses, local SEO, 134 business types, LocalBusiness schema, publisher SEO, site metadata, sitemaps, Mastodon publishing",
    }),
  component: Index,
});

const Tick = ({ brand }: { brand?: boolean }) => (
  <span
    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${brand ? "bg-brand" : "bg-success"} text-primary-foreground`}
  >
    <Check className="h-3 w-3" strokeWidth={3} />
  </span>
);

const workflowSteps = [
  {
    number: "01",
    Icon: Building2,
    title: "Set up your website and business profile",
    description:
      "Configure site identity, SEO defaults, sitemap coverage, and—in the case of a local business—your profile, locations or service area.",
    href: "/features",
    cta: "Explore Local SEO and setup",
  },
  {
    number: "02",
    Icon: PenTool,
    title: "Optimize every kind of page",
    description:
      "Edit search metadata and structured data for service pages, products, business pages and articles; review previews before publishing.",
    href: "/features",
    cta: "Explore the SEO editor",
  },
  {
    number: "03",
    Icon: Globe,
    title: "Grow local and organic discovery",
    description:
      "Choose from 134 business options across 14 niches, then maintain hours, services, schema, redirects and sitemap health.",
    href: "/features",
    cta: "See all supported business types",
  },
] as const;

const releaseHighlights = [
  {
    Icon: PenTool,
    title: "A movable SEO workspace",
    text: "Metadata, previews and analysis in one floating editor for Gutenberg and Classic Editor, with touch-friendly mobile behavior.",
  },
  {
    Icon: ShieldCheck,
    title: "Clearer site operations",
    text: "Refined 404 logging plus redirects you can import, export, bulk manage and trace through chains or loops.",
  },
  {
    Icon: BarChart3,
    title: "One consistent SEO score",
    text: "The editor, toolbar, post list, score screen, Insights and scheduled audits share the same score.",
  },
  {
    Icon: Rss,
    title: "Feeds and site navigation",
    text: "Configure RSS attribution and previews, and inspect important pages for indexability and navigation signals.",
  },
  {
    Icon: Puzzle,
    title: "WooCommerce SEO",
    text: "When WooCommerce is active, product data joins the schema graph instead of being treated as news content.",
  },
  {
    Icon: Globe,
    title: "Language-aware analysis",
    text: "Analyze English, Arabic and Urdu content, with optional dismissible inclusive-language suggestions.",
  },
] as const;

function Index() {
  const strip = [
    [BarChart3, "41+ WordPress SEO Tools"],
    [Building2, "134 Local SEO Business Types"],
    [Newspaper, "Newsroom & Editorial Tools"],
    [Share2, "Mastodon Publishing"],
    [Code2, "Business & Article Schema"],
    [Globe, "XML, News & Image Sitemaps"],
  ] as const;
  const audiences = [
    [
      "/media/screens/publishrank-2.12.1/desktop-1440/18-publishrank-local-seo.png",
      Building2,
      "Businesses & Local Organizations",
      "Build a detailed local business profile with service areas, hours, industry-specific fields and schema options across 14 niches.",
      "Businesses",
    ],
    [
      newsroom.url,
      Newspaper,
      "Newsrooms",
      "Manage article SEO, news sitemaps and editorial workflows with ease.",
      "Newsrooms",
    ],
    [
      editorial.url,
      PenTool,
      "Bloggers & Independent Publishers",
      "Optimize your content and grow your audience.",
      "Bloggers",
    ],
    [
      dev.url,
      Settings,
      "Developers & Technical Users",
      "Take control with advanced tools, clean code and flexibility.",
      "Developers",
    ],
  ] as const;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <MotionEnhancer />
      <SkipLink />
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
        data-gsap-reveal
      >
        <SiteHeader />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
          <div>
            <Link
              to="/wordpress-org-release"
              className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/20 bg-background/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-brand transition hover:bg-background"
            >
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              Current release · v{CURRENT_RELEASE}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              One SEO operating layer for every WordPress website.
              <span className="mt-2 block text-brand">
                Built for business and publishing teams.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Manage sitewide metadata, structured data, sitemaps, redirects and diagnostics in one
              workspace. Add Local SEO for 134 selectable business options across 14 niches; use
              newsroom workflows when your team needs them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DownloadLink className="flex min-h-12 items-center gap-3 rounded-full bg-brand px-6 py-3 text-primary-foreground shadow-[var(--shadow-card)] transition hover:bg-brand-deep">
                <Download className="h-5 w-5" />
                <span className="leading-tight">
                  <span className="block font-bold">Download PublishRank</span>
                  <span className="text-xs opacity-85">
                    Free & open source · v{CURRENT_RELEASE}
                  </span>
                </span>
              </DownloadLink>
              <Button variant="outline" asChild className="min-h-12 rounded-full border-brand px-6">
                <Link to="/features">
                  <BookOpen className="text-brand" />
                  Explore every feature
                </Link>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground">
              <a
                href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 text-brand underline underline-offset-4"
              >
                Install through WordPress.org{" "}
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link
                to="/wordpress-org-release"
                className="inline-flex min-h-10 items-center gap-2 hover:text-brand"
              >
                Read the v{CURRENT_RELEASE} release notes{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Requires WordPress 6.3+ and PHP 7.4+. SEO checks are guidance—not a promise of
              rankings or rich results.
            </p>
          </div>

          <aside
            className="relative overflow-hidden rounded-[1.75rem] border border-brand/20 bg-card p-6 shadow-[var(--shadow-window)] md:p-8"
            aria-label={`PublishRank ${CURRENT_RELEASE} release overview`}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-brand" aria-hidden="true" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Zap className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                    Current release
                  </span>
                  <span className="mt-0.5 block text-xl font-extrabold">
                    PublishRank {CURRENT_RELEASE}
                  </span>
                </span>
              </div>
              <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-success">
                Available now
              </span>
            </div>
            <h2 className="mt-7 text-2xl font-extrabold leading-tight md:text-3xl">
              Operational SEO, without splitting your workflow.
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The latest release connects editor work, site health, feeds and commerce inside
              WordPress.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                {
                  Icon: ShieldCheck,
                  title: "404 monitoring",
                  text: "Review logged paths and create redirects.",
                },
                {
                  Icon: PenTool,
                  title: "Movable SEO editor",
                  text: "Keep fields, previews and analysis together.",
                },
                {
                  Icon: BarChart3,
                  title: "Consistent scoring",
                  text: "Use one score across editing and reporting.",
                },
                {
                  Icon: Puzzle,
                  title: "Commerce & feeds",
                  text: "Add WooCommerce SEO and configurable RSS feeds.",
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="rounded-xl border bg-background p-4">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-brand-soft p-4">
              <span className="text-sm font-semibold">Local SEO business profiles</span>
              <span className="shrink-0 text-right">
                <strong className="text-xl text-brand">134</strong>
                <span className="ml-1 text-xs text-muted-foreground">options · 14 niches</span>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <main id="main-content" className="mx-auto max-w-6xl px-5">
        {/* Feature strip */}
        <section className="-mt-6 relative z-10 grid grid-cols-2 rounded-lg border bg-brand-soft shadow-[var(--shadow-card)] md:grid-cols-3 lg:grid-cols-6">
          {strip.map(([Icon, t]) => (
            <div
              key={t}
              className="flex flex-col items-center gap-2 border-border p-5 text-center text-sm lg:border-r last:border-r-0"
            >
              <Icon className="h-7 w-7 text-brand" />
              {t}
            </div>
          ))}
        </section>

        <section className="py-12 md:py-16" aria-labelledby="release-highlights-title">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                Release {CURRENT_RELEASE} · Verified package changes
              </p>
              <h2
                id="release-highlights-title"
                className="mt-2 text-3xl font-extrabold md:text-4xl"
              >
                Better control across editing, commerce and site operations.
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A focused release update for the work teams do inside WordPress—from editing and
                monitoring to feeds, navigation and product data.
              </p>
            </div>
            <Link
              to="/wordpress-org-release"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-brand underline underline-offset-4"
            >
              Read all release notes <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {releaseHighlights.map(({ Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <LocalBusinessOverview />

        <section
          aria-labelledby="official-release-title"
          className="my-10 rounded-2xl border border-brand/20 bg-brand-soft p-6 md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                Current release · v{CURRENT_RELEASE}
              </p>
              <h2 id="official-release-title" className="mt-2 text-2xl font-extrabold md:text-3xl">
                Start with one SEO foundation across your site.
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                Install free from the WordPress.org directory or download the exact release package.
                Review the compatibility notes and full changelog before updating a production site.
              </p>
              <ul aria-label="PublishRank capabilities" className="mt-5 flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-3 lg:max-w-64 lg:flex-col">
              <Button asChild className="rounded-full">
                <a
                  href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install from WordPress.org <ExternalLink aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/wordpress-org-release">
                  v{CURRENT_RELEASE} release details <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Editorial workflow */}
        <section aria-labelledby="workflow-title" className="py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              A practical workflow for any WordPress site
            </p>
            <h2 id="workflow-title" className="mt-2 text-3xl font-extrabold">
              From business profile to healthier site
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Set your site and business identity, optimize the pages that matter to your audience,
              then maintain the technical paths customers, readers and search engines rely on.
            </p>
          </div>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map(({ number, Icon, title, description, href, cta }) => (
              <li
                key={number}
                className="flex h-full flex-col rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold text-brand">{number}</span>
                  <Icon aria-hidden="true" className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <Link
                  to={href}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand hover:underline"
                >
                  {cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="maturity-title" className="border-y py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
                A site system that grows with your business
              </p>
              <h2 id="maturity-title" className="mt-2 text-3xl font-extrabold">
                Keep every important page discoverable and accurate.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Organize the work around your website: verify business details, optimize key pages,
                check what WordPress outputs, and keep locations, services and the rest of the site
                up to date.
              </p>
              <Link
                to="/enterprise"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
              >
                Read the enterprise operating model
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                [
                  "01",
                  "Foundation",
                  "Business and site identity, local profile, SEO defaults, canonicals and sitemaps.",
                ],
                [
                  "02",
                  "Page optimization",
                  "Business, service, product and article titles, descriptions, images and schema.",
                ],
                [
                  "03",
                  "Release proof",
                  "Rendered HTML, social output, structured data and representative URL checks.",
                ],
                [
                  "04",
                  "Ongoing updates",
                  "Business hours, services, seasonal details, redirects, links and site health.",
                ],
              ].map(([number, title, description]) => (
                <li
                  key={number}
                  className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
                >
                  <span className="text-sm font-extrabold text-brand">{number}</span>
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why */}
        <section
          id="why"
          className="grid gap-10 py-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-center"
        >
          <div>
            <h2 className="text-3xl font-extrabold">
              One SEO foundation for every site, with business and editorial depth.
            </h2>
            <p className="mt-4 leading-relaxed">
              Manage business identity, page-level metadata, schema, sitemaps, redirects and
              diagnostics in one plugin. Add business Local SEO or newsroom workflows to match the
              site and team you operate.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/about">
                Learn More <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="space-y-4 lg:border-l-2 lg:border-brand/40 lg:pl-8">
            {[
              "Local SEO for 134 business options across 14 niches",
              "14 niches: retail, health, hospitality, services, education and more",
              "Service areas, hidden addresses, hours and holiday schedules",
              "Type-specific fields for restaurants, hotels, clinics, shops and venues",
              "Sitewide metadata, schema, sitemaps, redirects and technical SEO",
              "Publisher, newsroom and editorial workflows when you need them",
              "Mastodon social publishing",
              "Schema Aggregator endpoint and optional llms.txt",
              "Private Login with its own PublishRank settings screen",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Tick brand />
                {t}
              </li>
            ))}
          </ul>
          <aside className="relative rounded-lg bg-brand-soft p-6">
            <Building2 className="mb-3 h-7 w-7 text-brand" />
            <p className="text-lg">
              <b className="text-brand">Local business profiles, ready today.</b> Configure service
              areas or hidden addresses, opening and holiday hours, services, payment details and
              fields tailored to your business type. Schema describes your business; it does not
              promise rankings or rich results.
            </p>
            <Link
              to="/features#local-business-seo"
              className="mt-4 inline-block text-sm font-bold text-brand"
            >
              Explore Local SEO details →
            </Link>
            <Feather className="absolute bottom-4 right-4 h-12 w-12 text-brand/20" />
          </aside>
        </section>

        {/* Audiences */}
        <section id="audiences">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-brand/50" />
            <h2 className="text-center text-2xl font-extrabold">
              One SEO foundation for businesses, publishers and every WordPress site.
            </h2>
            <span className="h-px flex-1 bg-brand/50" />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {audiences.map(([img, Icon, title, text, cta]) => (
              <article
                key={title}
                className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-window)]"
              >
                <img src={img} alt={title} loading="lazy" className="h-36 w-full object-cover" />
                <div className="flex gap-3 p-5">
                  <Icon className="h-7 w-7 shrink-0 text-brand" />
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                    <Link
                      to={cta === "Developers" ? "/documentation" : "/features"}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand"
                    >
                      Explore for {cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ScreenshotShowcase />

        {/* Trust */}
        <section className="my-10 rounded-lg bg-brand-soft p-6">
          <h2 className="text-center text-xl font-extrabold">Made for the WordPress Community</h2>
          <div className="mt-5 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {(
              [
                [Globe, "GPLv2+", "Open source", "text-ink"],
                [Building2, "134 options", "Local SEO profiles", "text-brand"],
                [Zap, CURRENT_RELEASE, "Current release", "text-brand"],
                [Code2, "WordPress", "Native plugin", "text-chart-3"],
              ] as const
            ).map(([Icon, a, b, c]) => (
              <div key={a} className="flex items-center justify-center gap-3">
                <Icon className={`h-9 w-9 ${c}`} />
                <span>
                  <span className="block text-xl font-bold">{a}</span>
                  <span className="text-muted-foreground">{b}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
        <FaqSection />
      </main>

      {/* CTA */}
      <section className="text-primary-foreground" style={{ background: "var(--gradient-cta)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1.6fr_1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold">
              Build a stronger, more manageable SEO foundation.
            </h2>
            <p className="mt-2 text-lg">
              <b>Install PublishRank {CURRENT_RELEASE}</b> and review your business, site and
              publishing workflows in one place.
            </p>
            <div className="mt-6">
              <DownloadLink className="inline-flex items-center gap-3 rounded-full bg-background px-8 py-3 text-lg font-bold text-ink shadow-[var(--shadow-card)] transition hover:-translate-y-0.5">
                <Download className="h-5 w-5 text-brand" /> Download PublishRank
              </DownloadLink>
              <p className="mt-2 pl-9 text-xs text-primary-foreground/80">Free &amp; Open Source</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              "Local SEO for 134 business options",
              "One consistent SEO score",
              "Open-source WordPress tools",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 font-semibold">
                <Tick />
                {t}
              </li>
            ))}
          </ul>
          <BarChart3 className="hidden h-28 w-28 opacity-60 md:block" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
