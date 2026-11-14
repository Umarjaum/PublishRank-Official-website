import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Download, ExternalLink, Search, X, Heart, Github } from "lucide-react";
import { SiteSearch } from "@/components/site-search";
import { Button } from "@/components/ui/button";
import { ProductDirectionNotice } from "@/components/product-direction-notice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "@/assets/publishrank-reference-logo.png.asset.json";
import { DownloadLink } from "@/components/download-link";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import {
  LOGO_GIF,
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  REPO_URL,
  UMARJAUM_URL,
  WORDPRESS_RELEASE_TAGS,
} from "@/lib/site";

const WORDPRESS_LAUNCH_DISMISS_KEY = "publishrank-wordpress-org-launch-dismissed-v1";

const navigationGroups = [
  {
    label: "Product",
    intro: "Publisher-tested SEO tools for WordPress sites across industries.",
    links: [
      ["/website-creation", "Website creation", "Next.js websites with SEO setup, from $2 once."],
      ["/features", "Explore features", "News SEO, schema, sitemaps and 40+ tools."],
      [
        "/comparisons",
        "Compare plugins",
        "Evaluate the workflow against your publication’s needs.",
      ],
      [
        "/wordpress-org-release",
        "Official WordPress.org release",
        "See the official listing, features and installation options.",
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
    intro: "A durable operating model for growing WordPress teams.",
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
      ["/website-creation", "Website creation"],
      ["/features", "Features"],
      ["/comparisons", "Compare plugins"],
      ["/wordpress-org-release", "WordPress.org release"],
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

function WordPressLaunchAnnouncement() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(WORDPRESS_LAUNCH_DISMISS_KEY) !== "dismissed") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(WORDPRESS_LAUNCH_DISMISS_KEY, "dismissed");
    } catch {
      // Keep the dialog dismissible for this visit even if browser storage is unavailable.
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) dismiss();
      }}
    >
      <DialogContent>
        <DialogHeader className="pr-7 text-left">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
            Official WordPress.org launch
          </p>
          <DialogTitle className="mt-2 text-2xl font-extrabold">
            PublishRank is now on WordPress.org
          </DialogTitle>
          <DialogDescription className="mt-2 text-base leading-relaxed">
            The free, open-source plugin is listed in the official WordPress directory. Review its
            features, then install it from your WordPress dashboard or download the release.
          </DialogDescription>
        </DialogHeader>
        <ul aria-label="PublishRank launch topics" className="flex flex-wrap gap-2">
          {WORDPRESS_RELEASE_TAGS.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full border bg-brand-soft px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </li>
          ))}
        </ul>
        <DialogFooter className="mt-2 flex-col-reverse gap-2 sm:flex-row sm:justify-start">
          <Button asChild onClick={dismiss}>
            <a href={PUBLISHRANK_WORDPRESS_PLUGIN_URL} target="_blank" rel="noopener noreferrer">
              View official listing <ExternalLink aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" onClick={dismiss}>
            <Link to="/wordpress-org-release">
              Read launch details <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" onClick={dismiss}>
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
        alt="PublishRank — WordPress SEO for publishers, bloggers and businesses"
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
      <ProductDirectionNotice />
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
                <p className="mt-1 text-lg font-extrabold">Everything your WordPress team needs.</p>
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
      <WordPressLaunchAnnouncement />
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
            <a
              href={UMARJAUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline"
            >
              UmarJaum official website ↗
            </a>
            <a
              href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline"
            >
              WordPress.org listing ↗
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
        <div className="sm:col-span-2 lg:col-span-6 border-t border-primary-foreground/20 pt-6">
          <nav aria-label="Legal and policy links">
            <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-primary-foreground/60">
              Policies
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm sm:grid-cols-3 lg:grid-cols-6">
              {legalLinks.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="inline-flex min-h-10 items-center py-2 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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

function SiteBreadcrumbs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const items = buildBreadcrumbs(pathname);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-background">
      <ol className="site-width flex flex-wrap items-center gap-2 px-5 py-3 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/70">
                /
              </span>
            )}
            {item.current ? (
              <span aria-current="page" className="font-semibold text-foreground">
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="hover:text-brand hover:underline">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageFrame({
  children,
  showBreadcrumbs = true,
}: {
  children: ReactNode;
  showBreadcrumbs?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <MotionEnhancer />
      <SkipLink />
      <SiteHeader />
      {showBreadcrumbs && <SiteBreadcrumbs />}
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
