"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent, type AboutTeamMember } from "@/content/about";

function TeamCard({ member }: { member: AboutTeamMember }) {
  return (
    <Card className="border-default h-full flex-col gap-0 border bg-white p-4 shadow-none ring-0">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xl">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-0 pt-4">
        <div className="flex flex-wrap items-center gap-x-2 text-[15px]">
          <span className="text-foreground font-semibold">{member.name}</span>
          <span className="text-fg-subtle">|</span>
          <span className="text-fg-muted">{member.role}</span>
        </div>
        <p className="text-fg-muted mt-2 line-clamp-3 text-sm leading-6">
          {member.bio}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          {member.socials.linkedin ? (
            <Link
              href={member.socials.linkedin}
              aria-label={`${member.name} on LinkedIn`}
              className="border-default text-fg-muted hover:bg-muted inline-flex size-8 items-center justify-center rounded-md border transition"
            >
              <FaLinkedinIn className="size-3.5" />
            </Link>
          ) : null}
          {member.socials.facebook ? (
            <Link
              href={member.socials.facebook}
              aria-label={`${member.name} on Facebook`}
              className="border-default text-fg-muted hover:bg-muted inline-flex size-8 items-center justify-center rounded-md border transition"
            >
              <FaFacebookF className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamSection() {
  const team = aboutPageContent.team;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
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

        <Carousel className="mt-10" options={{ align: "start" }}>
          <CarouselContent className="-ml-4 items-stretch sm:-ml-6">
            {team.members.map((member) => (
              <CarouselItem
                key={member.name}
                className="basis-full pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
              >
                <TeamCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6 justify-end" />
        </Carousel>
      </div>
    </section>
  );
}
