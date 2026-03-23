"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useVerifyEmail } from "@/hooks/use-auth";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import Link from "next/link";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const params = useParams();

  const token = params?.token as string;

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const handleVerify = () => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    verifyEmail(
      { token },
      {
        onSuccess: () => {
          toast.success("Email verified successfully");

          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (err: any) => {
          let message = "Verification failed";
          if (err.message) {
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
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            Click below to verify your email and activate your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              {/* Verify Button */}
              <Field>
                <Button
                  type="button"
                  className="w-full h-10"
                  onClick={handleVerify}
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-4 h-4" />
                    </div>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </Field>

              {/* Continue */}
              <Field>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10"
                  onClick={() => router.push("/login")}
                >
                  Continue to Login
                </Button>

                <FieldDescription className="text-center">
                  Already verified?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
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
