import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { MigrationNotificationWrapper } from "@/components/auth/MigrationNotificationWrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <MainLayout>
        <MigrationNotificationWrapper>{children}</MigrationNotificationWrapper>
      </MainLayout>
    </ProtectedRoute>
  );
}
