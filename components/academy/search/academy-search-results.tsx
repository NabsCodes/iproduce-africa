import { ArrowLeft } from "lucide-react";

import { AcademySearchForm } from "@/components/academy/search/academy-search-form";
import { ContentCard } from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import {
  searchAcademy,
  type AcademySearchResultKind,
} from "@/lib/academy-search";

type AcademySearchResultsProps = {
  query: string;
  searchPlaceholder: string;
  searchLabel: string;
};

const sectionOrder: AcademySearchResultKind[] = [
  "webinar",
  "course",
  "article",
];

const sectionEyebrow: Record<AcademySearchResultKind, string> = {
  webinar: "Webinars & events",
  course: "Courses",
  article: "Articles",
};

const catalogueLinks = [
  { href: "/academy/webinars", label: "Webinars & events" },
  { href: "/academy/courses", label: "Courses" },
  { href: "/academy/blog", label: "Blog & insights" },
] as const;

function SearchIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h1 className="text-foreground font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
        {title}
      </h1>
      <p className="text-fg-muted mt-4 max-w-2xl text-base leading-7">
        {description}
      </p>
    </>
  );
}

export function AcademySearchResults({
  query,
  searchPlaceholder,
  searchLabel,
}: AcademySearchResultsProps) {
  const trimmed = query.trim();
  const results = searchAcademy(trimmed);

  const intro = !trimmed
    ? {
        title: "Search the Academy",
        description:
          "Find webinars, courses, and articles across the iProduce Academy in one place.",
      }
    : results.length === 0
      ? {
          title: `No results for “${trimmed}”`,
          description:
            "Try a different keyword, or browse the catalogues below.",
        }
      : {
          title: `Results for “${trimmed}”`,
          description: `${results.length} ${results.length === 1 ? "match" : "matches"} across webinars, courses, and articles.`,
        };

  return (
    <div>
      <ButtonLink
        href="/academy"
        variant="green-link"
        size="sm"
        className="inline-flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Back to Academy
      </ButtonLink>

      <MotionFade className="mt-8 max-w-3xl">
        <SearchIntro title={intro.title} description={intro.description} />
        <div className="mt-8">
          <AcademySearchForm
            key={trimmed}
            placeholder={searchPlaceholder}
            label={searchLabel}
            defaultQuery={trimmed}
          />
        </div>
      </MotionFade>

      {trimmed && results.length === 0 ? (
        <MotionFade className="mt-10 flex flex-wrap gap-3">
          {catalogueLinks.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant="outline"
              size="md"
            >
              {link.label}
            </ButtonLink>
          ))}
        </MotionFade>
      ) : null}

      {trimmed && results.length > 0 ? (
        <div className="mt-14 flex flex-col gap-14 sm:mt-16">
          {sectionOrder.map((kind) => {
            const items = results.filter((item) => item.kind === kind);
            if (items.length === 0) return null;

            return (
              <section key={kind}>
                <MotionFade>
                  <EyebrowBadge>{sectionEyebrow[kind]}</EyebrowBadge>
                  <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl">
                    {items.length} {items.length === 1 ? "match" : "matches"} in{" "}
                    {sectionEyebrow[kind].toLowerCase()}
                  </h2>
                </MotionFade>

                <MotionStagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {items.map((item) => (
                    <ContentCard
                      key={`${item.kind}-${item.slug}`}
                      href={item.href}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      category={item.category}
                      categoryTone={item.categoryTone}
                      meta={item.meta}
                      title={item.title}
                      description={item.description}
                      className="bg-white"
                    />
                  ))}
                </MotionStagger>
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
