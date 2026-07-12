import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AcademyDetailMetadata } from "@/components/academy/listings/academy-detail-metadata";
import { AcademyDetailShell } from "@/components/academy/listings/academy-detail-shell";
import { AcademyRelatedSection } from "@/components/academy/listings/academy-related-section";
import { AcademyDetailHeroImage } from "@/components/academy/listings/detail-hero-image";
import { WebinarRegistrationPanel } from "@/components/academy/webinars/webinar-registration-panel";
import { CtaSection } from "@/components/shared/cta-section";
import { Badge } from "@/components/ui/badge";
import { webinarsContent, webinarToCardItem } from "@/content/webinars";
import { createPageMetadata } from "@/lib/metadata";
import {
  fetchRelatedWebinars,
  fetchWebinarBySlug,
  fetchWebinarSlugs,
} from "@/lib/sanity/fetch/webinars";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await fetchWebinarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const webinar = await fetchWebinarBySlug(slug);

  if (!webinar) {
    return createPageMetadata({
      title: "Session not found",
      description: "This webinar or event is not available.",
      path: `/academy/webinars/${slug}`,
    });
  }

  return createPageMetadata({
    title: webinar.title,
    description: webinar.excerpt,
    path: `/academy/webinars/${webinar.slug}`,
  });
}

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const webinar = await fetchWebinarBySlug(slug);

  if (!webinar) notFound();

  const card = webinarToCardItem(webinar);
  const related = await fetchRelatedWebinars(slug);

  return (
    <AcademyDetailShell
      hero={
        <AcademyDetailHeroImage
          src={webinar.image}
          alt={webinar.imageAlt ?? webinar.title}
        />
      }
      metadata={
        <AcademyDetailMetadata
          eyebrow={webinarsContent.hero.eyebrow}
          title={webinar.title}
          badges={
            <>
              <Badge variant="leaf">{card.category}</Badge>
              <Badge variant="meta">
                {dateFormatter.format(new Date(webinar.date))}
              </Badge>
            </>
          }
        />
      }
      main={
        <article className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {webinar.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-fg-muted text-base leading-7"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      }
      sidebar={<WebinarRegistrationPanel webinar={webinar} />}
      related={
        <AcademyRelatedSection
          content={webinarsContent.relatedSection}
          items={related}
        />
      }
      cta={<CtaSection overlapNext={false} content={webinarsContent.cta} />}
    />
  );
}
