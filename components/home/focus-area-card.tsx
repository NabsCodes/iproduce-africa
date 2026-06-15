import Image from "next/image";

type FocusAreaCardProps = {
  title: string;
  description: string;
  image: string;
};

export function FocusAreaCard({
  title,
  description,
  image,
}: FocusAreaCardProps) {
  return (
    <article className="group border-border h-full rounded-[20px] border bg-white p-4">
      <div className="relative h-[280px] overflow-hidden rounded-[14px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
