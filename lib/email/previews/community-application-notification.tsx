import { formatSubmittedAt } from "@/lib/email/format-submitted-at";
import { CommunityApplicationNotificationTemplate } from "@/lib/email/templates/community-application-notification";

const fixture = {
  fullName: "Amina Yusuf",
  organisation: "Sahel Growers Network",
  role: "programme-lead",
  roleOther: "",
  country: "ng",
  sector: "agribusiness",
  sectorOther: "",
  email: "amina@example.com",
  phone: "+2348012345678",
  reason:
    "I want to connect with other agripreneurs and access Academy resources.",
  source: "page" as const,
  submittedAt: new Date("2026-06-24T10:00:00.000Z"),
  sourcePath: "/community#membership-application",
};

export default function CommunityApplicationNotificationPreview() {
  return (
    <CommunityApplicationNotificationTemplate
      input={fixture}
      submittedLabel={formatSubmittedAt(fixture.submittedAt)}
    />
  );
}
