"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { motionTransition } from "@/lib/motion";

export type InvitationPhase = "closed" | "opening" | "opened";

const InvitationPhaseContext = createContext<InvitationPhase>("opened");

export function useInvitationPhase(): InvitationPhase {
  return useContext(InvitationPhaseContext);
}

export function WeddingMotionProvider({ children, phase }: { children: ReactNode; phase: InvitationPhase }) {
  return (
    <MotionConfig reducedMotion="user" transition={motionTransition.reveal}>
      <InvitationPhaseContext.Provider value={phase}>{children}</InvitationPhaseContext.Provider>
    </MotionConfig>
  );
}
