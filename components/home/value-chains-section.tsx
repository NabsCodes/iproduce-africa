import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { placeholderImages } from "@/lib/placeholder-images";

const valueChains = [
  {
    title: "Livestock",
    description:
      "Cattle, poultry, aquaculture — building resilient protein value chains across the continent.",
    image: placeholderImages.valueChains.livestock,
  },
  {
    title: "Cotton & Garment",
    description:
      "From field to fabric — integrating cotton growers into regional textile and fashion supply chains.",
    image: placeholderImages.valueChains.cotton,
  },
  {
    title: "Fruits & Vegetables",
    description:
      "Reducing post-harvest losses and connecting produce to urban, export, and processing markets.",
    image: placeholderImages.valueChains.fruits,
  },
  {
    title: "Essential Oils",
    description:
      "Unlocking Africa's aromatic plant heritage for high-value cosmetic, pharma, and wellness markets.",
    image: placeholderImages.valueChains.oils,
  },
  {
    title: "Horticulture",
    description:
      "High-value greenhouse and floriculture production for domestic and export markets.",
    image: placeholderImages.valueChains.horticulture,
  },
];

export function ValueChainsSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <EyebrowBadge>Core areas of focus</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              The people behind iProduce Africa
            </h2>
          </div>
          <p className="max-w-[360px] text-base leading-6 text-[var(--text-fg-muted)]">
            Four connected sectors forming the backbone of iProduce
            Africa&apos;s agribusiness transformation agenda.
          </p>
        </div>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-2">
          {valueChains.map((chain) => (
            <article
              key={chain.title}
              className="w-[282px] shrink-0 rounded-[20px] border border-[var(--border-subtle)] bg-white p-4"
            >
              <div className="relative h-[280px] overflow-hidden rounded-[14px]">
                <Image
                  src={chain.image}
                  alt={chain.title}
                  fill
                  className="object-cover"
                  sizes="282px"
                />
                <div className="absolute inset-0 bg-black/10" aria-hidden />
              </div>
              <h3 className="text-foreground mt-3 font-serif text-lg leading-[26px] font-semibold">
                {chain.title}
              </h3>
              <p className="mt-1 text-xs leading-4 text-[var(--text-fg-muted)]">
                {chain.description}
              </p>
            </article>
          ))}
        </div>

        <CarouselDots total={3} className="mt-10 justify-end" />
      </Container>
    </section>
  );
}
