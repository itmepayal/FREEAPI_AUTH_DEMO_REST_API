"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { useMe } from "@/hooks/use-auth";
import {
  useSessions,
  useRevokeSession,
  useRevokeOtherSessions,
} from "@/hooks/use-auth";

import { ProfileCard } from "@/components/dashboard/profile/profile-card";
import { TwoFactorCard } from "@/components/dashboard/two-factor/two-factor-card";
import { SessionList } from "@/components/dashboard/sessions/session-list";

export default function Page() {
  const { data, isLoading, refetch } = useMe();
  const user = data;

  const { data: sessionsData, isLoading: sessionsLoading } = useSessions();

  const revokeSession = useRevokeSession();
  const revokeOthers = useRevokeOtherSessions();

  const sessions = sessionsData?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 md:mx-20 mx-4 py-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <ProfileCard user={user} isLoading={isLoading} />
          <TwoFactorCard user={user} refetch={refetch} />
        </div>

        {/* Sessions */}
        <SessionList
          sessions={sessions}
          loading={sessionsLoading}
          onRevoke={(id) => revokeSession.mutate(id)}
          onRevokeOthers={() => revokeOthers.mutate()}
          isRevoking={revokeSession.isPending}
          isRevokingOthers={revokeOthers.isPending}
        />
      </main>

      <Footer />
    </div>
  );
}
