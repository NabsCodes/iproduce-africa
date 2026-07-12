import { contactPageContent } from "@/content/contact";
import { ContactReceiptTemplate } from "@/lib/email/templates/contact-notification";

const fixture = {
  firstName: "Ada",
  subject: "partnership",
};

const subjectLabel =
  contactPageContent.form.options.subjects.find(
    (item) => item.value === fixture.subject,
  )?.label ?? fixture.subject;

export default function ContactReceiptPreview() {
  return (
    <ContactReceiptTemplate
      firstName={fixture.firstName}
      subjectLabel={subjectLabel}
    />
  );
}
