"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setAccessToken);

  return useMutation({
    mutationFn: authApi.loginUser,
    onSuccess: (data) => {
      setToken(data.access);
      useAuthStore.getState().setRefreshToken(data.refresh);
      setUser(data.user);
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
    if (query.data) {
      setUser(query.data);
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
  return useMutation({
    mutationFn: authApi.updateAvatar,
  });
};
