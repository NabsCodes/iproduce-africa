import type { PillarIconKey } from "@/lib/pillar-icons";
import type { EyebrowTone, ImpactStatItem, SiteCta } from "@/types/content";

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
  summaryLabel: string;
  rings: readonly AboutOrbitRing[];
};

export type AboutHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: AboutHeroTitle;
  description: string;
  orbit: AboutOrbitContent;
};

export type AboutStory = {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  image: string;
  videoAriaLabel: string;
  primaryCta: SiteCta;
  secondaryCta: { label: string; href: string };
};

export type AboutMissionVisionObjective = {
  mission: { eyebrow: string; body: string };
  vision: { eyebrow: string; body: string };
  objective: { eyebrow: string; body: string };
};

export type AboutImpactStat = ImpactStatItem;

export type AboutImpactStats = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly AboutImpactStat[];
};

export type AboutJourneyFocusPoint = string;

export type AboutJourneyMilestone = {
  year: string;
  title: string;
  description: string;
  leftImage: string;
  focusPoints: readonly AboutJourneyFocusPoint[];
};

export type AboutJourney = {
  eyebrow: string;
  title: string;
  focusPanelLabel: string;
  milestones: readonly AboutJourneyMilestone[];
};

export type AboutPersonGroup = "team" | "advisor";

export type AboutPersonSocialPlatform =
  | "linkedin"
  | "facebook"
  | "x"
  | "instagram"
  | "telegram"
  | "website"
  | "email"
  | "phone";

export type AboutPersonSocial = {
  platform: AboutPersonSocialPlatform;
  value: string;
  label?: string;
};

export type AboutPerson = {
  id: string;
  group: AboutPersonGroup;
  name: string;
  role: string;
  photo: string;
  bioSummary: string;
  bioParagraphs: readonly string[];
  credentials?: string;
  order: number;
  socials?: readonly AboutPersonSocial[];
};

export type AboutTeam = {
  eyebrow: string;
  title: string;
  description: string;
  viewProfileLabel: string;
  members: readonly AboutPerson[];
};

export type AboutAdvisors = {
  eyebrow: string;
  title: string;
  description: string;
  readMoreLabel: string;
  members: readonly AboutPerson[];
};

export type AboutPageContent = {
  hero: AboutHeroContent;
  story: AboutStory;
  missionVisionObjective: AboutMissionVisionObjective;
  impactStats: AboutImpactStats;
  journey: AboutJourney;
  team: AboutTeam;
  advisors: AboutAdvisors;
};
