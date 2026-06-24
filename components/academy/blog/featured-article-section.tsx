import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { ArticleMetaBadges } from "@/components/academy/blog/article-meta-badges";
import { ButtonLink } from "@/components/ui/button";
import { getBlogHeroImage, type BlogArticle } from "@/types/blog";

type FeaturedArticleSectionProps = {
  article: BlogArticle;
};

export function FeaturedArticleSection({
  article,
}: FeaturedArticleSectionProps) {
  const hero = getBlogHeroImage(article);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative aspect-5/4 overflow-hidden rounded-xl lg:aspect-4/3">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <MotionFade className="flex flex-col">
            <p className="text-tangerine-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Featured Article
            </p>

            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl sm:leading-[44px] lg:text-4xl lg:leading-[48px]">
              {article.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ArticleMetaBadges
                category={article.category}
                readTimeMinutes={article.readTimeMinutes}
                categoryTone="leaf"
              />
            </div>

            <p className="text-fg-muted mt-5 text-base leading-7">
              {article.excerpt}
            </p>

            <div className="mt-7">
              <ButtonLink
                href={`/academy/blog/${article.slug}`}
                variant="outline"
                size="md"
              >
                Read more
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
