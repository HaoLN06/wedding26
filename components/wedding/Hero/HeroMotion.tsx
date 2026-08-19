"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { fadeIn, fadeUp, scaleReveal, stagger } from "@/lib/motion";
import { useInvitationPhase } from "@/components/motion/WeddingMotionProvider";
import { WeddingCountdown } from "./WeddingCountdown";

type HeroBackgroundMotionProps = {
  children: ReactNode;
};

type HeroContentMotionProps = {
  eyebrow: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  formattedDate: string;
  showCountdown: boolean;
};

function useHeroAnimationState(): "hidden" | "visible" {
  const phase = useInvitationPhase();
  return phase === "closed" ? "hidden" : "visible";
}

export function HeroBackgroundMotion({ children }: HeroBackgroundMotionProps) {
  const animationState = useHeroAnimationState();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 -z-20 origin-center"
      initial="hidden"
      animate={animationState}
      variants={scaleReveal}
      style={{ y, scale }}
    >
      {children}
    </motion.div>
  );
}

export function HeroContentMotion({
  eyebrow,
  groomName,
  brideName,
  weddingDate,
  formattedDate,
  showCountdown,
}: HeroContentMotionProps) {
  const animationState = useHeroAnimationState();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0px", "-40px"]);

  return (
    <motion.div
      ref={ref}
      className="w-full text-center md:max-w-[var(--container-hero-copy)] md:text-left"
      initial="hidden"
      animate={animationState}
      variants={stagger}
      style={{ opacity, y }}
    >
      <motion.p
        className="mb-4 text-[0.64rem] font-semibold tracking-[0.28em] uppercase text-[color-mix(in_srgb,var(--color-on-image)_85%,transparent)] sm:text-xs"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        id="hero-title"
        className="flex max-w-[min(100%,22rem)] flex-wrap items-end justify-center gap-x-2 gap-y-1 leading-none sm:max-w-[30rem] sm:gap-x-3 md:max-w-[40rem] md:justify-start lg:max-w-[46rem]"
        variants={stagger}
      >
        <motion.span className="hero-signature-name" variants={fadeUp}>{groomName}</motion.span>
        <motion.span className="hero-ampersand -translate-y-0.5 align-middle sm:-translate-y-1" variants={fadeIn}>&amp;</motion.span>
        <motion.span className="hero-signature-name" variants={fadeUp}>{brideName}</motion.span>
      </motion.h1>

      <motion.time
        className="mt-6 block text-sm font-semibold tracking-[0.26em] text-[color-mix(in_srgb,var(--color-on-image)_96%,transparent)] sm:text-base"
        dateTime={weddingDate}
        variants={fadeUp}
      >
        {formattedDate}
      </motion.time>

      {showCountdown && (
        <motion.div className="mx-auto mt-8 flex justify-center border border-white/20 bg-black/10 px-5 py-5 backdrop-blur-[2px] md:mx-0 md:justify-start" variants={fadeUp}>
          <WeddingCountdown date={weddingDate} />
        </motion.div>
      )}
    </motion.div>
  );
}
