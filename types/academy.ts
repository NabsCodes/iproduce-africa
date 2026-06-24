import type {
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

export type AcademySearchCategory = {
  label: string;
  value: string;
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
  searchCategories: readonly AcademySearchCategory[];
  trustLabel: string;
  members: readonly CommunityHeroMember[];
  image: string;
  imageAlt: string;
  nextLive: AcademyHeroNextLive;
};

export type AcademyTab = {
  label: string;
  targetId: string;
};

export type AcademyFeaturedEvent = {
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
  registerHref: string;
  registerLabel: string;
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

export type AcademyTrackHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type AcademyHomePreview = {
  opportunities: readonly AcademyHomeOpportunityCard[];
  spotlight: {
    upcoming: readonly AcademyHomeCard[];
    training: readonly AcademyHomeCard[];
  };
  blog: readonly AcademyHomeCard[];
};

/** Course preview row for the blog detail "Continue Learning" section. */
export type AcademyBlogRelatedCourse = {
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  href: string;
};

export type AcademyListing<TItem> = {
  eyebrow: string;
  title: string;
  countLabel: string;
  viewMoreLabel: string;
  total: number;
  items: readonly TItem[];
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
