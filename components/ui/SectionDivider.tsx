type DividerVariant = "wave" | "lotus" | "dots";

const paths: Record<DividerVariant, string> = {
  wave: "M0,20 C80,5 160,35 240,20 C320,5 400,35 480,20 L480,0 L0,0 Z",
  lotus: "M240,0 C232,6 224,11 216,13 C208,15 200,14 192,11 C184,8 176,4 168,2 C160,0 152,1 144,4 C136,7 128,12 120,14 C112,16 104,14 96,11 C88,8 80,4 72,2 C64,0 56,1 48,4 C40,7 32,12 24,14 C16,16 8,14 0,10 L0,0 L480,0 L480,10 C472,14 464,16 456,14 C448,12 440,7 432,4 C424,1 416,0 408,2 C400,4 392,8 384,11 C376,14 368,15 360,13 C352,11 344,6 336,3 C328,0 320,0 312,3 C304,6 296,11 288,13 C280,15 272,15 264,13 C256,11 248,6 240,0 Z",
  dots: "",
};

export function SectionDivider({ variant = "wave", flip = false }: { variant?: DividerVariant; flip?: boolean }) {
  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center gap-2.5 py-5 ${flip ? "rotate-180" : ""}`} aria-hidden="true">
        <span className="h-px w-10 bg-[var(--color-border)]" />
        <span className="size-1 rounded-full bg-[var(--color-accent)]" />
        {/* Lotus petal shape */}
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-[var(--color-primary)]/50">
          <path d="M12 2C9 6 7 10 7 13.5C7 17.1 9.2 20 12 20C14.8 20 17 17.1 17 13.5C17 10 15 6 12 2Z" fill="currentColor" />
        </svg>
        <span className="size-1 rounded-full bg-[var(--color-accent)]" />
        <span className="h-px w-10 bg-[var(--color-border)]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg
        className="block w-full text-[var(--color-background)]"
        viewBox="0 0 480 20"
        preserveAspectRatio="none"
        style={{ height: "clamp(1rem, 3vw, 2rem)" }}
      >
        <path d={paths[variant]} fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
