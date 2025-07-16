import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { login } from "../api/auth";

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcommerceStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      actionLogin: async (form) => {
        const res = await login(form);
        set({
          token: res.data.token,
          user: res.data.user,
        });
        return res.data;
      },
      actionLogout: () => {
        set({ token: null, user: null });
        localStorage.removeItem("ecom-store");
      },
    }),
    usePersist
  )
);

export default useEcommerceStore;
