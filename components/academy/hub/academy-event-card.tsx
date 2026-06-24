import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { AcademyScheduledItem } from "@/types/academy";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

function formatEventDate(iso: string) {
  const date = new Date(iso);
  return {
    month: monthFormat.format(date).toUpperCase(),
    day: String(date.getUTCDate()).padStart(2, "0"),
  };
}

export function AcademyEventCard({ event }: { event: AcademyScheduledItem }) {
  const { month, day } = formatEventDate(event.date);

  return (
    <Card className="border-border flex flex-col justify-between gap-0 rounded-xl border bg-white py-0 shadow-none ring-0">
      <CardContent className="flex items-center gap-4 p-5 sm:items-start sm:p-6 sm:pb-4">
        <div className="text-foreground bg-tangerine-subtle flex h-10 shrink-0 flex-row items-center justify-center gap-1 rounded-full px-4 sm:size-[60px] sm:flex-col sm:gap-0 sm:rounded-full sm:px-0">
          <span className="text-xs font-semibold tracking-[0.16em] uppercase sm:tracking-[0.18em]">
            {month}
          </span>
          <span className="text-sm font-semibold sm:text-base">{day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground font-sans text-[17px] leading-6 font-semibold tracking-[-0.02em] sm:font-serif sm:text-lg sm:leading-[26px] sm:tracking-normal">
            {event.title}
          </h3>
          <p className="text-fg-muted mt-1 hidden text-xs sm:block">
            {event.type}
          </p>
        </div>
        <ChevronRight
          className="text-fg-subtle size-5 shrink-0 sm:hidden"
          aria-hidden
        />
      </CardContent>

      <CardFooter className="hidden items-center justify-between border-0 bg-transparent px-5 pt-0 pb-5 sm:flex sm:px-6 sm:pb-6">
        <Badge variant="leaf-outline">{event.type}</Badge>
        <Button asChild variant="green-soft" size="sm">
          <Link href={`/academy/webinars/${event.slug}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
