"use client";

import { motion } from "framer-motion";

import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { ReasonCardEntry } from "@/types/content";

interface ReasonCardProps {
  accent: "amber" | "mint" | "rose";
  index: number;
  isStacked: boolean;
  onInteract: (reason: ReasonCardEntry, index: number) => void;
  reason: ReasonCardEntry & {
    rotation: number;
    xOffset: number;
    yOffset: number;
  };
}

const accentStyles = {
  amber:
    "border-[rgba(245,185,113,0.28)] bg-[linear-gradient(180deg,rgba(245,185,113,0.18),rgba(255,255,255,0.06))]",
  mint:
    "border-[rgba(131,197,190,0.28)] bg-[linear-gradient(180deg,rgba(131,197,190,0.18),rgba(255,255,255,0.06))]",
  rose:
    "border-[rgba(251,182,206,0.24)] bg-[linear-gradient(180deg,rgba(251,182,206,0.18),rgba(255,255,255,0.06))]",
};

export function ReasonCard({
  accent,
  index,
  isStacked,
  onInteract,
  reason,
}: ReasonCardProps) {
  return (
    <motion.article
      className={cn(
        "relative flex min-h-52 cursor-grab flex-col justify-between rounded-[28px] border p-5 shadow-[0_20px_36px_rgba(0,0,0,0.2)] backdrop-blur-sm active:cursor-grabbing",
        accentStyles[accent],
      )}
      drag
      dragElastic={0.18}
      dragMomentum={false}
      initial={{
        opacity: 0,
        rotate: reason.rotation - 3,
        scale: 0.96,
        x: reason.xOffset,
        y: reason.yOffset + 20,
      }}
      onDragStart={() => {
        logger.info("[reasons] card interacted", {
          id: reason.id,
          index,
          interaction: "drag-start",
        });
        onInteract(reason, index);
      }}
      onMouseEnter={() => {
        onInteract(reason, index);
      }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{
        rotate: reason.rotation / 2,
        scale: 1.02,
        y: reason.yOffset - 6,
      }}
      whileInView={{
        opacity: 1,
        rotate: reason.rotation,
        scale: 1,
        x: reason.xOffset,
        y: reason.yOffset,
      }}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:rgba(244,235,208,0.58)]">
          Why I Love You
        </p>
        <p className="text-lg leading-8 text-[var(--color-foreground)]">{reason.text}</p>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[color:rgba(244,235,208,0.52)]">
        <span>Card {index + 1}</span>
        <span>{isStacked ? "Drag me" : "Hover me"}</span>
      </div>
    </motion.article>
  );
}
