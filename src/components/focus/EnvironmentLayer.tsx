"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";

export function EnvironmentLayer() {
  const { getCurrentEnvironment } = useEnvironmentStore();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const environment = getCurrentEnvironment();

  useEffect(() => {
    setIsImageLoaded(false);
  }, [environment?.id]);

  if (!environment) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black" />
    );
  }

  return (
    <div className="absolute inset-0">
      {environment.backgroundType === "image" ? (
        <>
          <Image
            src={environment.background}
            alt={environment.name}
            fill
            className="object-cover"
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: environment.background }}
        />
      )}

      {/* Loading state */}
      {!isImageLoaded && environment.backgroundType === "image" && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 animate-pulse" />
      )}
    </div>
  );
}
