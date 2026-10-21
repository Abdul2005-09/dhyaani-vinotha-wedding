import { useEffect, useState } from "react";
import { getRemaining } from "@/lib/countdown";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const r = now === null ? null : getRemaining(now);
  const units = [
    { label: "Days", value: r ? String(r.days) : "--" },
    { label: "Hours", value: r ? pad(r.hours) : "--" },
    { label: "Minutes", value: r ? pad(r.minutes) : "--" },
    { label: "Seconds", value: r ? pad(r.seconds) : "--" },
  ];

  return (
    <div className="countdown-shape bg-gold-foil p-[2px] shadow-card">
      <div className="countdown-shape bg-burgundy-panel px-[9%] py-3 sm:py-4">
        <p className="text-center font-display text-[10px] tracking-[0.22em] text-gold sm:text-xs">
          COUNTDOWN TO OUR MUHURTHAM
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-3" role="timer" aria-live="off">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-sm border border-gold/70 bg-cherry/30 px-1 py-1.5 text-center"
            >
              <div className="font-serif text-2xl font-semibold leading-none text-ivory tabular-nums sm:text-3xl">
                {u.value}
              </div>
              <div className="mt-1 font-serif text-[11px] text-gold sm:text-xs">{u.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
