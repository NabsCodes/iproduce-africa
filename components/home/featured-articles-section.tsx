import { ArrowUpRight } from "lucide-react";

import { ContentCard } from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { academyHomePreview } from "@/content/academy";

export function FeaturedArticlesSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <EyebrowBadge>Featured article</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                Latest about AgriBusiness
              </h2>
            </div>
            <ButtonLink
              href="/academy/blog"
              variant="green-link"
              size="sm"
              className="h-10 shrink-0 self-start px-2"
            >
              Visit our blog
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </MotionFade>

        <MotionStagger className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {academyHomePreview.blog.map((article) => (
            <ContentCard
              key={article.key}
              image={article.image}
              href={article.href}
              category={article.category}
              categoryTone={article.categoryTone}
              meta={article.meta}
              title={article.title}
              description={article.description}
            />
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
