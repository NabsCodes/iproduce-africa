import { PartnerInquiryReceiptTemplate } from "@/lib/email/templates/partner-inquiry-notification";

export default function PartnerInquiryReceiptPreview() {
  return (
    <PartnerInquiryReceiptTemplate
      fullName="Jane Doe"
      organisation="AgriVentures Ltd"
    />
  );
}
