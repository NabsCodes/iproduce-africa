"use client";

import { MessageCircle, Minus, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = ["All", "Platform", "Membership", "Partners"] as const;

const faqs = [
  {
    number: "01",
    question: "What is iProduce Africa?",
    answer:
      "iProduce Africa is an agribusiness ecosystem connecting farmers, processors, traders, investors and innovators across the continent — with learning, networking and market-access tools in one place.",
    category: "Platform",
  },
  {
    number: "02",
    question: "Who is the platform for?",
    answer:
      "Farmers, processors, traders, investors, researchers and agripreneurs — anyone building in African agriculture.",
    category: "Platform",
  },
  {
    number: "03",
    question: "Is it free to join?",
    answer:
      "Basic community membership is free. Premium programmes, Academy courses, and partner services have separate pricing — details are on each programme page.",
    category: "Membership",
  },
  {
    number: "04",
    question: "Which countries do you operate in?",
    answer:
      "We have active communities in 15+ African countries and are expanding. Our digital platform is accessible continent-wide.",
    category: "Platform",
  },
  {
    number: "05",
    question: "How do I become a partner?",
    answer:
      "Partners collaborate through co-branded programmes, market access initiatives, capacity building, and thought leadership. Visit our Partners page to apply.",
    category: "Partners",
  },
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="bg-[var(--bg-subtle)] py-20">
      <Container>
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="max-w-[380px] shrink-0">
            <EyebrowBadge>Frequently asked questions</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Questions,
              <br />
              answered.
            </h2>
            <p className="mt-4 text-base leading-6 text-[var(--text-fg-muted)]">
              Everything about the platform, membership and partnerships —
              answered plainly.
            </p>

            <div className="bg-forest-800 mt-10 rounded-[20px] p-6 text-white">
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
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                  className={cn(
                    "h-10 rounded-xl px-4 text-sm font-semibold transition-colors",
                    activeCategory === category
                      ? "text-acid-600 bg-[var(--leaf-subtle)]"
                      : "text-[#272e22] hover:bg-white/60",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-2">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.number}
                    className={cn(
                      isOpen
                        ? "rounded-[20px] bg-[var(--leaf-subtle)] px-6 pt-6 pb-6"
                        : "border-b border-[var(--border-subtle)] px-6 py-[22px]",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center gap-5 text-left"
                    >
                      <span className="text-tangerine-400 w-9 shrink-0 font-serif text-lg font-semibold">
                        {faq.number}
                      </span>
                      <span className="text-foreground flex-1 font-serif text-lg leading-[26px] font-semibold">
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-[18px]",
                          isOpen
                            ? "bg-forest-600 text-white"
                            : "text-foreground border border-[#c2d0be] bg-white",
                        )}
                      >
                        {isOpen ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </span>
                    </button>
                    {isOpen ? (
                      <p className="mt-3 pl-14 text-base leading-6 text-[var(--text-fg-muted)]">
                        {faq.answer}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
