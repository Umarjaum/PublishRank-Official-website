import { useMemo, useState } from "react";
import { Building2, Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { featureCatalog, featureCount, toolHighlights } from "@/lib/feature-catalog";
import { CURRENT_RELEASE } from "@/lib/site";
const featuresImg = "/brand/publishrank-features-showcase.jpg";

const localBusinessNiches = [
  { name: "General", count: 3, examples: "Local business, professional service, store" },
  { name: "Food & drink", count: 10, examples: "Restaurants, cafés, bakeries, bars, wineries" },
  { name: "Health & medical", count: 8, examples: "Clinics, doctors, hospitals, dentists, vets" },
  { name: "Beauty & wellness", count: 7, examples: "Salons, spas, tattoo parlors, gyms" },
  { name: "Home & construction", count: 9, examples: "Electricians, plumbers, roofers, movers" },
  { name: "Automotive", count: 10, examples: "Dealers, repair shops, rentals, gas stations" },
  {
    name: "Legal, finance & real estate",
    count: 11,
    examples: "Law firms, banks, accountants, agencies",
  },
  {
    name: "Lodging & travel stays",
    count: 8,
    examples: "Hotels, motels, hostels, vacation rentals",
  },
  {
    name: "Retail & shopping",
    count: 30,
    examples: "Book, clothing, grocery, electronics, pet stores",
  },
  {
    name: "Entertainment & nightlife",
    count: 8,
    examples: "Galleries, cinemas, casinos, nightclubs",
  },
  { name: "Sports & recreation", count: 9, examples: "Bowling, golf, pools, clubs, stadiums" },
  {
    name: "Education & child care",
    count: 7,
    examples: "Daycare, preschools, schools, universities",
  },
  {
    name: "Services & community",
    count: 7,
    examples: "Funeral homes, libraries, shelters, recycling",
  },
  {
    name: "Public services & media",
    count: 7,
    examples: "Government, post, emergency and media services",
  },
] as const;

export function LocalBusinessOverview() {
  return (
    <section
      id="local-business-seo"
      className="my-12 rounded-2xl border border-brand/20 bg-brand-soft p-5 md:p-8"
      aria-labelledby="local-business-title"
    >
      <div className="max-w-4xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
          Local SEO · 134 selectable options · 14 niches
        </p>
        <h2 id="local-business-title" className="mt-2 text-3xl font-extrabold md:text-4xl">
          WordPress SEO for every website—with Local SEO for 134 business types.
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Use PublishRank's SEO editor, structured data, sitemaps, redirects and technical controls
          on any WordPress site. For local companies and organizations, PublishRank supports 134
          selectable business profiles across 14 niches. Newsroom and editorial tools are included
          for publishers too—they are a specialty, not the limit of the product.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {localBusinessNiches.map((niche) => (
          <article key={niche.name} className="rounded-lg border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold">{niche.name}</h3>
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-extrabold text-brand">
                {niche.count} types
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{niche.examples}</p>
          </article>
        ))}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border bg-background p-5">
          <h3 className="flex items-center gap-2 font-extrabold">
            <Building2 aria-hidden="true" className="h-5 w-5 text-brand" />
            Business profile & location
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Set the business and legal name, description, address or service area, map coordinates,
            phone, email, website, logo and photos. Service-area businesses can hide their street
            address.
          </p>
        </article>
        <article className="rounded-lg border bg-background p-5">
          <h3 className="font-extrabold">Hours, services & bookings</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Add opening and holiday hours, price range, payment methods, currencies, languages,
            areas served, services and OfferCatalog details, booking links, founding date, tax ID
            and parent organization.
          </p>
        </article>
        <article className="rounded-lg border bg-background p-5">
          <h3 className="font-extrabold">Fields for each industry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Examples include restaurant cuisine, menus and reservations; hotel check-in, rooms and
            pets; medical specialties; bank fees pages; shop and dealer brands; and venue capacity.
          </p>
        </article>
        <article className="rounded-lg border bg-background p-5">
          <h3 className="font-extrabold">Schema mapped to real business types</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The 134 entries are selectable business-profile options mapped to LocalBusiness types,
            not 134 independent Schema.org classes. Structured data describes your business; it does
            not guarantee rankings or rich results.
          </p>
        </article>
      </div>
      <a
        href="/features#all-features"
        className="mt-6 inline-flex min-h-11 items-center font-bold text-brand underline underline-offset-4"
      >
        Browse the complete feature list and all 134 business options
      </a>
    </section>
  );
}

export function ToolHighlights() {
  const groups = Array.from(new Set(toolHighlights.map((t) => t.group)));
  return (
    <section className="site-width py-10" aria-labelledby="tools-title">
      <img
        src={featuresImg}
        alt="PublishRank feature cards: News Sitemaps, Schema Markup and Real-time Rank Tracking"
        width={1600}
        height={912}
        loading="lazy"
        className="mb-10 aspect-video w-full rounded-lg object-cover shadow-[var(--shadow-card)]"
      />
      <h2 id="tools-title" className="text-3xl font-extrabold">
        41 tools for businesses, publishers and site owners
      </h2>
      <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
        Sitewide SEO works across WordPress websites; specialized Local SEO, newsroom and publishing
        tools support different needs. Search or browse highlights below:
      </p>
      {groups.map((g) => (
        <div key={g} className="mt-8">
          <h3 className="text-sm font-extrabold uppercase text-brand">{g}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolHighlights
              .filter((t) => t.group === g)
              .map((t) => (
                <article
                  key={t.title}
                  className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
                >
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
          items:
            q && !c.title.toLowerCase().includes(q)
              ? c.items.filter((i) => i.toLowerCase().includes(q))
              : c.items,
        }))
        .filter((c) => c.items.length > 0),
    [q],
  );
  const shown = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="all-features" className="bg-brand-soft" aria-labelledby="catalog-title">
      <div className="site-width py-12">
        <h2 id="catalog-title" className="text-3xl font-extrabold">
          Every feature, organized and searchable
        </h2>
        <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
          Browse {featureCount} catalog entries across {featureCatalog.length} feature areas,
          including sitewide SEO, all 134 selectable Local SEO business options, and the new editor,
          commerce, feed and site-operation changes in v{CURRENT_RELEASE}. Search for any feature or
          business type.
        </p>
        <div className="relative mt-6 max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search features, e.g. restaurant or plumber"
            aria-label="Search features"
            className="bg-background pl-9"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing {shown} of {featureCount} catalog entries
        </p>
        {filtered.length === 0 ? (
          <p className="mt-8 rounded-lg border bg-card p-6 text-center">
            No features match “{query}”. Try a broader term such as “schema”, “sitemap” or “social”.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <h3 className="flex items-start justify-between gap-3 font-extrabold">
                  <span>{c.title}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    {c.badge && (
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary-foreground">
                        {c.badge}
                      </span>
                    )}
                    <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand">
                      {c.items.length}
                    </span>
                  </span>
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
