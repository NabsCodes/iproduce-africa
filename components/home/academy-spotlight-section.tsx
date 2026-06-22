"use client";

import { ArrowUpRight, Calendar, GraduationCap } from "lucide-react";
import { ContentCard } from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academyHomePreview } from "@/content/academy";

type AcademySpotlightTab = "upcoming" | "training";

const tabs = [
  { id: "upcoming", label: "Upcoming Events", icon: Calendar },
  { id: "training", label: "Training programmes", icon: GraduationCap },
] as const satisfies readonly {
  id: AcademySpotlightTab;
  label: string;
  icon: typeof Calendar;
}[];

function SpotlightGrid({ tabId }: { tabId: AcademySpotlightTab }) {
  const cards = academyHomePreview.spotlight[tabId];

  return (
    <MotionStagger className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {cards.map((card) => (
        <ContentCard
          key={card.key}
          image={card.image}
          href={card.href}
          category={card.category}
          meta={card.meta}
          title={card.title}
          description={card.description}
          className="bg-white"
        />
      ))}
    </MotionStagger>
  );
}

export function AcademySpotlightSection() {
  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Tabs defaultValue="upcoming" className="flex flex-col">
          <MotionFade>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <EyebrowBadge>Academy spotlight</EyebrowBadge>
                <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                  Explore Ideas for the agripreneur.
                </h2>
                <ButtonLink
                  href="/academy"
                  variant="green-link"
                  size="sm"
                  className="mt-8 hidden h-10 px-2 sm:inline-flex"
                >
                  View all events
                  <ArrowUpRight className="size-4" />
                </ButtonLink>
              </div>

              <TabsList
                aria-label="Academy categories"
                className="h-[40px] min-h-[40px] w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto bg-transparent p-0 pb-1 [-ms-overflow-style:none] sm:w-fit sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="focus-visible:ring-leaf-400 data-[state=active]:bg-leaf-600 data-active:bg-leaf-600 bg-muted hover:bg-muted/70 text-foreground inline-flex h-9 min-h-[36px] flex-none items-center gap-1 rounded-full px-4 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none data-active:text-white data-active:shadow-none data-[state=active]:text-white data-[state=active]:shadow-none sm:h-8 sm:min-h-[32px] sm:px-3"
                    >
                      <Icon className="size-3.5" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </MotionFade>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <SpotlightGrid tabId={tab.id} />
            </TabsContent>
          ))}

          <ButtonLink
            href="/academy"
            variant="green-soft"
            size="lg"
            className="mt-6 w-full sm:hidden"
          >
            View all events
            <ArrowUpRight className="size-5" />
          </ButtonLink>
        </Tabs>
      </div>
    </section>
  );
}
