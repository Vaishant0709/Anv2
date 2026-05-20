import type { AppId } from "./apps";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface DesktopWindow {
  id: AppId;
  title: string;
  zIndex: number;
  position: WindowPosition;
  size?: WindowSize;
}

export interface DesktopState {
  isAuthenticated: boolean;
  openWindows: DesktopWindow[];
  activeWindowId: AppId | null;
}

export type DesktopAction =
  | { type: "AUTHENTICATE" }
  | { type: "OPEN_WINDOW"; payload: DesktopWindow }
  | { type: "CLOSE_WINDOW"; payload: { id: AppId } }
  | { type: "FOCUS_WINDOW"; payload: { id: AppId; zIndex: number } }
  | {
      type: "SET_WINDOW_POSITION";
      payload: { id: AppId; position: WindowPosition };
    };
