import type { RsvpConfig, WeddingEvent } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { RSVPForm } from "./RSVPForm";

type RSVPProps = {
  data: RsvpConfig;
  events: WeddingEvent[];
};

export function RSVP({ data, events }: RSVPProps) {
  return (
    <Section id="rsvp" width="content" surface>
      <Reveal>
        <header className="grid gap-8 border-t border-[var(--color-border)] pt-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <p className="text-eyebrow">05 · Hồi âm</p>
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.9rem,7vw,6rem)] leading-[1.03] tracking-[-0.04em]">{data.title}</h2>
          <p className="mt-8 max-w-xl leading-8 text-[var(--color-muted)]">{data.description}</p>
        </div>
        </header>
      </Reveal>

      <Reveal className="relative mx-auto mt-16 max-w-3xl border-y border-[var(--color-border)] px-0 py-12 sm:px-8 md:mt-20 md:px-16 md:py-16" delay={0.1} amount={0.12}>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface)] px-5 font-[family-name:var(--font-serif)] text-2xl italic text-[var(--color-primary)]" aria-hidden="true">Rsvp</span>
        <RSVPForm config={data} events={events} />
      </Reveal>
    </Section>
  );
}
