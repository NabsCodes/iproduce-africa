import { LegalDocNav } from "@/components/legal/legal-doc-nav";
import { LegalDocSwitcher } from "@/components/legal/legal-doc-switcher";
import { LegalSectionContent } from "@/components/legal/legal-section-content";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { legalContent } from "@/content/legal";
import type { LegalPageContent } from "@/types/legal";

function formatLastUpdated(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LegalPageLayout({ content }: { content: LegalPageContent }) {
  return (
    <>
      {/* Mobile/tablet: these are separate pages, not tabs — a "jump to document"
          switcher reads correctly, unlike a segmented tab bar. Sticky so it stays
          reachable while reading a long document. */}
      <div className="border-default sticky top-[72px] z-30 border-b bg-white/95 backdrop-blur lg:hidden print:hidden">
        <div className="max-w-8xl mx-auto w-full px-4 py-3 sm:px-6">
          <LegalDocSwitcher />
        </div>
      </div>

      <section className="max-w-8xl mx-auto w-full px-4 pt-6 pb-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10 print:py-0">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-14 xl:gap-20 print:block">
          <div className="max-w-3xl print:max-w-none">
            <EyebrowBadge tone="neutral">{content.eyebrow}</EyebrowBadge>

            <h1 className="text-foreground mt-4 font-serif text-[28px] leading-tight font-semibold tracking-[-0.01em] sm:text-4xl lg:text-5xl">
              {content.title}
            </h1>

            <p className="text-fg-muted mt-4 text-sm leading-7 sm:text-base">
              {content.subtitle}
            </p>

            <span className="border-border text-fg-muted mt-5 inline-flex w-fit items-center rounded-xl border px-3 py-1.5 text-xs font-medium">
              Last updated {formatLastUpdated(legalContent.lastUpdated)}
            </span>

            {content.baselineNotice.position === "top" ? (
              <p className="text-fg-subtle mt-8 text-sm leading-7">
                {content.baselineNotice.text}
              </p>
            ) : null}

            <div className="mt-8 sm:mt-10">
              <LegalSectionContent sections={content.sections} />
            </div>

            {content.baselineNotice.position === "bottom" ? (
              <p className="text-fg-subtle border-border mt-10 border-t pt-6 text-sm leading-7">
                {content.baselineNotice.text}
              </p>
            ) : null}
          </div>

          <aside className="hidden lg:block print:hidden">
            <nav
              aria-label="Legal documents"
              className="border-border sticky top-28 rounded-xl border bg-white p-4"
            >
              <p className="text-fg-subtle px-2 text-xs font-semibold tracking-[0.14em] uppercase">
                Legal documents
              </p>
              <LegalDocNav className="mt-3" />
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
