import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Gauge, Layers3, ShieldCheck, Users } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl } from "@/lib/site";

const enterpriseFaqs = [
  {
    q: "What does enterprise-ready mean for a publisher?",
    a: "It means the workflow is understandable, observable and maintainable across editorial, technical and leadership teams. PublishRank provides publisher-first checks and controls, but every organization should validate them on its own WordPress stack.",
  },
  {
    q: "Can PublishRank guarantee rankings or Google News inclusion?",
    a: "No. Sitemaps, metadata and structured data support discovery and understanding, but no plugin can guarantee rankings, inclusion, rich results, Discover placement or AI citations.",
  },
  {
    q: "How should a larger team roll out PublishRank?",
    a: "Start on staging, document current SEO ownership, test representative templates and articles, and roll out in a measured sequence. Keep a rollback plan for metadata, schema, sitemap and redirect changes.",
  },
  {
    q: "Does enterprise content require invented proof points?",
    a: "No. Responsible enterprise content should explain workflow, controls and limitations without inventing customer logos, performance claims, review counts or named teams.",
  },
];
export const Route = createFileRoute("/enterprise")({
  head: () =>
    pageSeo(
      "/enterprise",
      "Enterprise SEO Operations for Publishers",
      "A publisher-first operating model for editorial governance, technical SEO, structured data and archive health at scale.",
      {
        keywords:
          "enterprise SEO for publishers, newsroom governance, content operations, WordPress enterprise SEO",
        extraSchema: [
          {
            "@type": "Service",
            name: "PublishRank enterprise publishing workflow",
            serviceType: "Publisher SEO operations",
          },
          {
            "@type": "FAQPage",
            mainEntity: enterpriseFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ],
      },
    ),
  component: EnterprisePage,
});
function EnterprisePage() {
  const pillars = [
    [
      Users,
      "Editorial governance",
      "Give writers, editors and technical owners a shared vocabulary for story review, bylines, dates, images, handoffs and corrections.",
    ],
    [
      Layers3,
      "Composable foundations",
      "Connect publisher identity, templates, schema, sitemaps and canonical rules so teams can inspect the system instead of guessing.",
    ],
    [
      Gauge,
      "Operational visibility",
      "Use diagnostics, representative URL checks and release checklists to make SEO quality observable across a growing archive.",
    ],
    [
      ShieldCheck,
      "Responsible scale",
      "Keep access, crawl controls, redirects and plugin ownership explicit. Security hardening supports operations; it does not replace them.",
    ],
  ] as const;
  return (
    <PageFrame>
      <header className="border-b bg-brand-soft">
        <div className="site-width grid gap-10 py-10 md:grid-cols-[1.15fr_.85fr] md:items-end md:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Enterprise publishing
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              Make every publishing handoff more discoverable.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Enterprise SEO is not a pile of settings. It is a durable operating model that
              connects editorial judgment with technical evidence across every story, template and
              archive path.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/documentation"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-bold text-primary-foreground"
              >
                Read the enterprise handbook <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border px-6 font-bold hover:border-brand hover:text-brand"
              >
                Talk to the team
              </Link>
            </div>
          </div>
          <img
            src="/media/publishrank-newsroom.jpg"
            alt="Editorial team collaborating in a newsroom"
            width="1500"
            height="900"
            fetchPriority="high"
            className="aspect-[1.5/1] w-full rounded-2xl object-cover shadow-[var(--shadow-window)]"
          />
        </div>
      </header>
      <main id="main-content" className="site-width py-12 md:py-16">
        <section>
          <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
            The operating model
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-extrabold md:text-4xl">
            Scale the system, not the noise.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Growing publishers need clarity about what happens before publication, at release and
            after a story enters the archive. These pillars help teams make that clarity visible.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pillars.map(([Icon, title, text]) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <Icon className="h-8 w-8 text-brand" />
                <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="my-14 grid gap-8 rounded-2xl bg-ink p-7 text-primary-foreground md:grid-cols-[.9fr_1.1fr] md:p-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand-soft">
              A practical rollout
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">From pilot to publisher-wide habit.</h2>
            <p className="mt-4 leading-7 text-primary-foreground/75">
              Start with a representative set of article templates and one editorial desk. Validate
              the visible page, JSON-LD, canonical, sitemap and social output before you broaden the
              rollout.
            </p>
          </div>
          <ol className="grid gap-3">
            {[
              "Map current ownership and conflicts",
              "Test foundations and representative stories on staging",
              "Document the release checklist and rollback path",
              "Measure quality signals and refine the handoff",
            ].map((item, i) => (
              <li
                key={item}
                className="flex gap-4 rounded-xl border border-primary-foreground/15 p-4"
              >
                <span className="font-extrabold text-brand-soft">0{i + 1}</span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              Questions leaders ask
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">
              Enterprise clarity, without inflated claims.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The right answer is often a test plan, a clear owner or a documented limitation.
              Explore the questions teams should resolve before launch.
            </p>
          </div>
          <Accordion type="single" collapsible>
            {enterpriseFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`enterprise-faq-${i}`}>
                <AccordionTrigger className="text-left font-bold">{faq.q}</AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="mt-14 border-t pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">Build the foundation with PublishRank.</h2>
              <p className="mt-2 text-muted-foreground">
                Explore the product, documentation and publisher newsroom.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-brand">
              <Link to="/features" className="inline-flex items-center gap-1">
                Features <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/news" className="inline-flex items-center gap-1">
                Newsroom <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
