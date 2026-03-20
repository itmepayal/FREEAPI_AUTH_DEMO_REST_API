"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useForgotPassword } from "@/hooks/use-auth";

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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          toast.success("Reset link sent to your email");

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
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a reset link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center gap-2 justify-center">
                      <Loader2 className="animate-spin w-4 h-4" />
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Remember your password?{" "}
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
