"use client";

import { useState } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Settings } from "lucide-react";

interface SettingsItemProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function SettingsItem({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: SettingsItemProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
          {label}: {value} minutes
        </Label>
      </div>
      <input
        id={label.toLowerCase().replace(/\s+/g, "-")}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{min} min</span>
        <span>{max} min</span>
      </div>
    </div>
  );
}

export function TimerSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
    isAutoStartEnabled,
    updateSettings,
    toggleAutoStart,
  } = useTimerStore();

  const handleSettingsChange = (key: string, value: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateSettings({ [key]: value } as any);
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Settings className="h-5 w-5 mr-2" />
        <span>{isOpen ? "Hide Settings" : "Show Settings"}</span>
      </button>

      {isOpen && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Timer Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsItem
              label="Focus Duration"
              value={focusDuration}
              min={1}
              max={60}
              step={1}
              onChange={(value) => handleSettingsChange("focusDuration", value)}
            />

            <SettingsItem
              label="Short Break"
              value={shortBreakDuration}
              min={1}
              max={30}
              step={1}
              onChange={(value) =>
                handleSettingsChange("shortBreakDuration", value)
              }
            />

            <SettingsItem
              label="Long Break"
              value={longBreakDuration}
              min={5}
              max={60}
              step={5}
              onChange={(value) =>
                handleSettingsChange("longBreakDuration", value)
              }
            />

            <SettingsItem
              label="Sessions Before Long Break"
              value={sessionsBeforeLongBreak}
              min={1}
              max={10}
              step={1}
              onChange={(value) =>
                handleSettingsChange("sessionsBeforeLongBreak", value)
              }
            />

            <div className="mt-6">
              <Switch
                checked={isAutoStartEnabled}
                onChange={toggleAutoStart}
                label="Auto-start Timers"
                description="Automatically start the next timer when the current one ends"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
