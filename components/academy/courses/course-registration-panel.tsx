"use client";

import { AcademyRegistrationAction } from "@/components/academy/registration/academy-registration-action";
import { academyRegistrationContent } from "@/content/academy";
import type { AcademyCourseDetail } from "@/types/academy";

type CourseRegistrationPanelProps = {
  course: AcademyCourseDetail;
};

export function CourseRegistrationPanel({
  course,
}: CourseRegistrationPanelProps) {
  const copy = academyRegistrationContent.dialog.course;

  return (
    <div className="border-default bg-subtle rounded-xl border p-6">
      <h2 className="text-foreground text-lg font-semibold">Enrolment</h2>
      <p className="text-fg-muted mt-3 text-sm leading-6">
        Self-paced enrolment opens soon. Register your interest here and we will
        notify you when this programme is available.
      </p>
      <AcademyRegistrationAction
        kind="course"
        course={course}
        defaultLabel={copy.buttonLabel}
        className="mt-6 w-full"
      />
    </div>
  );
}
