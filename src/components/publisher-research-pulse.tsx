import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw, Rss } from "lucide-react";
import { chooseDifferentResearchItem, type ResearchItem } from "@/lib/research-feed";

type ResearchPayload = {
  items: ResearchItem[];
  checkedAt: string;
  sourcesAvailable: number;
  sourcesTotal: number;
};

const LAST_ITEM_KEY = "publishrank-research-last-item-v1";

function isResearchItem(value: unknown): value is ResearchItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item["id"] === "string" &&
    typeof item["title"] === "string" &&
    typeof item["excerpt"] === "string" &&
    typeof item["href"] === "string" &&
    typeof item["source"] === "string" &&
    typeof item["publishedAt"] === "string" &&
    Number.isFinite(Date.parse(item["publishedAt"]))
  );
}

function lastShownItemId(): string | null {
  try {
    return window.sessionStorage.getItem(LAST_ITEM_KEY);
  } catch {
    return null;
  }
}

function rememberItem(id: string) {
  try {
    window.sessionStorage.setItem(LAST_ITEM_KEY, id);
  } catch {
    // The research rotation remains usable when session storage is blocked.
  }
}

function formatPublishedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Publication date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

function formatCheckedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";
  return `${new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date)} UTC`;
}

export function ResearchPulse() {
  const [payload, setPayload] = useState<ResearchPayload | null>(null);
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    void (async () => {
      try {
        const response = await fetch("/api/research-pulse", {
          headers: { accept: "application/json" },
          signal: controller.signal,
        });
        const body: unknown = await response.json();
        if (!response.ok || typeof body !== "object" || body === null) {
          throw new Error("The official source feeds are temporarily unavailable.");
        }

        const record = body as Record<string, unknown>;
        const items = Array.isArray(record["items"]) ? record["items"].filter(isResearchItem) : [];
        const checkedAt = typeof record["checkedAt"] === "string" ? record["checkedAt"] : "";
        const sourcesAvailable =
          typeof record["sourcesAvailable"] === "number" ? record["sourcesAvailable"] : 0;
        const sourcesTotal =
          typeof record["sourcesTotal"] === "number" ? record["sourcesTotal"] : 0;
        const first = chooseDifferentResearchItem(items, lastShownItemId());
        if (!first || !checkedAt)
          throw new Error("No recent, date-stamped source items were available.");
        if (controller.signal.aborted) return;

        const nextPayload = { items, checkedAt, sourcesAvailable, sourcesTotal };
        setPayload(nextPayload);
        setSelected(first);
        rememberItem(first.id);
        setRotation((value) => value + 1);
      } catch {
        if (!controller.signal.aborted) {
          setError("The source feeds could not be reached just now. Retry to check again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [reload]);

  function showAnother() {
    if (!payload || payload.items.length < 2) return;
    const next = chooseDifferentResearchItem(payload.items, selected?.id ?? null);
    if (!next) return;
    setSelected(next);
    rememberItem(next.id);
    setRotation((value) => value + 1);
  }

  return (
    <section
      id="research-pulse"
      aria-labelledby="research-pulse-title"
      className="relative isolate my-12 overflow-hidden rounded-[2rem] border border-[#83e4bd]/25 bg-[#09110f] text-white shadow-[var(--shadow-window)] md:my-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 5% 8%, rgba(59, 204, 153, .16), transparent 34%), radial-gradient(ellipse at 97% 95%, rgba(75, 100, 220, .16), transparent 38%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 30px 30px, 30px 30px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#83e4bd] via-[#3dc693] to-transparent"
        aria-hidden="true"
      />

      <div className="relative grid gap-7 p-5 sm:p-7 md:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#83e4bd]/25 bg-[#83e4bd]/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#a4f1d2]">
            <Rss className="h-3.5 w-3.5" aria-hidden="true" />
            Official Search Research Pulse
          </span>
          <h2
            id="research-pulse-title"
            className="mt-6 max-w-xl text-3xl font-black leading-[1.04] tracking-tight sm:text-4xl md:text-5xl"
          >
            A different signal <span className="text-[#83e4bd]">each visit.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Official Google Search and WordPress updates, fetched as you visit and rotated to
            surface a different source each time. Explore the evidence and decide what matters for
            your business, publication, or site.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#a4f1d2]">
                Primary sources
              </span>
              <p className="mt-2 text-lg font-black">Google + WordPress</p>
              <p className="mt-1 text-[10px] text-white/45">Four official feeds</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#a4f1d2]">
                Feed check
              </span>
              <p className="mt-2 text-lg font-black">
                {payload ? `${payload.sourcesAvailable}/${payload.sourcesTotal}` : "—"}{" "}
                <span className="text-xs font-semibold text-white/55">sources</span>
              </p>
              <p className="mt-1 text-[10px] text-white/45">
                {payload
                  ? `Checked ${formatCheckedAt(payload.checkedAt)}`
                  : "Checking on this visit"}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-md text-[11px] leading-relaxed text-white/40">
            Source-authored headlines and excerpts only—no invented summaries or site-audit claims.
            The browser remembers the last item in this tab to avoid an immediate repeat; no visitor
            profile is sent.
          </p>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#131a18]/95 p-5 sm:p-7">
          <div
            className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#83e4bd]/[0.08] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a4f1d2]">
                This visit’s source
              </span>
              {selected && (
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold text-white/55">
                  SIGNAL {String(rotation).padStart(2, "0")}
                </span>
              )}
            </div>

            {loading && !selected ? (
              <div
                className="grid min-h-[18rem] place-items-center"
                role="status"
                aria-live="polite"
              >
                <div className="text-center">
                  <RefreshCw
                    className="mx-auto h-7 w-7 animate-spin text-[#83e4bd] motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm font-bold">Checking official research feeds…</p>
                  <p className="mt-1 text-xs text-white/45">Google Search Central · WordPress</p>
                </div>
              </div>
            ) : error && !selected ? (
              <div className="grid min-h-[18rem] place-items-center" role="alert">
                <div className="max-w-sm text-center">
                  <p className="text-lg font-black">Research is temporarily out of reach.</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{error}</p>
                  <button
                    type="button"
                    onClick={() => setReload((value) => value + 1)}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#83e4bd] px-5 text-sm font-extrabold text-[#07130f] transition hover:bg-[#a4f1d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Retry source check <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : selected ? (
              <article key={selected.id} aria-live="polite" aria-atomic="true">
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                  <span className="text-[#a4f1d2]">{selected.source}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={selected.publishedAt}>
                    {formatPublishedDate(selected.publishedAt)}
                  </time>
                </div>
                <h3 className="mt-4 text-xl font-black leading-tight sm:text-2xl">
                  {selected.title}
                </h3>
                <p className="mt-4 min-h-20 text-sm leading-relaxed text-white/70">
                  {selected.excerpt || "Open the official update to read the source directly."}
                </p>
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#83e4bd]/30 bg-[#83e4bd]/[0.07] px-4 text-xs font-extrabold text-[#b0f4d9] transition hover:bg-[#83e4bd]/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4f1d2]"
                >
                  Read the primary source <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ) : null}

            {selected && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                  {loading ? "Checking for newer research…" : "Source linked · date-stamped"}
                </span>
                <button
                  type="button"
                  onClick={showAnother}
                  disabled={!payload || payload.items.length < 2}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-extrabold text-white/80 transition hover:border-[#83e4bd]/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4f1d2] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Show another finding <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
