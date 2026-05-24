import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/helpers";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 shadow-card", className)} {...props}>
      {children}
    </div>
  );
}
