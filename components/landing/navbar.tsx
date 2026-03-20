"use client";

import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border bg-background/80 backdrop-blur mx-4 md:mx-20 my-6 rounded-xl">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <Shield className="h-5 w-5 text-primary" />
          <span>Auth</span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
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
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-secondary transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
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
            className="block w-full px-4 py-3 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
