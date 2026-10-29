import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 22c2.2-3.2 4.6-4.8 8-4.8s5.8 1.6 8 4.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M5 17.5c3.2-4.4 6.4-6.6 11-6.6s7.8 2.2 11 6.6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M2.2 13c4.1-5.6 8.2-8.4 13.8-8.4S25.7 7.4 29.8 13"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="16" cy="23.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Mark className={light ? "text-photo" : "text-ink"} />
      <div className="leading-none">
        <p
          className={cn(
            "font-display text-lg tracking-tight",
            light ? "text-photo" : "text-ink",
          )}
        >
          Связь-Информ
        </p>
        <p
          className={cn(
            "mt-0.5 text-[10px] uppercase tracking-[0.18em]",
            light ? "text-photo/70" : "text-mist",
          )}
        >
          Оператор связи
        </p>
      </div>
    </div>
  );
}
