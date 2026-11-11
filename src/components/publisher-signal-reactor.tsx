import { useState } from "react";
import { Activity, ArrowRight, Check, RotateCcw, Sparkles, Zap } from "lucide-react";
import { calculateSignalCoverage } from "@/lib/signal-coverage";
import { DownloadLink } from "@/components/download-link";

const CHANNELS = [
  {
    key: "technical",
    short: "01",
    name: "Technical foundation",
    detail: "Metadata · canonicals · crawl controls",
  },
  {
    key: "schema",
    short: "02",
    name: "Article structure",
    detail: "Article + publisher structured data",
  },
  {
    key: "news",
    short: "03",
    name: "News discovery",
    detail: "News sitemap + publication identity",
  },
  {
    key: "authors",
    short: "04",
    name: "Author signals",
    detail: "Bylines · dates · editorial context",
  },
  { key: "social", short: "05", name: "Open social", detail: "Mastodon publishing workflows" },
  {
    key: "ai",
    short: "06",
    name: "Machine-readable context",
    detail: "Optional llms.txt + Schema endpoint",
  },
] as const;

const NODES = [
  { x: 160, y: 36 },
  { x: 266, y: 98 },
  { x: 266, y: 222 },
  { x: 160, y: 284 },
  { x: 54, y: 222 },
  { x: 54, y: 98 },
] as const;

const DEMO_PRESET = [true, false, true, false, true, false];

export function PublisherSignalReactor() {
  const [active, setActive] = useState<boolean[]>([...DEMO_PRESET]);
  const activeCount = active.filter(Boolean).length;
  const coverage = calculateSignalCoverage(active);
  const circumference = 2 * Math.PI * 51;
  const offset = circumference * (1 - coverage / 100);

  return (
    <section
      aria-labelledby="signal-reactor-title"
      className="relative isolate my-12 overflow-hidden rounded-[2rem] bg-ink text-white shadow-[var(--shadow-window)] md:my-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 83% 18%, rgba(238, 62, 115, .28), transparent 30%), radial-gradient(circle at 12% 94%, rgba(94, 77, 204, .3), transparent 32%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 32px 32px, 32px 32px",
        }}
      />
      <div
        className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 p-6 sm:p-8 md:p-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8 lg:p-12">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#e7ff85]">
              <Activity className="h-3.5 w-3.5" aria-hidden="true" /> Publisher Signal Lab
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e7ff85] motion-reduce:animate-none" />
              Browser-only demo
            </span>
          </div>

          <h2
            id="signal-reactor-title"
            className="mt-6 max-w-xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
          >
            Put your newsroom <span className="text-[#e7ff85]">in orbit.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Six publishing signals. One control room. Flip the switches and watch the network light
            up.
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-brand pl-4 text-sm leading-relaxed text-white/55">
            This is a visual demo—not a site scan, ranking prediction, or service request. Your
            clicks stay in this page and nothing is sent or saved.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActive(CHANNELS.map(() => true))}
              disabled={activeCount === CHANNELS.length}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e7ff85] px-5 font-extrabold text-[#17151d] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7ff85] disabled:cursor-default disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Zap className="h-4 w-4" aria-hidden="true" />
              Ignite all channels
            </button>
            <button
              type="button"
              onClick={() => setActive([...DEMO_PRESET])}
              disabled={active.every((value, index) => value === DEMO_PRESET[index])}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-5 font-semibold text-white/80 transition hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-default disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset demo
            </button>
          </div>

          <DownloadLink className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-[#e7ff85]">
            Take the tools to WordPress <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </DownloadLink>
        </div>

        <div className="grid items-center gap-5 rounded-[1.5rem] border border-white/10 bg-[#100f16]/75 p-4 backdrop-blur-sm sm:p-6 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div
            className="relative mx-auto aspect-square w-full max-w-[19rem]"
            aria-label={`Demo signal coverage: ${coverage} percent`}
          >
            <div
              className="absolute inset-[6%] rounded-full border border-dashed border-white/15 motion-safe:animate-spin motion-reduce:animate-none"
              style={{ animationDuration: "48s" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-[15%] rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              className="absolute inset-[29%] rounded-full border border-white/10"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 320 320"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="signal-reactor-core">
                  <stop offset="0%" stopColor="#e7ff85" stopOpacity=".17" />
                  <stop offset="100%" stopColor="#e7ff85" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="160" cy="160" r="100" fill="url(#signal-reactor-core)" />
              {NODES.map((node, index) => (
                <line
                  key={CHANNELS[index].key}
                  x1="160"
                  y1="160"
                  x2={node.x}
                  y2={node.y}
                  stroke={active[index] ? "#e7ff85" : "#aaa6ba"}
                  strokeOpacity={active[index] ? ".72" : ".18"}
                  strokeWidth={active[index] ? "1.5" : "1"}
                  strokeDasharray={active[index] ? "0" : "4 6"}
                  className="transition-all duration-500"
                />
              ))}
              <circle
                cx="160"
                cy="160"
                r="59"
                fill="#17151d"
                stroke="rgba(255,255,255,.15)"
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="160"
                r="51"
                fill="none"
                stroke="#e7ff85"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 160 160)"
                className="transition-[stroke-dashoffset] duration-700 ease-out"
              />
            </svg>

            {NODES.map((node, index) => (
              <span
                key={CHANNELS[index].key}
                className={`absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[10px] font-black tracking-tight transition-all duration-500 ${
                  active[index]
                    ? "scale-110 border-[#e7ff85] bg-[#e7ff85] text-[#17151d] shadow-[0_0_24px_rgba(231,255,133,.4)]"
                    : "border-white/20 bg-[#26232f] text-white/55"
                }`}
                style={{ left: `${(node.x / 320) * 100}%`, top: `${(node.y / 320) * 100}%` }}
                aria-hidden="true"
              >
                {CHANNELS[index].short}
              </span>
            ))}

            <div
              className="absolute inset-0 grid place-items-center text-center"
              aria-hidden="true"
            >
              <div className="mt-1">
                <span className="block text-4xl font-black tracking-tighter tabular-nums sm:text-5xl">
                  {coverage}%
                </span>
                <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/50">
                  Demo coverage
                </span>
              </div>
            </div>
            <span className="sr-only" aria-live="polite">
              {activeCount} of {CHANNELS.length} demo channels active, {coverage} percent demo
              coverage.
            </span>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-white/45">
                Signal switches
              </p>
              <p className="text-[10px] font-bold tabular-nums text-[#e7ff85]">
                {activeCount} / {CHANNELS.length} ON
              </p>
            </div>
            <ul className="space-y-2">
              {CHANNELS.map((channel, index) => (
                <li key={channel.key}>
                  <button
                    type="button"
                    aria-pressed={active[index]}
                    aria-label={`${channel.name}: ${active[index] ? "on" : "off"}`}
                    onClick={() =>
                      setActive((current) =>
                        current.map((value, itemIndex) => (itemIndex === index ? !value : value)),
                      )
                    }
                    className={`group flex min-h-[3.75rem] w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7ff85] ${
                      active[index]
                        ? "border-[#e7ff85]/40 bg-[#e7ff85]/[0.07]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${active[index] ? "bg-[#e7ff85] text-[#17151d]" : "bg-white/10 text-white/60"}`}
                    >
                      {active[index] ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        channel.short
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold leading-tight text-white">
                        {channel.name}
                      </span>
                      <span className="mt-1 block text-[10px] leading-tight text-white/45">
                        {channel.detail}
                      </span>
                    </span>
                    <span
                      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${active[index] ? "bg-[#e7ff85]" : "bg-white/15"}`}
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${active[index] ? "translate-x-[18px] bg-[#17151d]" : "translate-x-0.5"}`}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
