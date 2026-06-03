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

type PetalLayout = {
  pluckedX: number;
  pluckedY: number;
  rotate: number;
  x: number;
  y: number;
};

function getPetalLayout(total: number, index: number, angle: number): PetalLayout {
  const ringRadius = total <= 3 ? 82 : 76;

  if (total === 3) {
    const layouts = [
      { x: -44, y: -40, rotate: -58, pluckedX: -110, pluckedY: -122 },
      { x: 44, y: -40, rotate: 58, pluckedX: 110, pluckedY: -122 },
      { x: 0, y: 56, rotate: 180, pluckedX: 0, pluckedY: 126 },
    ];

    return layouts[index] ?? layouts[0];
  }

  if (total === 4) {
    const layouts = [
      { x: -50, y: -50, rotate: -48, pluckedX: -122, pluckedY: -128 },
      { x: 50, y: -50, rotate: 48, pluckedX: 122, pluckedY: -128 },
      { x: 50, y: 50, rotate: 132, pluckedX: 122, pluckedY: 128 },
      { x: -50, y: 50, rotate: -132, pluckedX: -122, pluckedY: 128 },
    ];

    return layouts[index] ?? layouts[0];
  }

  return {
    pluckedX: Math.cos((angle * Math.PI) / 180) * 140,
    pluckedY: Math.sin((angle * Math.PI) / 180) * 140 + 88,
    rotate: angle,
    x: Math.cos((angle * Math.PI) / 180) * ringRadius,
    y: Math.sin((angle * Math.PI) / 180) * ringRadius,
  };
}

export function FlowerPetal({ index, onPluck, petal, total }: FlowerPetalProps) {
  const angle = (360 / total) * index - 90;
  const color = PETAL_COLORS[index % PETAL_COLORS.length];
  const layout = getPetalLayout(total, index, angle);

  return (
    <motion.button
      animate={
        petal.isPlucked
          ? {
              opacity: 0,
              rotate: layout.rotate + 24,
              x: layout.pluckedX,
              y: layout.pluckedY,
            }
          : {
              opacity: 1,
              rotate: layout.rotate,
              x: layout.x,
              y: layout.y,
            }
      }
      className="absolute left-1/2 top-1/2 h-34 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/14 shadow-[0_18px_30px_rgba(0,0,0,0.18)] focus:outline-none focus:ring-2 focus:ring-[rgba(245,185,113,0.35)]"
      disabled={petal.isPlucked}
      initial={false}
      onClick={() => onPluck(petal.id)}
      style={{
        background: `
          radial-gradient(circle at 50% 18%, rgba(255,255,255,0.55), transparent 24%),
          radial-gradient(circle at 50% 45%, rgba(255,255,255,0.18), transparent 50%),
          linear-gradient(180deg, ${color}, rgba(255,255,255,0.82))
        `,
        clipPath: "path('M 50 0 C 78 2 96 18 98 48 C 100 78 83 106 50 128 C 17 106 0 78 2 48 C 4 18 22 2 50 0 Z')",
        transformOrigin: "center 90%",
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      type="button"
      whileHover={petal.isPlucked ? undefined : { scale: 1.08, rotate: angle + 2 }}
      whileTap={petal.isPlucked ? undefined : { scale: 0.96 }}
    >
      <span className="pointer-events-none absolute inset-x-1/2 top-4 h-18 w-5 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.05))] blur-[0.2px]" />
      <span className="pointer-events-none absolute inset-x-1/2 top-10 h-10 w-8 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)]" />
      <span className="pointer-events-none absolute bottom-4 left-1/2 h-12 w-4 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.28)] blur-[0.5px]" />
      <span className="sr-only">Reveal petal {index + 1}</span>
    </motion.button>
  );
}
