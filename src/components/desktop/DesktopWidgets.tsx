"use client";

import { motion } from "framer-motion";

import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { selectMemoryOfTheDay } from "@/lib/desktopWidgets";

import { MemoryOfTheDayWidget } from "./widgets/MemoryOfTheDayWidget";
import { PinnedNoteWidget } from "./widgets/PinnedNoteWidget";

const content = validateSiteContent(siteData);
const memoryOfTheDay = selectMemoryOfTheDay(content.timeline);

if (memoryOfTheDay) {
  logger.info("[desktop] memory widget selected", {
    title: memoryOfTheDay.title,
  });
}

export function DesktopWidgets() {
  return (
    <motion.div
      animate="animate"
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
      initial="initial"
      variants={staggerContainer}
    >
      <div className="relative h-full w-full">
        <motion.div
          aria-hidden="true"
          className="absolute right-[11%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(245,185,113,0.2),transparent_62%)] blur-3xl"
          transition={{ duration: 0.7, ease: "easeOut" }}
          variants={fadeInUp}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[9%] top-[22%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(131,197,190,0.18),transparent_62%)] blur-3xl"
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.06 }}
          variants={fadeInUp}
        />

        <motion.div
          className="pointer-events-auto absolute right-[1%] top-[11%] origin-top-right scale-[0.96]"
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          variants={fadeInUp}
        >
          <MemoryOfTheDayWidget memory={memoryOfTheDay} />
        </motion.div>

        <motion.div
          className="pointer-events-auto absolute bottom-28 right-[8%] origin-bottom-right scale-[0.92]"
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
          variants={fadeInUp}
        >
          <PinnedNoteWidget note={content.pinnedNote} />
        </motion.div>
      </div>
    </motion.div>
  );
}
