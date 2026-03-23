import { env } from "@/env";
import { useAuthStore } from "@/store/auth-store";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const { accessToken, refreshToken } = useAuthStore.getState();

  const isFormData = options.body instanceof FormData;

  const makeRequest = async (token?: string) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      credentials: "include",
    });
  };

  let res = await makeRequest(accessToken ?? undefined);

  if (res.status === 401 && refreshToken) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch(`${BASE_URL}/api/v1/accounts/refresh-token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })
          .then(async (refreshRes) => {
            if (!refreshRes.ok) throw new Error("Refresh failed");

            const refreshData = await refreshRes.json();

            const newAccessToken = refreshData?.data?.access_token;
            const newRefreshToken = refreshData?.data?.refresh_token;

            const store = useAuthStore.getState();

            store.setAccessToken(newAccessToken);

            if (newRefreshToken) {
              store.setRefreshToken(newRefreshToken);
            }

            return newAccessToken;
          })
          .catch(() => {
            useAuthStore.getState().logout();
            return null;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const newToken = await refreshPromise;

      if (!newToken) {
        throw new Error("Session expired. Please login again.");
      }

      res = await makeRequest(newToken);
    } catch {
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please login again.");
    }
  }

  let data = null;

  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw {
      status: res.status,
      data: data,
      message: data?.message || data?.detail || "Something went wrong",
    };
  }

  return data;
}
