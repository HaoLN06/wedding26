import type { GiftConfig, Person } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { GiftAccounts } from "./GiftAccounts";
import { NonQuaiThao, HoaSen } from "@/components/ui/QuanHoIcons";

type WeddingGiftProps = { data: GiftConfig; bride: Person; groom: Person };

export function WeddingGift({ data, bride, groom }: WeddingGiftProps) {
  return (
    <Section id="wedding-gift" width="content" className="relative overflow-hidden bg-[color-mix(in_srgb,var(--color-primary)_5%,var(--color-surface))]">
      <span className="absolute top-8 right-[var(--page-gutter)]" aria-hidden="true">
        <NonQuaiThao size={56} className="text-[var(--color-primary)]/15" />
      </span>
      <Reveal className="mx-auto max-w-3xl text-center">
        <HoaSen size={36} className="mx-auto text-[var(--color-accent)]" />
        <p className="text-eyebrow mt-5">Wedding gift</p>
        <h2 className="mt-5 font-[family-name:var(--font-serif)] text-[clamp(2.7rem,7vw,5rem)] leading-[1.04] tracking-[-0.035em]">{data.title}</h2>
        <p className="mx-auto mt-6 max-w-xl leading-8 text-[var(--color-muted)]">{data.description}</p>
      </Reveal>
      <Reveal className="mt-10 md:mt-14" delay={0.1} amount={0.1}><GiftAccounts accounts={data.accounts} bride={bride} groom={groom} /></Reveal>
    </Section>
  );
}
