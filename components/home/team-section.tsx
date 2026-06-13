import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const team = [
  {
    name: "Amara Okafor",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kwame Mensah",
    role: "Head of Partnerships",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Fatima Diallo",
    role: "Director of Academy",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Kimani",
    role: "Community Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Grace Mwangi",
    role: "Programs Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export function TeamSection() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Team"
          title="The people behind iProduce Africa"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {team.map((member) => (
            <article key={member.name} className="text-center">
              <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <h3 className="mt-4 font-sans text-sm font-semibold text-green-950 sm:text-base">
                {member.name}
              </h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
