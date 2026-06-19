"use client";

type MultiStepDialogHeadingProps = {
  title: string;
  description: string;
};

export function MultiStepDialogHeading({
  title,
  description,
}: MultiStepDialogHeadingProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-foreground font-serif text-xl leading-snug font-semibold sm:text-2xl">
        {title}
      </h3>
      <p className="text-fg-muted text-sm leading-6">{description}</p>
    </div>
  );
}
