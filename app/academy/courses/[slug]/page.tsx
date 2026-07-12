import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseRegistrationPanel } from "@/components/academy/courses/course-registration-panel";
import { AcademyDetailMetadata } from "@/components/academy/listings/academy-detail-metadata";
import { AcademyDetailShell } from "@/components/academy/listings/academy-detail-shell";
import { AcademyRelatedSection } from "@/components/academy/listings/academy-related-section";
import { AcademyDetailHeroImage } from "@/components/academy/listings/detail-hero-image";
import { CtaSection } from "@/components/shared/cta-section";
import { Badge } from "@/components/ui/badge";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { coursesContent,courseToCardItem } from "@/content/courses";
import { createPageMetadata } from "@/lib/metadata";
import {
  fetchCourseBySlug,
  fetchCourseSlugs,
  fetchRelatedCourses,
} from "@/lib/sanity/fetch/courses";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await fetchCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);

  if (!course) {
    return createPageMetadata({
      title: "Course not found",
      description: "This course is not available.",
      path: `/academy/courses/${slug}`,
    });
  }

  return createPageMetadata({
    title: course.title,
    description: course.excerpt,
    path: `/academy/courses/${course.slug}`,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);

  if (!course) notFound();

  const card = courseToCardItem(course);
  const related = await fetchRelatedCourses(slug);

  return (
    <AcademyDetailShell
      hero={<AcademyDetailHeroImage src={course.image} alt={course.title} />}
      metadata={
        <AcademyDetailMetadata
          eyebrow={coursesContent.hero.eyebrow}
          title={course.title}
          badges={
            <>
              <Badge variant="leaf">{card.category}</Badge>
              <Badge variant="meta">{course.duration}</Badge>
            </>
          }
        />
      }
      main={
        <article className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {course.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-fg-muted text-base leading-7"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <EyebrowBadge>Course outline</EyebrowBadge>
            <h2 className="text-foreground mt-3 text-xl font-semibold">
              What you will cover
            </h2>
            <ol className="text-fg-muted mt-4 list-decimal space-y-2 pl-5 text-base leading-7">
              {course.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ol>
          </div>
        </article>
      }
      sidebar={<CourseRegistrationPanel course={course} />}
      related={
        <AcademyRelatedSection
          content={coursesContent.relatedSection}
          items={related}
        />
      }
      cta={<CtaSection overlapNext={false} content={coursesContent.cta} />}
    />
  );
}
