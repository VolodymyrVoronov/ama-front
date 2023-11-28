import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { authService } from "../services/api/auth";

import { Path } from "../constants";
import { TAdminData } from "../types";

interface IAuthStore {
  admin: TAdminData | null;
  jwtToken: string;

  loggingIn: boolean;
  errorLoggingIn: string;

  refreshingToken: boolean;
  errorRefreshingToken: string;
}

interface IAuthStoreActions {
  logIn: (user: TAdminData, navigate: NavigateFunction) => void;
  logOut: () => void;
  setJwtToken: (jwtToken: string) => void;
  refreshToken: () => void;
}

export const useAuthStore = create(
  immer<IAuthStore & IAuthStoreActions>((set, get) => ({
    admin: null,
    jwtToken: "",

    loggingIn: false,
    errorLoggingIn: "",

    refreshingToken: false,
    errorRefreshingToken: "",

    logIn: async (adminData, navigate): Promise<void> => {
      set({ loggingIn: true });

      try {
        const res = await authService.login(adminData);

        if (res.status === 202) {
          set({
            admin: adminData,
            jwtToken: res.data.access_token,
          });

          set({ loggingIn: false });
          navigate(Path.ADMIN);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          set({ errorLoggingIn: error.response?.data.message });
          set({ loggingIn: false });
        } else if (error instanceof Error) {
          set({ errorLoggingIn: error.message });
          set({ loggingIn: false });
        } else {
          set({ errorLoggingIn: "Unknown error" });
          set({ loggingIn: false });
        }
      } finally {
        set({ loggingIn: false });
      }
    },

    logOut: async (): Promise<void> => {
      try {
        const res = await authService.logout();

        if (res.status === 202) {
          set({ admin: null, jwtToken: "" });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message);
        } else if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unknown error");
        }
      }
    },

    refreshToken: async (): Promise<void> => {
      set({ refreshingToken: true });

      try {
        const res = await authService.refresh();

        if (res.status === 202) {
          set({
            jwtToken: res.data.access_token,
          });

          set({ refreshingToken: false });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          set({ errorRefreshingToken: error.response?.data.message });
          set({ refreshingToken: false });
        } else if (error instanceof Error) {
          set({ errorRefreshingToken: error.message });
          set({ refreshingToken: false });
        } else {
          set({ errorRefreshingToken: "Unknown error" });
          set({ refreshingToken: false });
        }
      } finally {
        set({ refreshingToken: false });
      }
    },

    setJwtToken: (jwtToken) => {
      set({ jwtToken });
    },
  }))
);
