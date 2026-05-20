"use client";

import type { DesktopIconConfig } from "@/types/apps";

import { DesktopIcon } from "./DesktopIcon";

interface DesktopIconsProps {
  icons: DesktopIconConfig[];
  onOpen: (id: DesktopIconConfig["id"]) => void;
}

export function DesktopIcons({ icons, onOpen }: DesktopIconsProps) {
  return (
    <div className="relative z-10 grid max-w-max grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1">
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} icon={icon} onOpen={onOpen} />
      ))}
    </div>
  );
}
