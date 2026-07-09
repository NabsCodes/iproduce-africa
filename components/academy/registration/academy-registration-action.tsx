"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { AcademyRegisterButton } from "@/components/academy/registration/academy-register-button";
import { ButtonLink } from "@/components/ui/button";
import {
  resolveCourseRegistration,
  resolveWebinarRegistration,
} from "@/lib/academy-registration";
import type { AcademyCourseDetail, AcademyWebinar } from "@/types/academy";

type AcademyRegistrationActionProps = {
  defaultLabel: string;
  className?: string;
  buttonSize?: ComponentProps<typeof AcademyRegisterButton>["size"];
} & (
  | { kind: "webinar"; webinar: AcademyWebinar }
  | { kind: "course"; course: AcademyCourseDetail }
);

export function AcademyRegistrationAction(
  props: AcademyRegistrationActionProps,
) {
  const { defaultLabel, className, buttonSize = "lg" } = props;

  const target =
    props.kind === "webinar"
      ? {
          kind: "webinar" as const,
          slug: props.webinar.slug,
          title: props.webinar.title,
        }
      : {
          kind: "course" as const,
          slug: props.course.slug,
          title: props.course.title,
        };

  const registration =
    props.kind === "webinar"
      ? resolveWebinarRegistration(props.webinar)
      : resolveCourseRegistration(props.course.registration);

  if (registration.mode === "closed") {
    return (
      <p className={className ?? "text-fg-muted text-sm leading-6"}>
        {registration.closedLabel ?? "Registration is closed for this session."}
      </p>
    );
  }

  if (registration.mode === "external") {
    if (registration.url) {
      return (
        <ButtonLink
          href={registration.url}
          variant="tangerine"
          size={buttonSize}
          className={className}
        >
          {registration.label ?? "View recording"}
          <ArrowRight className="size-4" />
        </ButtonLink>
      );
    }

    return (
      <p className={className ?? "text-fg-muted text-sm leading-6"}>
        Registration for this session is managed externally.
      </p>
    );
  }

  return (
    <AcademyRegisterButton
      kind={target.kind}
      slug={target.slug}
      title={target.title}
      label={registration.label ?? defaultLabel}
      variant="tangerine"
      size={buttonSize}
      className={className}
    />
  );
}
