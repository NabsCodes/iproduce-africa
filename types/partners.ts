import type {
  CtaSectionContent,
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

export type PartnerBenefitIconKey =
  | "globe"
  | "graduation-cap"
  | "network"
  | "lightbulb"
  | "bike"
  | "sprout";

export type PartnerBenefitItem = {
  icon: PartnerBenefitIconKey;
  title: string;
  description: string;
};

export type PartnerBenefitsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly PartnerBenefitItem[];
};

export type PartnersImpactContent = {
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

export type PartnerVoicesContent = {
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

export type PartnerOpportunitiesContent = {
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
  otherOptionValue: string;
  placeholders: {
    fullName: string;
    organisation: string;
    role: string;
    roleOther: string;
    country: string;
    countryOther: string;
    sector: string;
    sectorOther: string;
    email: string;
    phone: string;
    areaOfInterest: string;
    areaOfInterestOther: string;
    reason: string;
  };
  options: {
    roles: readonly PartnerInquiryOption[];
    countries: readonly PartnerInquiryOption[];
    sectors: readonly PartnerInquiryOption[];
    areasOfInterest: readonly PartnerInquiryOption[];
  };
};

export type PartnerInquiryContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  checklist: readonly string[];
  form: PartnerInquiryFormContent;
};

export type PartnersFaqContent = {
  eyebrow: string;
  description: string;
  categories: readonly FaqCategory[];
  items: readonly FaqItem[];
};

export type PartnersCtaContent = CtaSectionContent;

export type BecomePartnerStepContent = {
  label: string;
  title: string;
  description: string;
};

export type BecomePartnerDialogContent = {
  title: string;
  triggerLabel: string;
  continueLabel: string;
  backLabel: string;
  submitLabel: string;
  otherOptionValue: string;
  steps: {
    organisation: BecomePartnerStepContent & {
      placeholders: {
        organisationName: string;
        organisationType: string;
        organisationTypeOther: string;
        country: string;
        countryOther: string;
        website: string;
        description: string;
      };
    };
    interests: BecomePartnerStepContent & {
      goalsPlaceholder: string;
      otherInterestPlaceholder: string;
    };
    contact: BecomePartnerStepContent & {
      placeholders: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone: string;
      };
    };
  };
  organisationTypes: readonly PartnerInquiryOption[];
  partnershipInterests: readonly PartnerInquiryOption[];
  success: {
    title: string;
    description: string;
    doneLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

export type PartnersPageContent = {
  hero: PartnersHeroContent;
  whyPartner: PartnerBenefitsContent;
  impact: PartnersImpactContent;
  voices: PartnerVoicesContent;
  opportunities: PartnerOpportunitiesContent;
  inquiry: PartnerInquiryContent;
  becomePartner: BecomePartnerDialogContent;
  faqs: PartnersFaqContent;
  cta: PartnersCtaContent;
};
