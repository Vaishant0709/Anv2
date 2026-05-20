"use client";

import { useEffect, useState } from "react";

import type { TerminalHistoryEntry } from "@/lib/terminal";

interface TerminalHistoryProps {
  entries: TerminalHistoryEntry[];
}

function AnimatedAscii({
  frames,
}: {
  frames: NonNullable<TerminalHistoryEntry["frames"]>;
}) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 420);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [frames]);

  return (
    <pre className="overflow-x-auto whitespace-pre text-[color:rgba(217,255,229,0.9)]">
      {frames[frameIndex]?.text ?? ""}
    </pre>
  );
}

export function TerminalHistory({ entries }: TerminalHistoryProps) {
  return (
    <div className="min-h-[260px] space-y-4 rounded-[24px] border border-emerald-200/10 bg-black/35 p-4 font-mono text-sm text-emerald-100">
      {entries.length === 0 ? (
        <p className="text-emerald-300/70">
          &gt; Welcome back. Type <span className="text-emerald-200">help</span> to begin.
        </p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            <p>
              <span className="mr-2 text-emerald-300/70">$</span>
              {entry.input}
            </p>
            <p className="whitespace-pre-wrap text-[color:rgba(217,255,229,0.88)]">
              {entry.output}
            </p>
            {entry.frames ? <AnimatedAscii frames={entry.frames} /> : null}
          </div>
        ))
      )}
    </div>
  );
}
