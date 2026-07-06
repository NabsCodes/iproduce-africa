"use client";

import { PersonPhoto } from "@/components/about/person-photo";
import { PersonSocialLinks } from "@/components/about/person-social-links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { AboutPerson } from "@/types/about";

type PersonProfileDialogProps = {
  person: AboutPerson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PersonProfileDialog({
  person,
  open,
  onOpenChange,
}: PersonProfileDialogProps) {
  const socials = person?.socials ?? [];

  return (
    <Dialog open={open && person !== null} onOpenChange={onOpenChange}>
      {person ? (
        <DialogContent
          className={cn(
            "max-h-[calc(100vh-1rem)] max-w-[calc(100vw-0.75rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl",
          )}
        >
          <div className="flex max-h-[calc(100vh-1rem)] flex-col overflow-hidden sm:h-128 sm:max-h-[min(32rem,calc(100vh-2rem))] sm:flex-row">
            <PersonPhoto
              src={person.photo}
              alt={person.name}
              sizes="(max-width: 640px) 100vw, 40vw"
              className="border-grey-200 aspect-4/3 w-full shrink-0 border-r sm:aspect-auto sm:h-full sm:w-2/5"
              imageClassName="object-[center_22%]"
            />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
              <div className="border-grey-200 bg-subtle shrink-0 border-b px-5 pt-5 pr-14 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
                <DialogTitle className="font-serif text-xl sm:text-2xl">
                  {person.name}
                </DialogTitle>
                <DialogDescription className="text-fg-subtle mt-1 text-sm">
                  {person.role}
                </DialogDescription>
                {person.credentials ? (
                  <p className="text-fg-muted mt-3 text-xs leading-5 sm:text-sm">
                    {person.credentials}
                  </p>
                ) : null}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
                <div className="flex flex-col gap-4 py-5 sm:py-6">
                  {person.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-fg-muted text-sm leading-6 sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "border-grey-200 bg-subtle shrink-0 border-t",
                  socials.length > 0 && "px-5 py-4 sm:px-6",
                )}
              >
                {socials.length > 0 ? (
                  <PersonSocialLinks
                    socials={socials}
                    personName={person.name}
                    size="md"
                    showValueOnHover
                  />
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
