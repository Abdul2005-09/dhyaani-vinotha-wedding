import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { clearedFraction, exceedsTapSlop, shouldAutoReveal } from "@/lib/scratch";
import { Flourish } from "./Flourish";

/* Canvas cannot read Tailwind classes, so the coating uses the wedding palette directly. */
const GOLD = "#D6B56D";
const GOLD_DEEP = "#A8843F";
const GOLD_LIGHT = "#F3E2B4";
const BURGUNDY = "#5A0A18";
const BURGUNDY_DEEP = "#3B0710";

const BRUSH_CSS_PX = 34;
const CLEAR_MS = 700;

type Phase = "covered" | "clearing" | "revealed";

function drawCoating(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, w, h);

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, GOLD_DEEP);
  g.addColorStop(0.3, GOLD);
  g.addColorStop(0.5, GOLD_LIGHT);
  g.addColorStop(0.7, GOLD);
  g.addColorStop(1, GOLD_DEEP);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Fine engraved diagonal lines
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = dpr;
  const gap = 5 * dpr;
  for (let x = -h; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, h);
    ctx.lineTo(x + h, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Foil speckle (seeded so it looks the same on every redraw)
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const dots = Math.round((w * h) / (220 * dpr * dpr));
  for (let i = 0; i < dots; i++) {
    ctx.fillStyle = rand() > 0.5 ? "rgba(255,248,225,0.35)" : "rgba(120,80,20,0.18)";
    ctx.fillRect(rand() * w, rand() * h, dpr, dpr);
  }

  // Engraved double border
  ctx.strokeStyle = "rgba(90,10,24,0.45)";
  ctx.lineWidth = dpr;
  ctx.strokeRect(6 * dpr, 6 * dpr, w - 12 * dpr, h - 12 * dpr);
  ctx.strokeStyle = "rgba(255,246,220,0.6)";
  ctx.strokeRect(9 * dpr, 9 * dpr, w - 18 * dpr, h - 18 * dpr);

  // Label (shrinks to fit narrow panels)
  const cx = w / 2;
  const cy = h / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  const canSpace = "letterSpacing" in c;
  const title = "SCRATCH TO REVEAL";
  let size = Math.min(17 * dpr, h / 7);
  let titleW = 0;
  for (let i = 0; i < 12; i++) {
    if (canSpace) c.letterSpacing = `${size * 0.2}px`;
    ctx.font = `600 ${size}px Cinzel, Georgia, serif`;
    titleW = ctx.measureText(title).width;
    if (titleW + size * 4 <= w - 28 * dpr) break;
    size *= 0.92;
  }
  ctx.fillStyle = BURGUNDY;
  ctx.fillText(title, cx, cy - size * 0.6);
  if (canSpace) c.letterSpacing = "0px";
  ctx.fillStyle = BURGUNDY_DEEP;
  ctx.font = `italic 500 ${size * 0.95}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText("gently scratch the gold to see our dates", cx, cy + size * 0.85);

  // Small diamonds either side of the title
  ctx.fillStyle = BURGUNDY;
  for (const sx of [-1, 1]) {
    const dx = cx + sx * (titleW / 2 + size * 1.1);
    const dy = cy - size * 0.6;
    const r = size * 0.22;
    ctx.beginPath();
    ctx.moveTo(dx, dy - r);
    ctx.lineTo(dx + r, dy);
    ctx.lineTo(dx, dy + r);
    ctx.lineTo(dx - r, dy);
    ctx.closePath();
    ctx.fill();
  }
}

type Drag = {
  id: number;
  x0: number;
  y0: number;
  last: { x: number; y: number } | null;
  scratching: boolean;
  moves: number;
};

export function ScratchReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("covered");
  const phaseRef = useRef<Phase>("covered");
  const drag = useRef<Drag | null>(null);
  const scratched = useRef(false);
  const dprRef = useRef(1);

  const reveal = useCallback(() => {
    if (phaseRef.current !== "covered") return;
    phaseRef.current = "clearing";
    setPhase("clearing");
    window.setTimeout(() => {
      phaseRef.current = "revealed";
      setPhase("revealed");
    }, CLEAR_MS);
  }, []);

  const paint = useCallback((preserve: boolean) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (preserve && canvas.width === w && canvas.height === h) return;

    let snapshot: HTMLCanvasElement | null = null;
    if (preserve && scratched.current && canvas.width > 1) {
      snapshot = document.createElement("canvas");
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      snapshot.getContext("2d")?.drawImage(canvas, 0, 0);
    }

    canvas.width = w;
    canvas.height = h;
    dprRef.current = dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCoating(ctx, w, h, dpr);
    if (snapshot) {
      // Keep earlier scratches when the panel changes size
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(snapshot, 0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    }
  }, []);

  useEffect(() => {
    if (phase === "revealed") return;
    paint(false);
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => paint(true));
    ro.observe(wrap);
    document.fonts?.ready.then(() => {
      if (!scratched.current && phaseRef.current === "covered") paint(false);
    });
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paint]);

  const toCanvas = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) * canvas.width) / rect.width,
      y: ((clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (shouldAutoReveal(clearedFraction(data, 6))) reveal();
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "covered" || e.button > 0) return;
    drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, last: null, scratching: false, moves: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || phaseRef.current !== "covered") return;
    if (!d.scratching) {
      if (!exceedsTapSlop(e.clientX - d.x0, e.clientY - d.y0)) return;
      d.scratching = true;
      d.last = toCanvas(d.x0, d.y0);
    }
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !d.last) return;
    const p = toCanvas(e.clientX, e.clientY);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH_CSS_PX * dprRef.current;
    ctx.beginPath();
    ctx.moveTo(d.last.x, d.last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    d.last = p;
    scratched.current = true;
    if (++d.moves % 8 === 0) checkProgress();
  };

  const onPointerEnd = (e: PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (d.scratching) checkProgress();
  };

  const covered = phase === "covered";

  return (
    <div>
      <div ref={wrapRef} className="relative">
        <div aria-hidden={covered ? true : undefined} className={phase === "revealed" ? undefined : "select-none"}>
          {children}
        </div>
        {phase !== "revealed" && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-testid="scratch-canvas"
            className={`scratch-canvas ${phase === "clearing" ? "is-clearing" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
          />
        )}
      </div>
      <div className="mt-3 flex h-9 items-center justify-center" aria-live="polite">
        {covered ? (
          <button type="button" onClick={reveal} className="btn-reveal">
            Reveal Dates
          </button>
        ) : (
          <>
            <Flourish className="w-24 text-gold" />
            <span className="sr-only">Dates revealed</span>
          </>
        )}
      </div>
    </div>
  );
}
