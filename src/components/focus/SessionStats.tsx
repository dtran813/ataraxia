"use client";

import { useTimerStore } from "@/store/useTimerStore";
import { formatTimeVerbose } from "@/lib/utils/time";
import { X, Clock, Target, BarChart3 } from "lucide-react";

interface SessionStatsProps {
  onClose: () => void;
}

export function SessionStats({ onClose }: SessionStatsProps) {
  const { completedSessions, totalFocusTime, totalBreakTime } = useTimerStore();

  const stats = [
    {
      icon: Clock,
      label: "Sessions Today",
      value: completedSessions.toString(),
      color: "text-blue-500",
    },
    {
      icon: Target,
      label: "Focus Time",
      value: formatTimeVerbose(totalFocusTime),
      color: "text-green-500",
    },
    {
      icon: BarChart3,
      label: "Break Time",
      value: formatTimeVerbose(totalBreakTime),
      color: "text-purple-500",
    },
  ];

  return (
    <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 w-96 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-medium">
          Session Stats
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-xl flex items-center justify-center">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-gray-500 dark:text-white/60 text-sm">
                  {stat.label}
                </div>
                <div className="text-gray-900 dark:text-white text-lg font-medium">
                  {stat.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
