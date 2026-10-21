// Muhurtham: Sunday, 22 November 2026, 10:00 AM Asia/Kolkata (UTC+5:30) = 04:30 UTC.
export const MUHURTHAM_TARGET_MS = Date.UTC(2026, 10, 22, 4, 30, 0);

export type Remaining = { days: number; hours: number; minutes: number; seconds: number };

export function getRemaining(nowMs: number, targetMs = MUHURTHAM_TARGET_MS): Remaining {
  const diff = Math.max(0, targetMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
