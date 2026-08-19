import type { Transition, Variants } from "motion/react";

export const editorialEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motionTransition = {
  fast: { duration: 0.24, ease: editorialEase },
  reveal: { duration: 0.92, ease: editorialEase },
  image: { duration: 1.15, ease: editorialEase },
} satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({ opacity: 1, transition: { ...motionTransition.reveal, delay } }),
};

export const fade = fadeIn;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { ...motionTransition.reveal, delay } }),
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0.12, scale: 1.035 },
  visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: { ...motionTransition.image, delay } }),
};

export const stagger: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: 0.1 + delay,
      staggerChildren: 0.14,
    },
  }),
};

export const motionPresets = { fade, fadeIn, fadeUp, scaleReveal, stagger } as const;
export type MotionPreset = keyof typeof motionPresets;
