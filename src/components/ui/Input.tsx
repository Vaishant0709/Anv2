"use client";

import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-[var(--color-border)] bg-black/20 px-5 py-4 text-base text-[var(--color-foreground)] outline-none transition placeholder:text-[color:rgba(244,235,208,0.38)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[rgba(245,185,113,0.18)]",
        className,
      )}
      {...props}
    />
  );
}
