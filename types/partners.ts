import type { EyebrowTone, PageActionContent } from "@/types/content";

export type PartnersHeroTitle = {
  lead: string;
  accentOne: string;
  middle: string;
  accentTwo: string;
};

export type PartnersHeroStat = {
  label: string;
  value: string;
};

export type PartnersHeroMap = {
  base: string;
  baseAlt: string;
  backdrop: string;
  madagascar: string;
};

export type PartnersHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: PartnersHeroTitle;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  map: PartnersHeroMap;
  stat: PartnersHeroStat;
};

export type PartnersPageContent = {
  hero: PartnersHeroContent;
  partner: PageActionContent;
};
