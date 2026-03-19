import { env } from "@/env";
import { useAuthStore } from "@/store/auth-store";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;
  const refreshToken = useAuthStore.getState().refreshToken;

  const makeRequest = async (accessToken?: string) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(options.headers || {}),
      },
      body: options.body,
      credentials: "include",
    });
  };

  let res = await makeRequest(token ?? undefined);

  if (res.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${BASE_URL}/api/v1/accounts/refresh-token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      if (!refreshRes.ok) throw new Error("Refresh failed");

      const refreshData = await refreshRes.json();
      const newToken = refreshData.access;
      const newRefreshToken = refreshData.refresh;

      useAuthStore.getState().setAccessToken(newToken);

      if (newRefreshToken) {
        useAuthStore.getState().setRefreshToken(newRefreshToken);
      }

      res = await makeRequest(newToken);
    } catch (error) {
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.detail || "Something went wrong");
  }

  return data;
}
