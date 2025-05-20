"use client";

import { Button } from "@/components/ui/Button";
import { useTimerStore } from "@/store/useTimerStore";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

export function TimerControls() {
  const { isRunning, startTimer, pauseTimer, resetTimer, skipTimer } =
    useTimerStore();

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      {/* Reset Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={resetTimer}
        aria-label="Reset timer"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      {/* Start/Pause Button */}
      <Button
        size="lg"
        onClick={isRunning ? pauseTimer : startTimer}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
        className="px-8"
      >
        {isRunning ? (
          <>
            <Pause className="h-5 w-5 mr-2" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5 mr-2" />
            <span>Start</span>
          </>
        )}
      </Button>

      {/* Skip Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={skipTimer}
        aria-label="Skip to next timer"
      >
        <SkipForward className="h-5 w-5" />
      </Button>
    </div>
  );
}
