"use client";

import { useEffect, useRef } from "react";

import { useDesktop } from "@/context/DesktopContext";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { unlockAudio } from "@/hooks/useGlobalAudio";

const content = validateSiteContent(siteData);

export function AudioBootstrap() {
  const { state } = useDesktop();
  const hasBootstrappedRef = useRef(false);

  useEffect(() => {
    if (!state.isAuthenticated || hasBootstrappedRef.current) {
      return;
    }

    hasBootstrappedRef.current = true;
    unlockAudio(content.audioTracks[0] ?? null);
  }, [state.isAuthenticated]);

  return null;
}
