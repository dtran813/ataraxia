"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useTimerStore } from "@/store/useTimerStore";

export function useTimer() {
  const { isRunning, tick, mode, timeRemaining, setOnTimerComplete } =
    useTimerStore();

  const timerCompleteSoundRef = useRef<Howl | null>(null);
  const tickSoundRef = useRef<Howl | null>(null);

  // Load sounds on first render
  useEffect(() => {
    // Timer complete sound
    timerCompleteSoundRef.current = new Howl({
      src: ["/sounds/timer-complete.mp3"],
      volume: 0.8,
    });

    // Tick sound (for last 3 seconds)
    tickSoundRef.current = new Howl({
      src: ["/sounds/tick.mp3"],
      volume: 0.8,
    });

    return () => {
      if (timerCompleteSoundRef.current) {
        timerCompleteSoundRef.current.unload();
      }
      if (tickSoundRef.current) {
        tickSoundRef.current.unload();
      }
    };
  }, []);

  // Set up timer interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, tick]);

  // Play tick sound in last few seconds
  useEffect(() => {
    if (isRunning && timeRemaining <= 3 && timeRemaining > 0) {
      tickSoundRef.current?.play();
    }
  }, [timeRemaining, isRunning]);

  // Set up timer completion callback
  useEffect(() => {
    const handleTimerComplete = () => {
      timerCompleteSoundRef.current?.play();

      // Show notification
      if (Notification.permission === "granted") {
        new Notification(
          `${mode === "focus" ? "Focus session" : "Break"} completed!`,
          {
            body:
              mode === "focus"
                ? "Time for a break!"
                : "Time to get back to work!",
          }
        );
      }
    };

    setOnTimerComplete(handleTimerComplete);
  }, [mode, setOnTimerComplete]);

  // Request notification permission
  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);
}
