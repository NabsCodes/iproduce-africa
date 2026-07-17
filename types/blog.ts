import type {
  AcademyListingHeroContent,
  AcademyRelatedSectionContent,
} from "@/types/academy";
import type { CtaSectionContent } from "@/types/content";
import type { SeoMetadata } from "@/types/seo";

export type BlogCategory =
  | "Innovation"
  | "Trade"
  | "Smart Agriculture"
  | "Agribusiness"
  | "Policy"
  | "Market Insights"
  | "Sustainability"
  | "Community";

export type BlogAuthor = {
  name: string;
  role?: string;
};

/**
 * Structured blocks for article bodies. Tagged union — the
 * `<ArticleBody />` renderer dispatches by `kind`. Portable Text
 * adapters should map into this shape so the renderer stays stable.
 */
export type BlogArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading2"; text: string }
  | { kind: "heading3"; text: string }
  | { kind: "blockquote"; text: string }
  | {
      kind: "callout";
      title?: string;
      text: string;
    }
  | { kind: "list_unordered"; items: readonly string[] }
  | {
      kind: "list_ordered";
      items: readonly { title: string; body: string }[];
    }
  | {
      kind: "table";
      caption?: string;
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      kind: "code";
      language?: string;
      filename?: string;
      code: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export type BlogArticle = {
  slug: string;
  title: string;
  category: BlogCategory;
  author: BlogAuthor;
  /** Authored value — renders as e.g. "5 MIN READ". Auto-calc later (post-Sanity). */
  readTimeMinutes: number;
  /** ISO 8601 — formatted at render time via `Intl.DateTimeFormat`. */
  publishedAt: string;
  updatedAt?: string;
  /** Listing / grid card image. */
  cardImage: string;
  cardImageAlt: string;
  /** Detail hero + featured panel. Falls back to card image when omitted. */
  heroImage?: string;
  heroImageAlt?: string;
  /** Listing card description (~140 chars). */
  excerpt: string;
  body: readonly BlogArticleBlock[];
  seo?: SeoMetadata;
};

export type BlogHeroContent = AcademyListingHeroContent;

export type BlogNewsletterContent = {
  eyebrow: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  subscribeAgainLabel: string;
};

export type BlogShareControlsContent = {
  heading: string;
  copyConfirmation: string;
};

export type BlogPageContent = {
  hero: BlogHeroContent;
  newsletter: BlogNewsletterContent;
  shareControls: BlogShareControlsContent;
  relatedSection: AcademyRelatedSectionContent;
  /** Editor pointer to the featured article. Falls back to most recent if null or unknown. */
  featuredArticleSlug: string | null;
  cta: CtaSectionContent;
};
