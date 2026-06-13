import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { placeholderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const articles = [
  {
    category: "INNOVATION",
    categoryClass: "bg-[var(--forest-subtle)] text-forest-600",
    title: "From pilot to profit: three agritech success stories to watch",
    meta: "May 19, 2026 · 8 min read",
    image: placeholderImages.news.one,
    href: "/blog/agritech-success-stories",
  },
  {
    category: "TRADE",
    categoryClass: "bg-[var(--tangerine-subtle)] text-tangerine-700",
    title: "AfCFTA in practice: what agro-exporters learned in year three",
    meta: "May 28, 2026 · 6 min read",
    image: placeholderImages.news.two,
    href: "/blog/afcfta-year-three",
  },
  {
    category: "SMART AGRICULTURE",
    categoryClass: "bg-[var(--leaf-subtle)] text-acid-600",
    title: "How smart sensors are cutting water use by 40% on Kenyan farms",
    meta: "May 12, 2026 · 5 min read",
    image: placeholderImages.news.three,
    href: "/blog/smart-sensors-kenya",
  },
];

export function NewsSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge>Featured article</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Latest about AgriBusiness
            </h2>
          </div>
          <ButtonLink
            href="/blog"
            variant="green-link"
            size="sm"
            className="h-10 shrink-0 px-2"
          >
            Visit our blog
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.href}
              className="flex flex-col rounded-[20px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-4"
            >
              <Link href={article.href} className="group flex flex-1 flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
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
                    article.categoryClass,
                  )}
                >
                  {article.category}
                </span>
                <h3 className="text-foreground group-hover:text-acid-700 mt-3 font-serif text-lg leading-[26px] font-semibold">
                  {article.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--text-fg-muted)]">
                  {article.meta}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
