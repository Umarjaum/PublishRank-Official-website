import { useCallback, useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type EmblaApi = Parameters<NonNullable<ComponentProps<typeof Carousel>["setApi"]>>[0];

type AutoCarouselProps = {
  label: string;
  items: ReactNode[];
  /** Tailwind basis classes controlling how many cards are visible per breakpoint. */
  itemClassName?: string;
  intervalMs?: number;
};

/**
 * Auto-scrolling carousel. Advances on a timer, pauses on hover/focus or when the visitor
 * presses pause, and never auto-plays for visitors who prefer reduced motion.
 */
export function AutoCarousel({
  label,
  items,
  itemClassName = "basis-full md:basis-1/2 lg:basis-1/3",
  intervalMs = 4500,
}: AutoCarouselProps) {
  const [api, setApi] = useState<EmblaApi>();
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || hovered) return;
    const id = window.setInterval(() => api.scrollNext(), intervalMs);
    return () => window.clearInterval(id);
  }, [api, playing, hovered, intervalMs]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  const btn =
    "grid h-9 w-9 place-items-center rounded-full border bg-background text-foreground transition-colors hover:border-brand hover:text-brand";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} aria-label={label}>
        <CarouselContent className="-ml-4" aria-live={playing && !hovered ? "off" : "polite"}>
          {items.map((item, i) => (
            <CarouselItem key={i} className={`pl-4 ${itemClassName}`}>
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={prev} aria-label={`Previous ${label}`}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" className={btn} onClick={next} aria-label={`Next ${label}`}>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? `Pause ${label} auto-scroll` : `Play ${label} auto-scroll`}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label={`${label} slides`}>
          {Array.from({ length: snaps }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected}
              className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-brand" : "w-2 bg-border hover:bg-brand/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
