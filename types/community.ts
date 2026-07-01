import type {
  ApplyBannerContent,
  BenefitsSectionContent,
  CommunityHeroContent,
  CtaSectionContent,
  FaqSectionContent,
} from "@/types/content";

export type ThreeStepItem = {
  label: string;
  title: string;
  description: string;
};

export type ThreeStepsContent = {
  title: string;
  steps: readonly ThreeStepItem[];
};

export type WhoShouldJoinIconKey =
  | "sprout"
  | "tree-pine"
  | "factory"
  | "truck"
  | "store"
  | "coins"
  | "user-round"
  | "lightbulb"
  | "globe";

export type WhoShouldJoinItem = {
  icon: WhoShouldJoinIconKey;
  title: string;
  description: string;
};

export type WhoShouldJoinContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly WhoShouldJoinItem[];
};

export type CommunityPreviewMessage = {
  id: string;
  senderName: string;
  senderRole: string;
  senderTone: "leaf" | "tangerine";
  initials: string;
  text: string;
  align: "left" | "right";
  bubbleTone: "grey" | "green";
};

export type CommunityPreviewChannel = {
  id: string;
  label: string;
  status: "live" | "coming-soon";
  href?: string;
};

export type CommunityPreviewFeature = {
  icon: "message-square" | "megaphone" | "lightbulb";
  title: string;
  description: string;
};

export type CommunityPreviewContent = {
  eyebrow: string;
  title: string;
  description: string;
  chat: {
    title: string;
    membersOnlineLabel: string;
    pinnedBanner: string;
    messages: readonly CommunityPreviewMessage[];
  };
  features: readonly CommunityPreviewFeature[];
  channels: readonly CommunityPreviewChannel[];
};

export type MemberStoryItem = {
  result: string;
  challenge: string;
  withIProduce: string;
  name: string;
  age?: number;
  initials: string;
  role: string;
  country: string;
};

export type MemberStoriesContent = {
  eyebrow: string;
  title: string;
  items: readonly MemberStoryItem[];
};

export type MembershipApplicationFormOption = {
  value: string;
  label: string;
};

export type MembershipApplicationFormContent = {
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
    reason: string;
  };
  options: {
    roles: readonly MembershipApplicationFormOption[];
    countries: readonly MembershipApplicationFormOption[];
    sectors: readonly MembershipApplicationFormOption[];
  };
};

export type MembershipApplicationDialogStepContent = {
  label: string;
  title: string;
  description: string;
};

export type MembershipApplicationDialogReviewField = {
  key: "fullName" | "country" | "email" | "phone" | "organisation" | "sector";
  label: string;
};

export type MembershipApplicationDialogContent = {
  title: string;
  continueLabel: string;
  backLabel: string;
  submitLabel: string;
  otherOptionValue: string;
  steps: {
    about: MembershipApplicationDialogStepContent & {
      placeholders: {
        fullName: string;
        country: string;
        email: string;
        phone: string;
      };
    };
    work: MembershipApplicationDialogStepContent & {
      placeholders: {
        organisation: string;
        sector: string;
        sectorOther: string;
        reason: string;
      };
    };
    review: MembershipApplicationDialogStepContent & {
      whyJoinLabel: string;
      reviewFields: readonly MembershipApplicationDialogReviewField[];
    };
  };
  success: {
    title: string;
    descriptionTemplate: string;
    doneLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
    nextSteps: readonly { title: string; description: string }[];
  };
};

export type MembershipApplicationContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  checklist: readonly string[];
  form: MembershipApplicationFormContent;
  dialog: MembershipApplicationDialogContent;
};

export type CommunityPageContent = {
  hero: CommunityHeroContent;
  whyJoin: BenefitsSectionContent;
  applyBannerPrimary: ApplyBannerContent;
  threeSteps: ThreeStepsContent;
  whoShouldJoin: WhoShouldJoinContent;
  memberBenefits: BenefitsSectionContent;
  applyBannerSecondary: ApplyBannerContent;
  preview: CommunityPreviewContent;
  memberStories: MemberStoriesContent;
  application: MembershipApplicationContent;
  faqs: FaqSectionContent;
  cta: CtaSectionContent;
};
