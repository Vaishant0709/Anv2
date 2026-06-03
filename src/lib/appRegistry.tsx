import type { ReactNode } from "react";

import { AudioApp } from "@/components/apps/AudioApp";
import { FlowerApp } from "@/components/apps/FlowerApp";
import { MemoriesApp } from "@/components/apps/MemoriesApp";
import { ReasonsApp } from "@/components/apps/ReasonsApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import type { AppIconName, AppId } from "@/types/apps";
import type { WindowSize } from "@/types/desktop";

interface AppRegistryEntry {
  id: AppId;
  title: string;
  icon: AppIconName;
  defaultSize: WindowSize;
  render: () => ReactNode;
}

export const appRegistry: Record<AppId, AppRegistryEntry> = {
  memories: {
    id: "memories",
    title: "Memories.exe",
    icon: "FolderHeart",
    defaultSize: { width: 960, height: 680 },
    render: () => <MemoriesApp />,
  },
  reasons: {
    id: "reasons",
    title: "Reasons.app",
    icon: "Heart",
    defaultSize: { width: 720, height: 500 },
    render: () => <ReasonsApp />,
  },
  flower: {
    id: "flower",
    title: "Flower.sh",
    icon: "Flower2",
    defaultSize: { width: 680, height: 520 },
    render: () => <FlowerApp />,
  },
  audio: {
    id: "audio",
    title: "Audio.mp3",
    icon: "Music4",
    defaultSize: { width: 640, height: 420 },
    render: () => <AudioApp />,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: "Terminal",
    defaultSize: { width: 760, height: 460 },
    render: () => <TerminalApp />,
  },
};
