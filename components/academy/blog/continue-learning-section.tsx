import { ArrowUpRight } from "lucide-react";

import { ContentCard } from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { ButtonLink } from "@/components/ui/button";
import type { AcademyBlogRelatedCourse } from "@/types/academy";
import type { BlogContinueLearningContent } from "@/types/blog";

type ContinueLearningSectionProps = {
  content: BlogContinueLearningContent;
  courses: readonly AcademyBlogRelatedCourse[];
};

export function ContinueLearningSection({
  content,
  courses,
}: ContinueLearningSectionProps) {
  if (courses.length === 0) return null;

  return (
    <>
      <MotionFade className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="max-w-2xl">
          <p className="text-tangerine-700 text-xs font-semibold tracking-[0.18em] uppercase">
            {content.eyebrow}
          </p>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl sm:leading-[40px]">
            {content.title}
          </h2>
          {content.description ? (
            <p className="text-fg-muted mt-3 max-w-xl text-base leading-7">
              {content.description}
            </p>
          ) : null}
        </div>

        <ButtonLink
          href={content.viewAllHref}
          variant="green-link"
          size="sm"
          className="self-start lg:self-end"
        >
          {content.viewAllLabel}
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </MotionFade>

      <MotionStagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <ContentCard
            key={course.slug}
            image={course.image}
            href={course.href}
            category={course.level}
            categoryTone="leaf"
            meta={course.duration}
            title={course.title}
            description={course.description}
            className="bg-white"
          />
        ))}
      </MotionStagger>
    </>
  );
}
