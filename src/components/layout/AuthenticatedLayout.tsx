"use client";

import { useAuth } from "@/contexts/auth/AuthContext";
import { MigrationNotification } from "@/components/auth/MigrationNotification";
import { Header } from "./Header";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  showMigration?: boolean;
}

export function AuthenticatedLayout({
  children,
  showMigration = true,
}: AuthenticatedLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && showMigration && <MigrationNotification />}
        {children}
      </main>
    </div>
  );
}
