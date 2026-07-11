import type {
  CatalogueEmptyStateContent,
  CommunityHeroMember,
  EyebrowTone,
  FaqCategory,
  FaqItem,
  JumpSectionIconKey,
  TestimonialItem,
} from "@/types/content";

export type AcademyParticipantIconKey =
  | "rocket"
  | "sprout"
  | "package"
  | "truck"
  | "ship"
  | "landmark"
  | "heart-handshake"
  | "sparkles"
  | "building";

export type AcademyOpportunity = {
  icon: JumpSectionIconKey;
  title: string;
  description: string;
  anchor: string;
};

export type AcademyFeaturedEvent = {
  slug: string;
  eyebrow: string;
  sectionTitle: string;
  category: string;
  format: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  dateLabel: string;
  location: string;
  speakers: string;
  registerLabel: string;
};

export type AcademyHeroNextLive = {
  label: string;
  date: string;
  href: string;
};

export type AcademyHeroTitle = {
  lead: string;
  accent: string;
  trail?: string;
};

export type AcademyHeroContent = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: AcademyHeroTitle;
  description: string;
  searchPlaceholder: string;
  searchLabel: string;
  trustLabel: string;
  members: readonly CommunityHeroMember[];
  image: string;
  imageAlt: string;
  nextLive: AcademyHeroNextLive;
};

export type AcademyRegistrationDialogCopy = {
  title: string;
  description: string;
  buttonLabel: string;
  submitLabel: string;
  successTitle: string;
  successDescription: string;
  successDoneLabel: string;
  fields: {
    fullName: string;
    email: string;
    phone: string;
    organisation: string;
  };
};

export type AcademyRegistrationContent = {
  dialog: {
    webinar: AcademyRegistrationDialogCopy;
    course: AcademyRegistrationDialogCopy;
  };
};

export type AcademyTab = {
  label: string;
  targetId: string;
};

export type AcademyParticipant = {
  icon: AcademyParticipantIconKey;
  title: string;
  description: string;
};

export type AcademyScheduledType =
  | "WEBINAR"
  | "TRAINING"
  | "LIVE Q&A"
  | "EVENT";

export type AcademyScheduledItem = {
  type: AcademyScheduledType;
  date: string;
  title: string;
  description: string;
  image: string;
  slug: string;
};

export type AcademyCourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type AcademyCourse = {
  level: AcademyCourseLevel;
  duration: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  slug: string;
};

export type AcademyArticleCategory =
  | "INNOVATION"
  | "TRADE"
  | "SMART AGRICULTURE";

export type AcademyArticle = {
  category: AcademyArticleCategory;
  readTime: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  slug: string;
};

export type AcademyPreviewTone = "tangerine" | "leaf" | "forest";

export type AcademyHomeOpportunityCard = {
  icon: JumpSectionIconKey;
  title: string;
  description: string;
  href: string;
};

export type AcademyHomeCard = {
  key: string;
  href: string;
  image: string;
  imageAlt?: string;
  category: string;
  categoryTone?: AcademyPreviewTone;
  meta?: string;
  title: string;
  description?: string;
};

export type AcademyListingHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type AcademyRegistrationMode =
  | "open"
  | "interest"
  | "external"
  | "closed";

export type AcademyRegistrationConfig = {
  mode: AcademyRegistrationMode;
  url?: string;
  label?: string;
  closedLabel?: string;
};

export type AcademyWebinar = {
  slug: string;
  type: AcademyScheduledType;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  excerpt: string;
  body: readonly string[];
  dateLabel?: string;
  location?: string;
  format?: string;
  speakers?: string;
  registration?: AcademyRegistrationConfig;
};

export type AcademyCourseDetail = AcademyCourse & {
  excerpt: string;
  body: readonly string[];
  modules: readonly string[];
  registration?: AcademyRegistrationConfig;
};

export type AcademyHomePreview = {
  opportunities: readonly AcademyHomeOpportunityCard[];
  spotlight: {
    upcoming: readonly AcademyHomeCard[];
    training: readonly AcademyHomeCard[];
  };
  spotlightEmptyState: {
    upcoming: CatalogueEmptyStateContent;
    training: CatalogueEmptyStateContent;
  };
  blog: readonly AcademyHomeCard[];
};

export type AcademyListing<TItem> = {
  eyebrow: string;
  title: string;
  countLabel: string;
  viewMoreLabel: string;
  total: number;
  items: readonly TItem[];
  emptyState?: CatalogueEmptyStateContent;
};

export type AcademyOpportunitySection = {
  eyebrow: string;
  title: string;
  items: readonly AcademyOpportunity[];
};

export type AcademyParticipantsSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly AcademyParticipant[];
};

export type AcademyTestimonialsSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly TestimonialItem[];
};

export type AcademyFaqSection = {
  eyebrow: string;
  description: string;
  categories: readonly FaqCategory[];
  items: readonly FaqItem[];
};

export type AcademyRelatedSectionContent = {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type AcademyRelatedItem = {
  key: string;
  href: string;
  image: string;
  imageAlt?: string;
  category: string;
  categoryTone?: "tangerine" | "leaf" | "forest";
  meta?: string;
  title: string;
  description?: string;
};

export type AcademyContent = {
  hero: AcademyHeroContent;
  tabs: readonly AcademyTab[];
  featuredEvent: AcademyFeaturedEvent;
  opportunities: AcademyOpportunitySection;
  participants: AcademyParticipantsSection;
  scheduled: AcademyListing<AcademyScheduledItem>;
  courses: AcademyListing<AcademyCourse>;
  blog: AcademyListing<AcademyArticle>;
  testimonials: AcademyTestimonialsSection;
  faqs: AcademyFaqSection;
};
