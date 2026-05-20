"use client";

import { siteData } from "@/data/siteData";
import { useDesktop } from "@/context/DesktopContext";
import { validateSiteContent } from "@/lib/content";

import { DesktopBackground } from "./DesktopBackground";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopWidgets } from "./DesktopWidgets";
import { Taskbar } from "./Taskbar";
import { WindowLayer } from "./WindowLayer";

const content = validateSiteContent(siteData);

export function Desktop() {
  const { state, openWindow, focusWindow } = useDesktop();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <DesktopBackground />
      <DesktopWidgets />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-1 items-start">
          <DesktopIcons icons={content.desktopIcons} onOpen={openWindow} />
        </div>

        <WindowLayer windows={state.openWindows} />

        <Taskbar
          activeWindowId={state.activeWindowId}
          onFocusWindow={focusWindow}
          openWindows={state.openWindows}
        />
      </div>
    </main>
  );
}
