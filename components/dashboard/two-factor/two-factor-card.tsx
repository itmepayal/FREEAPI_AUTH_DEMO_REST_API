"use client";

import {
  use2FASetup,
  useEnable2FA,
  useDisable2FA,
  useChangePassword,
} from "@/hooks/use-auth";

import { useState } from "react";
import { Enable2FADialog } from "@/components/dashboard/two-factor/dialog/enable-2fa-dialog";
import { Disable2FADialog } from "@/components/dashboard/two-factor/dialog/disable-2fa-dialog";
import { ChangePasswordDialog } from "@/components/dashboard/two-factor/dialog/change-password-dialog";

import { ShieldCheck, Lock } from "lucide-react";

export function TwoFactorCard({ user, refetch }: any) {
  const setupQuery = use2FASetup();
  const enable2FA = useEnable2FA();
  const disable2FA = useDisable2FA();
  const changePassword = useChangePassword();

  const [otp, setOtp] = useState("");
  const [disableOtp, setDisableOtp] = useState("");

  return (
    <div className="w-full space-y-6">
      {/* ================= 2FA CARD ================= */}
      <div className="p-5 sm:p-6 border rounded-xl shadow-sm bg-background">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                Two-Factor Authentication
              </h2>
              <p className="text-xs text-muted-foreground">
                Add extra security to your account
              </p>
            </div>
          </div>

          {/* STATUS BADGE */}
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
              user?.is_2fa_enabled
                ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                : "bg-red-100 text-red-500 dark:bg-red-900/30"
            }`}
          >
            {user?.is_2fa_enabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        {/* BODY */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-md">
            Use an authenticator app to generate one-time verification codes for
            added security.
          </p>

          <div className="w-full sm:w-auto">
            {!user?.is_2fa_enabled ? (
              <Enable2FADialog
                setupQuery={setupQuery}
                enable2FA={enable2FA}
                otp={otp}
                setOtp={setOtp}
                refetch={refetch}
              />
            ) : (
              <Disable2FADialog
                disable2FA={disable2FA}
                disableOtp={disableOtp}
                setDisableOtp={setDisableOtp}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= SECURITY CARD ================= */}
      <div className="p-5 sm:p-6 border rounded-xl shadow-sm bg-background">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <Lock className="w-5 h-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold">Security</h2>
            <p className="text-xs text-muted-foreground">
              Manage your password and account security
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-md">
            Change your password regularly to keep your account secure.
          </p>

          <div className="w-full sm:w-auto">
            <ChangePasswordDialog changePassword={changePassword} />
          </div>
        </div>
      </div>
    </div>
  );
}
