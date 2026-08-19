import type { GalleryImage } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { AlbumExperience } from "./AlbumExperience";
import { NonQuaiThao } from "@/components/ui/QuanHoIcons";

type GalleryProps = { images: GalleryImage[] };

export function Gallery({ images }: GalleryProps) {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[var(--color-background)]">
      <NonQuaiThao size={90} className="pointer-events-none absolute top-10 left-[var(--page-gutter)] text-[var(--color-primary)]/10" />
      <header className="mx-auto grid w-full max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] py-[var(--section-space-md)] lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal className="border-t border-[var(--color-border)] pt-7">
          <p className="text-eyebrow">04 · Kỷ niệm</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Cuộn phim của đôi lứa</p>
        </Reveal>
        <Reveal className="border-t border-[var(--color-border)] pt-7" delay={0.1}>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.9rem,7vw,6.5rem)] leading-[1.01] tracking-[-0.04em]">
            Những điều<br /><span className="ml-[clamp(1.25rem,8%,6rem)] inline-block italic text-[var(--color-primary)]">muốn giữ mãi</span>
          </h2>
          <p className="mt-10 max-w-xl leading-8 text-[var(--color-muted)]">
            Một cuộn phim nhỏ về ánh mắt, bàn tay nắm và những khoảnh khắc đẹp trên mảnh đất quan họ.
          </p>
        </Reveal>
      </header>

      {images.length ? (
        <AlbumExperience images={images} />
      ) : (
        <div className="mx-auto mb-[var(--section-space-md)] w-full max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <div className="border-y border-[var(--color-border)] py-16">
            <p className="font-[family-name:var(--font-serif)] text-2xl">Những khung hình đang được chọn lựa.</p>
            <p className="mt-3 text-sm text-[var(--color-muted)]">Album sẽ sớm được cập nhật.</p>
          </div>
        </div>
      )}
    </section>
  );
}
