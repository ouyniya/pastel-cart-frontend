import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/login`,
          form
        );
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
