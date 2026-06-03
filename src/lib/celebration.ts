"use client";

import confetti from "canvas-confetti";

import { logger } from "@/lib/logger";

interface LaunchCelebrationOptions {
  reducedMotion?: boolean;
}

export type BloomPetal = {
  dark: string;
  delay: number;
  glow: string;
  id: string;
  light: string;
  rotate: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

export const bloomPetals: BloomPetal[] = [
  { id: "petal-1", rotate: -68, x: -58, y: -156, width: 110, height: 232, delay: 0, light: "#fdd7a4", dark: "#f3a65f", glow: "rgba(245,185,113,0.24)" },
  { id: "petal-2", rotate: -34, x: 4, y: -178, width: 118, height: 244, delay: 0.05, light: "#f7c3a5", dark: "#f08d77", glow: "rgba(246,166,178,0.22)" },
  { id: "petal-3", rotate: 2, x: 72, y: -168, width: 118, height: 240, delay: 0.1, light: "#f9dec0", dark: "#f5b971", glow: "rgba(247,217,166,0.22)" },
  { id: "petal-4", rotate: 34, x: 122, y: -120, width: 110, height: 228, delay: 0.15, light: "#f7c7d0", dark: "#e98fa5", glow: "rgba(246,166,178,0.22)" },
  { id: "petal-5", rotate: 70, x: 136, y: -48, width: 102, height: 214, delay: 0.2, light: "#f8d8aa", dark: "#f1a668", glow: "rgba(245,185,113,0.2)" },
  { id: "petal-6", rotate: 112, x: 112, y: 22, width: 98, height: 204, delay: 0.25, light: "#f6b9c1", dark: "#e78f9e", glow: "rgba(246,166,178,0.2)" },
  { id: "petal-7", rotate: 152, x: 52, y: 72, width: 102, height: 210, delay: 0.3, light: "#fbe0b4", dark: "#efae6a", glow: "rgba(247,217,166,0.2)" },
  { id: "petal-8", rotate: 192, x: -18, y: 78, width: 108, height: 220, delay: 0.35, light: "#f7c0cc", dark: "#ea99a8", glow: "rgba(246,166,178,0.2)" },
];

function launchConfettiBurst(reducedMotion = false) {
  if (reducedMotion) {
    logger.info("[celebration] reduced motion fallback");
    return;
  }

  const baseOptions = {
    origin: { y: 0.55 },
    colors: ["#f5b971", "#f7d9a6", "#f6a6b2", "#ffffff", "#83c5be"],
    zIndex: 20,
  };

  void confetti({
    ...baseOptions,
    particleCount: 110,
    spread: 78,
    startVelocity: 42,
    scalar: 1.05,
  });

  void confetti({
    ...baseOptions,
    particleCount: 65,
    spread: 122,
    startVelocity: 36,
    origin: { x: 0.2, y: 0.72 },
  });

  void confetti({
    ...baseOptions,
    particleCount: 65,
    spread: 122,
    startVelocity: 36,
    origin: { x: 0.8, y: 0.72 },
  });
}

export async function launchCelebration(
  options: LaunchCelebrationOptions = {},
): Promise<void> {
  launchConfettiBurst(Boolean(options.reducedMotion));
  logger.info("[celebration] launched", {
    reducedMotion: Boolean(options.reducedMotion),
  });
}
