import { contactPageContent } from "@/content/contact";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";
import { ContactNotificationTemplate } from "@/lib/email/templates/contact-notification";

const fixture = {
  firstName: "Ada",
  lastName: "Okonkwo",
  email: "ada@example.com",
  subject: "partnership",
  subjectOther: "",
  message:
    "We would like to explore a training partnership across West Africa.",
  submittedAt: new Date("2026-06-24T10:00:00.000Z"),
  sourcePath: "/contact",
};

const subjectLabel =
  contactPageContent.form.options.subjects.find(
    (item) => item.value === fixture.subject,
  )?.label ?? fixture.subject;

export default function ContactNotificationPreview() {
  return (
    <ContactNotificationTemplate
      input={fixture}
      subjectLabel={subjectLabel}
      submittedLabel={formatSubmittedAt(fixture.submittedAt)}
      messagePreview={fixture.message.slice(0, 90)}
    />
  );
}
