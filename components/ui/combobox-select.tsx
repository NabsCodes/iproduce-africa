"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboboxSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  /** Extra terms included in search matching (e.g. alternate country names). */
  searchKeywords?: string;
};

export type ComboboxSelectGroup = {
  heading: string;
  options: ComboboxSelectOption[];
};

type ComboboxSelectProps = {
  options?: ComboboxSelectOption[];
  groups?: ComboboxSelectGroup[];
  value?: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  emptyHint?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  triggerClassName?: string;
  triggerAriaLabel?: string;
};

function scrollOptionIntoList(list: HTMLElement, item: HTMLElement) {
  const listRect = list.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  if (itemRect.top < listRect.top) {
    list.scrollTop -= listRect.top - itemRect.top;
    return;
  }

  if (itemRect.bottom > listRect.bottom) {
    list.scrollTop += itemRect.bottom - listRect.bottom;
  }
}

function renderOptionItem({
  option,
  selectedValue,
  onSelect,
}: {
  option: ComboboxSelectOption;
  selectedValue?: string;
  onSelect: (value: string) => void;
}) {
  const isSelected = selectedValue === option.value;

  return (
    <CommandItem
      key={option.value}
      value={option.value}
      disabled={option.disabled}
      data-selected-value={isSelected ? "true" : undefined}
      className={cn(isSelected && "bg-leaf-50 font-medium")}
      onSelect={(currentValue) => {
        onSelect(currentValue === selectedValue ? "" : currentValue);
      }}
    >
      <span className="truncate">{option.label}</span>
      <Check
        className={cn(
          "text-leaf-700 absolute right-3 size-3.5 shrink-0",
          isSelected ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />
    </CommandItem>
  );
}

export function ComboboxSelect({
  options = [],
  groups,
  value,
  onValueChange,
  onBlur,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  emptyHint,
  disabled = false,
  invalid = false,
  className,
  triggerClassName,
  triggerAriaLabel,
}: ComboboxSelectProps) {
  const [open, setOpen] = React.useState(false);
  const listId = React.useId();
  const listRef = React.useRef<HTMLDivElement>(null);

  const allOptions = React.useMemo(() => {
    if (groups) {
      return groups.flatMap((group) => group.options);
    }
    return options;
  }, [options, groups]);

  const selectedOption = React.useMemo(
    () => allOptions.find((option) => option.value === value),
    [allOptions, value],
  );

  const searchIndex = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const option of allOptions) {
      map.set(
        option.value.toLowerCase(),
        `${option.label} ${option.value} ${option.searchKeywords ?? ""}`.toLowerCase(),
      );
    }
    return map;
  }, [allOptions]);

  const customFilter = React.useCallback(
    (itemValue: string, search: string) => {
      const haystack =
        searchIndex.get(itemValue.toLowerCase()) ?? itemValue.toLowerCase();
      return haystack.includes(search.toLowerCase()) ? 1 : 0;
    },
    [searchIndex],
  );

  React.useLayoutEffect(() => {
    if (!open || !value) return;

    const list = listRef.current;
    if (!list) return;

    const selected = list.querySelector('[data-selected-value="true"]');
    if (selected instanceof HTMLElement) {
      scrollOptionIntoList(list, selected);
    }
  }, [open, value]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      onBlur?.();
    }
  }

  function handleSelect(nextValue: string) {
    onValueChange(nextValue);
    setOpen(false);
  }

  function keepScrollInsidePopover(event: React.WheelEvent | React.TouchEvent) {
    event.stopPropagation();
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-label={triggerAriaLabel ?? placeholder}
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={invalid ? "true" : undefined}
          disabled={disabled}
          className={cn(
            "border-input focus-visible:border-leaf-400 focus-visible:ring-leaf-200 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-11 w-full items-center justify-between gap-2 rounded-md border bg-white px-3.5 text-left text-sm leading-6 transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            !selectedOption && "text-fg-subtle",
            triggerClassName,
          )}
        >
          <span className="min-w-0 flex-1 truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown className="text-fg-subtle size-4 shrink-0" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-(--radix-popover-trigger-width) rounded-md p-0",
          className,
        )}
        align="start"
        side="bottom"
        sideOffset={4}
        collisionPadding={12}
        onWheel={keepScrollInsidePopover}
        onTouchMove={keepScrollInsidePopover}
      >
        <Command
          filter={customFilter}
          className="flex max-h-72 flex-col overflow-hidden rounded-md sm:max-h-80"
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList
            ref={listRef}
            id={listId}
            className="max-h-48 min-h-0 flex-1 overflow-y-auto overscroll-contain sm:max-h-60"
          >
            <CommandEmpty>
              <span className="block">{emptyMessage}</span>
              {emptyHint ? (
                <span className="text-fg-subtle mt-1 block text-xs">
                  {emptyHint}
                </span>
              ) : null}
            </CommandEmpty>
            {groups ? (
              groups.map((group) => (
                <CommandGroup key={group.heading} heading={group.heading}>
                  {group.options.map((option) =>
                    renderOptionItem({
                      option,
                      selectedValue: value,
                      onSelect: handleSelect,
                    }),
                  )}
                </CommandGroup>
              ))
            ) : (
              <CommandGroup>
                {options.map((option) =>
                  renderOptionItem({
                    option,
                    selectedValue: value,
                    onSelect: handleSelect,
                  }),
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
