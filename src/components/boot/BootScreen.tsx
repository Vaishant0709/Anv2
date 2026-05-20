"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { logger } from "@/lib/logger";

interface BootScreenProps {
  lines: string[];
  onComplete: () => void;
}

const LINE_REVEAL_DELAY_MS = 950;
const COMPLETION_DELAY_MS = 700;

export function BootScreen({ lines, onComplete }: BootScreenProps) {
  const [visibleLineCount, setVisibleLineCount] = useState(1);
  const visibleLines = useMemo(() => lines.slice(0, visibleLineCount), [lines, visibleLineCount]);

  useEffect(() => {
    logger.info("[boot] sequence started", { lines: lines.length });

    const timers: number[] = [];

    lines.slice(1).forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleLineCount(index + 2);
      }, LINE_REVEAL_DELAY_MS * (index + 1));

      timers.push(timer);
    });

    const completionTimer = window.setTimeout(() => {
      logger.info("[boot] sequence completed");
      onComplete();
    }, LINE_REVEAL_DELAY_MS * Math.max(lines.length - 1, 0) + COMPLETION_DELAY_MS);

    timers.push(completionTimer);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [lines, onComplete]);

  return (
    <motion.section
      animate={{ opacity: 1 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020712] px-6 py-10"
      exit={{ opacity: 0, scale: 0.98 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(131,197,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(131,197,190,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-3xl rounded-[28px] border border-emerald-200/10 bg-black/60 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-10 sm:py-12">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-300/70" />
          <span className="h-3 w-3 rounded-full bg-amber-300/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-300/70" />
        </div>

        <div className="space-y-4 font-mono text-sm leading-7 text-emerald-100 sm:text-base">
          {visibleLines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="mr-3 text-emerald-300/70">&gt;</span>
              {line}
            </motion.p>
          ))}

          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            className="text-emerald-300/70"
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.1, ease: "easeInOut" }}
          >
            _
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
