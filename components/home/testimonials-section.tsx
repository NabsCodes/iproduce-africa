import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { placeholderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "iProduce connected our us to two new buyers in 3 months — the platform pays for itself.",
    name: "Aïssatou Diallo",
    role: "Cooperative Lead · Senegal",
    image: placeholderImages.testimonials.aissatou,
    initials: null,
  },
  {
    quote:
      "From the academy to the marketplace, everything we need to grow sits in one ecosystem.",
    name: "Kofi Mensah",
    role: "Exporter · Ghana",
    image: null,
    initials: "KM",
  },
  {
    quote:
      "The bootcamp gave me my first export client. I came for the training and left with a market.",
    name: "Zainab A.",
    role: "Shea processor · Kano · Cohort 2",
    image: null,
    initials: "ZA",
  },
];

function Avatar({
  image,
  initials,
  name,
}: {
  image: string | null;
  initials: string | null;
  name: string;
}) {
  if (image) {
    return (
      <div className="relative size-8 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>
    );
  }

  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-full",
        "text-forest-600 bg-[#c8eb99] text-[11px] font-semibold tracking-wide",
      )}
    >
      {initials}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="max-w-xl">
          <EyebrowBadge>Our impact</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
            What our community says
          </h2>
          <p className="mt-3 text-base leading-6 text-[var(--text-fg-muted)]">
            Farmers, traders and innovators on what iProduce changed for them.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col gap-4 rounded-[20px] bg-[var(--bg-subtle)] p-8"
            >
              <Quote className="text-acid-600 size-6" aria-hidden />
              <p className="text-foreground font-serif text-xl leading-7 font-semibold">
                {item.quote}
              </p>
              <div className="flex items-center gap-3">
                <Avatar
                  image={item.image}
                  initials={item.initials}
                  name={item.name}
                />
                <div>
                  <p className="text-foreground text-[13px] font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--text-fg-subtle)]">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <CarouselDots total={3} className="mt-10 justify-center" />
      </Container>
    </section>
  );
}
