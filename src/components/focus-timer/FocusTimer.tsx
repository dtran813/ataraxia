"use client";

import { useTimerStore } from "@/store/useTimerStore";
import { CircularTimer } from "./CircularTimer";
import { TimerControls } from "./TimerControls";
import { TimerSettings } from "./TimerSettings";
import { TimerStats } from "./TimerStats";
import { useTimer } from "@/hooks/useTimer";

export function FocusTimer() {
  const {
    mode,
    timeRemaining,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
  } = useTimerStore();

  // Use the timer hook for intervals and sounds
  useTimer();

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

  return (
    <div className="flex flex-col items-center">
      <CircularTimer
        timeRemaining={timeRemaining}
        totalTime={getTotalTime()}
        mode={mode}
        className="mb-8"
      />
      <TimerControls />
      <TimerSettings />
      <TimerStats />
    </div>
  );
}
