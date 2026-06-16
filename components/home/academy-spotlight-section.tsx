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
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {visibleEvents.map((event) => (
        <AcademyEventCard key={`${event.date}-${event.title}`} event={event} />
      ))}
    </div>
  );
}

export function AcademySpotlightSection() {
  return (
    <section className="bg-subtle py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Tabs defaultValue="event" className="flex flex-col">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <EyebrowBadge>Academy spotlight</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
                Explore Ideas for the agripreneur.
              </h2>
              <ButtonLink
                href="/academy"
                variant="green-link"
                size="sm"
                className="mt-8 h-10 px-2"
              >
                View all events
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>

            <TabsList
              aria-label="Academy categories"
              className="h-auto w-fit flex-wrap gap-2 bg-transparent p-0"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="focus-visible:ring-leaf-400 data-[state=active]:bg-leaf-600 data-[state=inactive]:bg-muted hover:data-[state=inactive]:bg-muted/70 inline-flex h-8 flex-none items-center gap-1 rounded-full px-3 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:text-[#272e22]"
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
        </Tabs>
      </div>
    </section>
  );
}
