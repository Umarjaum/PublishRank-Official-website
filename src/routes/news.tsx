import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { pageSeo } from "@/lib/page-seo";
import { newsArticles } from "@/lib/news-content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/news")({
  head: () =>
    pageSeo(
      "/news",
      "PublishRank Newsroom & Publisher SEO Journal",
      "News, operating principles and technical guidance for publishers building a more discoverable editorial business.",
      {
        keywords: "publisher SEO newsroom, enterprise news SEO, WordPress publishing strategy",
        extraSchema: [
          {
            "@type": "CollectionPage",
            name: "PublishRank Newsroom",
            url: absoluteUrl("/news"),
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
          {
            "@type": "ItemList",
            itemListElement: newsArticles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/news/${article.slug}`),
              name: article.title,
            })),
          },
        ],
      },
    ),
  component: NewsroomPage,
});

function NewsroomPage() {
  return (
    <PageFrame>
      <section className="border-b bg-brand-soft">
        <div className="site-width grid gap-8 py-10 md:grid-cols-[1.1fr_.9fr] md:items-end md:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              {SITE_NAME} newsroom
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              Ideas for the people who publish.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              An editorial journal for news SEO, enterprise content operations, structured data and
              the systems that help good reporting travel further.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-6 shadow-[var(--shadow-card)]">
            <Newspaper className="h-8 w-8 text-brand" />
            <p className="mt-4 text-xl font-extrabold">A better publishing system compounds.</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Use the newsroom as a practical reference: strong foundations, clear handoffs and
              honest expectations about what SEO can and cannot do.
            </p>
          </div>
        </div>
      </section>
      <main id="main-content" className="site-width py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              Latest thinking
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">News, notes and field guides</h2>
          </div>
          <Link to="/enterprise" className="inline-flex items-center gap-2 font-bold text-brand">
            Explore enterprise publishing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {newsArticles.map((article, index) => (
            <article
              key={article.slug}
              className={`group overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)] ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <Link to="/news/$slug" params={{ slug: article.slug }} className="block">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  width={1200}
                  height={700}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full object-cover transition duration-500 group-hover:scale-[1.02] ${index === 0 ? "aspect-[2/1]" : "aspect-[1.6/1]"}`}
                />
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-brand">
                    <span>{article.category}</span>
                    <span className="text-border">•</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3
                    className={`${index === 0 ? "text-3xl" : "text-xl"} mt-3 font-extrabold leading-tight group-hover:text-brand`}
                  >
                    {article.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{article.dek}</p>
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(article.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-brand">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </PageFrame>
  );
}
