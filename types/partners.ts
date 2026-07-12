import type {
  BenefitIconKey,
  BenefitItem,
  BenefitsSectionContent,
  CtaSectionContent,
  EyebrowTone,
  FaqCategory,
  FaqItem,
  ImpactStatItem,
} from "@/types/content";

/** Shared by the Home marquee and the Partners-page voices logo grid. */
export type Partner = {
  id: string;
  name: string;
  logo: string;
  logoAlt?: string;
  href?: string;
  order?: number;
};

export type PartnersHeroTitle = {
  lead: string;
  accentOne: string;
  middle: string;
  accentTwo: string;
};

export type PartnersHeroBadge = {
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
  badge: PartnersHeroBadge;
};

export type PartnerBenefitIconKey = BenefitIconKey;

export type PartnerBenefitItem = BenefitItem;

export type PartnerBenefitsContent = BenefitsSectionContent;

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

export type PartnerVoicesContent = {
  eyebrow: string;
  title: string;
  items: readonly PartnerVoice[];
};

export type PartnerSpotlightItem = {
  id: string;
  name: string;
  /** Short line under the name — sector, location, or partnership type. */
  descriptor: string;
  /** Short teaser shown on the card/tile (~1–2 sentences, clamped). */
  description: string;
  /**
   * Longer version shown in the story dialog. Falls back to `[description]`
   * when omitted, so this is optional until the client sends fuller copy.
   */
  story?: readonly string[];
  image: string;
  imageAlt: string;
  /** Use `logo` for partner marks until photography is supplied. */
  imageVariant?: "photo" | "logo";
  /** Partner's own site — shown as a secondary link in the story dialog. */
  website?: string;
  readMore?: {
    label: string;
    href: string;
  };
  order: number;
};

export type PartnerSpotlightContent = {
  eyebrow: string;
  title: string;
  description: string;
  readMoreLabel: string;
  viewStoryLabel: string;
  websiteLabel: string;
  showMoreLabel: string;
  items: readonly PartnerSpotlightItem[];
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
  sendAnotherLabel: string;
  otherOptionValue: string;
  placeholders: {
    fullName: string;
    organisation: string;
    role: string;
    roleOther: string;
    country: string;
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

export type BecomePartnerReviewField = {
  key:
    | "organisationName"
    | "organisationType"
    | "country"
    | "fullName"
    | "jobTitle"
    | "email"
    | "phone";
  label: string;
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
    review: BecomePartnerStepContent & {
      defaultBadge: string;
      goalsLabel: string;
      reviewFields: readonly BecomePartnerReviewField[];
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
  spotlight: PartnerSpotlightContent;
  voices: PartnerVoicesContent;
  opportunities: PartnerOpportunitiesContent;
  inquiry: PartnerInquiryContent;
  becomePartner: BecomePartnerDialogContent;
  faqs: PartnersFaqContent;
  cta: PartnersCtaContent;
};
