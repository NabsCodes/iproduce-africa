import type { AcademyArticle, AcademyRelatedItem } from "@/types/academy";
import type { BlogArticle, BlogCategory, BlogPageContent } from "@/types/blog";
import { blogArticles } from "@/content/blog-articles";

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

function toHubArticleCategory(
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

export const blogContent: BlogPageContent = {
  hero: {
    eyebrow: "Blog & Insights",
    title: "Ideas Shaping African Agribusiness",
    description:
      "Explore trends, perspectives, and practical insights driving innovation and growth across Africa's agricultural ecosystem.",
  },
  newsletter: {
    eyebrow: "Stay Informed",
    description:
      "Receive the latest insights, industry trends, and inspiration from across Africa's agribusiness ecosystem.",
    inputLabel: "Email address",
    inputPlaceholder: "Your email address",
    submitLabel: "Subscribe",
    successMessage:
      "Thanks for subscribing. Check your inbox for a confirmation email.",
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
  articles: blogArticles,
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
};

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

export function getBlogHubPreviewItems(limit: number): AcademyArticle[] {
  return blogContent.articles.slice(0, limit).map((article) => ({
    category: toHubArticleCategory(article.category),
    readTime: `${article.readTimeMinutes} min read`,
    title: article.title,
    description: article.excerpt,
    image: article.cardImage,
    slug: article.slug,
  }));
}

export function getRelatedArticles(excludeSlug: string, limit = 3) {
  const current = blogContent.articles.find(
    (article) => article.slug === excludeSlug,
  );
  const others = blogContent.articles.filter(
    (article) => article.slug !== excludeSlug,
  );
  const sameCategory = current
    ? others.filter((article) => article.category === current.category)
    : [];
  const rest = current
    ? others.filter((article) => article.category !== current.category)
    : others;

  return [...sameCategory, ...rest].slice(0, limit).map(articleToRelatedItem);
}

export function getArticle(slug: string): BlogArticle | undefined {
  return blogContent.articles.find((article) => article.slug === slug);
}
