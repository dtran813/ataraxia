"use client";

import { useState } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { RotateCcw, SkipForward, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerSettings } from "./TimerSettings";
import { SessionStats } from "./SessionStats";

export function ControlPanel() {
  const [activePanel, setActivePanel] = useState<"settings" | "stats" | null>(
    null
  );
  const { resetTimer, skipTimer } = useTimerStore();

  const controls = [
    {
      id: "reset",
      icon: RotateCcw,
      label: "Reset",
      action: resetTimer,
    },
    {
      id: "skip",
      icon: SkipForward,
      label: "Skip",
      action: skipTimer,
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      action: () =>
        setActivePanel(activePanel === "settings" ? null : "settings"),
    },
    {
      id: "stats",
      icon: BarChart3,
      label: "Stats",
      action: () => setActivePanel(activePanel === "stats" ? null : "stats"),
    },
  ];

  return (
    <>
      {/* Control Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex items-center space-x-6">
            {controls.map((control) => {
              const Icon = control.icon;
              const isActive = activePanel === control.id;

              return (
                <button
                  key={control.id}
                  onClick={control.action}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                  title={control.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expandable Panels */}
      {activePanel === "settings" && (
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
          <TimerSettings onClose={() => setActivePanel(null)} />
        </div>
      )}

      {activePanel === "stats" && (
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
          <SessionStats onClose={() => setActivePanel(null)} />
        </div>
      )}
    </>
  );
}
