import type { CSSProperties } from "react";
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
  EyeOff,
  Fingerprint,
  Gauge,
  KeyRound,
  ListChecks,
  Lock,
  UserCog,
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
    pageSeo("/", "PublishRank SEO for WordPress | Free SEO Plugin", HOME_SEO_DESCRIPTION, {
      rawTitle: true,
      extraSchema: [softwareSchema, faqSchema],
      keywords:
        "PublishRank SEO, WordPress SEO plugin, business SEO, Local SEO, WooCommerce SEO, structured data, sitemaps, site security",
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
    Icon: Code2,
    title: "One persistent Gutenberg SEO sidebar",
    text: "SEO, Social, Schema, Advanced and Insights tabs bring editing together with discoverable controls, saved preferences and no duplicate boxes below the editor. Pop it out as a movable window, or dock it back; Google and social previews update live as you edit.",
    wide: true,
  },
  {
    Icon: ShieldCheck,
    title: "Safer media URL migrations",
    text: "Media Link Manager plans, previews, applies and verifies changes; it checks collisions, supports rollback and reports ambiguous references instead of guessing.",
    wide: false,
  },
  {
    Icon: Search,
    title: "More useful 404 diagnosis",
    text: "Separate own-site broken links from external referrals, see likely causes and create redirects only for high-confidence fixes.",
    wide: false,
  },
  {
    Icon: ListChecks,
    title: "A reviewable Bulk SEO Editor",
    text: "Filter and review edits before saving, prevent conflicts, track and undo changes, and use CSV safeguards for spreadsheet formulas.",
    wide: false,
  },
  {
    Icon: Newspaper,
    title: "Improved video sitemap discovery",
    text: "Find YouTube and Vimeo in Embed blocks and pasted links, use known thumbnails and skip entries without them rather than inventing values.",
    wide: false,
  },
  {
    Icon: Code2,
    title: "Clearer Schema Studio guidance",
    text: "Searchable type categories, guided properties and distinct Schema.org, Google requirement and recommendation checks improve the editing workflow.",
    wide: false,
  },
  {
    Icon: Globe,
    title: "Responsive and accessibility refinements",
    text: "Updated breakpoints, visible focus, target sizing, reduced-motion and forced-colours support. Automated checks were spot checks, not a full WCAG audit.",
    wide: true,
  },
] as const;

const tickerItems = [
  [ShieldCheck, "Traffic Guard · monitor or enforce"],
  [Globe, "249-country controls"],
  [ListChecks, "FAQ block & reusable collections"],
  [Search, "SEO Inspector & schema validation"],
  [Newspaper, "Source Directory"],
  [Lock, "Access Shield sign-in designer"],
  [EyeOff, "Maximum theme masking"],
  [Fingerprint, "Fingerprint scanner"],
  [UserCog, "Feature access rules"],
  [KeyRound, "Password & session policy"],
  [Globe, "XML, News & Image sitemaps"],
  [Building2, "134 Local SEO business types"],
  [Puzzle, "WooCommerce SEO"],
  [Code2, "Schema Library"],
  [Share2, "Mastodon publishing"],
  [BarChart3, "First-party analytics"],
  [Rss, "RSS & JSON feeds"],
] as const;

const verificationRows = [
  "Standard login page hidden",
  "User enumeration blocked",
  "XML-RPC disabled",
  "Brute-force lockout triggered",
  "Security headers present",
] as const;

function Index() {
  const audiences = [
    [
      "/media/screens/publishrank-2.26.0/publishrank-local-seo.jpg",
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
      "Creators & Publishers",
      "Improve discoverability for articles, resources, and content libraries.",
      "Creators",
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
      <section className="aurora" data-gsap-reveal>
        <SiteHeader />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
          <div>
            <p className="mb-2 text-sm font-extrabold tracking-wide text-brand">
              PublishRank SEO for WordPress
            </p>
            <Link
              to="/changelog"
              className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/20 bg-background/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-brand backdrop-blur transition hover:bg-background"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              New in v{CURRENT_RELEASE} · See what's new
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              One SEO operating layer for every WordPress website.
              <span className="text-gradient mt-2 block">
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
                  <span className="block font-bold">Download PublishRank SEO</span>
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
                to="/changelog"
                className="inline-flex min-h-10 items-center gap-2 hover:text-brand"
              >
                Read the v{CURRENT_RELEASE} release notes{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to="/video"
                className="inline-flex min-h-10 items-center gap-2 hover:text-brand"
              >
                Watch the 15-second introduction{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Requires WordPress 6.3+ and PHP 7.4+. SEO checks are guidance—not a promise of
              rankings or rich results.
            </p>
          </div>

          <aside
            className="console-card"
            aria-label="Example of an Access Shield live verification report"
          >
            <div className="console-bar">
              <span className="console-dot" aria-hidden="true" />
              <span className="console-dot" aria-hidden="true" />
              <span className="console-dot" aria-hidden="true" />
              <span className="ml-2 font-semibold">Access Shield · Live verification</span>
              <span className="ml-auto rounded-full border border-current/20 px-2 py-0.5">
                v{CURRENT_RELEASE}
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="console-muted text-[11px] font-bold uppercase tracking-[0.16em]">
                    Anonymous visitor probes
                  </p>
                  <p className="mt-1 text-2xl font-extrabold">Signed evidence report</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <ul className="mt-5 grid gap-2">
                {verificationRows.map((row, index) => (
                  <li key={row} className="console-row" style={{ "--i": index } as CSSProperties}>
                    <span className="console-pass" aria-hidden="true">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="flex-1">{row}</span>
                    <span className="console-muted text-xs">Pass</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-current/10 p-3">
                  <p className="console-muted text-xs">Theme fingerprint scan</p>
                  <p className="mt-1 font-bold">Protected</p>
                  <div className="console-meter mt-2" aria-hidden="true">
                    <span style={{ "--value": "100%" } as CSSProperties} />
                  </div>
                </div>
                <div className="rounded-xl border border-current/10 p-3">
                  <p className="console-muted text-xs">Report signature</p>
                  <p className="mt-1 flex items-center gap-1.5 font-bold">
                    <Fingerprint className="h-4 w-4 text-brand" aria-hidden="true" /> Verified
                  </p>
                  <p className="console-signature mt-1">sha256 · 9f2c…e41a</p>
                </div>
              </div>
              <p className="console-muted mt-4 text-[11px]">
                Illustrative example. Run it on your own site from Access Shield → Live verification
                or with <code>wp publishrank shield verify</code>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <main id="main-content" className="mx-auto max-w-6xl px-5">
        {/* Capability ticker */}
        <section aria-label="PublishRank capabilities" className="ticker relative z-10 -mt-5 py-2">
          <ul className="ticker-track">
            {[...tickerItems, ...tickerItems].map(([Icon, label], index) => (
              <li
                key={`${label}-${index}`}
                className="ticker-chip"
                aria-hidden={index >= tickerItems.length ? true : undefined}
              >
                <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        {/* Proof band */}
        <section
          aria-labelledby="proof-title"
          className="proof-band mt-10 px-6 py-10 md:px-10 md:py-12"
          data-gsap-reveal
        >
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center">
            <div>
              <p className="eyebrow eyebrow--night">
                2.26.1 sandbox verification · free and open source
              </p>
              <h2
                id="proof-title"
                className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl"
              >
                Verified workflows, with test limits stated.
              </h2>
              <p className="mt-3 text-sm leading-6 opacity-80">
                The supplied report records WordPress 7.1.5, PHP 8.3 and SQLite testing on a sandbox
                site, including clean install, database schema 7→8, editor workflows and responsive
                checks. It is not production-host testing; it also lists blocked, partial and
                untested integrations and environments.
              </p>
            </div>
            <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2" data-gsap-stagger>
              <div className="proof-stat">
                <dt className="sr-only">Admin screens opened on a clean install</dt>
                <dd>
                  <span className="proof-value" data-count-to="10">
                    10
                  </span>
                  <p className="proof-label">admin screens opened on the clean install</p>
                </dd>
              </div>
              <div className="proof-stat">
                <dt className="sr-only">Viewport widths checked for responsive overflow</dt>
                <dd>
                  <span className="proof-value">13</span>
                  <p className="proof-label">viewport widths checked for responsive overflow</p>
                </dd>
              </div>
              <div className="proof-stat">
                <dt className="sr-only">Database schema migration exercised</dt>
                <dd>
                  <span className="proof-value">7 → 8</span>
                  <p className="proof-label">database schema upgrade exercised in the sandbox</p>
                </dd>
              </div>
              <div className="proof-stat">
                <dt className="sr-only">PHP files syntax-checked on PHP 8.3</dt>
                <dd>
                  <span className="proof-value">259+</span>
                  <p className="proof-label">PHP files syntax-checked on PHP 8.3</p>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="py-12 md:py-16" aria-labelledby="release-highlights-title">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                New in {CURRENT_RELEASE}
              </p>
              <h2
                id="release-highlights-title"
                className="mt-2 text-3xl font-extrabold md:text-4xl"
              >
                Search, site protection and editorial tools in one WordPress plugin.
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Review security events, make page-level SEO checks, build reusable FAQs and maintain
                editorial sources. The 2.26.1 report describes sandbox testing and its limits; it
                does not claim production-host testing or universal compatibility.
              </p>
            </div>
            <Link
              to="/changelog"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-brand underline underline-offset-4"
            >
              Read all release notes <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-gsap-stagger>
            {releaseHighlights.map(({ Icon, title, text, wide }) => (
              <article key={title} className={`spotlight p-6 ${wide ? "xl:col-span-2" : ""}`}>
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
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
              to="/features"
              hash="local-business-seo"
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
