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
import { ResearchPulse } from "@/components/publisher-research-pulse";
import { PublisherIntroVideo } from "@/components/publisher-intro-video";
import { PublisherSignalReactor } from "@/components/publisher-signal-reactor";
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
import { FaqSection, PhotoShowcase, ScreenshotShowcase } from "@/components/showcase";
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

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.1] md:text-5xl">
              WordPress SEO for every website.
              <br />
              <span className="text-brand">Built for businesses, publishers and more.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">
              Not just for bloggers and news publishers: the current release brings businesses and
              website owners a complete WordPress SEO toolkit, including Local SEO for 134
              selectable business options across 14 niches. Publisher and newsroom tools are here
              too—they are a specialty, not the limit of PublishRank.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <DownloadLink className="flex items-center gap-3 rounded-full bg-brand px-7 py-3 text-primary-foreground shadow-[var(--shadow-card)] hover:bg-brand-deep">
                <Download className="h-5 w-5" />
                <span className="leading-tight">
                  <span className="block font-bold">Download PublishRank</span>
                  <span className="text-xs opacity-80">Free & Open Source</span>
                </span>
              </DownloadLink>
              <Button
                variant="outline"
                asChild
                className="h-auto rounded-full border-brand px-7 py-3"
              >
                <Link to="/features">
                  <BookOpen className="text-brand" />
                  Explore Features
                </Link>
              </Button>
            </div>
            <Link
              to="/website-creation"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-brand underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand"
            >
              Need a business website? Basic websites start at $2
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#publishrank-introduction-v2"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-brand underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand"
            >
              Watch the 15-second introduction
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#research-pulse"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-brand underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand"
            >
              <span className="rounded-full bg-[#83e4bd]/20 px-2 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-[#075c43]">
                Research pulse
              </span>
              Explore a fresh Google + WordPress signal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="mt-5 flex items-center">
              <a
                href="https://ailaun.ch/projects/publishrank?utm_source=badge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PublishRank featured on AI Launch, opens in a new tab"
              >
                <img
                  src="https://ailaun.ch/ailaunch/images/badges/featured-on-light.svg"
                  alt="Featured on AI Launch"
                  style={{ height: 44, width: "auto" }}
                />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm">
              {["Local SEO · 134 Business Types", "Structured Data", "Sitewide SEO Tools"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Tick />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Dashboard mock */}
          <div className="relative">
            <div className="absolute -right-2 -top-6 z-10 rounded-b-lg bg-brand-deep px-4 py-4 text-center text-sm font-bold text-primary-foreground shadow-xl">
              <Feather className="mx-auto mb-1 h-7 w-7" />
              Built for
              <br />
              every WordPress site
            </div>
            <div
              className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-window)]"
              style={{ transform: "perspective(1400px) rotateY(-8deg)" }}
            >
              <div className="flex gap-1.5 border-b bg-muted px-3 py-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2.5 w-2.5 rounded-full bg-border" />
                ))}
              </div>
              <div className="flex">
                <aside className="hidden w-24 space-y-2 bg-ink p-3 sm:block">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded ${i === 1 ? "bg-brand" : "bg-muted-foreground/40"}`}
                    />
                  ))}
                </aside>
                <div className="flex-1 p-5">
                  <p className="font-bold">PublishRank Dashboard</p>
                  <div className="mt-4 flex items-center gap-6">
                    <div
                      className="relative grid h-28 w-28 place-items-center rounded-full"
                      style={{ background: "conic-gradient(var(--success) 0 92%, var(--muted) 0)" }}
                    >
                      <div
                        className="grid h-22 w-22 place-items-center rounded-full bg-card text-center"
                        style={{ width: 88, height: 88 }}
                      >
                        <span>
                          <span className="text-3xl font-extrabold">92</span>
                          <span className="text-xs">/100</span>
                          <br />
                          <span className="text-[10px] font-semibold">SEO Excellent</span>
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs">
                      {[
                        "Meta Tags",
                        "Structured Data",
                        "Sitemap",
                        "Readability",
                        "Performance",
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <Tick />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-5 border-t pt-3 text-xs font-bold">SEO Performance</p>
                  <svg viewBox="0 0 300 70" className="mt-2 w-full">
                    <polyline
                      fill="none"
                      stroke="var(--chart-3)"
                      strokeWidth="2.5"
                      points="0,62 30,55 60,50 90,47 120,44 150,42 180,38 210,33 240,26 270,16 300,6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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

        <LocalBusinessOverview />

        <PublisherIntroVideo />

        <section
          aria-labelledby="official-release-title"
          className="my-12 rounded-lg border border-brand/20 bg-brand-soft p-6 md:p-8"
        >
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                Official WordPress.org release
              </p>
              <h2 id="official-release-title" className="mt-2 text-2xl font-extrabold md:text-3xl">
                PublishRank is now listed in the WordPress.org plugin directory
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                Review the official plugin listing, explore Local SEO for businesses alongside
                sitewide SEO and editorial tools, or install PublishRank from your dashboard.
              </p>
              <ul aria-label="PublishRank topics" className="mt-5 flex flex-wrap gap-2">
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
                  WordPress.org listing <ExternalLink aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/wordpress-org-release">
                  Read the launch announcement <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <PublisherSignalReactor />
        <ResearchPulse />

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
              Business SEO is here now—not just on the roadmap.
            </h2>
            <p className="mt-4 leading-relaxed">
              PublishRank works across WordPress websites, with a universal SEO toolkit and Local
              SEO profiles for real businesses. Publishers and newsrooms also get dedicated
              workflows, but they are one audience among many—not the whole product.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/about">
                Learn More <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="space-y-4 lg:border-l-2 lg:border-brand/40 lg:pl-8">
            {[
              `Local SEO for 134 business options in ${CURRENT_RELEASE}`,
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
        <PhotoShowcase />

        {/* Trust */}
        <section className="my-10 rounded-lg bg-brand-soft p-6">
          <h2 className="text-center text-xl font-extrabold">Made for the WordPress Community</h2>
          <div className="mt-5 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {(
              [
                [Globe, "100%", "Open Source", "text-ink"],
                [Zap, "Blazing Fast", "Performance", "text-brand"],
                [Heart, "Built with Care", "for WordPress teams", "text-brand"],
                [Code2, "WordPress", "Compatible with", "text-chart-3"],
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
            <h2 className="text-3xl font-extrabold">Ready to Boost Your Site's Visibility?</h2>
            <p className="mt-2 text-lg">
              <b>Download PublishRank</b> today and take your SEO to the next level.
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
              "134 Local SEO Business Types",
              "Open-Source WordPress SEO",
              "Tools for Every Website",
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
