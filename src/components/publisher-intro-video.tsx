import introVideo from "@/assets/publishrank-seo-vertical-v2.mp4.asset.json";

export function PublisherIntroVideo() {
  return (
    <section
      id="publishrank-introduction-v2"
      aria-labelledby="publishrank-introduction-v2-title"
      className="my-12 overflow-hidden rounded-lg border border-brand/20 bg-card shadow-[var(--shadow-card)]"
      data-gsap-reveal
    >
      <div className="grid items-center gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
            Product introduction · version 2
          </p>
          <h2
            id="publishrank-introduction-v2-title"
            className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl"
          >
            See the publisher workflow in 15 seconds.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            A quick visual introduction to PublishRank and the publishing tools built for editorial
            teams.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The video starts muted where browser autoplay is allowed. Use the player controls to
            pause, replay or turn on sound.
          </p>
          <a
            href={introVideo.url}
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
          >
            Open the video directly
          </a>
        </div>
        <figure className="mx-auto w-full max-w-[20rem]">
          <video
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            aria-label="PublishRank 15-second product introduction, version 2"
            className="aspect-[9/16] max-h-[70vh] w-full rounded-lg border bg-ink object-contain shadow-[var(--shadow-card)]"
          >
            <source src={introVideo.url} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <figcaption className="mt-3 text-center text-xs font-semibold text-muted-foreground">
            15 seconds · muted autoplay with sound controls
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
