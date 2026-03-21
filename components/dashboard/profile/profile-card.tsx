"use client";

import React, { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateAvatar } from "@/hooks/use-auth";
import { toast } from "sonner";

interface ProfileCardProps {
  user: any;
  isLoading: boolean;
}

export function ProfileCard({ user, isLoading }: ProfileCardProps) {
  const updateAvatar = useUpdateAvatar();
  const [preview, setPreview] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB allowed");
      return false;
    }

    return true;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    updateAvatar.mutate(formData, {
      onSuccess: () => toast.success("Profile updated"),
      onError: () => toast.error("Upload failed"),
    });

    e.target.value = "";
  };

  const avatarSrc = preview || user?.avatar_url || "/default-avatar.png";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 py-10 border rounded-xl shadow-sm w-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const userInfo = [
    { label: "Name", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.role },
    { label: "Status", value: user?.status_message },
  ];

  return (
    <div className="p-4 sm:p-6 border rounded-xl shadow-sm w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-6">User Management</h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        <div className="flex flex-col items-center w-full lg:w-auto">
          <div className="relative group w-28 h-28 sm:w-32 sm:h-32">
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <img
              src={avatarSrc}
              alt="avatar"
              className="w-full h-full rounded-full object-cover border shadow-md"
            />

            {updateAvatar.isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}

            <label
              htmlFor="avatarUpload"
              className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full cursor-pointer hover:bg-black transition"
            >
              <Camera className="w-4 h-4 text-white" />
            </label>
          </div>

          <Button
            onClick={() => document.getElementById("avatarUpload")?.click()}
            className="mt-3 w-full text-xs sm:text-sm"
          >
            Change Profile
          </Button>
        </div>

        <div className="w-full">
          <div className="overflow-hidden border rounded-lg">
            <table className="hidden sm:table w-full text-sm">
              <tbody>
                {userInfo.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50 transition">
                    <td className="px-4 py-2 font-medium text-gray-600 w-40">
                      {item.label}
                    </td>
                    <td className="px-4 py-2">{item.value}</td>
                  </tr>
                ))}

                <tr>
                  <td className="px-4 py-2 font-medium text-gray-600">2FA</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-medium ${
                        user?.is_2fa_enabled ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {user?.is_2fa_enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="sm:hidden divide-y text-sm">
              {userInfo.map((item, i) => (
                <div key={i} className="p-3 flex justify-between">
                  <span className="text-gray-500">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}

              <div className="p-3 flex justify-between">
                <span className="text-gray-500">2FA</span>
                <span
                  className={
                    user?.is_2fa_enabled ? "text-green-600" : "text-red-500"
                  }
                >
                  {user?.is_2fa_enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
