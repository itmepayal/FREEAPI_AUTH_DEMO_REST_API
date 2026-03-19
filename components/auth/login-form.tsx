"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { loginUser } from "@/lib/api/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await loginUser(data);

      setUser(res.data);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              {/* Social */}
              <Field>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>

                  <Button type="button" variant="outline">
                    <FcGoogle className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                </div>
              </Field>

              <FieldSeparator>Or continue with</FieldSeparator>

              {/* Email */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel>Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input type="password" {...register("password")} />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
