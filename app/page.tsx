import { Hero } from "@/components/wedding/Hero";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { LoveStory } from "@/components/wedding/LoveStory";
import { WeddingEvents } from "@/components/wedding/WeddingEvents";
import { Gallery } from "@/components/wedding/Gallery";
import { RSVP } from "@/components/wedding/RSVP";
import { Wishes } from "@/components/wedding/Wishes";
import { WeddingGift } from "@/components/wedding/WeddingGift";
import { weddingConfig } from "@/config/wedding";
import { WeddingExperience } from "@/components/wedding/WeddingExperience";
import { WeddingFooter } from "@/components/wedding/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  const { couple, features } = weddingConfig;

  return (
    <WeddingExperience
      invitation={weddingConfig.invitation}
      bride={couple.bride}
      groom={couple.groom}
      weddingDate={weddingConfig.date}
      music={features.music ? weddingConfig.music : undefined}
      wishes={features.wishes ? weddingConfig.wishes : undefined}
    >
      <Hero
        data={weddingConfig.hero}
        bride={couple.bride}
        groom={couple.groom}
        weddingDate={weddingConfig.date}
      />
      {features.couple && <CoupleSection />}
      <SectionDivider variant="dots" />
      {features.loveStory && <LoveStory items={weddingConfig.loveStory} />}
      <SectionDivider variant="wave" />
      {features.events && <WeddingEvents events={weddingConfig.events} />}
      {features.gallery && <Gallery images={weddingConfig.gallery} />}
      <SectionDivider variant="dots" />
      {features.rsvp && <RSVP data={weddingConfig.rsvp} events={weddingConfig.events} />}
      <SectionDivider variant="lotus" />
      {features.wishes && <Wishes data={weddingConfig.wishes} />}
      <SectionDivider variant="dots" />
      {features.gift && <WeddingGift data={weddingConfig.gift} bride={couple.bride} groom={couple.groom} />}
      <WeddingFooter bride={couple.bride} groom={couple.groom} weddingDate={weddingConfig.date} />
    </WeddingExperience>
  );
}
