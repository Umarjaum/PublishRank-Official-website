import { useEffect } from "react";

/** Adds subtle scroll reveals without hiding server-rendered content from crawlers. */
export function MotionEnhancer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revertContext: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const targets = document.querySelectorAll<HTMLElement>("[data-gsap-reveal]");
        if (targets.length === 0) return;

        const context = gsap.context(() => {
          targets.forEach((element) => {
            gsap.from(element, {
              y: 14,
              duration: 0.48,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
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
    };
  }, []);

  return null;
}
