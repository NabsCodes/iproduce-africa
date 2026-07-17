"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

import { AcademyRegisterButton } from "@/components/academy/registration/academy-register-button";
import { Button, ButtonLink } from "@/components/ui/button";
import { useWebinarRegistrationState } from "@/hooks/use-webinar-registration-state";
import { resolveCourseRegistration } from "@/lib/academy-registration";
import { cn } from "@/lib/utils";
import type { AcademyCourseDetail, AcademyWebinar } from "@/types/academy";

type AcademyRegistrationActionProps = {
  defaultLabel: string;
  className?: string;
  buttonSize?: ComponentProps<typeof AcademyRegisterButton>["size"];
  fullWidth?: boolean;
  showDetailsAction?: boolean;
} & (
  | { kind: "webinar"; webinar: AcademyWebinar }
  | { kind: "course"; course: AcademyCourseDetail }
);

export function AcademyRegistrationAction(
  props: AcademyRegistrationActionProps,
) {
  if (props.kind === "webinar") {
    return <WebinarRegistrationAction {...props} />;
  }

  const { course, defaultLabel, className, buttonSize = "lg" } = props;
  const registration = resolveCourseRegistration(course.registration);

  if (registration.mode === "closed") {
    return (
      <p className={cn("text-fg-muted text-sm leading-6", className)}>
        {registration.closedLabel ??
          "Registration has closed for this session."}
      </p>
    );
  }

  if (registration.mode === "external") {
    if (registration.url) {
      return (
        <Button
          asChild
          variant="tangerine"
          size={buttonSize}
          className={className}
        >
          <a href={registration.url} target="_blank" rel="noopener noreferrer">
            {registration.label ?? "Continue to registration"}
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      );
    }

    return (
      <p className={cn("text-fg-muted text-sm leading-6", className)}>
        Registration for this course is managed externally.
      </p>
    );
  }

  return (
    <AcademyRegisterButton
      kind="course"
      slug={course.slug}
      title={course.title}
      label={registration.label ?? defaultLabel}
      variant="tangerine"
      size={buttonSize}
      className={className}
    />
  );
}

function WebinarRegistrationAction({
  webinar,
  defaultLabel,
  className,
  buttonSize = "lg",
  fullWidth = false,
  showDetailsAction = false,
}: Extract<AcademyRegistrationActionProps, { kind: "webinar" }>) {
  const state = useWebinarRegistrationState(webinar, defaultLabel);

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <p
        className="text-fg-muted text-sm leading-6"
        role="status"
        aria-live="polite"
      >
        {state.statusLine}
      </p>

      {state.action.kind === "internal" ? (
        <AcademyRegisterButton
          kind="webinar"
          slug={webinar.slug}
          title={webinar.title}
          label={state.action.label}
          variant="tangerine"
          size={buttonSize}
          fullWidth={fullWidth}
        />
      ) : state.action.kind === "external" ? (
        <Button
          asChild
          variant="tangerine"
          size={buttonSize}
          fullWidth={fullWidth}
        >
          <a href={state.action.href} target="_blank" rel="noopener noreferrer">
            {state.action.label}
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      ) : showDetailsAction ? (
        <ButtonLink
          href={`/academy/webinars/${webinar.slug}`}
          variant="green-outline"
          size={buttonSize}
          fullWidth={fullWidth}
        >
          {state.action.label}
          <ArrowRight className="size-4" />
        </ButtonLink>
      ) : null}
    </div>
  );
}
