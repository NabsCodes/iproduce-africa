"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

import { AcademyRegisterButton } from "@/components/academy/registration/academy-register-button";
import { Button, ButtonLink } from "@/components/ui/button";
import { useWebinarRegistrationState } from "@/hooks/use-webinar-registration-state";
import { resolveCourseRegistrationState } from "@/lib/academy-registration";
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
  const { action } = resolveCourseRegistrationState(course.registration, {
    defaultLabel,
  });

  if (action.kind === "none") return null;

  if (action.kind === "external") {
    return (
      <Button
        asChild
        variant="tangerine"
        size={buttonSize}
        className={className}
      >
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${action.label} (opens in a new tab)`}
        >
          {action.label}
          <ArrowUpRight className="size-4" />
        </a>
      </Button>
    );
  }

  return (
    <AcademyRegisterButton
      kind="course"
      slug={course.slug}
      title={course.title}
      label={action.label}
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
