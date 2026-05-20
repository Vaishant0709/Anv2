"use client";

import { AnimatePresence } from "framer-motion";

import { appRegistry } from "@/lib/appRegistry";
import type { DesktopWindow } from "@/types/desktop";

import { DraggableWindow } from "./DraggableWindow";

interface WindowLayerProps {
  windows: DesktopWindow[];
}

export function WindowLayer({ windows }: WindowLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <AnimatePresence>
        {windows.map((window) => {
          const registryEntry = appRegistry[window.id];

          return (
            <div key={window.id} className="pointer-events-auto">
              <DraggableWindow window={window}>{registryEntry.render()}</DraggableWindow>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
