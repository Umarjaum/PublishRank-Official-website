import { ArrowRight, Building2, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PRODUCT_DIRECTION } from "@/lib/site";

export function ProductDirectionNotice() {
  return (
    <aside
      aria-labelledby="product-direction-headline"
      className="relative isolate overflow-hidden border-b border-primary-foreground/15 text-primary-foreground shadow-[var(--shadow-card)]"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-20 hidden h-56 w-56 rounded-full border border-primary-foreground/15 md:block"
      >
        <span className="absolute inset-7 rounded-full border border-primary-foreground/10" />
        <span className="absolute inset-14 rounded-full border border-primary-foreground/10" />
        <span className="absolute right-10 top-12 h-2 w-2 rounded-full bg-white/80" />
      </div>
      <div className="site-width relative grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-6">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.16em]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-300 motion-safe:animate-pulse"
            />
            {PRODUCT_DIRECTION.eyebrow}
          </p>
          <p
            id="product-direction-headline"
            className="mt-3 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl"
          >
            {PRODUCT_DIRECTION.headline}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-foreground/85 md:text-base">
            {PRODUCT_DIRECTION.summary}
          </p>
          <ul aria-label="Planned development areas" className="mt-3 flex flex-wrap gap-2">
            <li className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-bold">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              Security enhancements
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-bold">
              <Building2 aria-hidden="true" className="h-4 w-4" />
              Broader business features
            </li>
          </ul>
          <p className="mt-2 text-xs font-semibold text-primary-foreground/75">
            {PRODUCT_DIRECTION.statusNote}
          </p>
        </div>
        <Link
          to="/features"
          aria-label="Explore PublishRank features available today"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-5 text-sm font-extrabold transition hover:bg-primary-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          Explore current features
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
