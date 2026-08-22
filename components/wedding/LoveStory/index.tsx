import Image from "next/image";
import type { LoveStoryItem } from "@/types/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { HoaSen, ChimLac } from "@/components/ui/QuanHoIcons";

type LoveStoryProps = { items: LoveStoryItem[] };

function TimelineDot({ index }: { index: number }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <span className="relative z-10 grid size-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_12px_rgb(166_95_89/8%)]">
        <span className="size-2.5 rounded-full bg-[var(--color-primary)]" />
      </span>
      <span className="absolute top-0 left-1/2 -z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-border)] to-transparent" />
      <span className="mt-3 font-[family-name:var(--font-serif)] text-base italic text-[var(--color-primary)]/60">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ChapterImage({ item, side }: { item: LoveStoryItem; side: "left" | "right" }) {
  if (!item.image) return null;

  return (
    <div className={`relative overflow-hidden rounded-sm bg-[var(--color-border)] shadow-[0_8px_40px_rgb(57_46_42/10%)] ${side === "left" ? "rotate-[-1.2deg]" : "rotate-[1.2deg]"}`}>
      <div className="relative aspect-[4/5]">
        <Image
          src={item.image}
          alt={`Ảnh minh họa: ${item.title}`}
          fill
          sizes="(max-width: 1023px) calc(100vw - 80px), 38vw"
          className="object-cover object-[52%_42%] transition-transform duration-700 ease-[var(--ease-editorial)] hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-black/[0.06]" />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export function LoveStory({ items }: LoveStoryProps) {
  const [featured, ...chapters] = items;

  return (
    <Section id="love-story" width="wide">
      <header className="relative max-w-5xl">
        <Reveal>
          <p className="text-eyebrow">02 · Duyên phận</p>
          <h2 className="mt-6 font-[family-name:var(--font-serif)] text-[clamp(2.9rem,9vw,8.5rem)] leading-[0.99] tracking-[-0.05em]">
            Chuyện của<br /><span className="ml-[clamp(1.5rem,10vw,9rem)] inline-block italic text-[var(--color-primary)]">chúng mình</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="pt-4 mt-12 max-w-xl text-lg leading-8 text-[var(--color-muted)] md:mt-16 md:ml-auto md:text-xl md:leading-9">
            Không bắt đầu bằng điều phi thường. Chỉ là hai người, qua từng ngày, vẫn chọn ở lại bên nhau.
          </p>
        </Reveal>
        <div className="pointer-events-none absolute -right-4 top-0 hidden opacity-[0.12] lg:block" aria-hidden="true">
          <ChimLac size={140} className="text-[var(--color-primary)]" />
        </div>
      </header>

      {featured ? (
        <div className="mt-20 md:mt-28">
          {/* Featured chapter */}
          <article className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <Reveal preset="scaleReveal" amount={0.16}>
              <div className="relative overflow-hidden rounded-sm bg-[var(--color-border)] shadow-[0_12px_48px_rgb(57_46_42/12%)] md:aspect-[5/4] lg:aspect-[4/5]">
                <div className="relative aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]">
                  {featured.image ? (
                    <Image src={featured.image} alt={`Ảnh minh họa cho ${featured.title.toLowerCase()}`} fill sizes="(max-width: 1023px) calc(100vw - 40px), 55vw" className="object-cover object-[52%_42%] transition-transform duration-700 ease-[var(--ease-editorial)] hover:scale-[1.02]" />
                  ) : (
                    <div className="grid h-full place-items-center bg-[var(--color-border)] font-[family-name:var(--font-serif)] text-8xl text-[var(--color-primary)]/25" aria-hidden="true">01</div>
                  )}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06]" />
                </div>
                <span className="absolute top-5 left-5 text-xs font-semibold tracking-[0.18em] text-[var(--color-on-image)] uppercase">Chapter 01</span>
              </div>
            </Reveal>
            <Reveal className="max-w-lg lg:pt-24" delay={0.12} amount={0.25}>
              <p className="text-eyebrow mb-5">{featured.date}</p>
              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.04] tracking-[-0.04em] pt-[20px] pb-[20px]">{featured.title}</h3>
              <p className="mt-7 text-lg leading-8 text-[var(--color-muted)]">{featured.description}</p>
            </Reveal>
          </article>

          {/* Timeline chapters — zigzag */}
          <div className="relative mt-28 md:mt-36">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-border)] via-[var(--color-primary)]/20 to-[var(--color-border)] md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

            <ol className="relative space-y-20 md:space-y-28">
              {chapters.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <li className="relative" key={item.id}>
                    <div className={`grid items-center gap-8 md:grid-cols-[1fr_3.5rem_1fr] md:gap-0 ${isEven ? "" : ""}`}>
                      {/* Left side */}
                      <div className={`pl-14 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:order-3 md:pl-12"}`}>
                        <Reveal delay={index * 0.08} amount={0.28}>
                          {isEven && item.image ? (
                            <ChapterImage item={item} side="left" />
                          ) : (
                            <div>
                              <p className="text-eyebrow mb-4">{item.date}</p>
                              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,4vw,3rem)] leading-tight tracking-[-0.025em]">{item.title}</h3>
                              <p className="mt-4 leading-7 text-[var(--color-muted)]">{item.description}</p>
                            </div>
                          )}
                        </Reveal>
                      </div>

                      {/* Timeline dot — centered */}
                      <div className="absolute left-0 top-0 md:static md:flex md:justify-center">
                        <Reveal preset="fadeIn" delay={0.1 + index * 0.08}>
                          <TimelineDot index={index + 1} />
                        </Reveal>
                      </div>

                      {/* Right side */}
                      <div className={`pl-14 md:pl-0 ${isEven ? "md:order-3 md:pl-12" : "md:pr-12 md:text-right"}`}>
                        <Reveal delay={0.06 + index * 0.08} amount={0.28}>
                          {isEven ? (
                            <div>
                              <p className="text-eyebrow mb-4">{item.date}</p>
                              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,4vw,3rem)] leading-tight tracking-[-0.025em]">{item.title}</h3>
                              <p className="mt-4 leading-7 text-[var(--color-muted)]">{item.description}</p>
                            </div>
                          ) : item.image ? (
                            <ChapterImage item={item} side="right" />
                          ) : (
                            <div className="hidden md:block" />
                          )}
                        </Reveal>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* End dot */}
 
          </div>
        </div>
      ) : (
        <p className="mt-16 border-y border-[var(--color-border)] py-12 text-[var(--color-muted)]">Câu chuyện của chúng mình đang được viết tiếp.</p>
      )}
    </Section>
  );
}
