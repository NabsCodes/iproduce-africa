import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { placeholderImages } from "@/lib/placeholder-images";

const stats = [
  { value: "2,400", suffix: "+", label: "Agripreneurs", accent: false },
  { value: "100", suffix: "+", label: "Partner Orgs", accent: true },
  { value: "100", suffix: "%", label: "Training success", accent: true },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden">
      <Image
        src={placeholderImages.hero}
        alt="Agripreneur working in a greenhouse"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(66deg, rgba(15, 30, 2, 0.5) 25.56%, rgba(15, 30, 2, 0.5) 43.5%, rgba(0, 0, 0, 0) 92%)",
        }}
      />

      <Container className="relative flex min-h-[720px] items-end pt-16 pb-[72px]">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[677px]">
            <div className="inline-flex items-center gap-1 rounded-full bg-(--leaf-subtle) px-3 py-2">
              <span className="bg-acid-600 size-1.5 rounded-full" aria-hidden />
              <span className="text-acid-600 text-xs font-semibold tracking-[0.18em] uppercase">
                Africa&apos;s Agribusiness Ecosystem Platform
              </span>
            </div>

            <h1 className="mt-6 font-serif text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[72px] lg:leading-[76px]">
              Unlocking Local and Global Agribusiness Opportunities
            </h1>

            <p className="mt-8 max-w-[618px] text-lg leading-7 text-white">
              We connect you with helpful resources, services and opportunities
              to start or grow your agribusiness.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/community" variant="green" size="lg">
                Apply for Membership
                <ArrowUpRight className="size-5" />
              </ButtonLink>
              <ButtonLink href="/partners" variant="green-soft" size="lg">
                Partner with Us
              </ButtonLink>
            </div>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/20 p-6 backdrop-blur-sm lg:w-auto lg:max-w-none">
            <span
              className="bg-leaf-emphasized mb-4 inline-block size-1.5 rounded-full"
              aria-hidden
            />
            <div className="flex gap-8 border-t border-[#e2dfda] pt-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-[32px] leading-10 tracking-[-0.01em] text-white">
                    <span className="font-semibold">{stat.value}</span>
                    <span
                      className={
                        stat.accent
                          ? "font-normal text-[#c8eb99] italic"
                          : undefined
                      }
                    >
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-white">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
