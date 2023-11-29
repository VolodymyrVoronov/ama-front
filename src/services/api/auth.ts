import { AxiosResponse } from "axios";

import client from "./axios-client";

import { TAuthResponse } from "../../types";

const authUrl = {
  login: "/authenticate",
  logout: "/logout",
  refresh: "/refresh",
} as const;

const withCredentials = true;

const login = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<TAuthResponse>> =>
  client.post(authUrl.login, data, { withCredentials });

const logout = (): Promise<AxiosResponse<AxiosResponse>> =>
  client.get(authUrl.logout, { withCredentials });

const refresh = (): Promise<AxiosResponse<TAuthResponse>> =>
  client.get(authUrl.refresh, {
    withCredentials,
  });

export const authService = {
  login,
  logout,
  refresh,
};
