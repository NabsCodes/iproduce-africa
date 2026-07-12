import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center duration-300 justify-center gap-2 border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-leaf-700",
        secondary: "bg-secondary text-secondary-foreground hover:bg-leaf-200",
        outline: "border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-rose-700",

        /* iProduce brand palettes */
        green:
          "bg-leaf-600 text-white hover:bg-leaf-700 focus-visible:ring-leaf-400",
        "green-soft":
          "bg-leaf-100 text-forest-800 hover:bg-leaf-200 focus-visible:ring-leaf-300",
        "green-outline":
          "border-leaf-600 bg-transparent text-leaf-700 hover:bg-leaf-50 focus-visible:ring-leaf-300",
        "green-ghost":
          "bg-transparent text-leaf-700 hover:bg-leaf-50 focus-visible:ring-leaf-300",
        "green-link":
          "bg-transparent px-0 text-leaf-700 hover:text-leaf-800 focus-visible:ring-leaf-300",

        tangerine:
          "bg-tangerine-400 text-grey-950 hover:bg-tangerine-600 focus-visible:ring-tangerine-300",
        "tangerine-soft":
          "bg-tangerine-100 text-tangerine-800 hover:bg-tangerine-200 focus-visible:ring-tangerine-300",
        "tangerine-outline":
          "border-tangerine-500 bg-transparent text-tangerine-700 hover:bg-tangerine-50 focus-visible:ring-tangerine-300",

        neutral:
          "bg-grey-900 text-white hover:bg-grey-800 focus-visible:ring-grey-400",
        "neutral-soft":
          "bg-grey-100 text-grey-800 hover:bg-grey-200 focus-visible:ring-grey-300",
        "neutral-outline":
          "border-grey-300 bg-transparent text-grey-800 hover:bg-grey-50 focus-visible:ring-grey-300",

        "outline-light":
          "border-white/60 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/40",
      },
      size: {
        /* Figma spec sizes */
        sm: "h-10 rounded-md px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-12 rounded-md px-5 text-sm [&_svg:not([class*='size-'])]:size-5",
        lg: "h-14 rounded-lg px-6 text-base [&_svg:not([class*='size-'])]:size-6",

        /* shadcn compat */
        default:
          "h-12 rounded-lg px-5 text-sm [&_svg:not([class*='size-'])]:size-5",
        xs: "h-8 rounded-md px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-12 rounded-md [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-10 rounded-md [&_svg:not([class*='size-'])]:size-4",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "green",
      size: "md",
      fullWidth: false,
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

type ButtonLinkProps = Omit<ButtonProps, "asChild"> & {
  href: string;
};

function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export { Button, ButtonLink, buttonVariants };
