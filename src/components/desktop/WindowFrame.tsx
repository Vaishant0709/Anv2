"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

interface WindowFrameProps {
  children: ReactNode;
  isMobile?: boolean;
  onClose: () => void;
  title: string;
}

export function WindowFrame({ children, isMobile = false, onClose, title }: WindowFrameProps) {
  return (
    <Panel className="flex h-full flex-col overflow-hidden rounded-[28px] border-white/12 bg-[rgba(6,10,18,0.82)] shadow-[0_26px_60px_rgba(0,0,0,0.35)]" tone="surface">
      <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-300/75" />
            <span className="h-3 w-3 rounded-full bg-amber-300/75" />
            <span className="h-3 w-3 rounded-full bg-emerald-300/75" />
          </div>
          <p className="text-sm font-medium tracking-wide text-[color:rgba(244,235,208,0.88)]">
            {title}
          </p>
          {isMobile ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:rgba(244,235,208,0.55)]">
              Mobile
            </span>
          ) : null}
        </div>

        <Button
          aria-label={`Close ${title}`}
          className="h-9 w-9 border border-white/10 px-0 py-0 text-[color:rgba(244,235,208,0.75)]"
          onClick={onClose}
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-5">{children}</div>
    </Panel>
  );
}
