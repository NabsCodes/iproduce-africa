"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { PersonProfileDialog } from "@/components/about/person-profile-dialog";
import { PersonSocialLinks } from "@/components/about/person-social-links";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import { getAboutPersonCardSocials } from "@/lib/about-person-socials";
import type { AboutPerson } from "@/types/about";

function TeamCard({
  member,
  viewProfileLabel,
  onViewProfile,
}: {
  member: AboutPerson;
  viewProfileLabel: string;
  onViewProfile: (person: AboutPerson) => void;
}) {
  const cardSocials = getAboutPersonCardSocials(member.socials);

  return (
    <Card className="border-default hover:border-leaf-300 focus-within:border-leaf-300 h-full flex-col gap-0 border bg-white p-4 shadow-none ring-0 transition-colors">
      <button
        type="button"
        onClick={() => onViewProfile(member)}
        aria-haspopup="dialog"
        aria-label={`View profile for ${member.name}`}
        className="group focus-visible:ring-leaf-400 flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xl">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <CardContent className="flex flex-1 flex-col p-0 pt-3">
          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <span className="text-foreground font-semibold">{member.name}</span>
            <span className="text-fg-subtle" aria-hidden>
              |
            </span>
            <span className="text-fg-muted">{member.role}</span>
          </div>
          <p className="text-fg-muted mt-2 line-clamp-3 text-sm leading-6">
            {member.bioSummary}
          </p>
          <span className="text-leaf-700 decoration-leaf-700/50 group-hover:decoration-leaf-700 mt-3 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4 transition">
            {viewProfileLabel}
            <ChevronRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </CardContent>
      </button>
      {cardSocials.length > 0 ? (
        <PersonSocialLinks
          socials={cardSocials}
          personName={member.name}
          className="mt-3 pt-1"
          onLinkClick={(event) => event.stopPropagation()}
        />
      ) : null}
    </Card>
  );
}

export function TeamSection() {
  const team = aboutPageContent.team;
  const [selectedPerson, setSelectedPerson] = useState<AboutPerson | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleViewProfile(person: AboutPerson) {
    setSelectedPerson(person);
    setDialogOpen(true);
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <EyebrowBadge>{team.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {team.title}
              </h2>
            </div>
            <p className="text-fg-muted max-w-md text-base leading-7">
              {team.description}
            </p>
          </div>
        </MotionFade>

        <Carousel className="mt-10" options={{ align: "start" }}>
          <CarouselContent className="-ml-4 items-stretch sm:-ml-6">
            {team.members.map((member, index) => (
              <CarouselItem
                key={member.id}
                className="basis-full pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
              >
                <MotionFade delay={index * 0.08} className="h-full">
                  <TeamCard
                    member={member}
                    viewProfileLabel={team.viewProfileLabel}
                    onViewProfile={handleViewProfile}
                  />
                </MotionFade>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6 justify-end" />
        </Carousel>
      </div>

      <PersonProfileDialog
        person={selectedPerson}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
