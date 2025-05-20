"use client";

import { useEffect, useState } from "react";
import { EnvironmentBackground } from "./EnvironmentBackground";
import { AudioControls } from "./AudioControls";
import { EnvironmentSelector } from "./EnvironmentSelector";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface EnvironmentProps {
  children?: React.ReactNode;
}

export function Environment({ children }: EnvironmentProps) {
  const { isLoaded } = useAudioPlayer();
  const { getCurrentEnvironment } = useEnvironmentStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const environment = getCurrentEnvironment();

  // Handle initial loading state
  useEffect(() => {
    if (isLoaded && environment) {
      // Add a slight delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, environment]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <EnvironmentBackground />
      </div>

      {/* Loading overlay */}
      {isInitialLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-200 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg font-medium">Loading environment...</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col">{children}</div>

      {/* Controls */}
      <div className="relative z-10 p-4 flex justify-between items-end">
        <EnvironmentSelector />
        <AudioControls />
      </div>
    </div>
  );
}
