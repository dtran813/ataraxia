"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/lib/utils";
import { EnvironmentLayer } from "@/components/focus/EnvironmentLayer";
import { ControlPanel } from "@/components/focus/ControlPanel";
import { EnvironmentPicker } from "@/components/focus/EnvironmentPicker";
import { FloatingTimer } from "@/components/focus/FloatingTimer";
import { UserMenu } from "@/components/focus/UserMenu";

export default function FocusPage() {
  const [showControls, setShowControls] = useState(true);
  const lastActivityRef = useRef(Date.now());
  const { isRunning } = useTimerStore();

  useTimer();

  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Auto-hide controls after inactivity when timer is running
  useEffect(() => {
    if (isRunning) {
      document.addEventListener("mousemove", updateActivity);
      document.addEventListener("keydown", updateActivity);

      const timer = setInterval(() => {
        const timeSinceActivity = Date.now() - lastActivityRef.current;
        if (timeSinceActivity > 5000) {
          // 5 seconds of inactivity
          setShowControls(false);
        }
      }, 1000);

      return () => {
        document.removeEventListener("mousemove", updateActivity);
        document.removeEventListener("keydown", updateActivity);
        clearInterval(timer);
      };
    } else {
      setShowControls(true);
    }
  }, [isRunning, updateActivity]);

  // Show controls on hover near edges
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight } = currentTarget as HTMLElement;

      const edgeThreshold = 100;
      const nearEdge =
        clientX < edgeThreshold ||
        clientX > clientWidth - edgeThreshold ||
        clientY < edgeThreshold ||
        clientY > clientHeight - edgeThreshold;

      if (nearEdge || !isRunning) {
        setShowControls(true);
        updateActivity();
      }
    },
    [isRunning, updateActivity]
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-white dark:bg-black"
      onMouseMove={handleMouseMove}
    >
      <EnvironmentLayer />

      <FloatingTimer className="mt-8" />

      {/* Controls - Auto-hide when running */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="pointer-events-auto">
          <ControlPanel />
          <EnvironmentPicker />
          <UserMenu />
        </div>
      </div>

      {/* Subtle hint for hidden controls */}
      {!showControls && isRunning && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 dark:bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/10 dark:border-white/20 animate-pulse">
          <p className="text-white/60 dark:text-white/80 text-sm">
            Move mouse to edges to show controls
          </p>
        </div>
      )}
    </div>
  );
}
