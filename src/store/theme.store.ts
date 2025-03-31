import { getTheme } from "@/utils/getSystemTheme";
import { create } from "zustand";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("theme") || getTheme(),
  setTheme: (theme: string) => set(() => ({ theme: theme })),
}));
