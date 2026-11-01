import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { featureCatalog, featureCount, toolHighlights } from "@/lib/feature-catalog";
const featuresImg = "/brand/publishrank-features-showcase.jpg";

export function ToolHighlights() {
  const groups = Array.from(new Set(toolHighlights.map((t) => t.group)));
  return (
    <section className="site-width py-10" aria-labelledby="tools-title">
      <img src={featuresImg} alt="PublishRank feature cards: News Sitemaps, Schema Markup and Real-time Rank Tracking" width={1600} height={912} loading="lazy" className="mb-10 aspect-video w-full rounded-lg object-cover shadow-[var(--shadow-card)]" />
      <h2 id="tools-title" className="text-3xl font-extrabold">41 tools in one dashboard</h2>
      <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">Every tool lives in the PublishRank Tools Showcase, searchable by name or description. A few of the most used:</p>
      {groups.map((g) => (
        <div key={g} className="mt-8">
          <h3 className="text-sm font-extrabold uppercase text-brand">{g}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolHighlights.filter((t) => t.group === g).map((t) => (
              <article key={t.title} className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]">
                <h4 className="font-bold">{t.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function FeatureCatalogView() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      featureCatalog
        .map((c) => ({
          ...c,
          items: q && !c.title.toLowerCase().includes(q) ? c.items.filter((i) => i.toLowerCase().includes(q)) : c.items,
        }))
        .filter((c) => c.items.length > 0),
    [q],
  );
  const shown = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="all-features" className="bg-brand-soft" aria-labelledby="catalog-title">
      <div className="site-width py-12">
        <h2 id="catalog-title" className="text-3xl font-extrabold">The complete feature list</h2>
        <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
          {featureCount} documented capabilities across {featureCatalog.length} areas. Search to filter.
        </p>
        <div className="relative mt-6 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search features, e.g. sitemap" aria-label="Search features" className="bg-background pl-9" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing {shown} of {featureCount} features
        </p>
        {filtered.length === 0 ? (
          <p className="mt-8 rounded-lg border bg-card p-6 text-center">
            No features match “{query}”. Try a broader term such as “schema”, “sitemap” or “social”.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <article key={c.id} id={c.id} className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="flex items-start justify-between gap-3 font-extrabold">
                  <span>{c.title}</span>
                  <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand">{c.items.length}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                <ul className="mt-4 grid gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
