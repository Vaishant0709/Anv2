"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { launchCelebration } from "@/lib/celebration";
import { logger } from "@/lib/logger";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";

import { FlowerBloom } from "./FlowerBloom";
import { AnniversaryHero } from "./AnniversaryHero";

const content = validateSiteContent(siteData);

export function CelebrationLayer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showFinalLine, setShowFinalLine] = useState(false);
  const celebrationTimer = useRef<number | null>(null);

  function launchSparkAccent() {
    if (prefersReducedMotion) {
      return;
    }

    const baseOptions = {
      colors: ["#f5b971", "#f7d9a6", "#f6a6b2", "#ffffff"],
      zIndex: 20,
    };

    void confetti({
      ...baseOptions,
      particleCount: 70,
      spread: 65,
      startVelocity: 18,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.42 },
    });

    void confetti({
      ...baseOptions,
      particleCount: 28,
      spread: 135,
      startVelocity: 22,
      scalar: 0.72,
      origin: { x: 0.36, y: 0.58 },
    });

    void confetti({
      ...baseOptions,
      particleCount: 28,
      spread: 135,
      startVelocity: 22,
      scalar: 0.72,
      origin: { x: 0.64, y: 0.58 },
    });
  }

  function handleCelebrate() {
    setIsCelebrating(true);
    setShowFinalLine(false);

    void launchCelebration({ reducedMotion: prefersReducedMotion });
    launchSparkAccent();

    if (celebrationTimer.current) {
      window.clearTimeout(celebrationTimer.current);
    }

    celebrationTimer.current = window.setTimeout(() => {
      setShowFinalLine(true);
      setIsCelebrating(false);
      logger.info("[celebration] bloom completed");
    }, prefersReducedMotion ? 700 : 3900);

    logger.info("[celebration] bloom started", {
      reducedMotion: prefersReducedMotion,
    });
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[9] overflow-hidden">
      <AnimatePresence mode="wait">
        {isCelebrating ? (
          <motion.div
            key="bloom"
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [0.92, 1.02, 1],
                      opacity: [0.88, 1, 0.94],
                    }
              }
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,185,113,0.18),transparent_24%),radial-gradient(circle_at_center,rgba(246,166,178,0.14),transparent_40%),radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_58%)]"
              transition={{
                duration: prefersReducedMotion ? 0 : 3.4,
                ease: "easeInOut",
                repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
              }}
            />
            <FlowerBloom />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        animate={
          isCelebrating
            ? {
                scale: [1, 1.012, 1],
                boxShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 0 72px rgba(245,185,113,0.24)",
                  "0 0 0 rgba(0,0,0,0)",
                ],
              }
            : {
                scale: [1, 1.008, 1],
              }
        }
        className="absolute inset-0"
        transition={{
          duration: prefersReducedMotion ? 0 : 1.9,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <AnniversaryHero
        celebration={content.celebration}
        isCelebrating={isCelebrating}
        onCelebrate={handleCelebrate}
      />

      <AnimatePresence>
        {showFinalLine ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-6 text-center"
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="max-w-2xl rounded-full border border-white/10 bg-[rgba(8,13,21,0.66)] px-6 py-3 text-sm text-[color:rgba(244,235,208,0.88)] shadow-[0_12px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl">
              {content.celebration.resultLine}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
