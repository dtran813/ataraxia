"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { cn } from "@/lib/utils";

interface EnvironmentBackgroundProps {
  className?: string;
}

export function EnvironmentBackground({
  className,
}: EnvironmentBackgroundProps) {
  const { getCurrentEnvironment } = useEnvironmentStore();
  const [isLoading, setIsLoading] = useState(true);

  const environment = getCurrentEnvironment();

  // Reset loading state when environment changes
  useEffect(() => {
    setIsLoading(true);
  }, [environment?.id]);

  if (!environment) {
    return (
      <div
        className={cn("bg-gray-100 dark:bg-gray-900 w-full h-full", className)}
      />
    );
  }

  return (
    <div className={cn("w-full h-full overflow-hidden", className)}>
      {environment.backgroundType === "image" ? (
        <div className="relative w-full h-full">
          <Image
            src={environment.background}
            alt={environment.name}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoadingComplete={() => setIsLoading(false)}
            priority
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}
        </div>
      ) : (
        <div
          className="w-full h-full"
          style={{ backgroundColor: environment.background }}
        />
      )}
    </div>
  );
}
