"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CelebrationContent } from "@/types/content";

interface AnniversaryHeroProps {
  celebration: CelebrationContent;
  onCelebrate: () => void;
  isCelebrating: boolean;
}

export function AnniversaryHero({
  celebration,
  onCelebrate,
  isCelebrating,
}: AnniversaryHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const buttonLayer =
    typeof document !== "undefined"
      ? createPortal(
          <div className="pointer-events-none fixed inset-0 z-[40]">
            <div className="pointer-events-auto absolute left-1/2 top-[61%] -translate-x-1/2">
              <Button
                className="px-8 py-4 text-base shadow-[0_0_0_1px_rgba(245,185,113,0.24),0_20px_60px_rgba(0,0,0,0.22)]"
                onClick={onCelebrate}
                type="button"
              >
                {isCelebrating ? "Celebrating..." : "Celebrate"}
              </Button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="absolute inset-0">
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="pointer-events-none absolute inset-0 z-[8] flex items-center justify-center px-6"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <div className="relative w-[min(92vw,48rem)] text-center select-none">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[var(--color-foreground)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:text-7xl">
            {celebration.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[color:rgba(244,235,208,0.8)] drop-shadow-[0_4px_14px_rgba(0,0,0,0.25)] sm:text-lg">
            {celebration.message}
          </p>
        </div>
      </motion.div>

      {buttonLayer}
    </div>
  );
}
