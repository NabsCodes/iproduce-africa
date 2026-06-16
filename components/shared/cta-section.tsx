import Image from "next/image";
import { Handshake, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DecorativeRing } from "@/components/ui/decorative-ring";

export function CtaSection() {
  return (
    <section className="relative z-10 -mb-28 pb-0 sm:-mb-32 lg:-mb-40">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-forest-900 relative overflow-clip rounded-[28px] px-6 py-14 text-center text-white sm:px-10 sm:py-16 lg:px-16 lg:py-[72px]">
          <DecorativeRing
            strokeWidth={10}
            className="text-tangerine-500 -top-12 -right-10 size-[150px] md:hidden"
          />
          <DecorativeRing
            strokeWidth={10}
            className="text-tangerine-500 top-1/2 -left-18 hidden size-[200px] -translate-y-1/2 md:block"
          />
          <DecorativeRing
            strokeWidth={10}
            className="text-leaf-700 top-0 right-0 hidden size-[260px] translate-x-1/2 -translate-y-1/2 md:block"
          />

          <Image
            src="/svgs/sprout.svg"
            alt="Sprout"
            aria-hidden
            width={228}
            height={158}
            unoptimized
            className="pointer-events-none absolute top-6 left-10 hidden w-44 md:block"
          />

          <Image
            src="/svgs/tree.svg"
            alt="Tree"
            aria-hidden
            width={355}
            height={308}
            unoptimized
            className="pointer-events-none absolute right-12 bottom-4 hidden w-72 md:block"
          />

          <Image
            src="/svgs/tree.svg"
            alt="Tree"
            aria-hidden
            width={355}
            height={308}
            unoptimized
            className="pointer-events-none absolute right-5 -bottom-18 w-36 opacity-25 md:hidden"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col gap-2 opacity-80 sm:bottom-8 sm:gap-3 lg:bottom-10"
          >
            <Image
              src="/svgs/lines-1.svg"
              alt="Lines"
              width={1312}
              height={19}
              unoptimized
              className="w-full"
            />
            <Image
              src="/svgs/lines-2.svg"
              alt="Lines"
              width={1312}
              height={25}
              unoptimized
              className="w-full"
            />
            <Image
              src="/svgs/lines-3.svg"
              alt="Lines"
              width={1312}
              height={17}
              unoptimized
              className="w-full"
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-3 py-2">
              <span
                className="bg-leaf-emphasized hidden h-px w-9 sm:block"
                aria-hidden
              />
              <span className="text-leaf-emphasized text-xs font-semibold tracking-[0.18em] uppercase">
                Be part of the future
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Join the Future of African Agriculture
            </h2>

            <p className="mt-4 hidden text-lg leading-7 text-[#dde5da] sm:block">
              Whether you&apos;re an agripreneur building your enterprise or an
              organisation looking to create lasting agricultural impact — your
              pathway starts here.
            </p>
            <p className="mt-4 text-base leading-6 text-[#dde5da] sm:mt-2 sm:text-lg sm:leading-7">
              Join free, connect across borders, and turn conversations into
              alliances.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <ButtonLink
                href="/community"
                variant="green"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Users className="hidden size-6 sm:block" />
                Join our community
              </ButtonLink>
              <ButtonLink
                href="/partners"
                variant="tangerine"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Handshake className="hidden size-6 sm:block" />
                Partner with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
