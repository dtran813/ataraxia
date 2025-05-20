"use client";

import { formatTime, calculateProgress } from "@/lib/utils/time";
import { cn } from "@/lib/utils";

interface CircularTimerProps {
  timeRemaining: number;
  totalTime: number;
  mode: "focus" | "shortBreak" | "longBreak";
  className?: string;
}

export function CircularTimer({
  timeRemaining,
  totalTime,
  mode,
  className,
}: CircularTimerProps) {
  // Calculate circle attributes
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = calculateProgress(timeRemaining, totalTime);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Colors based on mode
  const modeColors = {
    focus: {
      text: "text-primary-700 dark:text-primary-300",
      stroke: "stroke-primary-500",
      background: "bg-primary-50 dark:bg-primary-900/20",
    },
    shortBreak: {
      text: "text-green-700 dark:text-green-300",
      stroke: "stroke-green-500",
      background: "bg-green-50 dark:bg-green-900/20",
    },
    longBreak: {
      text: "text-blue-700 dark:text-blue-300",
      stroke: "stroke-blue-500",
      background: "bg-blue-50 dark:bg-blue-900/20",
    },
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className={cn("rounded-full p-4", modeColors[mode].background)}>
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="16"
            fill="none"
          />

          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className={cn(
              modeColors[mode].stroke,
              "transition-all duration-1000 ease-linear"
            )}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className={cn("text-6xl font-bold", modeColors[mode].text)}>
              {formatTime(timeRemaining)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
              {mode === "focus"
                ? "Focus Time"
                : mode === "shortBreak"
                ? "Short Break"
                : "Long Break"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
