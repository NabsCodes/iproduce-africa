import type { ReactNode } from "react";

import type { CommunityOrbitIconKey } from "@/lib/community-orbit-icons";

export type EyebrowTone = "leaf" | "tangerine";

export type JumpSectionIconKey =
  | "graduation-cap"
  | "lightbulb"
  | "users"
  | "newspaper";

export type PageHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  description: string;
};

export type PageActionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly string[];
  primaryCtaLabel: string;
  primaryEmailSubject: string;
  secondaryCtaLabel: string;
};

export type CommunityHeroTitle = {
  lead: string;
  accent: string;
};

export type CommunityOrbitChip = {
  label: string;
  icon: CommunityOrbitIconKey;
  tone: "leaf" | "tangerine";
  angle: number;
};

export type CommunityOrbitRing = {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: readonly CommunityOrbitChip[];
};

export type CommunityOrbitContent = {
  rings: readonly CommunityOrbitRing[];
};

export type CommunityHeroMember = {
  name: string;
  initials: string;
  image?: string;
};

export type CommunityHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: CommunityHeroTitle;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  membersLabel: string;
  members: readonly CommunityHeroMember[];
  orbit: CommunityOrbitContent;
};

/* ─── Shared content shapes (consumed across pages) ─────────────────────── */

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image?: string;
  initials?: string;
};

export type FaqCategory = string;

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export type ImpactStatItem = {
  label: string;
  value: number;
  accent?: string;
};

export type FaqSectionContent = {
  eyebrow: string;
  title?: ReactNode;
  description: string;
  categories: readonly FaqCategory[];
  items: readonly FaqItem[];
};

export type TestimonialsSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly TestimonialItem[];
};

export type CtaSectionVariant = "green" | "tangerine";
export type CtaSectionIcon = "users" | "handshake";

export type CtaSectionCta = {
  label: string;
  href: string;
  variant: CtaSectionVariant;
  icon?: CtaSectionIcon;
};

export type CtaSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  descriptionLead?: string;
  ctas: readonly CtaSectionCta[];
};
