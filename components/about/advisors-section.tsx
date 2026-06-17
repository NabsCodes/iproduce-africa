import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent, type AboutAdvisor } from "@/content/about";

function AdvisorCard({ advisor }: { advisor: AboutAdvisor }) {
  return (
    <Card className="border-default h-full flex-row gap-0 overflow-hidden border bg-white p-0 shadow-none ring-0">
      <div className="bg-muted relative aspect-square w-24 shrink-0 self-stretch sm:w-32 lg:w-40">
        <Image
          src={advisor.photo}
          alt={advisor.name}
          fill
          sizes="(max-width: 1024px) 160px, 200px"
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-foreground font-serif text-base font-semibold sm:text-lg">
          {advisor.name}
        </p>
        <p className="text-fg-muted mt-2 line-clamp-3 flex-1 text-sm leading-6">
          {advisor.bio}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <p className="text-fg-subtle text-xs">{advisor.role}</p>
          {advisor.linkedin ? (
            <Link
              href={advisor.linkedin}
              aria-label={`${advisor.name} on LinkedIn`}
              className="border-default text-fg-muted hover:bg-muted inline-flex size-8 shrink-0 items-center justify-center rounded-md border transition"
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

  return (
    <section className="relative overflow-x-clip bg-white py-14 sm:py-16 lg:py-20">
      <DecorativeRing
        strokeWidth={6}
        className="text-tangerine-300 top-28 right-10 hidden size-[300px] translate-x-[60%] -translate-y-1/2 opacity-80 lg:block lg:size-[300px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-2xl">
          <EyebrowBadge>{advisors.eyebrow}</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {advisors.title}
          </h2>
          <p className="text-fg-muted mt-4 text-base leading-7">
            {advisors.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {advisors.members.map((advisor) => (
            <AdvisorCard
              key={`${advisor.name}-${advisor.role}`}
              advisor={advisor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
