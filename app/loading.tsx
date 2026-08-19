export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-[var(--color-background)]">
      <div className="flex flex-col items-center gap-5">
        <span className="font-[family-name:var(--font-serif)] text-4xl italic text-[var(--color-primary)]">&amp;</span>
        <div className="h-px w-16 animate-pulse bg-[var(--color-accent)]" />
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-muted)]">Đang tải thiệp mời…</p>
      </div>
    </div>
  );
}
