"use client";

import "react-phone-number-input/style.css";

import * as React from "react";
import PhoneInputBase, {
  type Country,
  type Value,
} from "react-phone-number-input";

import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: Value;
  onChange: (value?: Value) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  placeholder?: string;
  defaultCountry?: Country;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function PhoneInput({
  className,
  defaultCountry = "NG",
  ...props
}: PhoneInputProps) {
  return (
    <div
      data-slot="phone-input"
      className={cn(
        "border-input focus-within:border-leaf-400 focus-within:ring-leaf-200 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-11 w-full items-center gap-2 rounded-md border bg-white px-3 transition-colors focus-within:ring-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        className,
      )}
      aria-invalid={props["aria-invalid"]}
    >
      <PhoneInputBase
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        className="phone-input flex w-full items-center gap-2"
        {...props}
      />
    </div>
  );
}

export { PhoneInput };
export type { PhoneInputProps };
