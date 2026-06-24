import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AcademyDetailMetadata } from "@/components/academy/listings/academy-detail-metadata";
import { AcademyDetailHeroImage } from "@/components/academy/listings/detail-hero-image";
import { AcademyRelatedSection } from "@/components/academy/listings/academy-related-section";
import { AcademyDetailShell } from "@/components/academy/listings/academy-detail-shell";
import { WebinarRegistrationPanel } from "@/components/academy/webinars/webinar-registration-panel";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/shared/cta-section";
import {
  getRelatedWebinars,
  getWebinar,
  webinarsContent,
  webinarToCardItem,
} from "@/content/webinars";
import { createPageMetadata } from "@/lib/metadata";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return webinarsContent.webinars.map((webinar) => ({ slug: webinar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const webinar = getWebinar(slug);

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
  const webinar = getWebinar(slug);

  if (!webinar) notFound();

  const card = webinarToCardItem(webinar);
  const related = getRelatedWebinars(slug);

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
