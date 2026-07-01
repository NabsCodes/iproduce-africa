"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";

import { PersonProfileDialog } from "@/components/about/person-profile-dialog";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import type { AboutPerson } from "@/types/about";

function AdvisorCard({
  advisor,
  readMoreLabel,
  onReadMore,
}: {
  advisor: AboutPerson;
  readMoreLabel: string;
  onReadMore: (person: AboutPerson) => void;
}) {
  return (
    <Card className="border-default h-full flex-col gap-0 overflow-hidden border bg-white p-0 shadow-none ring-0 sm:flex-row">
      <div className="bg-muted relative aspect-5/3 w-full shrink-0 sm:aspect-square sm:w-32 sm:self-stretch lg:w-40">
        <Image
          src={advisor.photo}
          alt={advisor.name}
          fill
          sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-foreground font-serif text-base font-semibold sm:text-lg">
          {advisor.name}
        </p>
        <p className="text-fg-subtle mt-1 text-xs sm:text-sm">{advisor.role}</p>
        <p className="text-fg-muted mt-3 line-clamp-3 flex-1 text-sm leading-6">
          {advisor.bioSummary}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <Button
            type="button"
            variant="green-link"
            size="sm"
            onClick={() => onReadMore(advisor)}
            className="decoration-leaf-700/50 hover:decoration-leaf-700 h-auto p-0 text-sm font-semibold underline underline-offset-4"
          >
            {readMoreLabel}
          </Button>
          {advisor.linkedin ? (
            <Link
              href={advisor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${advisor.name} on LinkedIn`}
              className="border-default text-fg-muted hover:bg-muted inline-flex size-8 shrink-0 items-center justify-center rounded-md border transition"
              onClick={(event) => event.stopPropagation()}
            >
              <FaLinkedinIn className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function AdvisorsSection() {
  const advisors = aboutPageContent.advisors;
  const [selectedPerson, setSelectedPerson] = useState<AboutPerson | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleReadMore(person: AboutPerson) {
    setSelectedPerson(person);
    setDialogOpen(true);
  }

  return (
    <section className="relative overflow-x-clip bg-white py-14 sm:py-16 lg:py-20">
      <DecorativeRing
        strokeWidth={6}
        className="text-tangerine-300 top-28 right-10 hidden size-[300px] translate-x-[60%] -translate-y-1/2 opacity-80 lg:block lg:size-[300px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="max-w-2xl">
            <EyebrowBadge>{advisors.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {advisors.title}
            </h2>
            <p className="text-fg-muted mt-4 text-base leading-7">
              {advisors.description}
            </p>
          </div>
        </MotionFade>

        <MotionStagger className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {advisors.members.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              readMoreLabel={advisors.readMoreLabel}
              onReadMore={handleReadMore}
            />
          ))}
        </MotionStagger>
      </div>

      <PersonProfileDialog
        person={selectedPerson}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
