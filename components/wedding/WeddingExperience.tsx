"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import type { InvitationConfig, MusicConfig, Person, WishesConfig } from "@/types/wedding";
import { Envelope } from "@/components/wedding/Envelope";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { FloatingNav } from "@/components/wedding/FloatingNav";
import { FloatingWishes } from "@/components/wedding/Wishes/FloatingWishes";
import { WeddingMotionProvider } from "@/components/motion/WeddingMotionProvider";
import type { InvitationPhase } from "@/components/motion/WeddingMotionProvider";
import { normalizeGuestName } from "@/lib/wedding";

type WeddingExperienceProps = {
  invitation: InvitationConfig;
  bride: Person;
  groom: Person;
  weddingDate: string;
  music?: MusicConfig;
  wishes?: WishesConfig;
  guestName?: string;
  children: ReactNode;
};

export function WeddingExperience({
  invitation,
  bride,
  groom,
  weddingDate,
  music,
  wishes,
  guestName,
  children,
}: WeddingExperienceProps) {
  const [invitationPhase, setInvitationPhase] = useState<InvitationPhase>("closed");
  const [resolvedGuestName, setResolvedGuestName] = useState(guestName);

  useEffect(() => {
    if (guestName) return;
    const nameFromUrl = normalizeGuestName(new URLSearchParams(window.location.search).get("to") ?? undefined);
    if (!nameFromUrl) return;

    const timer = window.setTimeout(() => setResolvedGuestName(nameFromUrl), 0);
    return () => window.clearTimeout(timer);
  }, [guestName]);

  const handleInvitationOpening = useCallback(() => {
    setInvitationPhase("opening");
  }, []);

  const handleInvitationOpen = useCallback(() => {
    setInvitationPhase("opened");
    window.requestAnimationFrame(() => {
      document.getElementById("hero")?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <WeddingMotionProvider phase={invitationPhase}>
      <Envelope
        invitation={invitation}
        bride={bride}
        groom={groom}
        weddingDate={weddingDate}
        guestName={resolvedGuestName}
        onOpening={handleInvitationOpening}
        onOpen={handleInvitationOpen}
      />
      <div
        className="group/wedding"
        data-invitation-opened={invitationPhase === "opened"}
        data-invitation-opening={invitationPhase !== "closed"}
      >
        {children}
      </div>
      {music && (
        <MusicPlayer music={music} shouldAutoplay={invitationPhase !== "closed"} visible={invitationPhase === "opened"} />
      )}
      {invitationPhase === "opened" && <FloatingNav />}
      {invitationPhase === "opened" && wishes && <FloatingWishes config={wishes} />}
    </WeddingMotionProvider>
  );
}
