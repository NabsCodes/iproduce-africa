import { BecomePartnerNotificationTemplate } from "@/lib/email/templates/become-partner-notification";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";

const fixture = {
  organisationName: "Harvest Impact Foundation",
  organisationType: "ngo",
  organisationTypeOther: "",
  country: "ng",
  website: "https://example.org",
  organisationDescription:
    "We support smallholder farmers with training and market access.",
  partnershipInterests: ["training", "strategic"],
  partnershipInterestsOther: "",
  goals:
    "We hope to expand our training reach through iProduce Academy programmes.",
  fullName: "Samuel Adeyemi",
  jobTitle: "Programme Director",
  email: "samuel@example.org",
  phone: "+2348012345678",
  submittedAt: new Date("2026-06-24T10:00:00.000Z"),
  sourcePath: "/partners (become-a-partner dialog)",
};

export default function BecomePartnerNotificationPreview() {
  return (
    <BecomePartnerNotificationTemplate
      input={fixture}
      submittedLabel={formatSubmittedAt(fixture.submittedAt)}
    />
  );
}
