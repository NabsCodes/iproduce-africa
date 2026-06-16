"use client";

import { useMemo } from "react";
import { ArrowUpRight, Calendar, GraduationCap } from "lucide-react";
import { AcademyEventCard } from "@/components/academy/academy-event-card";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeContent, type AcademyEventCategory } from "@/content/home";

const tabs = [
  { id: "event", label: "Upcoming Events", icon: Calendar },
  { id: "training", label: "Training programmes", icon: GraduationCap },
] as const satisfies readonly {
  id: AcademyEventCategory;
  label: string;
  icon: typeof Calendar;
}[];

const SPOTLIGHT_LIMIT = 3;

function SpotlightGrid({ category }: { category: AcademyEventCategory }) {
  const visibleEvents = useMemo(
    () =>
      [...homeContent.academyEvents]
        .filter((event) => event.category === category)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, SPOTLIGHT_LIMIT),
    [category],
  );

  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
      {visibleEvents.map((event) => (
        <AcademyEventCard key={`${event.date}-${event.title}`} event={event} />
      ))}
    </div>
  );
}

export function AcademySpotlightSection() {
  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Tabs defaultValue="event" className="flex flex-col">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
              className="hidden h-auto w-fit flex-wrap gap-2 bg-transparent p-0 sm:flex"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="focus-visible:ring-leaf-400 data-[state=active]:bg-leaf-600 data-active:bg-leaf-600 bg-muted hover:bg-muted/70 inline-flex h-9 flex-none items-center gap-1 rounded-full px-4 text-[13px] font-medium text-[#272e22] transition-colors focus-visible:ring-2 focus-visible:outline-none data-active:text-white data-active:shadow-none data-[state=active]:text-white data-[state=active]:shadow-none sm:h-8 sm:px-3"
                  >
                    <Icon className="size-3.5" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <SpotlightGrid category={tab.id} />
            </TabsContent>
          ))}

          <ButtonLink
            href="/academy"
            variant="green-soft"
            size="lg"
            className="mt-6 w-full sm:hidden"
          >
            Visit the Academy
            <ArrowUpRight className="size-5" />
          </ButtonLink>
        </Tabs>
      </div>
    </section>
  );
}
