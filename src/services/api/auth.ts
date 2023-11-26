import client from "./axios-client";

const authUrl = {
  login: "/authenticate",
  logout: "/logout",
  refresh: "/refresh",
} as const;

const login = (data: {
  email: string;
  password: string;
}): Promise<{
  status: number;
  data: {
    access_token: string;
    refresh_token: string;
  };
}> => client.post(authUrl.login, data, { withCredentials: true });
const logout = (): Promise<any> =>
  client.get(authUrl.logout, { withCredentials: true });
const refresh = (): Promise<any> =>
  client.get(authUrl.refresh, {
    withCredentials: true,
  });

export const authService = {
  login,
  logout,
  refresh,
};
