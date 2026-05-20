"use client";

import { motion } from "framer-motion";

import type { FlowerPetalState } from "@/lib/flower";

interface FlowerPetalProps {
  index: number;
  onPluck: (petalId: string) => void;
  petal: FlowerPetalState;
  total: number;
}

const PETAL_COLORS = [
  "#f5b971",
  "#f8c38d",
  "#f6a6b2",
  "#f3d49e",
  "#f9b07e",
  "#f7c7d8",
];

export function FlowerPetal({ index, onPluck, petal, total }: FlowerPetalProps) {
  const angle = (360 / total) * index - 90;
  const color = PETAL_COLORS[index % PETAL_COLORS.length];

  return (
    <motion.button
      animate={
        petal.isPlucked
          ? {
              opacity: 0,
              rotate: angle + 28,
              x: Math.cos((angle * Math.PI) / 180) * 120,
              y: Math.sin((angle * Math.PI) / 180) * 120 + 70,
            }
          : {
              opacity: 1,
              rotate: angle,
              x: Math.cos((angle * Math.PI) / 180) * 72,
              y: Math.sin((angle * Math.PI) / 180) * 72,
            }
      }
      className="absolute left-1/2 top-1/2 h-28 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/15 shadow-[0_18px_30px_rgba(0,0,0,0.18)] focus:outline-none focus:ring-2 focus:ring-[rgba(245,185,113,0.35)]"
      disabled={petal.isPlucked}
      initial={false}
      onClick={() => onPluck(petal.id)}
      style={{
        background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4), transparent 42%), linear-gradient(180deg, ${color}, rgba(255,255,255,0.75))`,
        transformOrigin: "center 85%",
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      type="button"
      whileHover={petal.isPlucked ? undefined : { scale: 1.05 }}
      whileTap={petal.isPlucked ? undefined : { scale: 0.97 }}
    >
      <span className="sr-only">Reveal petal {index + 1}</span>
    </motion.button>
  );
}
