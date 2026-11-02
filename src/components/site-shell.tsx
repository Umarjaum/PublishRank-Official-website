import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, Download, Search, X, Heart, Github } from "lucide-react";
import { SiteSearch } from "@/components/site-search";
import { Button } from "@/components/ui/button";
import logo from "@/assets/publishrank-reference-logo.png.asset.json";
import { DownloadLink } from "@/components/download-link";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { LOGO_GIF, REPO_URL } from "@/lib/site";

const navigationGroups = [
  {
    label: "Product",
    intro: "Publisher-first SEO tools in one WordPress workflow.",
    links: [
      ["/features", "Explore features", "News SEO, schema, sitemaps and 40+ tools."],
      [
        "/comparisons",
        "Compare plugins",
        "Evaluate the workflow against your publication’s needs.",
      ],
      ["/download", "Download PublishRank", "Get the latest free, open-source release."],
    ],
  },
  {
    label: "Learn",
    intro: "Practical guides for setup, publishing and site maintenance.",
    links: [
      ["/documentation", "Documentation", "Follow the setup and editorial handbook."],
      ["/resources", "Resources", "Read guidance on news SEO and archive health."],
      ["/news", "Newsroom", "Product thinking, technical notes and publisher strategy."],
    ],
  },
  {
    label: "Enterprise",
    intro: "A durable operating model for growing publishing teams.",
    links: [
      [
        "/enterprise",
        "Enterprise publishing",
        "Governance, scale and SEO operations for larger teams.",
      ],
      ["/support", "Support & troubleshooting", "Find checks for metadata, sitemaps and schema."],
      ["/contact", "Talk to the team", "Send a question, issue or partnership enquiry."],
    ],
  },
] as const;

const footerGroups = [
  {
    title: "Product",
    links: [
      ["/features", "Features"],
      ["/comparisons", "Compare plugins"],
      ["/download", "Download"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["/documentation", "Documentation"],
      ["/resources", "Publisher resources"],
      ["/news", "Newsroom articles"],
      ["/support", "Support"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About"],
      ["/contact", "Contact"],
      ["/accessibility", "Accessibility"],
    ],
  },
  {
    title: "Operations",
    links: [
      ["/enterprise", "Enterprise publishing"],
      ["/support", "Troubleshooting"],
      ["/contact", "Contact the team"],
    ],
  },
] as const;

const legalLinks = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/cookies", "Cookies"],
  ["/disclaimer", "Disclaimer"],
  ["/security", "Security"],
] as const;

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-md bg-background px-4 py-2 font-bold text-foreground shadow-[var(--shadow-card)] focus-visible:outline"
    >
      Skip to main content
    </a>
  );
}

export function Logo() {
  return (
    <Link to="/" aria-label="PublishRank home" className="shrink-0">
      <img
        src={logo.url}
        alt="PublishRank — SEO for Publishers"
        width={220}
        height={54}
        className="brand-logo"
      />
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-width flex min-h-20 items-center justify-between gap-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-menu-button"
            aria-label={menuOpen ? "Close PublishRank navigation" : "Open PublishRank navigation"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-drawer"
          >
            <img src="/brand/publishrank-menu-icon.svg" alt="" width="54" height="32" />
          </button>
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <DownloadLink>
              <Download aria-hidden="true" />
              Download PublishRank
            </DownloadLink>
          </Button>
        </div>
      </div>
      {menuOpen && (
        <div id="site-navigation-drawer" className="navigation-drawer">
          <div className="site-width py-7">
            <div className="mb-6 flex items-center justify-between border-b pb-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                  Navigation
                </p>
                <p className="mt-1 text-lg font-extrabold">
                  Everything your publishing team needs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="mb-7 flex min-h-12 w-full items-center justify-between rounded-xl border bg-card px-4 text-left font-bold shadow-[var(--shadow-card)] hover:border-brand hover:bg-brand-soft"
            >
              <span className="flex items-center gap-3">
                <Search aria-hidden="true" className="h-5 w-5 text-brand" />
                Search PublishRank
              </span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-brand" />
            </button>
            <div className="grid gap-7 md:grid-cols-3">
              {navigationGroups.map((group) => (
                <section key={group.label}>
                  <h2 className="text-xs font-extrabold uppercase tracking-wide text-brand">
                    {group.label}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {group.intro}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {group.links.map(([to, label, description]) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setMenuOpen(false)}
                          className="group block rounded-xl border p-4 hover:border-brand hover:bg-brand-soft"
                        >
                          <span className="flex items-center justify-between font-bold">
                            {label}
                            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                            {description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-4 border-t pt-5 text-sm font-bold">
              <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-brand">
                About PublishRank
              </Link>
              <Link
                to="/accessibility"
                onClick={() => setMenuOpen(false)}
                className="hover:text-brand"
              >
                Accessibility
              </Link>
              <DownloadLink onClick={() => setMenuOpen(false)} className="text-brand">
                Download the plugin →
              </DownloadLink>
            </div>
          </div>
        </div>
      )}
      {searchOpen && <SiteSearch onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="border-b border-primary-foreground/20">
        <div
          className="site-width flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between"
          data-gsap-reveal
        >
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-foreground/65">
              Keep improving the publishing workflow
            </p>
            <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
              Clearer foundations for every story.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
              Review the setup handbook, explore newsroom articles, or get the latest release.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/documentation"
              className="inline-flex min-h-11 items-center rounded-full border border-primary-foreground/35 px-5 text-sm font-bold hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              Read the handbook
            </Link>
            <DownloadLink className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-extrabold text-primary-foreground hover:bg-brand-deep">
              Download PublishRank
            </DownloadLink>
          </div>
        </div>
      </div>
      <div className="site-width grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-6 lg:py-12">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <img
              src={LOGO_GIF}
              alt="PublishRank animated logo mark"
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-xl"
            />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              PublishRank on GitHub
            </a>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            WordPress SEO for the people who publish. Built around stories, authors and the life of
            an editorial archive.
          </p>
        </div>
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={`${group.title} links`}>
            <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-primary-foreground/60">
              {group.title}
            </h2>
            <ul className="grid gap-1 text-sm">
              {group.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="inline-flex min-h-10 items-center py-2 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="sm:col-span-2 lg:col-span-6">
          <div className="grid gap-8 border-t border-primary-foreground/20 pt-6 md:grid-cols-[1fr_2fr]">
            <nav aria-label="Legal and policy links">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-primary-foreground/60">
                Policies
              </h2>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm sm:grid-cols-3">
                {legalLinks.map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-flex min-h-10 items-center py-2 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Discovery files">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-primary-foreground/60">
                Site discovery
              </h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <li>
                  <a
                    href="/sitemap.xml"
                    className="inline-flex min-h-10 items-center py-2 hover:underline"
                  >
                    XML sitemap
                  </a>
                </li>
                <li>
                  <a
                    href="/news-sitemap.xml"
                    className="inline-flex min-h-10 items-center py-2 hover:underline"
                  >
                    Google News sitemap
                  </a>
                </li>
                <li>
                  <a
                    href="/robots.txt"
                    className="inline-flex min-h-10 items-center py-2 hover:underline"
                  >
                    robots.txt
                  </a>
                </li>
                <li>
                  <a
                    href="/llms.txt"
                    className="inline-flex min-h-10 items-center py-2 hover:underline"
                  >
                    llms.txt
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <div className="site-width flex flex-col gap-3 py-5 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>© 2026 PublishRank. All rights reserved.</span>
          <span>SEO powered by PublishRank</span>
          <span className="flex items-center gap-2">
            For journalism. Not for profit.{" "}
            <Heart aria-hidden="true" className="h-3 w-3 text-brand-soft" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <MotionEnhancer />
      <SkipLink />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageCta() {
  return (
    <section className="bg-brand text-primary-foreground">
      <div className="site-width grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold">A stronger publishing workflow.</h2>
          <p className="mt-2 text-primary-foreground/85">
            Start with the guide. Build a better foundation for every story.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" asChild>
            <Link to="/documentation">
              Read the documentation
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <DownloadLink>
              <Download aria-hidden="true" />
              Download PublishRank
            </DownloadLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
