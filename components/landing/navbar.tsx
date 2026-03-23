"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";
import { useLogout } from "@/hooks/use-auth";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { accessToken } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        setOpen(false);
        router.push("/login");
      },
    });
  };

  return (
    <nav className="border bg-background/80 backdrop-blur mx-4 md:mx-20 my-6 rounded-xl">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <Shield className="h-5 w-5 text-primary" />
          <span>Auth</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 text-sm border text-white rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <LogOut className="size-4" />
              )}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-md hover:bg-secondary transition"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition shadow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-secondary transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm bg-destructive text-white rounded-md disabled:opacity-50"
            >
              <LogOut className="size-4" />
              {isPending ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-2 text-sm rounded-md hover:bg-secondary transition"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 text-sm bg-primary text-primary-foreground rounded-md text-center"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
