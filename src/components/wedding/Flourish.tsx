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
