import Image from "next/image";
import type { Person } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { DoiLienAnhChi, NonQuaiThao } from "@/components/ui/QuanHoIcons";

type CoupleProps = { bride: Person; groom: Person };

const roleLabels: Record<Person["role"], string> = {
  bride: "Cô dâu",
  groom: "Chú rể",
};

function Portrait({ person, position }: { person: Person; position: string }) {
  return (
    <article>
      <Reveal preset="scaleReveal" amount={0.16}>
        <div className="group/portrait relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--color-border)] shadow-[0_8px_40px_rgb(57_46_42/8%)]">
          {person.image ? (
            <Image
              src={person.image}
              alt={`Chân dung ${roleLabels[person.role].toLowerCase()} ${person.fullName}`}
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 42vw"
              className={`object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover/portrait:scale-[1.03] ${position}`}
            />
          ) : (
            <div className="grid h-full place-items-center bg-[var(--color-border)]" role="img" aria-label={`Chưa có ảnh của ${person.fullName}`}>
              <span className="font-[family-name:var(--font-serif)] text-8xl text-[var(--color-primary)]/40" aria-hidden="true">{person.firstName.charAt(0)}</span>
            </div>
          )}
          {/* Soft vignette overlay */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgb(57_46_42/12%)_100%)]" />
          <span className="absolute right-4 bottom-4 text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-[var(--color-on-image)] [writing-mode:vertical-rl]" aria-hidden="true">
            {roleLabels[person.role]}
          </span>
        </div>
      </Reveal>

      <Reveal className="max-w-md pt-6 md:pt-8" delay={0.08} amount={0.35}>
        <p className="text-eyebrow mb-3">{roleLabels[person.role]}</p>
        <h3 className="font-[family-name:var(--font-serif)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.06] tracking-[-0.035em]">{person.fullName}</h3>
        {person.description && <p className="pt-[1rem] mt-5 max-w-sm leading-7 text-[var(--color-muted)]">{person.description}</p>}
        {(person.father || person.mother) && (
          <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]/80">
            {[person.father, person.mother].filter(Boolean).join(" · ")}
          </p>
        )}
      </Reveal>
    </article>
  );
}

export function Couple({ bride, groom }: CoupleProps) {
  return (
    <Section id="couple" width="wide" surface className="relative overflow-hidden">
      <NonQuaiThao size={90} className="pointer-events-none absolute top-8 left-[var(--page-gutter)] text-[var(--color-primary)]/10" />
      {/* Ảnh liền chị nón quai thao — watermark chìm */}
      <div className="pointer-events-none absolute right-0 bottom-0 hidden opacity-[0.06] lg:block" aria-hidden="true">
        <Image src="/images/bacninh/quanho5.jpg" alt="" width={420} height={600} className="object-contain object-right-bottom" />
      </div>
      <header className="relative grid gap-6 border-t border-[var(--color-border)] pt-7 md:grid-cols-[0.35fr_0.65fr] md:items-end">
        <Reveal>
          <p className="text-eyebrow">01 · Đôi lứa</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Duyên ai định định duyên</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.01] tracking-[-0.045em] md:text-right">
            Khi duyên phận<br />chọn đôi lứa
          </h2>
        </Reveal>
      </header>

      <div className="relative mt-16 grid gap-16 md:grid-cols-[1fr_0.16fr_1fr] md:gap-8 lg:mt-24 lg:gap-12">
        <Portrait person={groom} position="object-[57%_40%]" />

        <Reveal preset="fadeIn" delay={0.18} className="hidden items-center justify-center md:flex" aria-hidden="true">
          <div className="flex flex-col items-center gap-3">
            <DoiLienAnhChi size={140} className="text-[var(--color-primary)]/50" />
            <span className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3rem)] italic text-[var(--color-primary)]/50">&amp;</span>
          </div>
        </Reveal>

        <div className="relative md:mt-28">
          <span className="absolute -top-14 left-1/2 -translate-x-1/2 md:hidden" aria-hidden="true">
            <DoiLienAnhChi size={80} className="text-[var(--color-primary)]/40" />
          </span>
          <Portrait person={bride} position="object-[70%_40%]" />
        </div>
      </div>
    </Section>
  );
}
