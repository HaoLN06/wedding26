export type PersonRole = "bride" | "groom";

export interface Person {
  firstName: string;
  fullName: string;
  role: PersonRole;
  image?: string;
  description?: string;
  father?: string;
  mother?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  address: string;
  mapUrl?: string;
  description?: string;
  dressCode?: string;
  note?: string;
}

export interface LoveStoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  featured?: boolean;
  orientation?: "portrait" | "landscape" | "square";
}

export interface GiftAccount {
  id: string;
  label: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  qrImage?: string;
}

export interface MusicConfig {
  src?: string;
  title: string;
  autoplayAfterInvitation: boolean;
  loop: boolean;
}

export interface InvitationConfig {
  eyebrow: string;
  defaultGuestName: string;
  message: string;
  openButtonLabel: string;
}

export interface HeroConfig {
  image?: string;
  imageAlt?: string;
  eyebrow: string;
  showCountdown: boolean;
}

export interface GiftConfig {
  title: string;
  description: string;
  accounts: GiftAccount[];
}

export interface RsvpConfig {
  title: string;
  description: string;
  maxGuests: number;
  allowMessage: boolean;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
}

export interface WishesConfig {
  title: string;
  description: string;
  submitLabel: string;
  items: WishItem[];
}

export interface WishItem {
  id: string;
  name: string;
  message: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  locale: string;
  url: string;
}

export interface FeatureFlags {
  couple: boolean;
  loveStory: boolean;
  events: boolean;
  gallery: boolean;
  rsvp: boolean;
  wishes: boolean;
  gift: boolean;
  music: boolean;
}

export interface WeddingConfig {
  couple: { bride: Person; groom: Person };
  date: string;
  invitation: InvitationConfig;
  hero: HeroConfig;
  events: WeddingEvent[];
  loveStory: LoveStoryItem[];
  gallery: GalleryImage[];
  gift: GiftConfig;
  rsvp: RsvpConfig;
  wishes: WishesConfig;
  music: MusicConfig;
  site: SiteConfig;
  features: FeatureFlags;
}
