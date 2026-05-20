"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "accent" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  accent:
    "bg-[var(--color-accent)] text-slate-950 hover:brightness-105 focus:ring-[rgba(245,185,113,0.35)]",
  ghost:
    "border border-white/10 bg-white/5 text-[var(--color-foreground)] hover:bg-white/10 focus:ring-white/20",
};

export function Button({
  children,
  className,
  type = "button",
  variant = "accent",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
