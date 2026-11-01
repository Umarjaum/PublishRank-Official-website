import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, Download, Menu, X, Heart, Github, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/publishrank-reference-logo.png.asset.json";
import { DownloadLink } from "@/components/download-link";
import { LOGO_GIF, REPO_URL } from "@/lib/site";

const megaMenus = [
  {
    id: "product",
    label: "Product",
    intro: "Publisher-first SEO tools in one WordPress workflow.",
    links: [
      {
        to: "/features",
        label: "Explore features",
        description: "News SEO, schema, sitemaps and 40+ built-in tools.",
      },
      {
        to: "/comparisons",
        label: "Compare plugins",
        description: "Evaluate the workflow against your publication’s needs.",
      },
      {
        to: "/download",
        label: "Download PublishRank",
        description: "Get the latest free, open-source release.",
      },
    ],
  },
  {
    id: "learn",
    label: "Learn",
    intro: "Practical guides for setup, publishing and site maintenance.",
    links: [
      {
        to: "/documentation",
        label: "Documentation",
        description: "Follow the publisher’s setup and editorial handbook.",
      },
      {
        to: "/resources",
        label: "Resources",
        description: "Read guidance on news SEO and archive health.",
      },
      {
        to: "/support",
        label: "Support & troubleshooting",
        description: "Find checks for metadata, sitemaps and schema.",
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    intro: "Know the project, find help and keep the important links close.",
    links: [
      {
        to: "/about",
        label: "About PublishRank",
        description: "Learn about the publisher-focused project.",
      },
      {
        to: "/contact",
        label: "Contact the team",
        description: "Send a question, issue or feature request.",
      },
      {
        to: "/accessibility",
        label: "Accessibility",
        description: "Read the site’s accessibility statement.",
      },
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeMenu = megaMenus.find((menu) => menu.id === openMenu);

  function closeNavigation() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeNavigation();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenMenu(null);
          setMobileOpen(false);
        }
      }}
    >
      <div className="site-width flex min-h-20 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-3">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-semibold">
            {megaMenus.map((menu) => (
              <li key={menu.id}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === menu.id}
                  aria-controls={`mega-menu-${menu.id}`}
                  onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                  className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 hover:bg-muted hover:text-brand focus-visible:outline"
                >
                  {menu.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform ${openMenu === menu.id ? "rotate-180" : ""}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild className="hidden rounded-full lg:inline-flex">
          <DownloadLink>
            <Download aria-hidden="true" />
            Download PublishRank
          </DownloadLink>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-nav grid w-full gap-2 border-t py-4 lg:hidden"
          >
            {megaMenus.map((menu) => (
              <details key={menu.id} className="group border-b pb-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-2 font-bold marker:hidden">
                  {menu.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pb-2 text-sm leading-relaxed text-muted-foreground">{menu.intro}</p>
                <ul className="grid gap-1 pb-2">
                  {menu.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={closeNavigation}
                        className="block rounded-md px-3 py-2 hover:bg-muted hover:text-brand"
                      >
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <DownloadLink
              onClick={closeNavigation}
              className="inline-flex min-h-11 items-center gap-2 py-2 font-bold text-brand"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download PublishRank
            </DownloadLink>
          </nav>
        )}
      </div>
      {activeMenu && (
        <div
          id={`mega-menu-${activeMenu.id}`}
          className="absolute inset-x-0 top-full z-40 border-b bg-background shadow-[var(--shadow-card)]"
        >
          <div className="site-width grid gap-8 py-7 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
                {activeMenu.label}
              </p>
              <p className="mt-2 max-w-sm text-lg font-bold leading-relaxed">{activeMenu.intro}</p>
              <Link
                to="/download"
                onClick={closeNavigation}
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
              >
                Get PublishRank <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-2 sm:col-span-2 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              {activeMenu.links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={closeNavigation}
                    className="block h-full rounded-lg border p-4 transition-colors hover:bg-muted focus-visible:outline"
                  >
                    <span className="font-bold">{item.label}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="site-width grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:py-12">
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
        <div className="sm:col-span-2 lg:col-span-5">
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
