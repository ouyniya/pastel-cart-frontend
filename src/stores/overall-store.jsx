import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const themeStore = (set) => ({
  theme: true,
  actionToggleTheme: () =>
    set((state) => ({
      theme: !state.theme,
    })),
});

const usePersist = {
  name: "theme-store",
  storage: createJSONStorage(() => localStorage),
};

const useThemeStore = create(persist(themeStore, usePersist));

export default useThemeStore;
