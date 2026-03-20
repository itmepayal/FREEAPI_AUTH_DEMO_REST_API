import Link from "next/link";

export const Hero = () => {
  return (
    <main className="relative mx-6 md:mx-20 my-16 grid md:grid-cols-2 gap-12 items-center">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-linear-to-r from-primary via-purple-500 to-pink-500" />

      <div className="space-y-6">
        <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
          🔐 Secure & Scalable
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Advanced{" "}
          <span className="bg-linear-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            Auth System
          </span>
        </h1>

        <p className="text-muted-foreground text-lg">
          A production-ready authentication system featuring secure user
          registration, login, email verification, password reset, JWT-based
          authentication with refresh tokens, two-factor authentication (2FA),
          and role-based access control for scalable applications.
        </p>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 border rounded-lg hover:bg-secondary transition"
          >
            Live Demo
          </Link>
        </div>
      </div>

      <div className="relative flex items-end justify-end">
        <img src="/hero.png" alt="Hero Image" className="rounded-xl" />
      </div>
    </main>
  );
};
