"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import type { AcademyRegistrationTarget } from "@/components/academy/registration/academy-registration-provider";
import { useAcademyRegistration } from "@/components/academy/registration/academy-registration-provider";
import { Button } from "@/components/ui/button";

type AcademyRegisterButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "type"
> &
  AcademyRegistrationTarget & {
    label: string;
  };

export function AcademyRegisterButton({
  kind,
  slug,
  title,
  label,
  children,
  ...buttonProps
}: AcademyRegisterButtonProps) {
  const { openRegistration } = useAcademyRegistration();

  return (
    <Button
      type="button"
      {...buttonProps}
      onClick={() => openRegistration({ kind, slug, title })}
    >
      {children ?? (
        <>
          {label}
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  );
}
