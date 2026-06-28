import { AcademyRegistrationReceiptTemplate } from "@/lib/email/templates/academy-registration-notification";

const fixture = {
  fullName: "Kofi Mensah",
  email: "kofi@example.com",
  phone: "+2348012345678",
  organisation: "GreenHarvest Co.",
  kind: "webinar" as const,
  slug: "unlocking-intra-african-trade",
  sessionTitle: "Unlocking Intra-African Trade",
  submittedAt: new Date("2026-06-24T10:00:00.000Z"),
  sourcePath: "/academy/webinars/unlocking-intra-african-trade",
};

export default function AcademyRegistrationReceiptPreview() {
  return <AcademyRegistrationReceiptTemplate input={fixture} />;
}
