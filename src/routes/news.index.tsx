import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { formatEditorialDate, newsroomArticles } from "@/lib/news-content";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/news/")({
  head: () =>
    pageSeo(
      "/news",
      "PublishRank Newsroom & Publisher SEO Journal",
      "News, product features and practical field notes for publishers building a more discoverable editorial business.",
      {
        keywords:
          "publisher SEO newsroom, PublishRank features, enterprise news SEO, WordPress publishing strategy",
        extraSchema: [
          {
            "@type": "CollectionPage",
            name: "PublishRank Newsroom",
            url: absoluteUrl("/news"),
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
          {
            "@type": "ItemList",
            itemListElement: newsroomArticles.map((article, index) => ({
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
  const [leadStory, ...otherStories] = newsroomArticles;
  const latestStories = otherStories.slice(0, 3);
  const deskStories = otherStories.slice(3);

  return (
    <PageFrame>
      <header className="border-y-4 border-double" data-gsap-reveal>
        <div className="site-width py-5 md:py-7">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
            <span className="inline-flex items-center gap-2">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              {SITE_NAME} · The publisher’s journal
            </span>
            {leadStory && <span>Latest edition · {formatEditorialDate(leadStory.published)}</span>}
          </div>
          <div className="py-7 text-center md:py-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-muted-foreground">
              Newsroom · Product desk · Field notes
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl">
              The Publisher’s Journal
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Reporting and practical notes on the tools, workflows and technical foundations that
              help publishing teams do their best work.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t py-3 text-sm">
            <p className="font-semibold text-muted-foreground">
              {newsroomArticles.length} stories · Updated as the newsroom publishes
            </p>
            <Link to="/features" className="inline-flex items-center gap-2 font-bold text-brand">
              Explore the feature catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="site-width">
        {leadStory && (
          <section
            aria-labelledby="lead-story-title"
            className="grid gap-8 border-b py-8 md:py-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,.8fr)] lg:gap-10"
            data-gsap-reveal
          >
            <article className="group min-w-0">
              <Link
                to="/news/$slug"
                params={{ slug: leadStory.slug }}
                className="block focus-visible:rounded-sm"
              >
                <img
                  src={leadStory.image}
                  alt={leadStory.imageAlt}
                  width={leadStory.imageWidth}
                  height={leadStory.imageHeight}
                  fetchPriority="high"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="pt-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em]">
                    <span className="text-brand">{leadStory.category}</span>
                    <span aria-hidden="true" className="text-border">
                      /
                    </span>
                    <span className="text-muted-foreground">
                      Lead story · {formatEditorialDate(leadStory.published)}
                    </span>
                  </div>
                  <h2
                    id="lead-story-title"
                    className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight group-hover:text-brand md:text-5xl"
                  >
                    {leadStory.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                    {leadStory.dek}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">By {leadStory.author}</span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {leadStory.readTime}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 font-bold text-brand">
                      Read the lead story <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>

            <aside className="border-t pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                  On the wire
                </h2>
                <span className="text-xs font-semibold text-muted-foreground">Latest stories</span>
              </div>
              <ol className="divide-y">
                {latestStories.map((article, index) => (
                  <li key={article.slug} className="py-5 first:pt-4">
                    <article className="group">
                      <Link
                        to="/news/$slug"
                        params={{ slug: article.slug }}
                        className="block rounded-sm focus-visible:outline-offset-4"
                      >
                        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
                          <span className="mr-2 tabular-nums text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {article.category}
                        </p>
                        <h3 className="mt-2 text-xl font-extrabold leading-snug group-hover:text-brand">
                          {article.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {article.dek}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                          {formatEditorialDate(article.published)}
                          <span aria-hidden="true">·</span>
                          {article.readTime}
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
              <Link
                to="/features"
                className="mt-2 inline-flex items-center gap-2 border-t pt-4 text-sm font-extrabold text-brand hover:underline"
              >
                See every PublishRank feature <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </section>
        )}

        <section aria-labelledby="desk-stories-title" className="py-8 md:py-10" data-gsap-reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b pb-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                From the desks
              </p>
              <h2 id="desk-stories-title" className="mt-2 text-2xl font-extrabold md:text-3xl">
                Reporting, technical notes &amp; field guides
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Practical reading on newsroom operations, search presentation and the long-term health
              of a publisher’s archive.
            </p>
          </div>
          <div className="grid gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {deskStories.map((article) => (
              <article key={article.slug} className="group border-t-2 pt-4">
                <Link
                  to="/news/$slug"
                  params={{ slug: article.slug }}
                  className="block focus-visible:rounded-sm"
                >
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    width={article.imageWidth}
                    height={article.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="pt-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.13em]">
                      <span className="text-brand">{article.category}</span>
                      <span aria-hidden="true" className="text-border">
                        ·
                      </span>
                      <span className="font-semibold text-muted-foreground">
                        {formatEditorialDate(article.published)}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-extrabold leading-snug group-hover:text-brand">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.dek}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                      Continue reading <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
