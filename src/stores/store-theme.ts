// stores/useTheme.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// -------------------
// Constants & Types
// -------------------
export const COLOR_THEMES = ["default","summer", "spotify", "vscode","material","neo","pastel"] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];
// export type Mode = "light" | "dark" | "system";

const DEFAULT_COLOR: ColorTheme = "vscode";
// const DEFAULT_MODE: Mode = "system";

type ThemeState = {
  color: ColorTheme;
};

type ThemeActions = {
  setColor: (color: ColorTheme) => void;
};

// Combine state + actions
type ThemeStore = ThemeState & ThemeActions;

// -------------------
// Zustand Store
// -------------------
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      color: DEFAULT_COLOR,
      // mode: DEFAULT_MODE,

      setColor: (color) => {
        set({ color });
        applyTheme({ color });
      },

    }),
    {
      name: "theme-store", // key in localStorage
      // Optional: can add custom getStorage/setStorage if needed
    }
  )
);

// -------------------
// Helpers
// -------------------
function resolveSystemDark(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? true : false;
}

/**
 * Apply theme to document root
 * @param partial Optional partial updates
 */
export function applyTheme(partial?: Partial<ThemeState>) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const store = useThemeStore.getState();

  const currentColor = partial?.color ?? store.color ?? DEFAULT_COLOR;
  // const currentMode = partial?.mode ?? store.mode ?? DEFAULT_MODE;

  root.setAttribute("data-theme", currentColor);

  // const isDark = currentMode === "system" ? resolveSystemDark() : currentMode === "dark";
  // root.classList.toggle("dark", isDark);
}