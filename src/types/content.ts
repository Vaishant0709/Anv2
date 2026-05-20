import type { DesktopIconConfig } from "./apps";

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface ReasonCardEntry {
  id: string;
  text: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  src: string;
}

export interface PinnedNote {
  title: string;
  body: string;
  signature: string;
}

export type TerminalSecrets = Record<string, string>;

export interface SiteContent {
  bootText: string[];
  passwords: string[];
  desktopIcons: DesktopIconConfig[];
  timeline: TimelineEntry[];
  reasons: ReasonCardEntry[];
  flowerPoems: string[];
  terminalSecrets: TerminalSecrets;
  audioTracks: AudioTrack[];
  pinnedNote: PinnedNote;
}
