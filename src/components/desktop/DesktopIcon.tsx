"use client";

import { FolderHeart, Flower2, Heart, Music4, Terminal } from "lucide-react";

import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { DesktopIconConfig } from "@/types/apps";

const iconMap = {
  FolderHeart,
  Heart,
  Flower2,
  Music4,
  Terminal,
};

interface DesktopIconProps {
  icon: DesktopIconConfig;
  onOpen: (id: DesktopIconConfig["id"]) => void;
}

export function DesktopIcon({ icon, onOpen }: DesktopIconProps) {
  const IconComponent = iconMap[icon.icon];

  function handleActivate() {
    logger.info("[desktop] icon activated", { appId: icon.id });
    onOpen(icon.id);
  }

  return (
    <button
      aria-label={`Open ${icon.label}`}
      className={cn(
        "group flex w-24 select-none flex-col items-center gap-3 rounded-3xl border border-transparent px-3 py-4 text-center transition",
        "hover:border-white/10 hover:bg-white/8 focus:border-[var(--color-accent)] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[rgba(245,185,113,0.18)]",
      )}
      onDoubleClick={handleActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleActivate();
        }
      }}
      type="button"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] shadow-[0_16px_30px_rgba(0,0,0,0.24)]">
        <IconComponent className="h-8 w-8 text-[var(--color-accent)] transition group-hover:scale-105" />
      </span>
      <span className="text-sm font-medium leading-5 text-[color:rgba(244,235,208,0.88)]">
        {icon.label}
      </span>
    </button>
  );
}
