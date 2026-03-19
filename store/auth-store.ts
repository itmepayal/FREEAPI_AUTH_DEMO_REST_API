import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: any) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user: any) => set({ user }),
      setAccessToken: (token: any) => set({ accessToken: token }),
      setRefreshToken: (token: any) => set({ refreshToken: token }),

      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    { name: "auth-storage" }
  )
);
