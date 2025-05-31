"use client";

import { formatTime, calculateProgress } from "@/lib/utils/time";
import { cn } from "@/lib/utils";
import { useTimerStore } from "@/store/useTimerStore";
import { Play, Pause } from "lucide-react";

interface FloatingTimerProps {
  className?: string;
}

export function FloatingTimer({ className }: FloatingTimerProps) {
  const {
    mode,
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
  } = useTimerStore();

  // Calculate total time based on current mode
  const getTotalTime = () => {
    switch (mode) {
      case "focus":
        return focusDuration * 60;
      case "shortBreak":
        return shortBreakDuration * 60;
      case "longBreak":
        return longBreakDuration * 60;
    }
  };

  // Colors based on mode
  const getModeColors = () => {
    switch (mode) {
      case "focus":
        return {
          text: "text-primary-700 dark:text-primary-300",
          stroke: "stroke-primary-500",
          background: "from-blue-500 to-indigo-600",
        };
      case "shortBreak":
        return {
          text: "text-green-700 dark:text-green-300",
          stroke: "stroke-green-500",
          background: "from-green-500 to-emerald-600",
        };
      case "longBreak":
        return {
          text: "text-blue-700 dark:text-blue-300",
          stroke: "stroke-blue-500",
          background: "from-purple-500 to-violet-600",
        };
    }
  };

  // Emoji based on mode
  const getModeEmoji = () => {
    switch (mode) {
      case "focus":
        return "🎯";
      case "shortBreak":
        return "☕";
      case "longBreak":
        return "🌿";
    }
  };

  // Calculate circle attributes
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = calculateProgress(timeRemaining, getTotalTime());
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
        {/* Mode indicator */}
        <div className="text-center mb-2">
          <div className="text-xl mb-2">{getModeEmoji()}</div>
          <p className="text-white/80 text-sm uppercase tracking-wide font-medium">
            {mode === "shortBreak"
              ? "Short Break"
              : mode === "longBreak"
              ? "Long Break"
              : "Focus"}
          </p>
        </div>

        {/* Circular timer */}
        <div
          className={cn(
            "rounded-full p-4 relative",
            getModeColors().background
          )}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 250 250"
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="125"
              cy="125"
              r={radius}
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress circle */}
            <circle
              cx="125"
              cy="125"
              r={radius}
              className={cn(
                getModeColors().stroke,
                "transition-all duration-1000 ease-linear"
              )}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex items-center justify-center text-center mb-6 ">
            <p className="text-6xl font-light text-white tabular-nums tracking-tight">
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>

        {/* Play/pause button */}
        <div className="flex justify-center">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={cn(
              "w-12 h-12 rounded-full bg-gradient-to-r shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center",
              getModeColors().background
            )}
          >
            {isRunning ? (
              <Pause className="w-8 h-8 text-white" fill="white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex justify-center mt-4">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isRunning ? "bg-green-400 animate-pulse" : "bg-gray-400"
            )}
          />
        </div>
      </div>
    </div>
  );
}
