import { BecomePartnerReceiptTemplate } from "@/lib/email/templates/become-partner-notification";

export default function BecomePartnerReceiptPreview() {
  return (
    <BecomePartnerReceiptTemplate
      fullName="Samuel Adeyemi"
      organisationName="Harvest Impact Foundation"
    />
  );
}
