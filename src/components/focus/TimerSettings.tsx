"use client";

import { useTimerStore } from "@/store/useTimerStore";
import { X } from "lucide-react";

interface TimerSettingsProps {
  onClose: () => void;
}

export function TimerSettings({ onClose }: TimerSettingsProps) {
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
    updateSettings,
  } = useTimerStore();

  const settings = [
    {
      label: "Focus Duration",
      value: focusDuration,
      min: 1,
      max: 60,
      step: 1,
      unit: "min",
      key: "focusDuration",
    },
    {
      label: "Short Break",
      value: shortBreakDuration,
      min: 1,
      max: 30,
      step: 1,
      unit: "min",
      key: "shortBreakDuration",
    },
    {
      label: "Long Break",
      value: longBreakDuration,
      min: 5,
      max: 60,
      step: 5,
      unit: "min",
      key: "longBreakDuration",
    },
    {
      label: "Sessions Before Long Break",
      value: sessionsBeforeLongBreak,
      min: 1,
      max: 10,
      step: 1,
      unit: "sessions",
      key: "sessionsBeforeLongBreak",
    },
  ];

  return (
    <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 w-96 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-medium">
          Timer Settings
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.key}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-white/80 text-sm">
                {setting.label}
              </span>
              <span className="text-gray-900 dark:text-white text-sm">
                {setting.value} {setting.unit}
              </span>
            </div>
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updateSettings({ [setting.key]: Number(e.target.value) } as any)
              }
              className="w-full h-2 bg-gray-200 dark:bg-white/20 rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
