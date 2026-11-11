import { describe, expect, it } from "vitest";
import { calculateSignalCoverage } from "@/lib/signal-coverage";

describe("publisher signal reactor", () => {
  it("shows zero coverage when no channels are selected", () => {
    expect(calculateSignalCoverage([])).toBe(0);
    expect(calculateSignalCoverage([false, false, false])).toBe(0);
  });

  it("calculates demo coverage from the active channel count", () => {
    expect(calculateSignalCoverage([true, false, true, false, true, false])).toBe(50);
  });

  it("shows full coverage when every demo channel is on", () => {
    expect(calculateSignalCoverage([true, true, true, true, true, true])).toBe(100);
  });
});
