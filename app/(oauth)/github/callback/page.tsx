"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

const isProd = process.env.NODE_ENV === "production";

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax; ${
    isProd ? "Secure;" : ""
  }`;
};

export default function GitHubCallback() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");
    const username = params.get("username");

    if (access && refresh && username) {
      setAccessToken(access);
      setRefreshToken(refresh);
      setUser({ username });

      setCookie("accessToken", access);
      setCookie("refreshToken", refresh);

      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router, setAccessToken, setRefreshToken, setUser]);

  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
