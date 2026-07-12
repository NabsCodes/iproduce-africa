"use client";

import { MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPrimitive,
} from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeContent } from "@/content/home";
import type { FaqCategory, FaqItem, FaqSectionContent } from "@/types/content";

const ALL_CATEGORY: FaqCategory = "All";

const defaultContent: FaqSectionContent = {
  eyebrow: "Frequently asked questions",
  title: (
    <>
      Questions,
      <br />
      answered.
    </>
  ),
  description:
    "Everything about the platform, membership and partnerships — answered plainly.",
  categories: homeContent.faqCategories,
  items: homeContent.faqs,
};

function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion type="single" collapsible defaultValue="faq-0" className="gap-2">
      {items.map((faq, index) => {
        const number = String(index + 1).padStart(2, "0");
        return (
          <AccordionItem
            key={`${faq.category}-${faq.question}`}
            value={`faq-${index}`}
            className="border-border data-[state=open]:bg-leaf-subtle border-b transition-all data-[state=closed]:px-4 data-[state=closed]:py-5 data-[state=open]:rounded-xl data-[state=open]:border-b-0 data-[state=open]:px-4 data-[state=open]:pt-5 data-[state=open]:pb-5 sm:data-[state=closed]:px-6 sm:data-[state=closed]:py-[22px] sm:data-[state=open]:px-6 sm:data-[state=open]:pt-6 sm:data-[state=open]:pb-6"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group/faq-trigger focus-visible:ring-leaf-400 flex w-full items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 sm:gap-5">
                <span className="text-tangerine-400 w-8 shrink-0 font-serif text-lg font-semibold sm:w-9">
                  {number}
                </span>
                <span className="text-foreground flex-1 font-serif text-xl leading-7 font-semibold sm:text-lg sm:leading-[26px]">
                  {faq.question}
                </span>
                <span className="text-foreground border-grey-300 group-data-[state=open]/faq-trigger:bg-forest-600 flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition-colors group-data-[state=open]/faq-trigger:border-transparent group-data-[state=open]/faq-trigger:text-white sm:size-9">
                  <Plus className="size-4 group-data-[state=open]/faq-trigger:hidden" />
                  <Minus className="hidden size-4 group-data-[state=open]/faq-trigger:inline" />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-fg-muted pt-3 pb-0 pl-11 text-sm leading-6 sm:pl-14 sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

type FaqSectionProps = {
  content?: FaqSectionContent;
  supportCardHref?: string;
};

export function FaqSection({
  content = defaultContent,
  supportCardHref = "/contact",
}: FaqSectionProps = {}) {
  const heading = content.title ?? defaultContent.title;
  const [activeCategory, setActiveCategory] = useState<FaqCategory>(
    content.categories[0] ?? ALL_CATEGORY,
  );

  const filtered =
    activeCategory === ALL_CATEGORY
      ? content.items
      : content.items.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade className="flex flex-col gap-10 sm:gap-14 lg:flex-row lg:gap-20">
          <div className="max-w-[380px] shrink-0">
            <EyebrowBadge>{content.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {heading}
            </h2>
            <p className="text-fg-muted mt-4 text-base leading-6">
              {content.description}
            </p>

            <div className="bg-forest-800 mt-8 rounded-xl p-5 text-white sm:mt-10 sm:p-6">
              <p className="text-base font-semibold">Still curious?</p>
              <p className="mt-1.5 text-sm leading-5 opacity-72">
                Our team replies within one business day.
              </p>
              <ButtonLink
                href={supportCardHref}
                variant="tangerine"
                size="sm"
                className="mt-6"
              >
                <MessageCircle className="size-4" />
                Talk to the team
              </ButtonLink>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="flex w-full flex-col gap-5"
            >
              <TabsList className="h-auto w-full touch-pan-x scrollbar-none flex-nowrap justify-start gap-3 overflow-x-auto overflow-y-hidden bg-transparent p-0 pb-1 [-ms-overflow-style:none] sm:w-fit sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {content.categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-foreground/70 hover:text-foreground data-[state=active]:bg-leaf-subtle data-[state=active]:text-leaf-600 h-10 flex-none rounded-lg border-0 bg-transparent px-3.5 text-sm font-semibold transition-colors hover:bg-white/60 data-[state=active]:shadow-none sm:px-4"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <FaqAccordion key={activeCategory} items={filtered} />
              </TabsContent>
            </Tabs>
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
