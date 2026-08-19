"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { InvitationConfig, Person } from "@/types/wedding";
import type { InvitationPhase } from "@/components/motion/WeddingMotionProvider";
import { editorialEase } from "@/lib/motion";
import { formatWeddingDate } from "@/lib/wedding";

type EnvelopeProps = {
  invitation: InvitationConfig;
  bride: Person;
  groom: Person;
  weddingDate: string;
  guestName?: string;
  onOpening?: () => void;
  onOpen?: () => void;
};

const OPENING_DURATION_MS = 2_000;

type BurstParticle = {
  kind: "heart" | "petal";
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: number;
  color: string;
};

const burstParticles: BurstParticle[] = [
  { kind: "heart", x: -104, y: -96, size: 14, rotate: -28, delay: 0, color: "var(--color-on-image-accent)" },
  { kind: "petal", x: -72, y: -134, size: 9, rotate: 42, delay: 0.04, color: "var(--color-accent)" },
  { kind: "heart", x: -34, y: -116, size: 10, rotate: -12, delay: 0.08, color: "var(--color-primary)" },
  { kind: "heart", x: 18, y: -142, size: 13, rotate: 18, delay: 0.02, color: "var(--color-on-image-accent)" },
  { kind: "petal", x: 62, y: -118, size: 8, rotate: 78, delay: 0.1, color: "var(--color-accent)" },
  { kind: "heart", x: 108, y: -82, size: 12, rotate: 30, delay: 0.06, color: "var(--color-primary)" },
  { kind: "petal", x: -126, y: -44, size: 8, rotate: -68, delay: 0.12, color: "var(--color-primary)" },
  { kind: "heart", x: 128, y: -34, size: 9, rotate: 38, delay: 0.14, color: "var(--color-on-image-accent)" },
  { kind: "heart", x: -92, y: 14, size: 9, rotate: -38, delay: 0.16, color: "var(--color-accent)" },
  { kind: "petal", x: 88, y: 18, size: 7, rotate: 112, delay: 0.18, color: "var(--color-primary)" },
  { kind: "heart", x: -18, y: -78, size: 7, rotate: -8, delay: 0.2, color: "var(--color-accent)" },
  { kind: "heart", x: 42, y: -68, size: 8, rotate: 16, delay: 0.22, color: "var(--color-primary)" },
];

function OpeningBurst() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-[8]" aria-hidden="true">
      {burstParticles.map((particle, index) => (
        <motion.span
          className="absolute top-0 left-0 block"
          style={{ width: particle.size, height: particle.size, color: particle.color }}
          initial={{ opacity: 0, scale: 0.35, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.95, 0],
            scale: [0.35, 1, 0.82],
            x: particle.x,
            y: particle.y,
            rotate: particle.rotate,
          }}
          transition={{ duration: 0.95, delay: particle.delay, ease: editorialEase, times: [0, 0.28, 1] }}
          key={`${particle.kind}-${index}`}
        >
          {particle.kind === "heart" ? (
            <svg viewBox="0 0 24 24" className="block size-full fill-current" focusable="false">
              <path d="M12 21s-7.2-4.35-9.55-8.37C.5 9.28 2.1 5.25 5.82 4.4 8.03 3.9 10.1 4.73 12 6.75c1.9-2.02 3.97-2.85 6.18-2.35 3.72.85 5.32 4.88 3.37 8.23C19.2 16.65 12 21 12 21Z" />
            </svg>
          ) : (
            <span className="block h-full w-[58%] rotate-45 rounded-full bg-current" />
          )}
        </motion.span>
      ))}
    </div>
  );
}

export function Envelope({
  invitation,
  bride,
  groom,
  weddingDate,
  guestName,
  onOpening,
  onOpen,
}: EnvelopeProps) {
  const [state, setState] = useState<InvitationPhase>("closed");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOpenedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const displayGuestName = guestName?.trim() || invitation.defaultGuestName;
  const invitationImage = bride.image ?? groom.image;
  const isOpening = state === "opening";

  const finishOpening = useCallback(() => {
    if (hasOpenedRef.current) return;

    hasOpenedRef.current = true;
    setState("opened");
    onOpen?.();
  }, [onOpen]);

  const openInvitation = useCallback(() => {
    if (state !== "closed") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    onOpening?.();

    if (reduceMotion) {
      finishOpening();
      return;
    }

    setState("opening");
    timerRef.current = setTimeout(finishOpening, OPENING_DURATION_MS);
  }, [finishOpening, onOpening, reduceMotion, state]);

  useEffect(() => {
    if (state === "opened") return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousTouchAction = document.body.style.touchAction;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      document.body.style.touchAction = previousTouchAction;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [state]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {state !== "opened" && (
        <motion.section
          id="envelope"
          className="fixed inset-0 z-40 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-background)] px-[var(--page-gutter)] pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] supports-[height:100dvh]:min-h-[100dvh]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.012, filter: "blur(5px)" }}
          transition={{ duration: 0.7, ease: editorialEase }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitation-title"
        >
          <span className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--color-border)_0.65px,transparent_0.65px)] [background-size:7px_7px]" aria-hidden="true" />

          {/* Full-bleed clean artwork card for thiep.png */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-2 sm:p-6">
            <motion.div
              className="relative flex aspect-[2792/1536] w-full max-w-[1240px] max-h-[94vh] cursor-pointer items-center justify-center select-none"
              onClick={openInvitation}
              animate={isOpening ? { scale: 1.05, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: editorialEase }}
            >
              <Image
                src="/images/bacninh/thiep.png"
                alt={`Thiệp mời đám cưới ${groom.firstName} & ${bride.firstName}`}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-contain"
                priority
              />

              {/* Dynamic guest name overlay over 'Người thương mến' if URL query parameter ?to=... is provided */}
              {guestName?.trim() && (
                <div className="absolute top-[26.8%] left-1/2 -translate-x-1/2 bg-[#FAF6F0] px-4 py-0.5 text-center">
                  <p className="font-[family-name:var(--font-serif)] text-[clamp(0.9rem,2.1vw,1.6rem)] italic text-[#2d1f2e]">
                    {guestName.trim()}
                  </p>
                </div>
              )}

              {/* Subtle pulse ring around the wax seal in the artwork to signal clickability */}
              <div className="pointer-events-none absolute top-[58.8%] left-[49.8%] -translate-x-1/2 -translate-y-1/2">
                <span className="block size-16 sm:size-24 rounded-full border-2 border-[#b88f58]/50 animate-ping opacity-35" />
              </div>

              <button type="button" className="sr-only">
                {invitation.openButtonLabel}
              </button>

              <AnimatePresence>{isOpening && <OpeningBurst />}</AnimatePresence>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
