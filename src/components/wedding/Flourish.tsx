type FlourishProps = { className?: string };

/** Small antique-gold scroll ornament used as a divider. */
export function Flourish({ className }: FlourishProps) {
  return (
    <svg
      viewBox="0 0 160 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 10 H56" />
      <path d="M104 10 H158" />
      <path d="M56 10 C62 2, 70 2, 72 8 C73 12, 68 14, 66 10" />
      <path d="M104 10 C98 2, 90 2, 88 8 C87 12, 92 14, 94 10" />
      <path d="M72 10 C75 16, 85 16, 88 10" />
      <path d="M80 3 L84 10 L80 17 L76 10 Z" fill="currentColor" />
      <circle cx="60" cy="14" r="1" fill="currentColor" />
      <circle cx="100" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

/** Wide engraved section divider: fading rules with a lotus-bud centrepiece. */
export function OrnamentDivider({ className }: FlourishProps) {
  return (
    <div className={`flex items-center justify-center gap-2 text-gold ${className ?? ""}`} aria-hidden="true">
      <span className="gold-rule-left h-px flex-1" />
      <svg viewBox="0 0 64 20" className="h-4 w-14 shrink-0" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M32 2 C26 8, 26 14, 32 18 C38 14, 38 8, 32 2 Z" fill="currentColor" fillOpacity="0.25" />
        <path d="M32 18 C24 16, 18 12, 16 6 C22 8, 27 11, 32 18 Z" />
        <path d="M32 18 C40 16, 46 12, 48 6 C42 8, 37 11, 32 18 Z" />
        <circle cx="6" cy="12" r="1.2" fill="currentColor" />
        <circle cx="58" cy="12" r="1.2" fill="currentColor" />
        <path d="M9 12 H14 M50 12 H55" />
      </svg>
      <span className="gold-rule-right h-px flex-1" />
    </div>
  );
}

/** Engraved corner ornament; rotate for the other corners. */
export function CornerOrnament({ className }: FlourishProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden="true"
    >
      <path d="M2 38 V8 C2 4, 4 2, 8 2 H38" />
      <path d="M6 38 V12 C6 8, 8 6, 12 6 H38" strokeOpacity="0.6" />
      <path d="M12 12 C16 10, 20 12, 18 16 C16 19, 12 16, 14 14" />
      <circle cx="2" cy="2" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Thin line with a centred word, e.g. — WEDS — */
export function LinedWord({ children, className }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className ?? ""}`}>
      <span className="h-px w-8 bg-gold" />
      <span>{children}</span>
      <span className="h-px w-8 bg-gold" />
    </div>
  );
}
