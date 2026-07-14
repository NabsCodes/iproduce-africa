"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";

import { AcademyRegistrationAction } from "@/components/academy/registration/academy-registration-action";
import { academyRegistrationContent } from "@/content/academy";
import { resolveAcademyDateLabel } from "@/lib/academy-dates";
import type { AcademyWebinar } from "@/types/academy";

type WebinarRegistrationPanelProps = {
  webinar: AcademyWebinar;
};

export function WebinarRegistrationPanel({
  webinar,
}: WebinarRegistrationPanelProps) {
  const copy = academyRegistrationContent.dialog.webinar;

  return (
    <div className="border-default bg-subtle rounded-xl border p-6">
      <h2 className="text-foreground text-lg font-semibold">Session details</h2>
      <ul className="text-fg-muted mt-4 flex flex-col gap-3 text-sm leading-6">
        <li className="flex items-start gap-2">
          <CalendarDays className="text-fg-subtle mt-0.5 size-4 shrink-0" />
          <span>
            {resolveAcademyDateLabel(webinar.date, webinar.dateLabel)}
          </span>
        </li>
        {webinar.location ? (
          <li className="flex items-start gap-2">
            <MapPin className="text-fg-subtle mt-0.5 size-4 shrink-0" />
            <span>{webinar.location}</span>
          </li>
        ) : null}
        {webinar.speakers ? (
          <li className="flex items-start gap-2">
            <Users className="text-fg-subtle mt-0.5 size-4 shrink-0" />
            <span>{webinar.speakers}</span>
          </li>
        ) : null}
      </ul>
      <AcademyRegistrationAction
        kind="webinar"
        webinar={webinar}
        defaultLabel={copy.buttonLabel}
        className="mt-6 w-full"
      />
    </div>
  );
}
