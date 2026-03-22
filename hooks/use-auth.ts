"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

const isProd = process.env.NODE_ENV === "production";

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax; ${
    isProd ? "Secure;" : ""
  }`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);

  return useMutation({
    mutationFn: authApi.loginUser,

    onSuccess: (res) => {
      const { access_token, refresh_token, user } = res.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setUser(user);

      setCookie("accessToken", access_token);
      setCookie("refreshToken", refresh_token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.registerUser,
  });
};

export const useMe = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: authApi.getMe,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: authApi.logoutUser,

    onSuccess: () => {
      logout();

      removeCookie("accessToken");
      removeCookie("refreshToken");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
  });
};

export const useResendEmail = () => {
  return useMutation({
    mutationFn: authApi.resendEmail,
  });
};

export const use2FASetup = () => {
  return useQuery({
    queryKey: ["2fa-setup"],
    queryFn: authApi.setup2FA,
    enabled: false,
  });
};

export const useEnable2FA = () => {
  return useMutation({
    mutationFn: authApi.enable2FA,
  });
};

export const useDisable2FA = () => {
  return useMutation({
    mutationFn: authApi.disable2FA,
  });
};

export const useChangeRole = () => {
  return useMutation({
    mutationFn: authApi.changeRole,
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateAvatar,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: authApi.getSessions,
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.revokeSession,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useRevokeOtherSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.revokeOtherSessions,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useLoginWithGitHub = () => {
  return useMutation({
    mutationFn: authApi.loginWithGitHub,
  });
};

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: authApi.loginWithGoogle,
  });
};
