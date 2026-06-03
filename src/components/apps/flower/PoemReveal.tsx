"use client";

import { motion } from "framer-motion";

import { formatFlowerPoem } from "@/lib/flower";

interface PoemRevealProps {
  allPlucked: boolean;
  poem: string | null;
}

export function PoemReveal({ allPlucked, poem }: PoemRevealProps) {
  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-[0_20px_36px_rgba(0,0,0,0.18)]"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
        Reveal
      </p>

      <div className="mt-5 space-y-4">
        <p className="text-sm uppercase tracking-[0.22em] text-[color:rgba(244,235,208,0.52)]">
          {allPlucked ? "Every Petal Opened" : "Current Promise"}
        </p>
        <p className="text-2xl font-semibold leading-9 text-[var(--color-foreground)]">
          {poem ? (
            <span className="space-y-4">
              {formatFlowerPoem(poem).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          ) : (
            "Click a petal to reveal a little note waiting underneath it."
          )}
        </p>
        <p className="text-sm leading-7 text-[color:rgba(244,235,208,0.72)]">
          {allPlucked
            ? "You found every hidden note. This flower is officially out of secrets."
            : "Each petal carries one small line from the future, the present, or a memory that still lingers."}
        </p>
      </div>
    </motion.aside>
  );
}
