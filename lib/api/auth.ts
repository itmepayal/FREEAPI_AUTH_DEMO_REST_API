import { apiClient } from "@/lib/api/client";

export const loginUser = (data: { email: string; password: string }) =>
  apiClient("/api/v1/accounts/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data: any) =>
  apiClient("/api/v1/accounts/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logoutUser = () =>
  apiClient("/api/v1/accounts/logout/", {
    method: "POST",
  });

export const refreshToken = () =>
  apiClient("/api/v1/accounts/refresh-token/", {
    method: "POST",
  });

export const getMe = () => apiClient("/api/v1/accounts/me/");

export const updateAvatar = (formData: FormData) =>
  fetch(`/api/v1/accounts/me/avatar/`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  }).then((res) => res.json());

export const changePassword = (data: {
  old_password: string;
  new_password: string;
}) =>
  apiClient("/api/v1/accounts/change-password/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgotPassword = (data: { email: string }) => {
  return apiClient("/api/v1/accounts/forgot-password/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const resetPassword = (data: { token: string; new_password: string }) =>
  apiClient("/api/v1/accounts/reset-password/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyEmail = (data: { token: string }) =>
  apiClient("/api/v1/accounts/verify-email/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resendEmail = (email: string) =>
  apiClient("/api/v1/accounts/resend-email/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const setup2FA = () => apiClient("/api/v1/accounts/2fa/setup/");

export const enable2FA = (data: { otp: string }) =>
  apiClient("/api/v1/accounts/2fa/enable/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const disable2FA = (data: { otp: string }) =>
  apiClient("/api/v1/accounts/2fa/disable/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const changeRole = (data: { role: string }) =>
  apiClient("/api/v1/accounts/change-role/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
