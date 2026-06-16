"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPrimitive,
} from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeContent, type HomeFaqCategory } from "@/content/home";

function FaqAccordion({
  items,
}: {
  items: readonly (typeof homeContent.faqs)[number][];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={items[0] ? `faq-0` : undefined}
      className="gap-2"
    >
      {items.map((faq, index) => {
        const number = String(index + 1).padStart(2, "0");
        return (
          <AccordionItem
            key={`${faq.category}-${faq.question}`}
            value={`faq-${index}`}
            className="border-border data-[state=open]:bg-leaf-subtle border-b transition-all data-[state=closed]:px-4 data-[state=closed]:py-5 data-[state=open]:rounded-[20px] data-[state=open]:border-b-0 data-[state=open]:px-4 data-[state=open]:pt-5 data-[state=open]:pb-5 sm:data-[state=closed]:px-6 sm:data-[state=closed]:py-[22px] sm:data-[state=open]:px-6 sm:data-[state=open]:pt-6 sm:data-[state=open]:pb-6"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group/faq-trigger focus-visible:ring-leaf-400 flex w-full items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 sm:gap-5">
                <span className="text-tangerine-400 w-8 shrink-0 font-serif text-lg font-semibold sm:w-9">
                  {number}
                </span>
                <span className="text-foreground flex-1 font-serif text-xl leading-7 font-semibold sm:text-lg sm:leading-[26px]">
                  {faq.question}
                </span>
                <span className="text-foreground border-grey-300 group-data-[state=open]/faq-trigger:bg-forest-600 flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition-colors group-data-[state=open]/faq-trigger:border-transparent group-data-[state=open]/faq-trigger:text-white sm:size-9 sm:rounded-[18px]">
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

function getFaqsForCategory(category: HomeFaqCategory) {
  return category === "All"
    ? homeContent.faqs
    : homeContent.faqs.filter((faq) => faq.category === category);
}

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<HomeFaqCategory>("All");

  return (
    <section id="faq" className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 sm:gap-14 lg:flex-row lg:gap-20">
          <div className="max-w-[380px] shrink-0">
            <EyebrowBadge>Frequently asked questions</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Questions,
              <br />
              answered.
            </h2>
            <p className="text-fg-muted mt-4 text-base leading-6">
              Everything about the platform, membership and partnerships —
              answered plainly.
            </p>

            <div className="bg-forest-800 mt-8 rounded-[20px] p-5 text-white sm:mt-10 sm:p-6">
              <p className="text-base font-semibold">Still curious?</p>
              <p className="mt-1.5 text-sm leading-5 opacity-72">
                Our team replies within one business day.
              </p>
              <ButtonLink
                href="/contact"
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
              onValueChange={(value) =>
                setActiveCategory(value as HomeFaqCategory)
              }
              className="flex w-full flex-col gap-5"
            >
              <TabsList className="h-auto w-full scrollbar-none flex-nowrap justify-start gap-3 overflow-x-auto bg-transparent p-0 pb-1 [-ms-overflow-style:none] sm:w-fit sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {homeContent.faqCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-foreground/70 hover:text-foreground data-[state=active]:bg-leaf-subtle data-[state=active]:text-leaf-600 h-10 flex-none rounded-lg border-0 bg-transparent px-3.5 text-sm font-semibold transition-colors hover:bg-white/60 data-[state=active]:shadow-none sm:px-4"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {homeContent.faqCategories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <FaqAccordion items={getFaqsForCategory(category)} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
