import { useEffect } from "react";

/**
 * Progressive motion layer. Server-rendered content stays complete and visible for crawlers and
 * no-JS visitors; animation is added after hydration and skipped for prefers-reduced-motion.
 * - [data-gsap-reveal]   fade/slide in when scrolled into view
 * - [data-gsap-stagger]  reveal direct children one after another
 * - [data-count-to]      count up to the rendered number (keeps prefix/suffix text)
 * - .spotlight           glow follows the pointer (CSS variables --mx / --my)
 */
export function MotionEnhancer() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Pointer spotlight: cheap, CSS-variable based, no library needed.
    const onPointer = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    if (reduce.matches) {
      return () => document.removeEventListener("pointermove", onPointer);
    }

    let cancelled = false;
    let revertContext: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || reduce.matches) return;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          document.querySelectorAll<HTMLElement>("[data-gsap-reveal]").forEach((element) => {
            gsap.from(element, {
              y: 14,
              duration: 0.48,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });

          document.querySelectorAll<HTMLElement>("[data-gsap-stagger]").forEach((group) => {
            gsap.from(group.children, {
              y: 22,
              opacity: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: group, start: "top 88%", once: true },
            });
          });

          document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((element) => {
            const target = Number(element.dataset["countTo"]);
            if (!Number.isFinite(target)) return;
            const decimals = Number(element.dataset["countDecimals"] ?? 0);
            const format = (value: number) =>
              value.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            const state = { value: 0 };
            gsap.to(state, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
              onStart: () => {
                element.textContent = format(0);
              },
              onUpdate: () => {
                element.textContent = format(state.value);
              },
              onComplete: () => {
                element.textContent = format(target);
              },
            });
          });
        });
        revertContext = () => context.revert();
      },
    );

    return () => {
      cancelled = true;
      revertContext?.();
      document.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
