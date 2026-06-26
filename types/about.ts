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

export type AboutTeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: { linkedin?: string; facebook?: string };
};

export type AboutTeam = {
  eyebrow: string;
  title: string;
  description: string;
  members: readonly AboutTeamMember[];
};

export type AboutAdvisor = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
};

export type AboutAdvisors = {
  eyebrow: string;
  title: string;
  description: string;
  members: readonly AboutAdvisor[];
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
