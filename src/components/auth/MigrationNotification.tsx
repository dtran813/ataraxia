"use client";

import { useEffect, useState } from "react";
import { useMigration } from "@/hooks/useMigration";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertCircle, Cloud, X } from "lucide-react";

interface MigrationNotificationProps {
  onDismiss?: () => void;
}

export function MigrationNotification({
  onDismiss,
}: MigrationNotificationProps) {
  const { isLoading, success, message } = useMigration();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show toast notification for migration result
    if (success !== null && !isLoading) {
      if (success) {
        toast.success(message, { duration: 5000 });
      } else {
        toast.error(message, { duration: 8000 });
      }
    }
  }, [success, message, isLoading]);

  // Don't show notification if dismissed, still loading, or no result yet
  if (isDismissed || isLoading || success === null) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <Card
      className={`mb-6 p-4 border-l-4 ${
        success
          ? "border-l-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div
            className={`flex-shrink-0 ${
              success
                ? "text-green-600 dark:text-green-400"
                : "text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {success ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1">
            <h4
              className={`text-sm font-semibold ${
                success
                  ? "text-green-800 dark:text-green-200"
                  : "text-yellow-800 dark:text-yellow-200"
              }`}
            >
              {success ? "Data Migration Complete" : "Migration Notice"}
            </h4>

            <p
              className={`text-sm mt-1 ${
                success
                  ? "text-green-700 dark:text-green-300"
                  : "text-yellow-700 dark:text-yellow-300"
              }`}
            >
              {message}
            </p>

            {success && (
              <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400">
                <Cloud className="w-3 h-3 mr-1" />
                Your data is now synced across devices
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className={`flex-shrink-0 ${
            success
              ? "text-green-600 hover:text-green-700 dark:text-green-400"
              : "text-yellow-600 hover:text-yellow-700 dark:text-yellow-400"
          }`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
