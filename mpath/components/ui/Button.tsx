import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/helpers";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-card hover:-translate-y-0.5 hover:bg-secondary",
  secondary: "border border-border bg-card text-primary hover:-translate-y-0.5 hover:border-primary",
  ghost: "text-secondary hover:bg-card",
};

export function Button({ children, className, href, variant = "primary", ...props }: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
