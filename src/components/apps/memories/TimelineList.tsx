"use client";

import { logger } from "@/lib/logger";
import type { TimelineEntry } from "@/types/content";

import { TimelineCard } from "./TimelineCard";

interface TimelineListProps {
  entries: TimelineEntry[];
}

export function TimelineList({ entries }: TimelineListProps) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-[rgba(245,185,113,0.45)] via-[rgba(131,197,190,0.4)] to-transparent sm:left-[23px]" />

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <div key={`${entry.date ?? "undated"}-${entry.title}`} className="relative pl-10 sm:pl-12">
            <div className="absolute left-0 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(245,185,113,0.35)] bg-[rgba(10,18,32,0.92)] text-xs font-semibold text-[var(--color-accent)] shadow-[0_10px_22px_rgba(0,0,0,0.22)]">
              {index + 1}
            </div>

            <div
              onMouseEnter={() => {
                logger.info("[memories] timeline card viewed", {
                  title: entry.title,
                  index,
                });
              }}
            >
              <TimelineCard entry={entry} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
