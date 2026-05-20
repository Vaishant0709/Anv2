"use client";

import { IntroFlow } from "@/components/boot/IntroFlow";
import { Desktop } from "@/components/desktop/Desktop";
import { useDesktop } from "@/context/DesktopContext";

export function ExperienceShell() {
  const { state } = useDesktop();

  if (!state.isAuthenticated) {
    return <IntroFlow />;
  }

  return <Desktop />;
}
