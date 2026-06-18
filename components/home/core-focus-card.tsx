import Image from "next/image";

type CoreFocusCardProps = {
  title: string;
  description: string;
  image: string;
};

export function CoreFocusCard({
  title,
  description,
  image,
}: CoreFocusCardProps) {
  return (
    <article className="group border-border h-full rounded-xl border bg-white p-4">
      <div className="relative h-[228px] overflow-hidden rounded-xl sm:h-[280px]">
        <Image
          src={image}
          alt={title}
          fill
          draggable={false}
          className="pointer-events-none object-cover transition-transform duration-500 select-none group-hover:scale-[1.03]"
          sizes="282px"
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>
      <h3 className="text-foreground mt-3 font-serif text-lg leading-[26px] font-semibold">
        {title}
      </h3>
      <p className="text-muted-foreground mt-1 text-xs leading-4">
        {description}
      </p>
    </article>
  );
}
