import type { DesktopState, WindowPosition, WindowSize } from "@/types/desktop";

export const INITIAL_WINDOW_POSITION: WindowPosition = {
  x: 96,
  y: 72,
};

export const DEFAULT_WINDOW_SIZE: WindowSize = {
  width: 720,
  height: 520,
};

export const INITIAL_Z_INDEX = 10;

export const initialDesktopState: DesktopState = {
  isAuthenticated: false,
  openWindows: [],
  activeWindowId: null,
};
