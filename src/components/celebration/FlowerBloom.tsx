"use client";

import { motion } from "framer-motion";

import { bloomPetals } from "@/lib/celebration";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function FlowerBloom() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: [0.72, 1, 0.95, 1], scale: [0.9, 1.03, 1, 1.02] }
      }
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.82 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 3.4,
        ease: "easeOut",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,185,113,0.18),transparent_32%),radial-gradient(circle_at_center,rgba(246,166,178,0.12),transparent_48%),radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_62%)]" />

      <motion.div
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.4, 0.75, 0.55, 0.7] }}
        className="absolute h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(245,185,113,0.24),rgba(245,185,113,0)_68%)] blur-3xl"
        transition={{ duration: prefersReducedMotion ? 0 : 4, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-center">
        {bloomPetals.map((petal) => (
          <motion.span
            key={petal.id}
            animate={
              prefersReducedMotion
                ? {
                    opacity: 1,
                    rotate: petal.rotate,
                    scale: 1,
                    x: petal.x,
                    y: petal.y,
                  }
                : {
                    opacity: [0, 1, 1],
                    rotate: [petal.rotate - 32, petal.rotate, petal.rotate + 4],
                    scale: [0.35, 0.96, 1],
                    x: [0, petal.x * 0.72, petal.x],
                    y: [18, petal.y * 0.72, petal.y],
                  }
            }
            className="absolute left-1/2 top-1/2 origin-bottom"
            initial={{ opacity: 0, rotate: petal.rotate - 52, scale: 0.18, x: 0, y: 28 }}
            style={{
              width: petal.width,
              height: petal.height,
              marginLeft: -(petal.width / 2),
              marginTop: -(petal.height / 2),
              borderRadius: "48% 48% 28% 28% / 72% 72% 28% 28%",
              background: `linear-gradient(180deg, ${petal.light}, ${petal.dark})`,
              boxShadow: `0 0 24px ${petal.glow}`,
              filter: "drop-shadow(0 0 14px rgba(245,185,113,0.18))",
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 2.7,
              delay: petal.delay,
              ease: [0.2, 0.9, 0.24, 1],
            }}
          />
        ))}

        <motion.div
          animate={
            prefersReducedMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [0.8, 1.08, 1],
                  opacity: [0, 1, 1],
                }
          }
          className="absolute h-36 w-36 rounded-full border border-[rgba(245,185,113,0.34)] bg-[radial-gradient(circle,rgba(255,255,255,0.55),rgba(245,185,113,0.16)_45%,rgba(246,166,178,0.12)_65%,rgba(8,13,21,0)_78%)] shadow-[0_0_60px_rgba(245,185,113,0.28)]"
          initial={{ scale: 0.45, opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.8,
            delay: 0.25,
            ease: "easeOut",
          }}
        />

        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.95, scale: 1 }
              : { opacity: [0.72, 1, 0.88, 1], scale: [0.92, 1.04, 1, 1.03] }
          }
          className="absolute h-8 w-8 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(245,185,113,0.95)_42%,rgba(246,166,178,0.68)_72%,rgba(8,13,21,0)_100%)] shadow-[0_0_26px_rgba(255,255,255,0.55)]"
          transition={{
            duration: prefersReducedMotion ? 0 : 1.6,
            repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
