"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function GitHubCallback() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const access = params.get("access");
    const refresh = params.get("refresh");
    const username = params.get("username");

    if (access && refresh) {
      setAccessToken(access);
      setRefreshToken(refresh);
      setUser({ username });

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      router.replace("/dashboard");
    }
  }, []);

  return <div>Logging you in with GitHub...</div>;
}
