import Image from "next/image";

type PeopleRosterEmptyProps = {
  message: string;
};

export function PeopleRosterEmpty({ message }: PeopleRosterEmptyProps) {
  return (
    <div
      className="border-default bg-subtle mt-10 rounded-xl border px-6 py-10 sm:px-10 sm:py-12"
      role="status"
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="bg-leaf-50 flex size-12 items-center justify-center rounded-full sm:size-14">
          <Image
            src="/images/shared/logo-mark.webp"
            alt=""
            width={32}
            height={32}
            className="size-7 object-contain opacity-90 sm:size-8"
          />
        </div>
        <p className="text-fg-muted mt-4 text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}
