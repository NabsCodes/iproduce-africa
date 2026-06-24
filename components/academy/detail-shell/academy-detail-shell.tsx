import type { ReactNode } from "react";

import { MotionFade } from "@/components/shared/motion/motion-fade";

/**
 * Slot-based layout shell for Academy track detail pages — Blog today,
 * Courses / Webinars / Events later. Owns layout only (page chrome,
 * column grid, sticky sidebar, hero entrance motion). Does not inspect or
 * transform the data passed to its slots.
 *
 * Each track ships its own renderers for hero/metadata/main/sidebar/related
 * and composes them through this shell. See `academy-spec.md` →
 * "Detail-page shell (shared across tracks)" for the rationale.
 *
 * Slots used by Blog today are required (hero, metadata, main, sidebar,
 * related, cta). Don't add slots for future tracks until they're consumed.
 */
type AcademyDetailShellProps = {
  hero: ReactNode;
  metadata: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
  related: ReactNode;
  cta: ReactNode;
};

export function AcademyDetailShell({
  hero,
  metadata,
  main,
  sidebar,
  related,
  cta,
}: AcademyDetailShellProps) {
  return (
    <>
      <section className="bg-white pt-10 sm:pt-12 lg:pt-16">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <MotionFade scaleFrom={0.98} duration={0.48}>
            {hero}
          </MotionFade>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <div className="mb-6 sm:mb-8">{metadata}</div>
              {main}
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-36 lg:self-start">
              {sidebar}
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-subtle py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          {related}
        </div>
      </section>

      {cta}
    </>
  );
}
