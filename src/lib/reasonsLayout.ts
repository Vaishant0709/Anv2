import type { ReasonCardEntry } from "@/types/content";

export interface ReasonCardLayout extends ReasonCardEntry {
  rotation: number;
  xOffset: number;
  yOffset: number;
}

const ROTATIONS = [-6, 4, -2, 7, -8, 3];
const X_OFFSETS = [-12, 14, -20, 18, -8, 10];
const Y_OFFSETS = [0, 18, 32, 12, 40, 24];

export function buildReasonCardLayout(reasons: ReasonCardEntry[]): ReasonCardLayout[] {
  return reasons.map((reason, index) => {
    const patternIndex = index % ROTATIONS.length;

    return {
      ...reason,
      rotation: ROTATIONS[patternIndex],
      xOffset: X_OFFSETS[patternIndex],
      yOffset: Y_OFFSETS[patternIndex],
    };
  });
}
