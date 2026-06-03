"use client";

import { useEffect } from "react";

import { AppWindowHeader } from "@/components/ui/AppWindowHeader";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";

import { TimelineList } from "./memories/TimelineList";

const content = validateSiteContent(siteData);

export function MemoriesApp() {
  useEffect(() => {
    logger.info("[memories] app opened", {
      entries: content.timeline.length,
    });
  }, []);

  return (
    <section className="space-y-6">
      <AppWindowHeader
        description="A stitched-together timeline of the moments that still glow brightest."
        eyebrow="Memories.exe"
        title="A timeline stitched from the days that still glow."
      />

      <TimelineList entries={content.timeline} />
    </section>
  );
}
