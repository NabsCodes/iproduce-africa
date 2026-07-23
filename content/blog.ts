import { newsletterSignupSharedCopy } from "@/content/newsletter";
import type { AcademyArticle, AcademyRelatedItem } from "@/types/academy";
import type { BlogArticle, BlogCategory, BlogPageContent } from "@/types/blog";

export const BLOG_CATEGORIES = [
  "Innovation",
  "Trade",
  "Smart Agriculture",
  "Agribusiness",
  "Policy",
  "Market Insights",
  "Sustainability",
  "Community",
] as const satisfies readonly BlogCategory[];

/** Re-export for consumers that import categories from content. */
export const blogCategories = BLOG_CATEGORIES;

export function toHubArticleCategory(
  category: BlogCategory,
): AcademyArticle["category"] {
  const normalized = category.toUpperCase();
  if (normalized === "TRADE") return "TRADE";
  if (normalized === "SMART AGRICULTURE") return "SMART AGRICULTURE";
  return "INNOVATION";
}

export function getBlogHeroImage(article: BlogArticle): {
  src: string;
  alt: string;
} {
  return {
    src: article.heroImage ?? article.cardImage,
    alt: article.heroImageAlt ?? article.cardImageAlt,
  };
}

/** Code-owned blog chrome. Catalogue articles live in Sanity. */
export const blogContent = {
  hero: {
    eyebrow: "Blog & Insights",
    title: "Ideas Shaping African Agribusiness",
    description:
      "Explore trends, perspectives, and practical insights driving innovation and growth across Africa's agricultural ecosystem.",
  },
  newsletter: {
    ...newsletterSignupSharedCopy,
    eyebrow: "Stay Informed",
    description:
      "Receive the latest insights, industry trends, and inspiration from across Africa's agribusiness ecosystem.",
    inputLabel: "Email address",
    inputPlaceholder: "Your email address",
    submitLabel: "Subscribe",
    submittingLabel: "Subscribing...",
  },
  shareControls: {
    heading: "Share Article",
    copyConfirmation: "Link copied to clipboard",
  },
  relatedSection: {
    eyebrow: "Keep reading",
    title: "More from the blog",
    description:
      "Explore related insights and perspectives shaping African agribusiness.",
    viewAllLabel: "All articles",
    viewAllHref: "/academy/blog",
  },
  featuredArticleSlug: "unlocking-intra-african-trade",
  cta: {
    eyebrow: "Be part of the future",
    title: "Let's Build the Future of Agriculture Together",
    description:
      "Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.",
    ctas: [
      {
        label: "Partner with us",
        href: "/partners#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  },
} as const satisfies Omit<BlogPageContent, "articles">;

export function articleToRelatedItem(article: BlogArticle): AcademyRelatedItem {
  return {
    key: article.slug,
    href: `/academy/blog/${article.slug}`,
    image: article.cardImage,
    imageAlt: article.cardImageAlt,
    category: article.category.toUpperCase(),
    categoryTone: "tangerine",
    meta: `${article.readTimeMinutes} MIN READ`,
    title: article.title,
    description: article.excerpt,
  };
}

export const blogListing = {
  filterEmptyState: {
    icon: "newspaper",
    title: "No articles in this category yet",
    description:
      "Try another topic or browse the full blog for the latest insights.",
    ctaLabel: "View all articles",
    ctaHref: "/academy/blog",
  },
} as const;
