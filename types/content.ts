export type EyebrowTone = "leaf" | "tangerine";

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
