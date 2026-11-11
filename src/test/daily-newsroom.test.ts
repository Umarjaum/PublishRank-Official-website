import { describe, expect, it } from "vitest";
import {
  DAILY_NEWSROOM_CASES,
  getDailyCaseIndex,
  getUtcDateKey,
  nextDailyStreak,
  visibleDailyStreak,
} from "@/lib/daily-newsroom";

describe("daily newsroom brief", () => {
  it("keeps the same edition for the entire UTC date", () => {
    const beforeMidnight = new Date("2026-11-11T23:59:59.000Z");
    const afterMidnight = new Date("2026-11-12T00:00:00.000Z");
    expect(getUtcDateKey(beforeMidnight)).toBe("2026-11-11");
    expect(getDailyCaseIndex(beforeMidnight)).toBe(
      getDailyCaseIndex(new Date("2026-11-11T03:00:00.000Z")),
    );
    expect(getDailyCaseIndex(afterMidnight)).not.toBe(getDailyCaseIndex(beforeMidnight));
  });

  it("rotates through 20 curated cases with a valid answer in every case", () => {
    expect(DAILY_NEWSROOM_CASES).toHaveLength(20);
    expect(
      DAILY_NEWSROOM_CASES.every(
        (dailyCase) =>
          dailyCase.choices.length === 3 &&
          dailyCase.answer >= 0 &&
          dailyCase.answer <= 2 &&
          dailyCase.debrief.length > 0,
      ),
    ).toBe(true);
    const index = getDailyCaseIndex(new Date("2026-11-11T12:00:00.000Z"));
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(DAILY_NEWSROOM_CASES.length);
  });

  it("extends a streak for the next UTC day, but resets after a missed day", () => {
    expect(nextDailyStreak("2026-11-10", "2026-11-11", 4)).toBe(5);
    expect(nextDailyStreak("2026-11-09", "2026-11-11", 4)).toBe(1);
    expect(nextDailyStreak("2026-11-11", "2026-11-11", 4)).toBe(4);
    expect(nextDailyStreak(null, "2026-11-11", 0)).toBe(1);
    expect(visibleDailyStreak("2026-11-10", "2026-11-11", 4)).toBe(4);
    expect(visibleDailyStreak("2026-11-11", "2026-11-11", 4)).toBe(4);
    expect(visibleDailyStreak("2026-11-09", "2026-11-11", 4)).toBe(0);
  });
});
