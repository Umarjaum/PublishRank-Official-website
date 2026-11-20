import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Film } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { absoluteUrl, CURRENT_RELEASE, SITE_NAME, SITE_URL } from "@/lib/site";
import { PRODUCT_VIDEO, RELEASE_VIDEO_226 } from "@/lib/promo-video";
import { pageSeo } from "@/lib/page-seo";

type VideoDetails = typeof PRODUCT_VIDEO | typeof RELEASE_VIDEO_226;

function videoObjectFor(video: VideoDetails, fragment: string) {
  return {
    "@type": "VideoObject",
    "@id": `${SITE_URL}${video.path}#${fragment}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.thumbnailPath)],
    uploadDate: video.uploadDate,
    duration: video.durationIso,
    contentUrl: absoluteUrl(video.filePath),
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
}

const releaseVideoSchema = videoObjectFor(RELEASE_VIDEO_226, "whats-new-2-26-0");
const introductionVideoSchema = videoObjectFor(PRODUCT_VIDEO, "product-introduction");

export const Route = createFileRoute("/video")({
  head: () =>
    pageSeo("/video", RELEASE_VIDEO_226.title, RELEASE_VIDEO_226.description, {
      rawTitle: true,
      image: RELEASE_VIDEO_226.thumbnailPath,
      imageWidth: 1920,
      imageHeight: 1080,
      imageAlt: "PublishRank 2.26.0 video showing the Access Shield sign-in page designer",
      extraSchema: [releaseVideoSchema, introductionVideoSchema],
    }),
  component: VideoWatchPage,
});

function VideoWatchPage() {
  return (
    <PageFrame>
      <article className="site-width py-10 md:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
            What's new · PublishRank {CURRENT_RELEASE} · 90-second video
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            What's new in PublishRank {CURRENT_RELEASE}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Watch a 90-second tour of the current release, including Schema Studio, schema
            diagnostics, Local SEO, live previews and improvements to setup and multilingual
            content.
          </p>
        </header>

        <section
          aria-label="PublishRank 2.26.0 What's New video"
          className="mx-auto mt-9 max-w-5xl"
        >
          <figure className="overflow-hidden rounded-3xl border bg-card shadow-lg">
            <video
              className="block h-auto max-h-[78vh] w-full bg-black"
              controls
              playsInline
              preload="metadata"
              poster={RELEASE_VIDEO_226.thumbnailPath}
              width={1920}
              height={1080}
              aria-label={RELEASE_VIDEO_226.title}
            >
              <source src={RELEASE_VIDEO_226.filePath} type="video/mp4" />
              Your browser does not support HTML video. You can download the MP4 below.
            </video>
            <figcaption className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-brand">
                  <Film aria-hidden="true" className="size-4" /> PublishRank SEO 2.26.0 · 90 seconds
                </p>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                  A visual walkthrough of the 2.26.0 interface and release highlights. Video claims
                  are presented as product context; the release notes describe capabilities and
                  testing scope in detail.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <a href={RELEASE_VIDEO_226.filePath} download>
                    <Download aria-hidden="true" /> Download the MP4
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/changelog">
                    Release notes <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </figcaption>
          </figure>
        </section>

        <section aria-labelledby="release-video-summary" className="mx-auto mt-8 max-w-4xl">
          <details className="rounded-2xl border bg-card p-5">
            <summary id="release-video-summary" className="cursor-pointer font-bold">
              Video topics and 2.26.0 highlights
            </summary>
            <ul className="mt-4 grid gap-3 pl-5 leading-relaxed text-muted-foreground sm:grid-cols-2">
              <li>
                Schema Studio templates for 246 catalogued Schema.org types and live JSON-LD
                previews.
              </li>
              <li>
                Schema diagnostics for syntax, vocabulary, values, links and connected references.
              </li>
              <li>Local SEO profiles for up to 50 locations, with their own details and pages.</li>
              <li>
                Updated setup wizard, richer previews and improvements to Arabic, Urdu and non-Latin
                content.
              </li>
            </ul>
          </details>
        </section>

        <section aria-labelledby="intro-video-heading" className="mx-auto mt-14 max-w-5xl">
          <header className="mx-auto mb-6 max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Short introduction · 15 seconds
            </p>
            <h2 id="intro-video-heading" className="mt-3 text-3xl font-extrabold">
              Meet PublishRank
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The concise, text-led introduction remains available as an overview of PublishRank's
              publishing roots.
            </p>
          </header>
          <figure className="grid gap-4 rounded-3xl border bg-card p-4 shadow-lg md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] md:items-center md:p-7">
            <video
              className="mx-auto block max-h-[70vh] w-auto max-w-full rounded-2xl bg-black shadow-md"
              controls
              playsInline
              preload="metadata"
              poster={PRODUCT_VIDEO.thumbnailPath}
              width={1080}
              height={1920}
              aria-label={PRODUCT_VIDEO.title}
            >
              <source src={PRODUCT_VIDEO.filePath} type="video/mp4" />
              Your browser does not support HTML video. You can download the MP4 below.
            </video>
            <figcaption className="space-y-4 px-2 py-3 md:px-4">
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <Film aria-hidden="true" className="size-4" /> 15-second product introduction
              </p>
              <p className="leading-relaxed text-muted-foreground">
                This earlier creative foregrounds publishers and newsroom workflows. PublishRank SEO
                is now positioned for the full range of WordPress websites, including businesses and
                online stores.
              </p>
              <Button asChild variant="outline" className="rounded-full">
                <a href={PRODUCT_VIDEO.filePath} download>
                  <Download aria-hidden="true" /> Download the introduction
                </a>
              </Button>
            </figcaption>
          </figure>
        </section>

        <nav
          aria-label="Related PublishRank pages"
          className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-5 text-sm font-bold"
        >
          <Link className="text-brand underline underline-offset-4" to="/download">
            Download the free plugin
          </Link>
          <Link className="text-brand underline underline-offset-4" to="/install">
            Follow the installation guide
          </Link>
          <Link className="text-brand underline underline-offset-4" to="/changelog">
            Read the {CURRENT_RELEASE} release notes
          </Link>
        </nav>
      </article>
    </PageFrame>
  );
}
