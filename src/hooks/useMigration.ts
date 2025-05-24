import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { AccountMigration } from "@/lib/auth/accountMigration";

export function useMigration() {
  const { user } = useAuth();
  const [migrationStatus, setMigrationStatus] = useState<{
    isLoading: boolean;
    success: boolean | null;
    message: string;
  }>({
    isLoading: false,
    success: null,
    message: "",
  });

  useEffect(() => {
    if (user && !migrationStatus.success) {
      setMigrationStatus((prev) => ({ ...prev, isLoading: true }));

      AccountMigration.performMigration(user)
        .then((result) => {
          setMigrationStatus({
            isLoading: false,
            success: result.success,
            message: result.message,
          });
        })
        .catch((error) => {
          console.error("Migration hook error:", error);
          setMigrationStatus({
            isLoading: false,
            success: false,
            message:
              "Migration failed, but your local settings will continue to work.",
          });
        });
    }
  }, [user, migrationStatus.success]);

  return migrationStatus;
}
