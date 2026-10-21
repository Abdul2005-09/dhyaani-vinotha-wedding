import { describe, expect, it } from "vitest";
import { MUHURTHAM_TARGET_MS, getRemaining } from "@/lib/countdown";

describe("Muhurtham countdown", () => {
  it("targets 22 November 2026 at 10:00 AM India time", () => {
    expect(new Date(MUHURTHAM_TARGET_MS).toISOString()).toBe("2026-11-22T04:30:00.000Z");
  });

  it("counts down days, hours, minutes and seconds", () => {
    const now = Date.parse("2026-11-21T03:29:30.000Z");
    expect(getRemaining(now)).toEqual({ days: 1, hours: 1, minutes: 0, seconds: 30 });
  });

  it("never shows negative numbers after the Muhurtham starts", () => {
    const later = Date.parse("2026-12-01T00:00:00.000Z");
    expect(getRemaining(later)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
