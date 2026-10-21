/** Fraction of the coating that must be scratched away before the rest auto-clears. */
export const REVEAL_THRESHOLD = 0.45;

/** A pointer must travel further than this (CSS px) before it counts as scratching, so a plain tap never erases anything. */
export const TAP_SLOP_PX = 6;

/** True once a pointer has moved far enough from where it went down to count as a scratch, not a tap. */
export function exceedsTapSlop(dx: number, dy: number, slop = TAP_SLOP_PX): boolean {
  return dx * dx + dy * dy > slop * slop;
}

/**
 * Share of pixels that are (mostly) transparent in RGBA canvas data.
 * `step` samples every Nth pixel to keep the check cheap.
 */
export function clearedFraction(rgba: ArrayLike<number>, step = 1): number {
  const stride = 4 * Math.max(1, Math.floor(step));
  let total = 0;
  let cleared = 0;
  for (let i = 3; i < rgba.length; i += stride) {
    total++;
    if (rgba[i] < 128) cleared++;
  }
  return total === 0 ? 0 : cleared / total;
}

export function shouldAutoReveal(fraction: number, threshold = REVEAL_THRESHOLD): boolean {
  return fraction >= threshold;
}
