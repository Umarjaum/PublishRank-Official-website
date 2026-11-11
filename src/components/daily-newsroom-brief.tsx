import { useEffect, useState } from "react";
import { AlarmClock, ArrowRight, Check, Flame, RotateCcw, Share2, X } from "lucide-react";
import {
  DAILY_NEWSROOM_CASES,
  getDailyCaseIndex,
  getUtcDateKey,
  nextDailyStreak,
  visibleDailyStreak,
} from "@/lib/daily-newsroom";

type DailyProgress = {
  lastCompletedDate: string | null;
  streak: number;
  solved: number;
  lastCorrect: boolean | null;
  lastChoice: number | null;
};

const STORAGE_KEY = "publishrank-daily-newsroom-v1";
const EMPTY_PROGRESS: DailyProgress = {
  lastCompletedDate: null,
  streak: 0,
  solved: 0,
  lastCorrect: null,
  lastChoice: null,
};

function readProgress(): DailyProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return EMPTY_PROGRESS;

    const stored = value as Record<string, unknown>;
    const date =
      typeof stored["lastCompletedDate"] === "string" ? stored["lastCompletedDate"] : null;
    const validDate =
      date &&
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      new Date(`${date}T00:00:00.000Z`).toISOString().slice(0, 10) === date
        ? date
        : null;
    const streak =
      typeof stored["streak"] === "number" && Number.isFinite(stored["streak"])
        ? Math.max(0, Math.floor(stored["streak"]))
        : 0;
    const solved =
      typeof stored["solved"] === "number" && Number.isFinite(stored["solved"])
        ? Math.max(0, Math.floor(stored["solved"]))
        : 0;
    const lastChoice =
      typeof stored["lastChoice"] === "number" && [0, 1, 2].includes(stored["lastChoice"])
        ? stored["lastChoice"]
        : null;

    return {
      lastCompletedDate: validDate,
      streak,
      solved,
      lastCorrect: typeof stored["lastCorrect"] === "boolean" ? stored["lastCorrect"] : null,
      lastChoice,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function countdownToUtcMidnight(now: Date): string {
  const nextMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  const seconds = Math.max(0, Math.floor((nextMidnight - now.getTime()) / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
}

export function DailyNewsroomBrief() {
  const [now, setNow] = useState(() => new Date());
  const [progress, setProgress] = useState<DailyProgress>(EMPTY_PROGRESS);
  const [storageReady, setStorageReady] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    setProgress(readProgress());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const dateKey = getUtcDateKey(now);
  const caseNumber = getDailyCaseIndex(now);
  const caseCandidate = DAILY_NEWSROOM_CASES[caseNumber];
  if (!caseCandidate) return null;
  const dailyCase = caseCandidate;
  const isCompletedToday = storageReady && progress.lastCompletedDate === dateKey;
  const selectedChoice = isCompletedToday ? progress.lastChoice : null;
  const displayStreak = visibleDailyStreak(progress.lastCompletedDate, dateKey, progress.streak);
  const countdown = countdownToUtcMidnight(now);

  function answer(choiceIndex: number) {
    if (!storageReady || isCompletedToday) return;
    const isCorrect = choiceIndex === dailyCase.answer;
    const nextProgress: DailyProgress = {
      lastCompletedDate: dateKey,
      streak: nextDailyStreak(progress.lastCompletedDate, dateKey, progress.streak),
      solved: progress.solved + 1,
      lastCorrect: isCorrect,
      lastChoice: choiceIndex,
    };
    setProgress(nextProgress);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } catch {
      // The current visit still works if browser storage is unavailable.
    }
  }

  async function shareCase() {
    const url = `${window.location.origin}${window.location.pathname}#daily-deadline`;
    const payload = {
      title: "The Daily Newsroom Emergency",
      text: `Today's publisher case: ${dailyCase.title}. Can your desk make the right first move?`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setShareMessage("Case shared. Send the link to another desk.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Today's case link copied.");
      } else {
        setShareMessage("Copy this page's address to challenge another desk.");
      }
    } catch {
      setShareMessage(
        "Sharing was dismissed or unavailable. You can still copy this page's address.",
      );
    }
  }

  return (
    <section
      id="daily-deadline"
      aria-labelledby="daily-deadline-title"
      className="relative isolate my-12 overflow-hidden rounded-[2rem] border border-[#ff6172]/30 bg-[#0d0b11] text-white shadow-[var(--shadow-window)] md:my-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 9% 15%, rgba(255, 57, 77, .23), transparent 34%), radial-gradient(ellipse at 95% 95%, rgba(132, 41, 91, .2), transparent 34%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 28px 28px, 28px 28px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#ff6172] via-[#fb3158] to-transparent"
        aria-hidden="true"
      />

      <div className="relative grid gap-7 p-5 sm:p-7 md:p-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff6172]/30 bg-[#ff6172]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.17em] text-[#ff98a3]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6172] motion-reduce:animate-none" />
              Daily newsroom emergency
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
              Browser-local edition
            </span>
          </div>

          <h2
            id="daily-deadline-title"
            className="mt-6 max-w-xl text-3xl font-black leading-[1.04] tracking-tight sm:text-4xl md:text-5xl"
          >
            The newsroom is on <span className="text-[#ff7180]">deadline.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            One real-world publishing problem. Three possible first moves. Make the call, get the
            debrief, and come back for the next case.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-[#ff98a3]">
                <Flame className="h-4 w-4" aria-hidden="true" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">
                  Desk streak
                </span>
              </div>
              <p className="mt-2 text-3xl font-black tabular-nums">
                {displayStreak}
                <span className="ml-1 text-xs font-semibold text-white/50">days</span>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-[#ff98a3]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">
                  Cases closed
                </span>
              </div>
              <p className="mt-2 text-3xl font-black tabular-nums">{progress.solved}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#ff6172]/20 bg-[#ff6172]/[0.06] px-4 py-3">
            <div className="flex items-center gap-3">
              <AlarmClock className="h-5 w-5 shrink-0 text-[#ff7180]" aria-hidden="true" />
              <span>
                <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45">
                  Next case in
                </span>
                <span className="font-mono text-xl font-bold tabular-nums">{countdown}</span>
              </span>
            </div>
            <span className="text-right text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-white/45">
              UTC
              <br />
              rotation
            </span>
          </div>

          <p className="mt-4 max-w-md text-[11px] leading-relaxed text-white/40">
            Your streak is saved only in this browser. Cases rotate through a curated 20-case
            library; no account or tracking endpoint is involved. Sharing sends the link only if you
            choose it.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#17141d]/90 p-5 sm:p-7">
          <div
            className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#ff6172]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff98a3]">
                Today's case file
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold text-white/55">
                {dateKey} · {String(caseNumber + 1).padStart(2, "0")}/20
              </span>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff6172]/15 text-[#ff7180]">
                <RotateCcw className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/40">
                  Incoming editorial incident
                </p>
                <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
                  {dailyCase.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              {dailyCase.scene}
            </p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.15em] text-white/85">
              {dailyCase.prompt}
            </p>

            <div className="mt-3 space-y-2" role="group" aria-label="Choose your first move">
              {dailyCase.choices.map((choice, index) => {
                const isSelected = selectedChoice === index;
                const isCorrect = dailyCase.answer === index;
                const resultStyle = !isCompletedToday
                  ? "border-white/10 bg-white/[0.035] hover:border-[#ff7180]/55 hover:bg-[#ff6172]/[0.08]"
                  : isCorrect
                    ? "border-emerald-300/35 bg-emerald-300/[0.08]"
                    : isSelected
                      ? "border-[#ff7180]/50 bg-[#ff6172]/[0.1]"
                      : "border-white/5 bg-white/[0.02] opacity-55";

                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={!storageReady || isCompletedToday}
                    aria-pressed={isSelected}
                    onClick={() => answer(index)}
                    className={`flex min-h-[3.75rem] w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-xs leading-relaxed text-white transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff98a3] disabled:cursor-default ${resultStyle}`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[9px] font-black ${isCompletedToday && isCorrect ? "border-emerald-200 bg-emerald-200 text-[#102018]" : isSelected && !isCorrect ? "border-[#ff7180] bg-[#ff7180] text-[#160e12]" : "border-white/20 text-white/55"}`}
                    >
                      {isCompletedToday && isCorrect ? (
                        <Check className="h-3 w-3" aria-hidden="true" />
                      ) : isSelected && !isCorrect ? (
                        <X className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="flex-1">{choice}</span>
                  </button>
                );
              })}
            </div>

            {isCompletedToday && (
              <div
                className={`mt-4 rounded-xl border p-4 ${progress.lastCorrect ? "border-emerald-300/25 bg-emerald-300/[0.07]" : "border-[#ffbd69]/25 bg-[#ffbd69]/[0.07]"}`}
                aria-live="polite"
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.15em] ${progress.lastCorrect ? "text-emerald-200" : "text-[#ffcf8c]"}`}
                >
                  {progress.lastCorrect
                    ? "Clean save · case closed"
                    : "Debrief · the desk learned something"}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{dailyCase.debrief}</p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                {storageReady
                  ? isCompletedToday
                    ? "You have today's case"
                    : "Pick one first move"
                  : "Opening today's case…"}
              </span>
              <button
                type="button"
                onClick={shareCase}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-white/80 transition hover:border-[#ff98a3]/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff98a3]"
              >
                Challenge another desk <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 min-h-4 text-[10px] text-[#ffb1ba]" aria-live="polite">
              {shareMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
