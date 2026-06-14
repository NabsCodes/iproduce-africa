import { PageHero } from "@/components/layout/page-hero";
import { academyPageContent } from "@/content/academy";
import { pageSeo } from "@/content/seo";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.academy);

const academySections = [
  { id: "webinars", title: "Webinars & Events" },
  { id: "training", title: "Training Programmes" },
  { id: "courses", title: "Courses" },
  { id: "insights", title: "Blog & Insights" },
] as const;

export default function AcademyPage() {
  return (
    <>
      <PageHero {...academyPageContent.hero} />
      <Container className="grid gap-px bg-[var(--border-subtle)] px-0 sm:px-6 lg:grid-cols-4 lg:px-8">
        {academySections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-36 bg-white px-5 py-10 sm:px-6"
          >
            <h2 className="text-foreground font-serif text-xl font-semibold">
              {section.title}
            </h2>
          </section>
        ))}
      </Container>
    </>
  );
}
