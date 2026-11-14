import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  LayoutTemplate,
  LifeBuoy,
  SearchCheck,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame } from "@/components/site-shell";
import { WebsiteCreationForm } from "@/components/website-creation-form";
import { WebsitePricing } from "@/components/website-pricing";
import { WEBSITE_PLANS, type WebsitePlanId } from "@/lib/website-pricing-data";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const questions = [
  {
    q: "What is included in Basic for $2?",
    a: "Basic is a one-page, responsive Next.js website with a practical technical SEO foundation and Vercel deployment setup. It does not include ongoing support, hosting or domain charges, paid services, or features outside the agreed one-page scope.",
  },
  {
    q: "What is included in the $10 Enterprise website?",
    a: "The Enterprise package covers up to five responsive pages, reusable design sections, per-page SEO setup, one simple Vercel serverless function if it fits the agreed scope, and one year of email support for the delivered site. Support can be extended for another year for $1 USD.",
  },
  {
    q: "Is hosting free?",
    a: "Vercel deployment setup is included in the service price. Vercel restricts its free Hobby plan to personal or non-commercial use, so a commercial business website may require a paid Vercel plan. The site owner pays any hosting, domain, or usage charges directly.",
  },
  {
    q: "How do local-currency prices work?",
    a: "The country selector shows an indicative conversion from the USD price using published reference exchange rates. The display refreshes when the rate source provides new data. It is not a live trading quote or a final payment amount.",
  },
  {
    q: "Does sending the project brief charge me?",
    a: "No. The form only sends a project brief so the scope can be reviewed. It does not collect payment or book work. Any work starts only after the scope and terms are confirmed.",
  },
];

const seoFoundations = [
  "Unique page title and meta description",
  "Canonical URL and search-engine indexing controls",
  "XML sitemap and robots.txt configuration",
  "Open Graph and social-sharing metadata",
  "Structured data where it accurately describes the page",
  "Semantic headings, mobile-friendly layout, and descriptive links",
];

const designDirections = [
  {
    name: "Clear and professional",
    description:
      "A focused service-business homepage with a strong offer, useful proof points, and an obvious contact action.",
    kind: "business",
  },
  {
    name: "Editorial and portfolio-led",
    description:
      "A calm portfolio or creator page that gives your work room to lead, with concise story and contact sections.",
    kind: "portfolio",
  },
  {
    name: "Warm and local",
    description:
      "A welcoming local-business layout that brings services, location, and next steps together.",
    kind: "local",
  },
] as const;

export const Route = createFileRoute("/website-creation")({
  head: () =>
    pageSeo(
      "/website-creation",
      "Next.js Website Design from $2",
      "Request a Next.js business website from $2 one-time. Compare Basic and Enterprise packages, explore SEO-ready design, and see prices in local currencies.",
      {
        keywords:
          "Next.js website design, website creation, small business website, technical SEO, Vercel deployment",
        extraSchema: [
          {
            "@type": "Service",
            "@id": `${SITE_URL}/website-creation#service`,
            name: "PublishRank Next.js website creation",
            serviceType: "Next.js website design, development and SEO setup",
            provider: { "@id": `${SITE_URL}/#organization` },
            offers: [
              {
                "@type": "Offer",
                name: WEBSITE_PLANS.basic.name,
                price: String(WEBSITE_PLANS.basic.usdPrice),
                priceCurrency: "USD",
                url: absoluteUrl("/website-creation"),
                description: WEBSITE_PLANS.basic.scope,
              },
              {
                "@type": "Offer",
                name: WEBSITE_PLANS.enterprise.name,
                price: String(WEBSITE_PLANS.enterprise.usdPrice),
                priceCurrency: "USD",
                url: absoluteUrl("/website-creation"),
                description: `${WEBSITE_PLANS.enterprise.scope} ${WEBSITE_PLANS.enterprise.support}`,
              },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: questions.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ],
      },
    ),
  component: WebsiteCreationPage,
});

function EmailReveal() {
  const [visible, setVisible] = useState(false);
  const address = ["publishrankseo", "gmail.com"].join("@");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="outline"
        className="min-h-11 rounded-full"
        aria-expanded={visible}
        aria-controls="website-contact-email"
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        {visible ? "Hide contact email" : "Reveal contact email"}
      </Button>
      {visible && (
        <a
          id="website-contact-email"
          href={`mailto:${address}`}
          className="font-bold text-brand underline underline-offset-4"
        >
          {address}
        </a>
      )}
    </div>
  );
}

function BrowserFrame({ kind }: { kind: (typeof designDirections)[number]["kind"] }) {
  if (kind === "business") {
    return (
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-xl border bg-white p-4 text-slate-900 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between border-b pb-3 text-[9px] font-bold uppercase tracking-[0.14em]">
          <span>YOUR BUSINESS</span>
          <span>About&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
          <div>
            <div className="h-2 w-14 rounded bg-emerald-700/70" />
            <div className="mt-3 h-3 w-11/12 rounded bg-slate-900/85" />
            <div className="mt-2 h-3 w-9/12 rounded bg-slate-900/75" />
            <div className="mt-3 h-2 w-full rounded bg-slate-300" />
            <div className="mt-1.5 h-2 w-10/12 rounded bg-slate-300" />
            <div className="mt-4 h-7 w-24 rounded-full bg-emerald-800" />
          </div>
          <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-100 to-amber-50" />
        </div>
      </div>
    );
  }
  if (kind === "portfolio") {
    return (
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-xl border bg-[#19233a] p-4 text-white shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-3 text-[9px] font-bold uppercase tracking-[0.14em]">
          <span>STUDIO / NAME</span>
          <span>Work&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span>
        </div>
        <div className="h-2 w-14 rounded bg-[#f5b7a6]" />
        <div className="mt-3 h-3 w-10/12 rounded bg-white/90" />
        <div className="mt-2 h-3 w-7/12 rounded bg-white/70" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="h-14 rounded bg-[#e8a88e]" />
          <div className="h-14 rounded bg-[#758aa7]" />
          <div className="h-14 rounded bg-[#f0d89c]" />
        </div>
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border bg-[#fffaf1] p-4 text-[#303a32] shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between border-b border-[#303a32]/15 pb-3 text-[9px] font-bold uppercase tracking-[0.14em]">
        <span>LOCAL BUSINESS</span>
        <span>Menu&nbsp;&nbsp; Visit&nbsp;&nbsp; Contact</span>
      </div>
      <div className="rounded-lg bg-[#e5ead9] p-4">
        <div className="h-2 w-12 rounded bg-[#60764d]" />
        <div className="mt-3 h-3 w-10/12 rounded bg-[#303a32]/85" />
        <div className="mt-2 h-2 w-8/12 rounded bg-[#303a32]/40" />
        <div className="mt-4 h-7 w-24 rounded-full bg-[#60764d]" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="h-2 rounded bg-[#303a32]/20" />
        <div className="h-2 rounded bg-[#303a32]/20" />
        <div className="h-2 rounded bg-[#303a32]/20" />
      </div>
    </div>
  );
}

function WebsiteCreationPage() {
  const [selectedPlan, setSelectedPlan] = useState<WebsitePlanId>("basic");

  return (
    <PageFrame showBreadcrumbs={false}>
      <header className="border-b bg-brand-soft">
        <div className="site-width py-8 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-semibold text-foreground">
              Website creation
            </span>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                Next.js websites · built-in SEO · Vercel deployment
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
                A sharper online home for your business.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Choose a focused one-page website or a broader multi-page build. Each starts with a
                modern Next.js foundation, a clear visual direction, and practical technical SEO.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#website-packages-title"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-bold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-brand-deep"
                >
                  Compare packages <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <EmailReveal />
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Basic from $2 USD once · Enterprise from $10 USD once · no payment is taken on this
                page.
              </p>
            </div>
            <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
              <div className="flex items-start gap-4">
                <Code2 className="h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
                    Made for modern discovery
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold">
                    Fast, structured, and ready to grow.
                  </h2>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6">
                {[
                  "Built with Next.js",
                  "SEO foundations configured before launch",
                  "Deployment setup on Vercel included",
                  "Optional serverless features scoped to your needs",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-brand-soft p-4 text-xs leading-5 text-muted-foreground">
                Vercel hosting charges and domain costs are separate. Vercel’s free Hobby plan is
                for personal or non-commercial use; commercial sites may need a paid plan.
              </p>
            </div>
          </div>
        </div>
      </header>

      <WebsitePricing selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />

      <section className="border-y bg-muted/25">
        <div className="site-width grid gap-10 py-12 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-16">
          <div>
            <SearchCheck className="h-9 w-9 text-brand" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              SEO-ready from day one
            </p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              The technical basics are part of the build.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              PublishRank’s experience with search presentation informs the site setup. Every agreed
              page is structured for people and crawlers, with metadata and discovery files
              configured to match its real content.
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-6">
              {seoFoundations.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              SEO setup improves technical readiness; no website can guarantee rankings, indexing,
              traffic, or rich results.
            </p>
          </div>
          <figure className="rounded-2xl border bg-card p-3 shadow-[var(--shadow-card)]">
            <img
              src="/images/publishrank-seo-editor-example.png"
              alt="PublishRank's WordPress editor showing SEO fields for published values, search appearance, social sharing, canonical URL, robots, and social image."
              width="1440"
              height="1000"
              loading="lazy"
              className="h-auto w-full rounded-xl border object-contain"
            />
            <figcaption className="px-2 pb-2 pt-3 text-xs leading-5 text-muted-foreground">
              A screenshot of PublishRank’s own WordPress SEO editor, supplied as an example of the
              search controls behind this service. It is not a customer website or a Next.js
              project.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="site-width py-12 md:py-16" aria-labelledby="design-directions-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Illustrative design directions
            </p>
            <h2 id="design-directions-title" className="mt-2 text-3xl font-extrabold md:text-4xl">
              Choose a feeling, then make it yours.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            These wireframe concepts are starting points, not client work. The intake form lets you
            tell us the style, sections, and features you need.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {designDirections.map((direction) => (
            <article
              key={direction.name}
              className="rounded-2xl border bg-card p-4 shadow-[var(--shadow-card)]"
            >
              <BrowserFrame kind={direction.kind} />
              <div className="mt-5 flex items-start gap-3">
                <LayoutTemplate className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-extrabold">{direction.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {direction.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-brand-soft">
        <div className="site-width grid gap-8 py-12 md:grid-cols-3 md:py-14">
          {[
            ["Share your brief", "Tell us what you do, who you serve, and the direction you like."],
            [
              "Confirm the scope",
              "We review your selected package and confirm any extras before work starts.",
            ],
            [
              "Launch with clarity",
              "The agreed website is built in Next.js and deployed to your Vercel account.",
            ],
          ].map(([title, description], index) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-black text-primary-foreground">
                {index + 1}
              </span>
              <div>
                <h2 className="font-extrabold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="website-intake"
        className="site-width scroll-mt-24 py-12 md:py-16"
        aria-labelledby="website-intake-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <LifeBuoy className="mx-auto h-8 w-8 text-brand" aria-hidden="true" />
          <h2 id="website-intake-title" className="mt-3 text-3xl font-extrabold md:text-4xl">
            Let’s scope your website.
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Share your goals, audience, design preferences, content readiness, desired pages, and
            hosting status. Your brief goes to PublishRank by email for review. Never send
            passwords, API keys, or private customer information.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-4xl">
          <WebsiteCreationForm selectedPlan={selectedPlan} />
        </div>
      </section>

      <section className="border-t bg-muted/25">
        <div className="site-width grid gap-8 py-12 md:grid-cols-[.75fr_1.25fr] md:py-16">
          <div>
            <Server className="h-8 w-8 text-brand" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Useful details before launch
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">Clear scope. No surprise checkout.</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Tell us what you know. We’ll confirm the package, hosting plan, and any extra features
              before work begins.
            </p>
          </div>
          <div className="grid gap-3">
            {questions.map((item) => (
              <details key={item.q} className="rounded-xl border bg-card p-5">
                <summary className="cursor-pointer font-extrabold">{item.q}</summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
