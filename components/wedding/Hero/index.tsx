import Image from "next/image";
import type { HeroConfig, Person } from "@/types/wedding";
import { formatWeddingDate } from "@/lib/wedding";
import { HeroBackgroundMotion, HeroContentMotion } from "./HeroMotion";

type HeroProps = {
  data: HeroConfig;
  bride: Person;
  groom: Person;
  weddingDate: string;
};

export function Hero({ data, bride, groom, weddingDate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[var(--color-hero-fallback)] text-[var(--color-on-image)] supports-[height:100dvh]:min-h-[100dvh]"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      {data.image ? (
        <HeroBackgroundMotion>
          <Image
            src={data.image}
            alt={data.imageAlt ?? `${groom.firstName} và ${bride.firstName} trong ngày cưới`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[53%_42%] lg:object-[center_48%]"
          />
        </HeroBackgroundMotion>
      ) : (
        <div className="absolute inset-0 -z-20 bg-[var(--color-accent)]" aria-hidden="true" />
      )}

      <div
        className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-[var(--container-wide)] flex-col justify-end px-[var(--page-gutter)] pt-[max(4rem,env(safe-area-inset-top))] pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] supports-[height:100dvh]:min-h-[100dvh] md:items-start md:pb-20 lg:pb-24">
        <HeroContentMotion
          eyebrow={data.eyebrow}
          groomName={groom.firstName}
          brideName={bride.firstName}
          weddingDate={weddingDate}
          formattedDate={formatWeddingDate(weddingDate)}
          showCountdown={data.showCountdown}
        />

        <div className="absolute right-1/2 bottom-[max(1rem,env(safe-area-inset-bottom))] flex translate-x-1/2 flex-col items-center gap-2 md:right-[var(--page-gutter)] md:translate-x-0" aria-hidden="true">
          <span className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[color-mix(in_srgb,var(--color-on-image)_65%,transparent)]">Scroll</span>
          <span className="h-7 w-px bg-[color-mix(in_srgb,var(--color-on-image)_55%,transparent)]" />
        </div>
      </div>
    </section>
  );
}
