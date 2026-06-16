import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";

const articleCategoryVariants = {
  INNOVATION: "forest",
  TRADE: "tangerine",
  "SMART AGRICULTURE": "leaf",
} as const;

export function FeaturedArticlesSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge>Featured article</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Latest about AgriBusiness
            </h2>
          </div>
          <ButtonLink
            href="/academy#insights"
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
            <Card
              key={article.title}
              className="border-border bg-subtle flex flex-col gap-0 rounded-[20px] border p-4 shadow-none ring-0"
            >
              <CardContent className="flex flex-1 flex-col p-0">
                <Link
                  href={article.href}
                  className="group flex flex-1 flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-[14px]">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <Badge
                    variant={articleCategoryVariants[article.category]}
                    className="mt-3"
                  >
                    {article.category}
                  </Badge>
                  <h3 className="text-foreground group-hover:text-leaf-700 mt-3 font-serif text-lg leading-[26px] font-semibold">
                    {article.title}
                  </h3>
                  <p className="text-fg-muted mt-1 text-xs">{article.meta}</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
