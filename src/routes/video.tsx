import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Film } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl, CURRENT_RELEASE, SITE_NAME, SITE_URL } from "@/lib/site";
import { PRODUCT_VIDEO } from "@/lib/promo-video";

const {
  path: WATCH_PAGE,
  title: VIDEO_TITLE,
  description: VIDEO_DESCRIPTION,
  filePath: VIDEO_FILE,
  thumbnailPath: VIDEO_THUMBNAIL,
  uploadDate: VIDEO_PUBLISHED,
  durationIso: VIDEO_DURATION,
} = PRODUCT_VIDEO;

const videoObject = {
  "@type": "VideoObject",
  "@id": `${SITE_URL}${WATCH_PAGE}#video`,
  name: VIDEO_TITLE,
  description: VIDEO_DESCRIPTION,
  thumbnailUrl: [absoluteUrl(VIDEO_THUMBNAIL)],
  uploadDate: VIDEO_PUBLISHED,
  duration: VIDEO_DURATION,
  contentUrl: absoluteUrl(VIDEO_FILE),
  encodingFormat: "video/mp4",
  creator: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export const Route = createFileRoute("/video")({
  head: () =>
    pageSeo(WATCH_PAGE, VIDEO_TITLE, VIDEO_DESCRIPTION, {
      rawTitle: true,
      image: "/brand/publishrank-og-share-card.jpg",
      imageWidth: 1200,
      imageHeight: 640,
      imageAlt: "PublishRank SEO for WordPress product introduction video",
      extraSchema: [videoObject],
    }),
  component: VideoWatchPage,
});

function VideoWatchPage() {
  return (
    <PageFrame>
      <article className="site-width py-10 md:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
            Product video · 15 seconds · Version 2
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            PublishRank SEO for WordPress
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Watch the short, text-led introduction to PublishRank’s publishing-era SEO toolkit. This
            video has music and on-screen text, but no spoken narration.
          </p>
          <p className="mx-auto mt-5 max-w-2xl rounded-xl border border-brand/20 bg-brand-soft px-5 py-4 text-sm font-semibold leading-relaxed">
            Production-ready and free to use. All features have been tested on real websites by the
            PublishRank Community, with no errors reported. The current {CURRENT_RELEASE} release
            supports business sites, stores, creators, publishers and websites of every kind.
          </p>
        </header>

        <section
          aria-label="PublishRank product introduction video"
          className="mx-auto mt-9 max-w-4xl"
        >
          <figure className="grid gap-4 rounded-3xl border bg-card p-4 shadow-lg md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] md:items-center md:p-7">
            <video
              className="mx-auto block max-h-[78vh] w-auto max-w-full rounded-2xl bg-black shadow-md"
              controls
              playsInline
              preload="metadata"
              poster={VIDEO_THUMBNAIL}
              width={1080}
              height={1920}
              aria-label={VIDEO_TITLE}
            >
              <source src={VIDEO_FILE} type="video/mp4" />
              Your browser does not support HTML video. You can download the MP4 below.
            </video>
            <figcaption className="space-y-4 px-2 py-3 md:px-4">
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <Film aria-hidden="true" className="size-4" /> 15-second product introduction
              </p>
              <p className="leading-relaxed text-muted-foreground">
                This earlier creative foregrounds publishers and newsroom workflows. PublishRank SEO
                is now positioned for the full range of WordPress websites, including businesses and
                online stores. The video remains a concise introduction to the project’s publishing
                roots.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <a href={VIDEO_FILE} download>
                    <Download aria-hidden="true" /> Download the MP4
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/features">
                    Explore current features <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </figcaption>
          </figure>
        </section>

        <section aria-labelledby="video-text-title" className="mx-auto mt-10 max-w-3xl">
          <details className="rounded-2xl border bg-card p-5">
            <summary id="video-text-title" className="cursor-pointer font-bold">
              Read the on-screen text summary
            </summary>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground">
              <li>
                The opening asks bloggers and news publishers about paid SEO plugins, then presents
                PublishRank as free and open source.
              </li>
              <li>
                The middle highlights newsroom workflows, sitemaps, structured data, AI discovery,
                FAQ blocks and community-platform integrations.
              </li>
              <li>
                The closing emphasizes no paid add-ons, free availability on WordPress.org and
                PublishRank’s product website.
              </li>
            </ol>
          </details>
        </section>

        <nav
          aria-label="Related PublishRank pages"
          className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-5 text-sm font-bold"
        >
          <Link className="text-brand underline underline-offset-4" to="/download">
            Download the free plugin
          </Link>
          <Link className="text-brand underline underline-offset-4" to="/changelog">
            Read the {CURRENT_RELEASE} release notes
          </Link>
        </nav>
      </article>
    </PageFrame>
  );
}
