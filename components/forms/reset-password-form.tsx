"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useResetPassword } from "@/hooks/use-auth";

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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const params = useParams();

  const token = params?.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const validatePassword = () => {
    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    resetPassword(
      {
        token,
        new_password: password,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful");

          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (err: any) => {
          let message = "Something went wrong";

          if (err?.response?.data) {
            const firstError = Object.values(err.response.data)[0];
            if (Array.isArray(firstError)) {
              message = firstError[0];
            }
          } else if (err?.message) {
            message = err.message;
          }

          toast.error(message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter and confirm your new password</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              {/* Password */}
              <Field>
                <FieldLabel>New Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  disabled={isPending}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  disabled={isPending}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2 justify-center">
                      <Loader2 className="animate-spin w-4 h-4" />
                      <span>Updating password...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Back to{" "}
                  <a href="/login" className="underline">
                    Login
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
