import type { Person } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { formatWeddingDate } from "@/lib/wedding";
import { DoiChimLac, HoaSen } from "@/components/ui/QuanHoIcons";

type WeddingFooterProps = {
  bride: Person;
  groom: Person;
  weddingDate: string;
};

export function WeddingFooter({ bride, groom, weddingDate }: WeddingFooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-foreground)] px-[var(--page-gutter)] py-[var(--section-space-sm)] text-center text-[var(--color-on-image)]">
      {/* Decorative chim Lạc */}
      <div className="pointer-events-none absolute top-8 left-8 hidden opacity-[0.08] lg:block" aria-hidden="true">
        <DoiChimLac size={120} className="text-[var(--color-on-image)]" />
      </div>
      <Reveal amount={0.35}>
        <div className="mx-auto mb-6 flex items-center justify-center gap-5" aria-hidden="true">
          <HoaSen size={22} className="text-[var(--color-on-image-accent)]/50" />
          <span className="h-px w-8 bg-[var(--color-on-image)]/20" />
          <HoaSen size={22} className="text-[var(--color-on-image-accent)]/50" />
        </div>
        <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[color-mix(in_srgb,var(--color-on-image)_65%,transparent)]">Trăm năm hạnh phúc</p>
        <p className="mt-5 font-[family-name:var(--font-serif)] text-[clamp(2.75rem,9vw,5.5rem)] leading-[1.04] tracking-[-0.04em]">
          {groom.firstName} <span className="text-[var(--color-on-image-accent)]">&amp;</span> {bride.firstName}
        </p>
        <time className="mt-6 block text-xs font-medium tracking-[0.2em]" dateTime={weddingDate}>{formatWeddingDate(weddingDate)}</time>
        <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-[color-mix(in_srgb,var(--color-on-image)_70%,transparent)]">
          Cảm ơn bạn đã là một phần trong duyên phận của chúng mình — từ mảnh đất quan họ, về chung một nhà.
        </p>
      </Reveal>
    </footer>
  );
}
