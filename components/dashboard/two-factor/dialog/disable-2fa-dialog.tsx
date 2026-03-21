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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Disable2FADialog({
  disable2FA,
  disableOtp,
  setDisableOtp,
  refetch,
}: any) {
  const handleDisable = () => {
    if (disableOtp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    disable2FA.mutate(
      { token: disableOtp },
      {
        onSuccess: () => {
          toast.success("2FA Disabled");
          setDisableOtp("");
          refetch();
        },
        onError: () => toast.error("Invalid OTP"),
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/10"
        >
          Disable 2FA
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Disable 2FA</DialogTitle>

          <DialogDescription>
            Enter the 6-digit code from your authenticator app to disable
            two-factor authentication.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={disableOtp}
            maxLength={6}
            onChange={(e) => setDisableOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border px-3 py-2 rounded-md text-center tracking-widest"
            placeholder="Enter OTP"
          />

          <Button
            onClick={handleDisable}
            disabled={disable2FA.isPending}
            className="w-full"
          >
            {disable2FA.isPending ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Confirm Disable"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
