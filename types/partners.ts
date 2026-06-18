import type {
  EyebrowTone,
  FaqCategory,
  FaqItem,
  ImpactStatItem,
} from "@/types/content";

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

export type PartnerWhyIconKey =
  | "globe"
  | "graduation-cap"
  | "network"
  | "lightbulb"
  | "bike"
  | "sprout";

export type PartnerWhyItem = {
  icon: PartnerWhyIconKey;
  title: string;
  description: string;
  tone?: "solid" | "soft";
};

export type PartnerWhySection = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly PartnerWhyItem[];
};

export type PartnersImpactSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ImpactStatItem[];
};

export type PartnerVoice = {
  quote: string;
  name: string;
  role: string;
};

export type PartnerLogoCell = {
  id: string;
  name: string;
  logo: string;
};

export type PartnerVoicesSection = {
  eyebrow: string;
  title: string;
  items: readonly PartnerVoice[];
  logos: readonly PartnerLogoCell[];
};

export type PartnerOpportunityIconKey =
  | "graduation-cap"
  | "coins"
  | "network"
  | "search"
  | "handshake"
  | "users";

export type PartnerOpportunity = {
  icon: PartnerOpportunityIconKey;
  title: string;
  description: string;
};

export type PartnerOpportunitiesSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly PartnerOpportunity[];
};

export type PartnerInquiryOption = {
  value: string;
  label: string;
};

export type PartnerInquiryFormContent = {
  title: string;
  note: string;
  submitLabel: string;
  consentText: string;
  successTitle: string;
  successDescription: string;
  placeholders: {
    fullName: string;
    organisation: string;
    role: string;
    country: string;
    sector: string;
    email: string;
    phone: string;
    areaOfInterest: string;
    reason: string;
  };
  options: {
    roles: readonly PartnerInquiryOption[];
    countries: readonly PartnerInquiryOption[];
    sectors: readonly PartnerInquiryOption[];
    areasOfInterest: readonly PartnerInquiryOption[];
  };
};

export type PartnerInquirySection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  checklist: readonly string[];
  form: PartnerInquiryFormContent;
};

export type PartnersFaqSection = {
  eyebrow: string;
  description: string;
  categories: readonly FaqCategory[];
  items: readonly FaqItem[];
};

export type PartnersCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PartnersPageContent = {
  hero: PartnersHeroContent;
  whyPartner: PartnerWhySection;
  impact: PartnersImpactSection;
  voices: PartnerVoicesSection;
  opportunities: PartnerOpportunitiesSection;
  inquiry: PartnerInquirySection;
  faqs: PartnersFaqSection;
  cta: PartnersCtaContent;
};
