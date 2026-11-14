import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { newsArticles } from "@/lib/news-content";

type SearchItem = { title: string; description: string; href: string; type: "Page" | "News" };
const pages: SearchItem[] = [
  {
    title: "Features",
    description:
      "WordPress SEO for businesses and every website, Local SEO for 134 business options, plus publisher tools.",
    href: "/features",
    type: "Page",
  },
  {
    title: "Documentation",
    description: "Setup, article review, validation and troubleshooting.",
    href: "/documentation",
    type: "Page",
  },
  {
    title: "Comparisons",
    description: "A careful comparison framework for WordPress SEO plugins.",
    href: "/comparisons",
    type: "Page",
  },
  {
    title: "Resources",
    description: "Practical guidance for news SEO and archive health.",
    href: "/resources",
    type: "Page",
  },
  {
    title: "Enterprise",
    description: "Operating principles for larger publishing teams.",
    href: "/enterprise",
    type: "Page",
  },
  {
    title: "Newsroom",
    description: "News articles and product thinking from PublishRank.",
    href: "/news",
    type: "News",
  },
  {
    title: "Support",
    description: "Diagnostic checks for metadata, sitemaps and schema.",
    href: "/support",
    type: "Page",
  },
];

export function SiteSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const items = useMemo<SearchItem[]>(
    () => [
      ...pages,
      ...newsArticles.map((article) => ({
        title: article.title,
        description: article.dek,
        href: `/news/${article.slug}`,
        type: "News" as const,
      })),
    ],
    [],
  );
  const results = q
    ? items.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(q))
    : items.slice(0, 8);
  return (
    <div
      className="search-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-search-title"
    >
      <button
        type="button"
        className="search-backdrop"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="search-panel">
        <div className="flex items-center justify-between gap-4 border-b p-4 sm:p-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              PublishRank index
            </p>
            <h2 id="site-search-title" className="mt-1 text-xl font-extrabold">
              Search the site
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border hover:bg-muted"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative p-4 pb-3 sm:p-5 sm:pb-3">
          <Search
            className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-brand"
            aria-hidden="true"
          />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search features, guides, news…"
            className="h-14 w-full rounded-xl border bg-background pl-12 pr-4 text-base shadow-inner outline-none ring-brand/30 placeholder:text-muted-foreground focus:ring-4"
            aria-label="Search PublishRank"
          />
        </div>
        <div className="max-h-[55vh] overflow-y-auto px-4 pb-5 sm:px-5">
          <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {q
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "Popular destinations"}
          </p>
          {results.length ? (
            <ul className="grid gap-2">
              {results.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith("/news/") ? (
                    <Link
                      to="/news/$slug"
                      params={{ slug: item.href.split("/").pop() ?? "" }}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-xl border p-4 hover:border-brand hover:bg-brand-soft"
                    >
                      <span className="mt-0.5 rounded-full bg-brand-soft px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-brand">
                        {item.type}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">{item.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <Link
                      to={item.href as "/features"}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-xl border p-4 hover:border-brand hover:bg-brand-soft"
                    >
                      <span className="mt-0.5 rounded-full bg-muted px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground">
                        {item.type}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">{item.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No matches yet. Try “schema”, “sitemap”, “enterprise” or “news”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
