"use client";

import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { BREAKPOINTS } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentType =
  | "portfolio"
  | "about"
  | "contact"
  | "recycle-bin"
  | "my-computer"
  | "welcome"
  | "music";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition: { x: number; y: number };
  prevSize: { width: number; height: number };
  minSize: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  contentType: ContentType;
  contentId?: string;
}

export interface DesktopState {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;
  desktopMode: boolean;
  selectedIconId: string | null;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export type Action =
  | {
      type: "OPEN_WINDOW";
      payload: {
        contentType: ContentType;
        contentId?: string;
        title: string;
        icon: string;
        defaultSize?: { width: number; height: number };
        minSize?: { width: number; height: number };
      };
    }
  | { type: "CLOSE_WINDOW"; payload: { id: string } }
  | { type: "FOCUS_WINDOW"; payload: { id: string } }
  | { type: "MINIMIZE_WINDOW"; payload: { id: string } }
  | { type: "MAXIMIZE_WINDOW"; payload: { id: string } }
  | { type: "RESTORE_WINDOW"; payload: { id: string } }
  | {
      type: "MOVE_WINDOW";
      payload: { id: string; position: { x: number; y: number } };
    }
  | {
      type: "RESIZE_WINDOW";
      payload: { id: string; size: { width: number; height: number }; position?: { x: number; y: number } };
    }
  | { type: "TOGGLE_DESKTOP_MODE" }
  | { type: "SELECT_ICON"; payload: { id: string | null } };

// ─── Constants ────────────────────────────────────────────────────────────────

const CASCADE_OFFSET = 28;
const BASE_POSITION = { x: 60, y: 40 };
const DEFAULT_SIZE = { width: 720, height: 520 };
const DEFAULT_MIN_SIZE = { width: 320, height: 240 };
const TASKBAR_HEIGHT = 28;

function generateId() {
  return `win-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getViewportSize() {
  if (typeof window === "undefined") return { width: 1280, height: 768 };
  return { width: window.innerWidth, height: window.innerHeight };
}

function calcMobileWindowSize(viewport: {
  width: number;
  height: number;
}): { width: number; height: number } {
  return {
    width: Math.min(Math.floor(viewport.width * 0.85), DEFAULT_SIZE.width),
    height: Math.floor(viewport.height * 0.75),
  };
}

function calcCascadePosition(
  windows: WindowState[],
  size: { width: number; height: number },
  viewport: { width: number; height: number }
): { x: number; y: number } {
  if (viewport.width < BREAKPOINTS.mobile) {
    return {
      x: Math.floor((viewport.width - size.width) / 2),
      y: 30 + (windows.length % 4) * 10,
    };
  }
  const count = windows.length;
  return {
    x: BASE_POSITION.x + (count % 8) * CASCADE_OFFSET,
    y: BASE_POSITION.y + (count % 8) * CASCADE_OFFSET,
  };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: DesktopState = {
  windows: [],
  nextZIndex: 100,
  activeWindowId: null,
  desktopMode: true,
  selectedIconId: null,
};

function reducer(state: DesktopState, action: Action): DesktopState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const { contentType, contentId, title, icon, defaultSize, minSize } =
        action.payload;

      // Deduplicate: if already open, just focus it
      const existing = state.windows.find(
        (w) =>
          w.contentType === contentType &&
          (contentId === undefined || w.contentId === contentId)
      );
      if (existing) {
        return reducer(state, {
          type: "FOCUS_WINDOW",
          payload: { id: existing.id },
        });
      }

      const vp = getViewportSize();
      const isMobile = vp.width < BREAKPOINTS.mobile;
      const size = isMobile
        ? calcMobileWindowSize(vp)
        : (defaultSize ?? DEFAULT_SIZE);
      const position = calcCascadePosition(state.windows, size, vp);
      const newWindow: WindowState = {
        id: generateId(),
        title,
        icon,
        position,
        size,
        prevPosition: position,
        prevSize: size,
        minSize: minSize ?? DEFAULT_MIN_SIZE,
        zIndex: state.nextZIndex,
        minimized: false,
        maximized: false,
        contentType,
        contentId,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: newWindow.id,
      };
    }

    case "CLOSE_WINDOW": {
      const remaining = state.windows.filter(
        (w) => w.id !== action.payload.id
      );
      const newActive =
        state.activeWindowId === action.payload.id
          ? (remaining[remaining.length - 1]?.id ?? null)
          : state.activeWindowId;
      return { ...state, windows: remaining, activeWindowId: newActive };
    }

    case "FOCUS_WINDOW": {
      const { id } = action.payload;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, zIndex: state.nextZIndex, minimized: false }
            : w
        ),
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: id,
      };
    }

    case "MINIMIZE_WINDOW": {
      const { id } = action.payload;
      const newActive =
        state.activeWindowId === id ? null : state.activeWindowId;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, minimized: true } : w
        ),
        activeWindowId: newActive,
      };
    }

    case "MAXIMIZE_WINDOW": {
      const { id } = action.payload;
      const vp = getViewportSize();
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== id) return w;
          if (w.maximized) {
            // Restore
            return {
              ...w,
              maximized: false,
              position: w.prevPosition,
              size: w.prevSize,
            };
          }
          return {
            ...w,
            maximized: true,
            prevPosition: w.position,
            prevSize: w.size,
            position: { x: 0, y: 0 },
            size: { width: vp.width, height: vp.height - TASKBAR_HEIGHT },
          };
        }),
      };
    }

    case "RESTORE_WINDOW": {
      const { id } = action.payload;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === id
            ? {
                ...w,
                minimized: false,
                maximized: false,
                position: w.prevPosition,
                size: w.prevSize,
              }
            : w
        ),
        activeWindowId: id,
      };
    }

    case "MOVE_WINDOW": {
      const { id, position } = action.payload;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, position } : w
        ),
      };
    }

    case "RESIZE_WINDOW": {
      const { id, size, position } = action.payload;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, size, ...(position ? { position } : {}) }
            : w
        ),
      };
    }

    case "TOGGLE_DESKTOP_MODE":
      return { ...state, desktopMode: !state.desktopMode };

    case "SELECT_ICON":
      return { ...state, selectedIconId: action.payload.id };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface WindowManagerContextValue {
  state: DesktopState;
  dispatch: React.Dispatch<Action>;
  openWindow: (opts: {
    contentType: ContentType;
    contentId?: string;
    title: string;
    icon: string;
    defaultSize?: { width: number; height: number };
    minSize?: { width: number; height: number };
  }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }, position?: { x: number; y: number }) => void;
  toggleDesktopMode: () => void;
  selectIcon: (id: string | null) => void;
}

export const WindowManagerContext =
  createContext<WindowManagerContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openWindow = useCallback(
    (opts: Parameters<WindowManagerContextValue["openWindow"]>[0]) =>
      dispatch({ type: "OPEN_WINDOW", payload: opts }),
    []
  );
  const closeWindow = useCallback(
    (id: string) => dispatch({ type: "CLOSE_WINDOW", payload: { id } }),
    []
  );
  const focusWindow = useCallback(
    (id: string) => dispatch({ type: "FOCUS_WINDOW", payload: { id } }),
    []
  );
  const minimizeWindow = useCallback(
    (id: string) => dispatch({ type: "MINIMIZE_WINDOW", payload: { id } }),
    []
  );
  const maximizeWindow = useCallback(
    (id: string) => dispatch({ type: "MAXIMIZE_WINDOW", payload: { id } }),
    []
  );
  const restoreWindow = useCallback(
    (id: string) => dispatch({ type: "RESTORE_WINDOW", payload: { id } }),
    []
  );
  const moveWindow = useCallback(
    (id: string, position: { x: number; y: number }) =>
      dispatch({ type: "MOVE_WINDOW", payload: { id, position } }),
    []
  );
  const resizeWindow = useCallback(
    (id: string, size: { width: number; height: number }, position?: { x: number; y: number }) =>
      dispatch({ type: "RESIZE_WINDOW", payload: { id, size, position } }),
    []
  );
  const toggleDesktopMode = useCallback(
    () => dispatch({ type: "TOGGLE_DESKTOP_MODE" }),
    []
  );
  const selectIcon = useCallback(
    (id: string | null) => dispatch({ type: "SELECT_ICON", payload: { id } }),
    []
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      moveWindow,
      resizeWindow,
      toggleDesktopMode,
      selectIcon,
    }),
    [
      state,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      moveWindow,
      resizeWindow,
      toggleDesktopMode,
      selectIcon,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}
