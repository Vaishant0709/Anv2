"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { appRegistry } from "@/lib/appRegistry";
import { logger } from "@/lib/logger";
import {
  DEFAULT_WINDOW_SIZE,
  INITIAL_WINDOW_POSITION,
  INITIAL_Z_INDEX,
  initialDesktopState,
} from "@/context/desktopState";
import { desktopReducer } from "@/context/desktopReducer";
import type { AppId } from "@/types/apps";
import type { DesktopState, WindowPosition } from "@/types/desktop";

interface DesktopContextValue {
  state: DesktopState;
  authenticate: () => void;
  openWindow: (appId: AppId) => void;
  closeWindow: (appId: AppId) => void;
  focusWindow: (appId: AppId) => void;
  setWindowPosition: (appId: AppId, position: WindowPosition) => void;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

interface DesktopProviderProps {
  children: ReactNode;
}

function getNextZIndex(openWindows: DesktopState["openWindows"]) {
  const highestZIndex = openWindows.reduce((max, window) => {
    return Math.max(max, window.zIndex);
  }, INITIAL_Z_INDEX - 1);

  return highestZIndex + 1;
}

function getWindowOffset(index: number) {
  return {
    x: INITIAL_WINDOW_POSITION.x + index * 24,
    y: INITIAL_WINDOW_POSITION.y + index * 20,
  };
}

export function DesktopProvider({ children }: DesktopProviderProps) {
  const [state, dispatch] = useReducer(desktopReducer, initialDesktopState);

  const value = useMemo<DesktopContextValue>(() => {
    return {
      state,
      authenticate() {
        dispatch({ type: "AUTHENTICATE" });
        logger.info("[auth] success");
      },
      openWindow(appId) {
        const registryEntry = appRegistry[appId];

        if (!registryEntry) {
          logger.warn("[window] attempted to open unknown app", { appId });
          return;
        }

        const zIndex = getNextZIndex(state.openWindows);
        const existingIndex = state.openWindows.findIndex((window) => window.id === appId);
        const offsetIndex = existingIndex >= 0 ? existingIndex : state.openWindows.length;

        dispatch({
          type: "OPEN_WINDOW",
          payload: {
            id: appId,
            title: registryEntry.title,
            zIndex,
            position: getWindowOffset(offsetIndex),
            size: registryEntry.defaultSize ?? DEFAULT_WINDOW_SIZE,
          },
        });

        logger.info("[window] opened", { appId, zIndex });
      },
      closeWindow(appId) {
        dispatch({
          type: "CLOSE_WINDOW",
          payload: { id: appId },
        });
        logger.info("[window] closed", { appId });
      },
      focusWindow(appId) {
        const zIndex = getNextZIndex(state.openWindows);

        dispatch({
          type: "FOCUS_WINDOW",
          payload: { id: appId, zIndex },
        });

        logger.info("[window] focused", { appId, zIndex });
      },
      setWindowPosition(appId, position) {
        dispatch({
          type: "SET_WINDOW_POSITION",
          payload: { id: appId, position },
        });
      },
    };
  }, [state]);

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}

export function useDesktop() {
  const context = useContext(DesktopContext);

  if (!context) {
    throw new Error("useDesktop must be used within a DesktopProvider");
  }

  return context;
}
