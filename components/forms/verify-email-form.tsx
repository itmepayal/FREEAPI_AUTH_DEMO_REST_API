"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useVerifyEmail } from "@/hooks/use-auth";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const handleResend = () => {
    console.log(token);
    if (!token) {
      toast.error("Token is missing!");
      return;
    }
    verifyEmail(
      { token },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (err: any) => {
          const message = toast.error("Failed to resend email");
        },
      }
    );
  };

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            A verification link has been sent to your email. Please check your
            inbox.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <Field>
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleResend}
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </Field>

              <Field>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleContinue}
                >
                  Continue to Login
                </Button>
                <FieldDescription className="text-center">
                  Already verified? You can login now.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
