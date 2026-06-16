import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { AcademyEvent } from "@/content/home";

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

export function AcademyEventCard({ event }: { event: AcademyEvent }) {
  const { month, day } = formatEventDate(event.date);

  return (
    <Card className="border-border flex flex-col justify-between gap-0 rounded-[20px] border bg-white p-6 shadow-none ring-0">
      <CardContent className="flex gap-4 p-0">
        <div className="text-foreground bg-tangerine-subtle flex size-[60px] shrink-0 flex-col items-center justify-center rounded-[14px]">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase">
            {month}
          </span>
          <span className="text-base font-semibold">{day}</span>
        </div>
        <div>
          <h3 className="text-foreground font-serif text-lg leading-[26px] font-semibold">
            {event.title}
          </h3>
          <p className="text-fg-muted mt-1 text-xs">{event.meta}</p>
        </div>
      </CardContent>

      <CardFooter className="mt-6 flex items-center justify-between border-0 bg-transparent p-0">
        <Badge variant="leaf-outline">{event.tag}</Badge>
        <Button asChild variant="green-soft" size="sm">
          <Link href={event.href}>Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
