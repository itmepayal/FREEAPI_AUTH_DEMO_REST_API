"use client";

import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionRow } from "./session-row";
import { SessionEmpty } from "./session-empty";
import { Card, CardContent } from "@/components/ui/card";

type Session = {
  id: string;
  device?: string;
  ip_address?: string;
  expiry?: string;
};

type Props = {
  sessions?: Session[] | Record<string, Session>; // array or object
  loading: boolean;
  onRevoke: (id: string) => void;
  onRevokeOthers: () => void;
  isRevoking?: boolean;
  isRevokingOthers?: boolean;
};

export function SessionList({
  sessions,
  loading,
  onRevoke,
  onRevokeOthers,
  isRevoking,
  isRevokingOthers,
}: Props) {
  const sessionsArray: Session[] = Array.isArray(sessions)
    ? sessions
    : sessions
    ? Object.values(sessions)
    : [];

  return (
    <div className="border rounded-xl p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Active Sessions</h2>
        {sessionsArray.length > 0 && (
          <Button
            variant="secondary"
            onClick={onRevokeOthers}
            disabled={isRevokingOthers}
            className="text-red-500 flex items-center gap-2 justify-center sm:justify-start"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Revoke Others</span>
          </Button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-10 border">
          <Loader2 className="animate-spin" />
        </div>
      ) : sessionsArray.length === 0 ? (
        <SessionEmpty />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden divide-y  ">
            <thead className=" text-left text-sm uppercase tracking-wider">
              <tr>
                <th className="px-2 sm:px-3 py-2">Device</th>
                <th className="px-2 sm:px-3 py-2">IP Address</th>
                <th className="px-2 sm:px-3 py-2">Expires In</th>
                <th className="px-2 sm:px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y  ">
              {sessionsArray.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  onRevoke={onRevoke}
                  isRevoking={isRevoking}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
