import { sanityFetch } from "@/lib/sanity/client";
import { LEGAL_EYEBROWS } from "@/lib/sanity/page-slot-layout";
import { legalPageByKeyQuery } from "@/lib/sanity/queries";
import type {
  LegalDocKey,
  LegalPageContent,
  LegalSection,
} from "@/types/legal";

type RawLegalSection = {
  id?: string;
  title?: string;
  paragraphs?: string[] | null;
  bullets?: string[] | null;
  table?: {
    headers?: string[] | null;
    rows?: Array<{ cells?: string[] | null }> | null;
  } | null;
};

type RawLegalPage = {
  key?: LegalDocKey;
  lastUpdated?: string | null;
  title?: string | null;
  subtitle?: string | null;
  baselineNotice?: {
    text?: string | null;
    position?: "top" | "bottom" | null;
  } | null;
  sections?: RawLegalSection[] | null;
};

function normalizeSections(sections: RawLegalSection[] | null | undefined) {
  const normalized: LegalSection[] = [];

  for (const section of sections ?? []) {
    if (!section.id || !section.title) continue;
    const paragraphs = section.paragraphs?.filter(Boolean) ?? [];
    if (paragraphs.length === 0) continue;

    normalized.push({
      id: section.id,
      title: section.title,
      paragraphs,
      ...(section.bullets?.length ? { bullets: section.bullets } : {}),
      ...(section.table?.headers?.length && section.table.rows?.length
        ? {
            table: {
              headers: section.table.headers,
              rows: section.table.rows.map(
                (row) => row.cells?.filter(Boolean) ?? [],
              ),
            },
          }
        : {}),
    });
  }

  return normalized;
}

export async function fetchLegalPage(
  key: LegalDocKey,
): Promise<LegalPageContent & { lastUpdated: string }> {
  const raw = await sanityFetch<RawLegalPage | null>(legalPageByKeyQuery, {
    key,
  });

  if (!raw?.title || !raw.subtitle || !raw.lastUpdated) {
    throw new Error(`Missing required legal page for key "${key}".`);
  }

  const baselineNotice = raw.baselineNotice;
  if (!baselineNotice?.text || !baselineNotice.position) {
    throw new Error(`Missing required baseline notice on legalPage.${key}.`);
  }

  const sections = normalizeSections(raw.sections);
  if (sections.length === 0) {
    throw new Error(`Missing required sections on legalPage.${key}.`);
  }

  return {
    eyebrow: LEGAL_EYEBROWS[key],
    title: raw.title,
    subtitle: raw.subtitle,
    lastUpdated: raw.lastUpdated,
    baselineNotice: {
      text: baselineNotice.text,
      position: baselineNotice.position,
    },
    sections,
  };
}
