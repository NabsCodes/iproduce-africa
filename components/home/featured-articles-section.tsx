import { ArrowUpRight } from "lucide-react";

import {
  ContentCard,
  type ContentCardTone,
} from "@/components/shared/content-card";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent, type HomeArticleCategory } from "@/content/home";

const articleToneByCategory: Record<HomeArticleCategory, ContentCardTone> = {
  INNOVATION: "forest",
  TRADE: "tangerine",
  "SMART AGRICULTURE": "leaf",
};

export function FeaturedArticlesSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge>Featured article</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Latest about AgriBusiness
            </h2>
          </div>
          <ButtonLink
            href="/academy/insights"
            variant="green-link"
            size="sm"
            className="h-10 shrink-0 self-start px-2"
          >
            Visit our blog
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {homeContent.articles.map((article) => (
            <ContentCard
              key={article.title}
              image={article.image}
              href={article.href}
              primaryTag={{
                label: article.category,
                tone: articleToneByCategory[article.category],
              }}
              secondaryTag={{ label: article.readTime.toUpperCase() }}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
