"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import type { TimelineEntry } from "@/types/content";

interface TimelineCardProps {
  entry: TimelineEntry;
  index: number;
}

export function TimelineCard({ entry, index }: TimelineCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-64 bg-[linear-gradient(180deg,rgba(245,185,113,0.2),rgba(12,23,48,0.18))]">
          {imageFailed ? (
            <div className="flex h-full min-h-64 items-center justify-center p-6 text-center text-sm text-[color:rgba(244,235,208,0.58)]">
              Add a photo at <span className="mx-1 font-mono">{entry.image}</span> to complete this memory.
            </div>
          ) : (
            <Image
              alt={entry.title}
              className="h-full w-full object-cover"
              fill
              onError={() => setImageFailed(true)}
              sizes="(max-width: 768px) 100vw, 40vw"
              src={entry.image}
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,17,31,0.6)_100%)]" />
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 sm:p-7">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
              {entry.date}
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
              {entry.title}
            </h3>
            <p className="text-sm leading-7 text-[color:rgba(244,235,208,0.78)] sm:text-[15px]">
              {entry.description}
            </p>
          </div>

          <div className="w-fit rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Memory {index + 1}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
