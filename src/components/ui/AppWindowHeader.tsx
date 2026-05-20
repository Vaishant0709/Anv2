"use client";

import type { ReactNode } from "react";

interface AppWindowHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  accentClassName?: string;
  children?: ReactNode;
}

export function AppWindowHeader({
  eyebrow,
  title,
  description,
  accentClassName = "text-[var(--color-accent-soft)]",
  children,
}: AppWindowHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="space-y-2">
        <p className={`text-xs uppercase tracking-[0.3em] ${accentClassName}`}>
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)]">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:rgba(244,235,208,0.76)] sm:text-[15px]">
          {description}
        </p>
      </div>
      {children}
    </header>
  );
}
