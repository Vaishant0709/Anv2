"use client";

import { createElement, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PanelTone = "surface" | "strong" | "soft";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof HTMLElementTagNameMap;
  tone?: PanelTone;
}

const toneClasses: Record<PanelTone, string> = {
  surface:
    "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_80px_var(--shadow-color)] backdrop-blur-xl",
  strong:
    "border border-white/10 bg-[var(--color-surface-strong)] shadow-[0_20px_36px_rgba(0,0,0,0.18)]",
  soft:
    "border border-white/10 bg-[rgba(255,255,255,0.05)] shadow-[0_20px_36px_rgba(0,0,0,0.18)]",
};

export function Panel({
  as = "div",
  children,
  className,
  tone = "soft",
  ...props
}: PanelProps) {
  return createElement(
    as,
    {
      className: cn("rounded-[28px]", toneClasses[tone], className),
      ...props,
    },
    children,
  );
}
