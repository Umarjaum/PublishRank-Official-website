import { ChevronDown, Image as ImageIcon } from "lucide-react";
import { allProductScreenshots, productScreenshotGroups } from "@/lib/product-screenshots";

export function ProductScreenshotGallery() {
  return (
    <section
      id="product-screenshots"
      className="site-width py-10"
      aria-labelledby="product-screenshots-title"
    >
      <div className="rounded-lg border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <div className="flex items-start gap-3">
          <ImageIcon className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              Screenshots · PublishRank 2.12.1 capture set
            </p>
            <h2 id="product-screenshots-title" className="mt-2 text-3xl font-extrabold">
              Explore the actual WordPress admin screens
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Browse the unedited screens by tool area. Select a group to see its screenshots;
              select an image to open the full-size capture.
            </p>
            <p className="mt-3 max-w-3xl rounded-md border border-amber-300/70 bg-amber-50 p-3 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              These captures were taken on a local WordPress test site using demo content. Some
              images visibly include test-only URLs, integrity notices, or version badges from that
              environment; they are examples, not live production or customer data.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-3">
          {productScreenshotGroups.map((group) => (
            <details key={group.id} className="group rounded-lg border bg-background">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-extrabold">{group.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {group.description}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                    {group.screenshots.length}
                  </span>
                  <ChevronDown
                    className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <div className="grid gap-4 border-t p-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.screenshots.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-md border bg-card">
                    <a
                      href={image.src}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open full-size screenshot: ${image.title}`}
                      className="group/image block overflow-hidden bg-muted"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[36/25] w-full object-contain transition-transform duration-300 group-hover/image:scale-[1.02]"
                      />
                    </a>
                    <figcaption className="p-3">
                      <h3 className="font-bold">{image.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{image.text}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {allProductScreenshots.length} screenshots across {productScreenshotGroups.length} tool
          areas.
        </p>
      </div>
    </section>
  );
}
