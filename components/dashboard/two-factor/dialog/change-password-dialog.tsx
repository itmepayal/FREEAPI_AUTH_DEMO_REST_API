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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  changePasswordSchema,
  ChangePasswordValues,
} from "@/schemas/auth.schema";

export function ChangePasswordDialog({ changePassword }: any) {
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordValues) => {
    changePassword.mutate(
      {
        old_password: data.old_password,
        new_password: data.new_password,
      },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          reset();
        },
        onError: (err: any) => {
          let message = "Failed to update password";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>

          <DialogDescription>
            Enter your current password and set a new secure password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Old Password</FieldLabel>
              <div className="relative">
                <Input
                  type={show.old ? "text" : "password"}
                  className="pr-10"
                  {...register("old_password")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({ ...prev, old: !prev.old }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.old_password && (
                <p className="text-red-500 text-sm">
                  {errors.old_password.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>New Password</FieldLabel>
              <div className="relative">
                <Input
                  type={show.new ? "text" : "password"}
                  className="pr-10"
                  {...register("new_password")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({ ...prev, new: !prev.new }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.new_password && (
                <p className="text-red-500 text-sm">
                  {errors.new_password.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <div className="relative">
                <Input
                  type={show.confirm ? "text" : "password"}
                  className="pr-10"
                  {...register("confirm_password")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </Field>

            <FieldDescription>
              Password must be at least 8 characters long.
            </FieldDescription>

            <Button
              type="submit"
              disabled={changePassword.isPending}
              className="w-full"
            >
              {changePassword.isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Change Password"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
