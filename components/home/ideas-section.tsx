import Link from "next/link";
import { ArrowUpRight, Calendar, GraduationCap } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";

export function IdeasSection() {
  return (
    <section className="bg-[var(--bg-subtle)] py-20">
      <Container>
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

          <div className="flex flex-wrap gap-2">
            <span className="bg-leaf-600 inline-flex h-8 items-center gap-1 rounded-full px-3 text-[13px] font-medium text-white">
              <Calendar className="size-3.5" />
              Upcoming Events
            </span>
            <span className="inline-flex h-8 items-center gap-1 rounded-full bg-[var(--bg-muted)] px-3 text-[13px] font-medium text-[#272e22]">
              <GraduationCap className="size-3.5" />
              Training programmes
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {homeContent.academyEvents.map((event) => (
            <article
              key={`${event.month}-${event.day}-${event.title}`}
              className="flex flex-col justify-between rounded-[20px] border border-[var(--border-subtle)] bg-white p-6"
            >
              <div className="flex gap-4">
                <div className="text-foreground flex size-[60px] shrink-0 flex-col items-center justify-center rounded-[14px] bg-[var(--tangerine-subtle)]">
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                    {event.month}
                  </span>
                  <span className="text-base font-semibold">{event.day}</span>
                </div>
                <div>
                  <h3 className="text-foreground font-serif text-lg leading-[26px] font-semibold">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-fg-muted)]">
                    {event.meta}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-leaf-600 inline-flex h-5 items-center rounded-full border border-[var(--leaf-emphasized)] px-2 text-[11px] font-semibold tracking-wide">
                  {event.tag}
                </span>
                <Button asChild variant="green-soft" size="sm">
                  <Link href={event.href}>Register</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
