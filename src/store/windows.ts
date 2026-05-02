import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../data";

/* ----------------------------- TYPES ----------------------------- */

type WindowKey = keyof typeof WINDOW_CONFIG;

export type WindowData = Record<string, unknown> | null;

export type WindowItem = {
  isOpen: boolean;
  zIndex: number;
  data: WindowData;
};

type WindowState = {
  windows: Record<WindowKey, WindowItem>;
  nextZIndex: number;

  openWindow: (key: WindowKey, data?: WindowData) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
};

/* ----------------------------- STORE ----------------------------- */

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: structuredClone(WINDOW_CONFIG) as Record<WindowKey, WindowItem>,

    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (key, data = null) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;

        state.nextZIndex += 1;
      }),

    closeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = -1;
        win.data = null;
      }),

    focusWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }),
  })),
);

export default useWindowStore;
