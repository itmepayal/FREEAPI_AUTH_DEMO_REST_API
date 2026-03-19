"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="border bg-background text-foreground mx-20 my-10">
        <div className="max-w-9xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Shield className="h-5 w-5 text-primary" />
            <span>Auth</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded-md hover:bg-secondary hover:text-secondary-foreground transition"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <div></div>
        <div></div>
      </main>

      {/* Footer */}
      <footer className="border bg-background text-foreground mx-20 my-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="hover:text-secondary-foreground">
              Designed & Developed by Payal Yadav
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
