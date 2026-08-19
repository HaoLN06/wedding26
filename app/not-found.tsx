import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-[var(--color-background)] px-6 text-center">
      <div className="max-w-md">
        <span className="font-[family-name:var(--font-serif)] text-8xl italic text-[var(--color-primary)]/30">404</span>
        <h1 className="mt-4 font-[family-name:var(--font-serif)] text-3xl tracking-[-0.02em]">Không tìm thấy trang</h1>
        <p className="mt-4 leading-7 text-[var(--color-muted)]">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[var(--control-height)] items-center justify-center border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold tracking-[0.04em] text-[var(--color-surface)] transition-colors hover:border-[var(--color-primary-hover)] hover:bg-[var(--color-primary-hover)]"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
