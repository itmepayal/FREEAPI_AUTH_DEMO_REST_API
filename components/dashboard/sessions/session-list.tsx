"use client";

import { Trash2, Shield, Loader2 } from "lucide-react";
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
  sessions: Session[];
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
  return (
    <div className="border rounded-xl p-6  space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Active Sessions
          </h2>
        </div>

        <Button
          variant="secondary"
          onClick={onRevokeOthers}
          disabled={isRevokingOthers}
          className="text-red-500"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center p-20 border">
          <Loader2 className="animate-spin" />
        </div>
      ) : sessions.length === 0 ? (
        <SessionEmpty />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="text-left text-sm text-secondary-foreground">
              <tr>
                <th className="p-3">Device</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Expires In</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
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
