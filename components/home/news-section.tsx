import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

const articleCategoryClasses = {
  INNOVATION: "bg-[var(--forest-subtle)] text-forest-600",
  TRADE: "bg-[var(--tangerine-subtle)] text-tangerine-700",
  "SMART AGRICULTURE": "bg-[var(--leaf-subtle)] text-leaf-600",
} as const;

export function NewsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge>Featured article</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Latest about AgriBusiness
            </h2>
          </div>
          <ButtonLink
            href="/academy#insights"
            variant="green-link"
            size="sm"
            className="h-10 shrink-0 px-2"
          >
            Visit our blog
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {homeContent.articles.map((article) => (
            <article
              key={article.title}
              className="bg-bg-subtle flex flex-col rounded-[20px] border border-(--border-subtle) p-4"
            >
              <Link href={article.href} className="group flex flex-1 flex-col">
                <div className="relative aspect-4/3 overflow-hidden rounded-[14px]">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <span
                  className={cn(
                    "mt-3 inline-flex h-5 w-fit items-center rounded-full px-2 text-[11px] font-semibold tracking-wide",
                    articleCategoryClasses[article.category],
                  )}
                >
                  {article.category}
                </span>
                <h3 className="text-foreground group-hover:text-leaf-700 mt-3 font-serif text-lg leading-[26px] font-semibold">
                  {article.title}
                </h3>
                <p className="mt-1 text-xs text-(--text-fg-muted)">
                  {article.meta}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
