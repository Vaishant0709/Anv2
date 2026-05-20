"use client";

import Image from "next/image";

import { Panel } from "@/components/ui/Panel";
import type { TimelineEntry } from "@/types/content";

interface MemoryOfTheDayWidgetProps {
  memory: TimelineEntry | null;
}

export function MemoryOfTheDayWidget({ memory }: MemoryOfTheDayWidgetProps) {
  if (!memory) {
    return (
      <Panel className="max-w-md p-6" tone="soft">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Memory Of The Day
        </p>
        <p className="mt-4 text-sm leading-7 text-[color:rgba(244,235,208,0.72)]">
          Add a memory entry in `siteData.timeline` to fill this little polaroid.
        </p>
      </Panel>
    );
  }

  return (
    <div className="w-full max-w-md rotate-[2deg] rounded-[30px] bg-[#f6f0e7] p-5 text-slate-900 shadow-[0_34px_70px_rgba(0,0,0,0.28)]">
      <div className="relative h-72 overflow-hidden rounded-[22px] bg-slate-200">
        <Image
          alt={memory.title}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          src={memory.image}
        />
      </div>
      <div className="space-y-3 px-2 pb-2 pt-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
          Memory Of The Day
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          {memory.title}
        </h3>
        <p className="text-[15px] leading-7 text-slate-700">{memory.description}</p>
        <p className="pt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
          {memory.date}
        </p>
      </div>
    </div>
  );
}
