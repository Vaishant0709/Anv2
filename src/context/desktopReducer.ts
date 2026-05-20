import type { DesktopAction, DesktopState } from "@/types/desktop";

export function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "OPEN_WINDOW": {
      const existingWindow = state.openWindows.find((window) => window.id === action.payload.id);

      if (existingWindow) {
        return {
          ...state,
          activeWindowId: existingWindow.id,
          openWindows: state.openWindows.map((window) =>
            window.id === existingWindow.id
              ? {
                  ...window,
                  zIndex: action.payload.zIndex,
                }
              : window,
          ),
        };
      }

      return {
        ...state,
        activeWindowId: action.payload.id,
        openWindows: [...state.openWindows, action.payload],
      };
    }
    case "CLOSE_WINDOW": {
      const openWindows = state.openWindows.filter((window) => window.id !== action.payload.id);
      const nextActiveWindow =
        state.activeWindowId === action.payload.id ? openWindows.at(-1)?.id ?? null : state.activeWindowId;

      return {
        ...state,
        activeWindowId: nextActiveWindow,
        openWindows,
      };
    }
    case "FOCUS_WINDOW":
      return {
        ...state,
        activeWindowId: action.payload.id,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload.id
            ? {
                ...window,
                zIndex: action.payload.zIndex,
              }
            : window,
        ),
      };
    case "SET_WINDOW_POSITION":
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload.id
            ? {
                ...window,
                position: action.payload.position,
              }
            : window,
        ),
      };
    default:
      return state;
  }
}
