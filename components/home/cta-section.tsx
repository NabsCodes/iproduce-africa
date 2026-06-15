import { Handshake, Sprout, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative z-10 -mb-40 pb-0">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-forest-600 relative overflow-hidden rounded-[28px] px-8 py-[72px] text-center text-white sm:px-16">
          <div
            aria-hidden
            className="border-tangerine-400/30 pointer-events-none absolute -top-16 -right-16 size-56 rounded-full border-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-16 -left-14 size-44 rounded-full border-32 border-(--leaf-emphasized)/20"
          />
          <Sprout
            aria-hidden
            className="pointer-events-none absolute top-8 left-14 size-48 -rotate-12 text-white/5"
          />

          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-3 py-2">
              <span className="bg-leaf-emphasized h-px w-9" aria-hidden />
              <span className="text-leaf-emphasized text-xs font-semibold tracking-[0.18em] uppercase">
                Be part of the future
              </span>
            </div>

            <h2 className="mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Join the Future of African Agriculture
            </h2>

            <p className="mt-4 text-lg leading-7 text-[#dde5da]">
              Whether you&apos;re an agripreneur building your enterprise or an
              organisation looking to create lasting agricultural impact — your
              pathway starts here.
            </p>
            <p className="mt-2 text-lg leading-7 text-[#dde5da]">
              Join free, connect across borders, and turn conversations into
              alliances.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/community" variant="green" size="lg">
                <Users className="size-6" />
                Join our community
              </ButtonLink>
              <ButtonLink href="/partners" variant="tangerine" size="lg">
                <Handshake className="size-6" />
                Partner with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
