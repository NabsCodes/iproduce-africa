import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden">
      <Image
        src={homeContent.hero.image}
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

      <div className="max-w-8xl relative mx-auto flex min-h-[720px] w-full items-end px-4 pt-16 pb-[72px] sm:px-6 lg:px-8 xl:px-10">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[677px]">
            <div className="inline-flex items-center gap-1 rounded-full bg-(--leaf-subtle) px-3 py-2">
              <span className="bg-leaf-600 size-1.5 rounded-full" aria-hidden />
              <span className="text-leaf-600 text-xs font-semibold tracking-[0.18em] uppercase">
                {homeContent.hero.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 font-serif text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[72px] lg:leading-[76px]">
              {homeContent.hero.title}
            </h1>

            <p className="mt-8 max-w-[618px] text-lg leading-7 text-white">
              {homeContent.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/community" variant="green" size="lg">
                Join our community
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
              {homeContent.hero.stats.map((stat, index) => (
                <div key={stat.label}>
                  <p className="font-serif text-[32px] leading-10 tracking-[-0.01em] text-white">
                    <span className="font-semibold">{stat.value}</span>
                    <span
                      className={
                        index > 0
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
      </div>
    </section>
  );
}
