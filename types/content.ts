import type { CommunityOrbitIconKey } from "@/lib/community-orbit-icons";
import type { PillarIconKey } from "@/lib/pillar-icons";

export type EyebrowTone = "leaf" | "tangerine";

export type PageHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  description: string;
};

export type AboutHeroTitle = {
  lineOne: {
    lead: string;
    accent: string;
  };
  lineTwo: string;
  lineThree: string;
};

export type AboutOrbitItem = {
  icon: PillarIconKey;
  tone: "leaf" | "tangerine";
  angle: number;
};

export type AboutOrbitDot = {
  tone: "leaf" | "tangerine";
  angle: number;
};

export type AboutOrbitRing = {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: readonly AboutOrbitItem[];
  dots?: readonly AboutOrbitDot[];
};

export type AboutOrbitContent = {
  url: string;
  statsLabel: string;
  rings: readonly AboutOrbitRing[];
};

export type AboutHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: AboutHeroTitle;
  description: string;
  orbit: AboutOrbitContent;
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
