"use client";

import { useMe } from "@/hooks/use-auth";

export function AuthInitializer() {
  useMe();
  return null;
}
