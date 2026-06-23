"use client";

import type { HTMLInputTypeAttribute } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ComboboxSelect,
  type ComboboxSelectGroup,
  type ComboboxSelectOption,
} from "@/components/ui/combobox-select";

export type SelectOption = {
  value: string;
  label: string;
};

type FieldWrapperProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder: string;
};

type TextFormFieldProps<TFieldValues extends FieldValues> =
  FieldWrapperProps<TFieldValues> & {
    type?: HTMLInputTypeAttribute;
    autoComplete?: string;
    showLabel?: boolean;
  };

export function TextFormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  type,
  autoComplete,
  showLabel = false,
}: TextFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={showLabel ? undefined : "sr-only"}>
            {placeholder}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              value={(field.value as string | undefined) ?? ""}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type SelectFormFieldProps<TFieldValues extends FieldValues> =
  FieldWrapperProps<TFieldValues> & {
    options: readonly SelectOption[];
  };

type ComboboxFormFieldProps<TFieldValues extends FieldValues> =
  FieldWrapperProps<TFieldValues> & {
    options?: readonly ComboboxSelectOption[];
    groups?: readonly ComboboxSelectGroup[];
    searchPlaceholder?: string;
    emptyMessage?: string;
    emptyHint?: string;
  };

export function ComboboxFormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  options,
  groups,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  emptyHint,
}: ComboboxFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <FormControl>
            <ComboboxSelect
              value={(field.value as string | undefined) ?? ""}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              emptyHint={emptyHint}
              options={options ? [...options] : undefined}
              groups={groups ? [...groups] : undefined}
              invalid={fieldState.invalid}
              triggerAriaLabel={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectFormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  options,
}: SelectFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={(field.value as string | undefined) ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type TextareaFormFieldProps<TFieldValues extends FieldValues> =
  FieldWrapperProps<TFieldValues> & {
    rows?: number;
    showLabel?: boolean;
  };

export function TextareaFormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  rows = 4,
  showLabel = false,
}: TextareaFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={showLabel ? undefined : "sr-only"}>
            {placeholder}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={(field.value as string | undefined) ?? ""}
              placeholder={placeholder}
              rows={rows}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PhoneFormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
}: FieldWrapperProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <FormControl>
            <PhoneInput
              value={(field.value as string | undefined) || undefined}
              onChange={(value) => field.onChange(value ?? "")}
              onBlur={field.onBlur}
              name={field.name}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid ? "true" : "false"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CheckboxGroupFormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: readonly SelectOption[];
};

export function CheckboxGroupFormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
}: CheckboxGroupFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const current: string[] = Array.isArray(field.value) ? field.value : [];

        return (
          <FormItem>
            <FormLabel className="sr-only">{label}</FormLabel>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {options.map((option) => {
                const checked = current.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 text-sm leading-5"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(next) => {
                        field.onChange(
                          next === true
                            ? [...current, option.value]
                            : current.filter(
                                (value: string) => value !== option.value,
                              ),
                        );
                      }}
                    />
                    <span className="text-foreground">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
