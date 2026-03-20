"use client";

import { useRegister } from "@/hooks/use-auth";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    register(data, {
      onSuccess: () => {
        toast.success("Account created successfully");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      },
      onError: (err: any) => {
        let message = "Something went wrong. Please try again.";

        if (err?.message) {
          message = err.message;
        }

        if (err?.response?.data) {
          const firstError = Object.values(err.response.data)[0];
          if (Array.isArray(firstError)) {
            message = firstError[0];
          }
        }

        toast.error("Registration failed", {
          description: message,
        });
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Username */}
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input {...formRegister("username")} />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" {...formRegister("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              {/* Passwords */}
              <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
                {/* Password */}
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      className="pr-10"
                      type={showPassword ? "text" : "password"}
                      {...formRegister("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                {/* Confirm Password */}
                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Input
                      className="pr-10"
                      type={showConfirmPassword ? "text" : "password"}
                      {...formRegister("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>
              </div>

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>

              {/* Submit */}
              <Field>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-4 h-4" />
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
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
