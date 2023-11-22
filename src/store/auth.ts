import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IAdminData } from "../types";

interface IAuthStore {
  admin: IAdminData | null;
  jwtToken: string;
}

interface IAuthStoreActions {
  logIn: (user: IAdminData) => void;
  logOut: () => void;
  setJwtToken: (jwtToken: string) => void;
  clearJwtToken: () => void;
  refreshToken: () => void;
}

export const useAuthStore = create(
  immer<IAuthStore & IAuthStoreActions>((set, get) => ({
    admin: null,
    jwtToken: "sd",

    logIn: (adminData) => {
      set({ admin: adminData });
    },

    logOut: () => {
      set({ admin: null });
      get().clearJwtToken();
    },

    setJwtToken: (jwtToken) => {
      set({ jwtToken });
    },

    clearJwtToken: () => {
      set({ jwtToken: "" });
    },

    refreshToken: () => {},
  }))
);
