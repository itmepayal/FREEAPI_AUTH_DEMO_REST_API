"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Enable2FADialog({
  setupQuery,
  enable2FA,
  otp,
  setOtp,
  refetch,
}: any) {
  const handleEnable = () => {
    if (otp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    enable2FA.mutate(
      { token: otp },
      {
        onSuccess: () => {
          toast.success("2FA Enabled");
          setOtp("");
          refetch();
        },
        onError: (err: any) => {
          let message = "Invalid OTP";

          if (err?.message) message = err.message;

          if (err?.response?.data) {
            const firstError = Object.values(err.response.data)[0];
            if (Array.isArray(firstError)) {
              message = firstError[0];
            }
          }

          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={(open) => open && setupQuery.refetch()}>
      <DialogTrigger asChild>
        <Button>Enable 2FA</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enable 2FA</DialogTitle>

          <DialogDescription>
            Scan the QR code using Google Authenticator or any compatible app,
            then enter the 6-digit code to enable two-factor authentication.
          </DialogDescription>
        </DialogHeader>

        {setupQuery.isFetching ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src={setupQuery.data?.data?.qr_code}
                alt="2FA QR Code"
                className="w-40 h-40 border rounded-md"
              />
              <p className="text-xs text-gray-500 break-all text-center">
                {setupQuery.data?.data?.secret}
              </p>
            </div>

            <Input
              value={otp}
              maxLength={6}
              autoFocus
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-lg font-medium"
              placeholder="Enter OTP"
            />

            <Button
              onClick={handleEnable}
              disabled={otp.length !== 6 || enable2FA.isPending}
              className="w-full"
            >
              {enable2FA.isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Enable 2FA"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
