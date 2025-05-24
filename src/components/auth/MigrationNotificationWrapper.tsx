"use client";

import { MigrationNotification } from "@/components/auth/MigrationNotification";

interface MigrationNotificationWrapperProps {
  children: React.ReactNode;
}

export function MigrationNotificationWrapper({
  children,
}: MigrationNotificationWrapperProps) {
  return (
    <>
      <MigrationNotification />
      {children}
    </>
  );
}
