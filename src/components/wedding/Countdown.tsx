import { Fragment, useEffect, useState } from "react";
import { getRemaining } from "@/lib/countdown";

const pad = (n: number) => String(n).padStart(2, "0");

function Diamond({ className }: { className?: string }) {
  return <span className={`inline-block h-1.5 w-1.5 rotate-45 bg-gold ${className ?? ""}`} aria-hidden="true" />;
}

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
    <div className="countdown-shape bg-gold-foil gold-shimmer p-px shadow-card">
      <div className="countdown-shape bg-burgundy-panel p-[4px]">
        <div className="countdown-shape bg-gold-foil p-px opacity-80">
          <div className="countdown-shape bg-burgundy-panel relative px-[10%] py-3.5 sm:py-5">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-px w-6 bg-gold/70 sm:w-10" />
              <Diamond />
              <p className="font-display text-[10px] tracking-[0.24em] text-gold sm:text-xs">
                COUNTDOWN TO OUR MUHURTHAM
              </p>
              <Diamond />
              <span className="h-px w-6 bg-gold/70 sm:w-10" />
            </div>
            <div
              className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2"
              role="timer"
              aria-live="off"
            >
              {units.map((u, i) => (
                <Fragment key={u.label}>
                  {i > 0 && (
                    <span className="flex flex-col gap-1.5 pb-3" aria-hidden="true">
                      <span className="h-1 w-1 rotate-45 bg-gold/80" />
                      <span className="h-1 w-1 rotate-45 bg-gold/80" />
                    </span>
                  )}
                  <div className="countdown-cell text-center">
                    <div className="font-display text-[22px] font-medium leading-none text-ivory tabular-nums sm:text-3xl">
                      {u.value}
                    </div>
                    <div className="mx-auto mt-1.5 h-px w-6 bg-gold/50" aria-hidden="true" />
                    <div className="mt-1 font-display text-[8.5px] tracking-[0.18em] text-gold uppercase sm:text-[10px]">
                      {u.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
