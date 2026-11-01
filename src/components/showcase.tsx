import { Link } from "@tanstack/react-router";
import { ArrowRight, Maximize2, MessageSquareQuote, Star } from "lucide-react";
import { AutoCarousel } from "@/components/auto-carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  brandCards,
  faqs,
  photoFallback,
  reviewSummary,
  screenshots,
  showcasePhotos,
  testimonials,
} from "@/lib/showcase-content";

export function Stars({ count, className = "h-4 w-4" }: { count: number; className?: string }) {
  return (
    <span className="inline-flex" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < count ? "fill-brand text-brand" : "text-border"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center gap-6">
        <span className="h-px flex-1 bg-brand/50" />
        <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
        <span className="h-px flex-1 bg-brand/50" />
      </div>
      {intro && (
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}

export function RatingBadge() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Stars count={5} className="h-5 w-5" />
      <span>
        <b>{reviewSummary.count}</b> {reviewSummary.label}
      </span>
    </div>
  );
}

export function ScreenshotShowcase() {
  return (
    <section id="inside" className="py-10" aria-labelledby="inside-title">
      <h2 id="inside-title" className="sr-only">
        Inside PublishRank
      </h2>
      <SectionTitle
        title="See PublishRank Inside WordPress"
        intro="Real screens from the plugin dashboard. Select a card to view the full screen."
      />
      <div className="mt-8">
        <AutoCarousel
          label="plugin screenshots"
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3"
          items={screenshots.map((s) => (
            <Dialog key={s.src}>
              <article className="h-full overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)]">
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative block h-80 w-full overflow-hidden bg-muted text-left"
                    aria-label={`Open full screenshot: ${s.title}`}
                  >
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      width={s.wide ? 1920 : 720}
                      height={s.wide ? 1088 : 1300}
                      className={`h-full w-full ${s.wide ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.02]`}
                    />
                    <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-brand text-primary-foreground shadow-md">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                </DialogTrigger>
                <div className="p-5">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </article>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
                <DialogTitle className="sr-only">{s.title}</DialogTitle>
                <DialogDescription className="sr-only">{s.text}</DialogDescription>
                <img src={s.src} alt={s.alt} className="w-full" />
              </DialogContent>
            </Dialog>
          ))}
        />
      </div>
    </section>
  );
}

export function BrandCardShowcase() {
  return (
    <section className="py-10" aria-labelledby="brand-title">
      <h2 id="brand-title" className="sr-only">
        PublishRank highlights
      </h2>
      <SectionTitle
        title="Rank Every Story Higher"
        intro="Enterprise-grade SEO for publishers, in one lightweight WordPress plugin."
      />
      <div className="mt-8">
        <AutoCarousel
          label="PublishRank highlights"
          itemClassName="basis-full md:basis-1/2"
          intervalMs={5000}
          items={brandCards.map((c) => (
            <figure
              key={c.src}
              className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)]"
            >
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                decoding="async"
                width={c.width}
                height={c.height}
                className={c.imageClassName ?? "aspect-video w-full object-cover"}
              />
              <figcaption className="px-5 py-3 text-sm font-bold">{c.title}</figcaption>
            </figure>
          ))}
        />
      </div>
    </section>
  );
}

export function TestimonialShowcase() {
  return (
    <section
      id="reviews"
      className="my-10 rounded-lg bg-brand-soft p-6 md:p-10"
      aria-labelledby="reviews-title"
    >
      <div className="text-center">
        <h2 id="reviews-title" className="text-2xl font-extrabold md:text-3xl">
          Loved by Publishers
        </h2>
        <div className="mt-4 flex justify-center">
          <RatingBadge />
        </div>
      </div>
      <div className="mt-8">
        <AutoCarousel
          label="publisher reviews"
          itemClassName="basis-full md:basis-1/2 lg:basis-1/3"
          intervalMs={5500}
          items={testimonials.map((t) => (
            <figure
              key={t.quote}
              className="flex h-full flex-col rounded-lg border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <Stars count={t.rating} />
                <MessageSquareQuote className="h-6 w-6 text-brand/30" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 border-t pt-4 text-sm">
                <b>{t.author}</b>
                <span className="block text-muted-foreground">{t.org}</span>
              </figcaption>
            </figure>
          ))}
        />
      </div>
    </section>
  );
}

export function PhotoShowcase() {
  return (
    <section className="py-10" aria-labelledby="photos-title">
      <h2 id="photos-title" className="sr-only">
        Publishing showcase
      </h2>
      <SectionTitle
        title="Made for the Way Newsrooms Work"
        intro="From the first draft to the long-term health of the archive."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {showcasePhotos.map((p) => (
          <figure
            key={p.src}
            className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)]"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              width={900}
              height={600}
              className="aspect-[3/2] w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = photoFallback;
              }}
            />
            <figcaption className="p-4 text-sm font-bold">{p.title}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Photography from Unsplash, used under the Unsplash License.
      </p>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-10" aria-labelledby="faq-title">
      <h2 id="faq-title" className="sr-only">
        Frequently asked questions
      </h2>
      <SectionTitle title="Frequently Asked Questions" />
      <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
            <AccordionContent className="leading-7 text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-6 text-center text-sm">
        Still need help?{" "}
        <Link to="/contact" className="inline-flex items-center gap-1 font-bold text-brand">
          Contact us <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </p>
    </section>
  );
}
