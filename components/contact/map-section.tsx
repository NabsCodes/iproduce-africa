import { ArrowUpRight } from "lucide-react";

import { contactPageContent } from "@/content/contact";
import { siteConfig } from "@/content/site";

export function ContactMapSection() {
  const { map } = contactPageContent;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative overflow-hidden rounded-xl">
          <iframe
            title={`Map showing ${map.hubTitle}`}
            src={map.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-default h-[360px] w-full border-0 sm:h-[420px] lg:h-[480px]"
          />

          <div className="border-default absolute top-4 right-4 hidden max-w-[260px] rounded-xl border bg-white p-4 sm:top-5 sm:right-5 sm:block sm:max-w-xs sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-semibold sm:text-base">
                  {map.hubTitle}
                </p>
                <p className="text-fg-muted mt-1 text-xs leading-5 sm:text-sm">
                  {siteConfig.address}
                </p>
              </div>
              <a
                href={map.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary inline-flex shrink-0 items-center gap-1 text-xs font-semibold sm:text-sm"
              >
                Directions
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
            <a
              href={map.viewLargerUrl}
              target="_blank"
              rel="noreferrer"
              className="text-tangerine-600 mt-3 inline-block text-xs font-semibold sm:text-sm"
            >
              View larger map
            </a>
          </div>
        </div>

        <div className="mt-4 sm:hidden">
          <a
            href={map.viewLargerUrl}
            target="_blank"
            rel="noreferrer"
            className="border-default bg-background text-foreground hover:bg-muted focus-visible:ring-leaf-300 inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
