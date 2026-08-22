"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { DoiLienAnhChi } from "@/components/ui/QuanHoIcons";
import type { Person } from "@/types/wedding";

const revealTransition = { duration: 1.5, ease: [0.22, 1, 0.36, 1] } as const;

function useDesktopMediaQuery() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function Profile({ person, label, imagePosition, delay }: { person: Person; label: string; imagePosition: string; delay: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ ...revealTransition, delay: reduceMotion ? 0 : delay }}
      className="w-full max-w-full"
    >
      <motion.div className="relative aspect-[3/4] w-full max-w-full overflow-hidden bg-[#4a0d22]/10">
        {person.image ? (
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={revealTransition}
          >
            <Image src={person.image} alt={`Chân dung ${label.toLowerCase()} ${person.fullName}`} fill sizes="(max-width: 767px) calc(100vw - 2.5rem), 42vw" className={`object-cover ${imagePosition}`} />
          </motion.div>
        ) : (
          <div className="grid h-full place-items-center font-[family-name:var(--font-serif)] text-7xl italic text-[#4a0d22]/30">{person.firstName.slice(0, 1)}</div>
        )}
      </motion.div>

      <motion.div
        className="pt-6 text-[#4a0d22]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...revealTransition, duration: 0.8, delay: reduceMotion ? 0 : delay + 0.28 }}
      >
        <p className="font-sans text-xs font-semibold tracking-[0.18em] uppercase">{label}</p>
        <h3 className="mt-3 font-[family-name:var(--font-serif)] text-4xl leading-none tracking-[-0.04em] md:text-6xl">{person.fullName}</h3>
        {person.description && <p className="mt-5 max-w-md font-sans text-sm leading-7 text-[#4a0d22]/65">{person.description}</p>}
        {(person.father || person.mother) && <p className="mt-4 font-sans text-xs leading-6 text-[#4a0d22]/55">{[person.father, person.mother].filter(Boolean).join(" · ")}</p>}
      </motion.div>
    </motion.article>
  );
}

export function CoupleSection() {
  const { bride, groom } = weddingConfig.couple;
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopMediaQuery();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const groomY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const brideY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const enableParallax = isDesktop && !reduceMotion;

  return (
    <section ref={sectionRef} id="couple" className="overflow-hidden bg-[#fcfaf5] px-[var(--page-gutter)] py-[var(--section-space-lg)]">
      <div className="mx-auto max-w-[var(--container-wide)]">
        <header className="border-t border-[#4a0d22]/20 pt-7 text-[#4a0d22] md:grid md:grid-cols-[0.4fr_1fr] md:items-end md:gap-12">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase">01 · Đôi lứa</p>
          <h2 className="mt-6 font-[family-name:var(--font-serif)] text-4xl leading-[0.98] tracking-[-0.05em] md:mt-0 md:text-6xl md:text-right">Khi duyên phận<br />chọn đôi lứa</h2>
        </header>

        <div className="relative mt-14 flex flex-col gap-10 md:mt-24 md:flex-row md:items-start md:gap-14">
          <motion.div className="w-full md:w-1/2" style={{ y: enableParallax ? groomY : 0 }}>
            <Profile person={groom} label="Chú rể" imagePosition="object-[50%_38%]" delay={0} />
          </motion.div>

          <div className="relative flex items-center justify-center py-2 text-[#4a0d22]/45 md:absolute md:top-[34%] md:left-1/2 md:z-10 md:-translate-x-1/2 md:py-0" aria-hidden="true">
            <span className="h-px w-14 bg-current/35 md:hidden" />
            <div className="flex items-center gap-3 px-4 md:flex-col md:gap-2 md:bg-[#fcfaf5] md:px-3 md:py-4">
              <DoiLienAnhChi size={62} className="md:size-24" />
              <span className="font-[family-name:var(--font-serif)] text-4xl italic md:text-5xl">&amp;</span>
            </div>
            <span className="h-px w-14 bg-current/35 md:hidden" />
          </div>

          <motion.div className="mt-0 w-full md:mt-32 md:w-1/2" style={{ y: enableParallax ? brideY : 0 }}>
            <Profile person={bride} label="Cô dâu" imagePosition="object-[58%_38%]" delay={0.12} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
