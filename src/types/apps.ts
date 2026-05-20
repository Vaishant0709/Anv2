export const APP_IDS = [
  "memories",
  "reasons",
  "flower",
  "audio",
  "terminal",
] as const;

export type AppId = (typeof APP_IDS)[number];

export type AppIconName =
  | "FolderHeart"
  | "Heart"
  | "Flower2"
  | "Music4"
  | "Terminal";

export interface DesktopIconConfig {
  id: AppId;
  label: string;
  icon: AppIconName;
}
