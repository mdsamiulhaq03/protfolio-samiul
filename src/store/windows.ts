import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../data";

type WindowKey = keyof typeof WINDOW_CONFIG;

export type WindowData = Record<string, unknown> | null;

export type WindowItem = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data: WindowData;
};

type WindowState = {
  windows: Record<WindowKey, WindowItem>;
  nextZIndex: number;

  openWindow: (key: WindowKey, data?: WindowData) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
  minimizeWindow: (key: WindowKey) => void;
  maximizeWindow: (key: WindowKey) => void;
  restoreWindow: (key: WindowKey) => void;
};

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: structuredClone(WINDOW_CONFIG) as Record<WindowKey, WindowItem>,

    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (key, data = null) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.isMinimized = false;

        win.zIndex = state.nextZIndex++;
        win.data = data ?? win.data;
      }),

    closeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
      }),

    focusWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
      }),

    minimizeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isMinimized = true;
        win.isOpen = false;
      }),

    maximizeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isMaximized = !win.isMaximized;

        win.isOpen = true;
        win.isMinimized = false;

        win.zIndex = state.nextZIndex++;
      }),

    restoreWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.isMinimized = false;
        win.isMaximized = false;

        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
