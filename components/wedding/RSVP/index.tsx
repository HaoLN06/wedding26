import { RSVPForm } from "@/components/wedding/RSVPForm";
import type { RsvpConfig, WeddingEvent } from "@/types/wedding";

type RSVPProps = { data: RsvpConfig; events: WeddingEvent[] };

export function RSVP(_: RSVPProps) {
  return (
    <RSVPForm />
  );
}
