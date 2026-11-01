import { useEffect, useState } from "react";
import { LOGO_GIF } from "@/lib/site";

/**
 * Branded splash shown while the page hydrates. It is part of the server-rendered HTML,
 * fades out after a short moment, is skipped for reduced-motion visitors and for repeat
 * visits in the same session, and is hidden entirely when JavaScript is unavailable.
 */
export function SplashLoader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("pr-splash") === "1";
    } catch {
      // Storage can be blocked (private mode); just show the splash.
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const wait = seen || reduce ? 0 : 1100;
    const hide = window.setTimeout(() => {
      setPhase("hide");
      try {
        window.sessionStorage.setItem("pr-splash", "1");
      } catch {
        // ignore
      }
    }, wait);
    const remove = window.setTimeout(() => setPhase("gone"), wait + 450);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(remove);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div className="pr-splash" data-phase={phase} role="status" aria-live="polite">
      <img src={LOGO_GIF} alt="" width={112} height={112} className="pr-splash-logo" />
      <span className="sr-only">Loading PublishRank…</span>
    </div>
  );
}

/** Small branded spinner for slow route transitions. */
export function RoutePending() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <img src={LOGO_GIF} alt="" width={72} height={72} className="pr-splash-logo" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
