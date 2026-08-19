"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { MotionPreset } from "@/lib/motion";
import { motionPresets } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "animate" | "custom" | "initial" | "variants" | "viewport" | "whileInView"> & {
  preset?: MotionPreset;
  delay?: number;
  amount?: number;
};

export function Reveal({ children, preset = "fadeUp", delay = 0, amount = 0.2, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      variants={motionPresets[preset]}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  );
}
