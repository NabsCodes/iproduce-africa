"use client";

import { AcademyRegistrationAction } from "@/components/academy/registration/academy-registration-action";
import { academyRegistrationContent } from "@/content/academy";
import { resolveCourseRegistrationState } from "@/lib/academy-registration";
import type { AcademyCourseDetail } from "@/types/academy";

type CourseRegistrationPanelProps = {
  course: AcademyCourseDetail;
};

export function CourseRegistrationPanel({
  course,
}: CourseRegistrationPanelProps) {
  const copy = academyRegistrationContent.dialog.course;
  const state = resolveCourseRegistrationState(course.registration, {
    defaultLabel: copy.buttonLabel,
  });

  return (
    <div className="border-default bg-subtle rounded-xl border p-6">
      <h2 className="text-foreground text-lg font-semibold">{state.heading}</h2>
      <p className="text-fg-muted mt-3 text-sm leading-6">{state.body}</p>
      <AcademyRegistrationAction
        kind="course"
        course={course}
        defaultLabel={copy.buttonLabel}
        className="mt-6 w-full"
      />
    </div>
  );
}
