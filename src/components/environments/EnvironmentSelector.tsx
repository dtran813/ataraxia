"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function EnvironmentSelector() {
  const { environments, currentEnvironmentId, setCurrentEnvironment } =
    useEnvironmentStore();
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <span>{showSelector ? "Hide Environments" : "Change Environment"}</span>
      </button>

      {showSelector && (
        <Card className="absolute bottom-full mb-2 w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Select Environment</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {environments.map((environment) => (
                <button
                  key={environment.id}
                  className={cn(
                    "relative rounded-md overflow-hidden h-24 w-full group",
                    currentEnvironmentId === environment.id &&
                      "ring-2 ring-primary-500"
                  )}
                  onClick={() => {
                    setCurrentEnvironment(environment.id);
                    setShowSelector(false);
                  }}
                >
                  {environment.backgroundType === "image" ? (
                    <Image
                      src={environment.background}
                      alt={environment.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: environment.background }}
                    />
                  )}

                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity" />

                  <div className="absolute inset-x-0 bottom-0 p-2 text-white text-xs font-medium">
                    {environment.name}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
