import client from "./axios-client";

const authUrl = {
  login: "/authenticate",
  logout: "/logout",
  refresh: "/refresh",
} as const;

const login = (data: { email: string; password: string }): Promise<any> =>
  client.post(authUrl.login, data);
const logout = (): Promise<any> => client.get(authUrl.logout);
const refresh = (): Promise<any> => client.get(authUrl.refresh);

export const authService = {
  login,
  logout,
  refresh,
};
