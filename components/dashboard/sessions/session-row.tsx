"use client";

import { Trash2, Globe, Monitor, Smartphone, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import * as UAParser from "ua-parser-js";

type Session = {
  id: string;
  device?: string;
  ip_address?: string;
  expiry?: string;
};

type Props = {
  session: Session;
  onRevoke: (id: string) => void;
  isRevoking?: boolean;
};

export function SessionRow({ session, onRevoke, isRevoking }: Props) {
  const parser = new UAParser.UAParser(session.device || "");
  const result = parser.getResult();

  const deviceType = result.device.type || "desktop";
  const browser = result.browser.name || "Unknown";
  const os = result.os.name || "Unknown";

  const getDeviceIcon = () => {
    if (deviceType === "mobile")
      return <Smartphone size={18} className="text-blue-500" />;
    return <Monitor size={18} className="text-purple-500" />;
  };

  return (
    <tr className="border-t">
      <td className="p-3">
        <div className="flex items-center gap-2 font-medium">
          {getDeviceIcon()}

          <div className="flex flex-col">
            <span>
              {browser} • {os}
            </span>
            <span className="text-xs text-secondary-foreground capitalize">
              {deviceType}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="p-3 flex items-center gap-2">
          <Globe size={14} />
          {session.ip_address || "N/A"}
        </div>
      </td>
      <td>
        <div className="p-3 flex items-center gap-2">
          <Clock size={14} />
          {session.expiry ? (
            <>
              Expires{" "}
              {formatDistanceToNow(new Date(session.expiry), {
                addSuffix: true,
              })}
            </>
          ) : (
            "N/A"
          )}
        </div>
      </td>
      <td>
        <Button
          variant="ghost"
          onClick={() => onRevoke(session.id)}
          disabled={isRevoking}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
}
