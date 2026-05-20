"use client";

import { useEffect, useState } from "react";
import { FolderHeart, Flower2, Heart, Music4, Terminal } from "lucide-react";

import { appRegistry } from "@/lib/appRegistry";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { AppId } from "@/types/apps";
import type { DesktopWindow } from "@/types/desktop";

const iconMap = {
  FolderHeart,
  Heart,
  Flower2,
  Music4,
  Terminal,
};

interface TaskbarProps {
  activeWindowId: AppId | null;
  openWindows: DesktopWindow[];
  onFocusWindow: (id: AppId) => void;
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function Taskbar({ activeWindowId, openWindows, onFocusWindow }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000 * 30);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-[rgba(6,10,18,0.72)] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {openWindows.length === 0 ? (
            <p className="px-2 text-sm text-[color:rgba(244,235,208,0.58)]">
              Double-click an icon to open an app.
            </p>
          ) : (
            openWindows.map((window) => {
              const registryEntry = appRegistry[window.id];
              const IconComponent = iconMap[registryEntry.icon];
              const isActive = activeWindowId === window.id;

              return (
                <button
                  key={window.id}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                    isActive
                      ? "border-[rgba(245,185,113,0.55)] bg-[rgba(245,185,113,0.18)] text-[var(--color-foreground)]"
                      : "border-white/10 bg-white/5 text-[color:rgba(244,235,208,0.74)] hover:bg-white/10",
                  )}
                  onClick={() => {
                    logger.info("[taskbar] app refocused", { appId: window.id });
                    onFocusWindow(window.id);
                  }}
                  type="button"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{window.title}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[color:rgba(244,235,208,0.82)]">
          {currentTime}
        </div>
      </div>
    </div>
  );
}
