import { PartnerInquiryNotificationTemplate } from "@/lib/email/templates/partner-inquiry-notification";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";

const fixture = {
  fullName: "Jane Doe",
  organisation: "AgriVentures Ltd",
  role: "founder-ceo",
  roleOther: "",
  country: "ng",
  sector: "agribusiness",
  sectorOther: "",
  email: "jane@example.com",
  phone: "+2348012345678",
  areaOfInterest: "training",
  areaOfInterestOther: "",
  reason: "We want to co-develop training programmes for youth agripreneurs.",
  submittedAt: new Date("2026-06-24T10:00:00.000Z"),
  sourcePath: "/partners#partnership-enquiry",
};

export default function PartnerInquiryNotificationPreview() {
  return (
    <PartnerInquiryNotificationTemplate
      input={fixture}
      submittedLabel={formatSubmittedAt(fixture.submittedAt)}
    />
  );
}
