import { CircleCheck } from "lucide-react";

import { PartnershipInquiryForm } from "@/components/partners/partnership-inquiry-form";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";

export function PartnershipInquirySection() {
  const section = partnersPageContent.inquiry;
  return (
    <section
      id={section.id}
      className="bg-subtle scroll-mt-28 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {section.title}
            </h2>
            <p className="text-fg-muted mt-4 max-w-md text-base leading-7">
              {section.description}
            </p>

            <ul className="mt-8 flex flex-col gap-4 sm:mt-10">
              {section.checklist.map((item) => (
                <li
                  key={item}
                  className="text-foreground flex items-start gap-3 text-sm leading-6 sm:text-base"
                >
                  <CircleCheck
                    className="text-leaf-700 mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <PartnershipInquiryForm content={section.form} />
        </div>
      </div>
    </section>
  );
}
