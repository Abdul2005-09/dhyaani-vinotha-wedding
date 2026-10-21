import { describe, expect, it } from "vitest";
import {
  REVEAL_THRESHOLD,
  clearedFraction,
  exceedsTapSlop,
  shouldAutoReveal,
} from "@/lib/scratch";

function pixels(alphas: number[]) {
  const data = new Uint8ClampedArray(alphas.length * 4);
  alphas.forEach((a, i) => (data[i * 4 + 3] = a));
  return data;
}

describe("scratch to reveal", () => {
  it("auto-reveals somewhere between 40% and 55% scratched", () => {
    expect(REVEAL_THRESHOLD).toBeGreaterThanOrEqual(0.4);
    expect(REVEAL_THRESHOLD).toBeLessThanOrEqual(0.55);
    expect(shouldAutoReveal(0.39)).toBe(false);
    expect(shouldAutoReveal(0.56)).toBe(true);
  });

  it("measures how much of the coating has been erased", () => {
    expect(clearedFraction(pixels([255, 255, 255, 255]))).toBe(0);
    expect(clearedFraction(pixels([0, 0, 255, 255]))).toBe(0.5);
    expect(clearedFraction(pixels([0, 0, 0, 0]))).toBe(1);
  });

  it("does not treat a tap without movement as a scratch", () => {
    expect(exceedsTapSlop(0, 0)).toBe(false);
    expect(exceedsTapSlop(3, 3)).toBe(false);
    expect(exceedsTapSlop(12, 0)).toBe(true);
  });
});
