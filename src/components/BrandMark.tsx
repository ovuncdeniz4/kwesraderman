// Wordmarks as HTML so Safari does not show a broken-image "?" for SVG <text>.

type BrandMarkProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function EsraMark({ variant = "dark", className = "" }: BrandMarkProps) {
  const light = variant === "light";
  return (
    <span className={`flex flex-col justify-center ${className}`}>
      <span
        className={`serif text-[1.15rem] leading-none tracking-[0.18em] md:text-[1.35rem] ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        ESRA DERMAN
      </span>
      <span
        className={`mt-1.5 text-[8px] leading-none tracking-[0.22em] uppercase md:text-[9px] ${
          light ? "text-ivory/55" : "text-muted"
        }`}
      >
        Team Derman · Boğaz hattı
      </span>
    </span>
  );
}

export function KwMark({ variant = "dark", className = "" }: BrandMarkProps) {
  const light = variant === "light";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-kw text-[11px] font-semibold tracking-wide text-white">
        KW
      </span>
      <span className="flex flex-col">
        <span
          className={`text-[10px] font-semibold tracking-[0.16em] ${
            light ? "text-ivory" : "text-ink"
          }`}
        >
          KELLER WILLIAMS
        </span>
        <span
          className={`mt-0.5 text-[10px] tracking-[0.28em] ${
            light ? "text-ivory/55" : "text-muted"
          }`}
        >
          PLATIN
        </span>
      </span>
    </span>
  );
}
