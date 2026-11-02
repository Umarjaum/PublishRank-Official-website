import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Copy,
  Facebook,
  Linkedin,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { PageFrame } from "@/components/site-shell";
import { pageSeo } from "@/lib/page-seo";
import { editorialArticleSchema, formatEditorialDate, newsBySlug } from "@/lib/news-content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const article = newsBySlug[params.slug];
    if (!article)
      return pageSeo(
        `/news/${params.slug}`,
        "Article not found",
        "The requested PublishRank newsroom article could not be found.",
        { noindex: true },
      );
    return pageSeo(`/news/${article.slug}`, article.title, article.dek, {
      keywords: article.keywords,
      ogType: "article",
      image: article.image,
      imageAlt: article.imageAlt,
      imageWidth: article.imageWidth,
      imageHeight: article.imageHeight,
      publishedTime: article.published,
      modifiedTime: article.updated,
      articleSection: article.category,
      articleAuthor: article.author,
      extraSchema: [editorialArticleSchema(article)],
    });
  },
  component: NewsArticlePage,
});

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href;
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard permissions vary by browser */
    }
  }
  async function share() {
    if (navigator.share) await navigator.share({ title, url });
    else await copyLink();
  }
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share article">
      <span className="mr-1 inline-flex items-center gap-2 text-sm font-bold">
        <Share2 className="h-4 w-4 text-brand" />
        Share
      </span>
      <button type="button" onClick={share} className="share-button" aria-label="Share article">
        <Share2 className="h-4 w-4" />
      </button>
      <a
        className="share-button"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        className="share-button"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="share-button"
        aria-label="Copy article link"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
      {copied && <span className="text-xs font-bold text-success">Link copied</span>}
    </div>
  );
}

function NewsArticlePage() {
  const { slug } = Route.useParams();
  const article = newsBySlug[slug];
  if (!article)
    return (
      <PageFrame>
        <div className="site-width py-20">
          <h1 className="text-4xl font-extrabold">Article not found</h1>
          <Link to="/news" className="mt-4 inline-flex items-center gap-2 font-bold text-brand">
            <ArrowLeft className="h-4 w-4" />
            Back to the newsroom
          </Link>
        </div>
      </PageFrame>
    );
  return (
    <PageFrame>
      <article>
        <header className="border-b bg-brand-soft" data-gsap-reveal>
          <div className="site-width py-8 md:py-12">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              PublishRank newsroom
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                  {article.category}
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
                  {article.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  {article.dek}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">By {article.author}</span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Published {formatEditorialDate(article.published, "long")}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </span>
                </div>
              </div>
              <img
                src={article.image}
                alt={article.imageAlt}
                width={article.imageWidth}
                height={article.imageHeight}
                fetchPriority="high"
                className="aspect-[1.5/1] w-full rounded-2xl object-cover shadow-[var(--shadow-window)]"
              />
            </div>
          </div>
        </header>
        <div className="site-width grid gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,760px)_260px] lg:justify-between">
          <div className="min-w-0">
            <div className="mb-8 border-b pb-6">
              <ShareBar title={article.title} />
            </div>
            <div className="prose-publishrank">
              {article.sections.map((section) => (
                <section
                  key={section.heading}
                  className="border-b py-8 first:pt-0 last:border-b-0"
                  data-gsap-reveal
                >
                  <h2 className="text-2xl font-extrabold md:text-3xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-lg leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm font-semibold leading-relaxed"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <p className="text-sm text-muted-foreground">
                This article is part of the {SITE_NAME} publisher journal.
              </p>
              <Link to="/news" className="inline-flex items-center gap-2 font-bold text-brand">
                <ArrowLeft className="h-4 w-4" />
                More newsroom articles
              </Link>
            </div>
          </div>
          <aside className="self-start lg:sticky lg:top-28">
            <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
                Keep exploring
              </p>
              <h2 className="mt-2 text-lg font-extrabold">Build a stronger publishing system.</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                See how PublishRank connects article review, schema, sitemaps and archive
                maintenance.
              </p>
              <div className="mt-5 grid gap-2">
                <Link to="/enterprise" className="font-bold text-brand">
                  Enterprise publishing →
                </Link>
                <Link to="/documentation" className="font-bold text-brand">
                  Read the handbook →
                </Link>
                <Link to="/features" className="font-bold text-brand">
                  Explore features →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </PageFrame>
  );
}
