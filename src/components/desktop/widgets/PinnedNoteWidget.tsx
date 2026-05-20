"use client";

import type { PinnedNote } from "@/types/content";

interface PinnedNoteWidgetProps {
  note: PinnedNote;
}

export function PinnedNoteWidget({ note }: PinnedNoteWidgetProps) {
  return (
    <div className="relative w-full max-w-[22rem] rotate-[-4deg] rounded-[28px] border border-[rgba(248,215,150,0.34)] bg-[linear-gradient(180deg,rgba(248,215,150,0.95),rgba(243,198,124,0.92))] p-7 text-slate-900 shadow-[0_28px_56px_rgba(0,0,0,0.24)]">
      <div className="absolute left-1/2 top-0 h-6 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(250,241,217,0.82)] shadow-[0_8px_18px_rgba(0,0,0,0.12)]" />
      <p className="text-xs uppercase tracking-[0.24em] text-slate-700/70">
        {note.title}
      </p>
      <p className="mt-4 text-[15px] leading-8 text-slate-900/90">
        {note.body}
      </p>
      <p className="mt-6 text-right font-mono text-sm text-slate-800/80">
        {note.signature}
      </p>
    </div>
  );
}
