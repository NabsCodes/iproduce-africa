import { sanityFetch } from "@/lib/sanity/client";
import {
  FAQ_CATEGORIES_BY_PAGE,
  type FaqPage,
} from "@/lib/sanity/faq-categories";
import { faqsByPageQuery } from "@/lib/sanity/queries";
import type { FaqItem } from "@/types/content";

export type { FaqPage };

type RawFaqDoc = {
  question: string;
  answer: string;
  category: string;
};

/**
 * Mirrors `sanity/schemaTypes/documents/faq.ts`'s per-page category
 * validation. Studio enforces this at authoring time; `fetchFaqs` re-checks
 * it per `page` (not just against the global category union) so a doc
 * written outside Studio validation — or one with a category valid on a
 * *different* page (e.g. `Partnership` tagged `page: "academy"`) — can't
 * silently surface only under the "All" tab.
 */
export async function fetchFaqs(page: FaqPage): Promise<FaqItem[]> {
  const raw = await sanityFetch<RawFaqDoc[]>(faqsByPageQuery, { page });
  const allowedCategories = FAQ_CATEGORIES_BY_PAGE[page];
  return raw.filter((doc): doc is RawFaqDoc =>
    allowedCategories.includes(doc.category),
  );
}
