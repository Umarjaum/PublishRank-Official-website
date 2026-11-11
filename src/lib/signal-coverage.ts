export function calculateSignalCoverage(active: readonly boolean[]): number {
  if (active.length === 0) return 0;
  return Math.round((active.filter(Boolean).length / active.length) * 100);
}
