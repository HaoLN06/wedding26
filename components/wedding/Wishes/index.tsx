import type { WishesConfig } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { WishesBoard } from "./WishesBoard";
import { DoiChimLac } from "@/components/ui/QuanHoIcons";

type WishesProps = { data: WishesConfig };

export function Wishes({ data }: WishesProps) {
  return (
    <Section id="wishes" width="wide">
      <Reveal>
        <header className="grid gap-8 border-t border-[var(--color-border)] pt-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="text-eyebrow">06 · Lời thương</p>
          <DoiChimLac size={48} className="mt-4 text-[var(--color-primary)]/35" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.9rem,7vw,6rem)] leading-[1.03] tracking-[-0.04em]">
            Gửi một lời<br /><span className="inline-block italic text-[var(--color-primary)]">thương mến</span>
          </h2>
          <p className="mt-8 max-w-xl leading-8 text-[var(--color-muted)]">{data.description}</p>
        </div>
        </header>
      </Reveal>

      <Reveal className="mt-20 md:mt-28" delay={0.1} amount={0.1}><WishesBoard config={data} /></Reveal>
    </Section>
  );
}
