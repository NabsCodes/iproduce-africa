export type PageHeroContent = {
  eyebrow: string;
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
