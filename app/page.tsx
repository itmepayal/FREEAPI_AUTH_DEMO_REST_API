"use client";

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

export default function page() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Footer */}
      <Footer />
    </>
  );
}
