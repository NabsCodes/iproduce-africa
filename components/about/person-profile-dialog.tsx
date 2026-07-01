"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { Mail, Phone } from "lucide-react";

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
  return (
    <Dialog open={open && person !== null} onOpenChange={onOpenChange}>
      {person ? (
        <DialogContent
          className={cn(
            "max-h-[calc(100vh-1rem)] max-w-[calc(100vw-0.75rem)] gap-0 overflow-hidden p-0 sm:max-w-2xl",
          )}
        >
          <div className="flex max-h-[calc(100vh-1rem)] flex-col overflow-hidden sm:h-128 sm:max-h-[min(32rem,calc(100vh-2rem))] sm:flex-row">
            <div className="bg-muted relative aspect-4/3 w-full shrink-0 sm:aspect-auto sm:h-full sm:w-40 lg:w-48">
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                className="object-cover"
              />
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <div className="border-grey-200 shrink-0 border-b px-5 pt-5 pr-14 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
                <DialogTitle className="font-serif text-xl sm:text-2xl">
                  {person.name}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm">
                  {person.role}
                </DialogDescription>
                {person.credentials ? (
                  <p className="text-fg-muted mt-3 text-xs leading-5 sm:text-sm">
                    {person.credentials}
                  </p>
                ) : null}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-4">
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

              {person.linkedin || person.email || person.phone ? (
                <div className="border-grey-200 flex shrink-0 flex-wrap items-center gap-3 border-t px-5 py-4 sm:px-6">
                  {person.linkedin ? (
                    <Link
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="border-default text-fg-muted hover:bg-muted inline-flex size-9 items-center justify-center rounded-md border transition"
                    >
                      <FaLinkedinIn className="size-3.5" />
                    </Link>
                  ) : null}
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="text-fg-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition"
                    >
                      <Mail className="size-4 shrink-0" aria-hidden />
                      <span className="wrap-break-word">{person.email}</span>
                    </a>
                  ) : null}
                  {person.phone ? (
                    <a
                      href={`tel:${person.phone.replace(/\s/g, "")}`}
                      className="text-fg-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition"
                    >
                      <Phone className="size-4 shrink-0" aria-hidden />
                      <span>{person.phone}</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
