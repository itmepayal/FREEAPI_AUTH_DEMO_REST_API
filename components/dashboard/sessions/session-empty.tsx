"use client";

import { Card, CardContent } from "@/components/ui/card";

export function SessionEmpty() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-6">
        <p className="text-secondary-foreground">No active sessions</p>
      </CardContent>
    </Card>
  );
}
