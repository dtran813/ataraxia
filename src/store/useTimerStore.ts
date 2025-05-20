// src/store/useTimerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Timer modes
export type TimerMode = "focus" | "shortBreak" | "longBreak";

interface TimerState {
  // Current state
  mode: TimerMode;
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isAutoStartEnabled: boolean;

  // Settings
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  sessionsBeforeLongBreak: number;

  // Session tracking
  completedSessions: number;
  totalFocusTime: number; // in seconds
  totalBreakTime: number; // in seconds

  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
  toggleAutoStart: () => void;
}

interface TimerSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      // Initial state
      mode: "focus",
      timeRemaining: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      isAutoStartEnabled: false,

      // Default settings
      focusDuration: 25, // 25 minutes
      shortBreakDuration: 5, // 5 minutes
      longBreakDuration: 15, // 15 minutes
      sessionsBeforeLongBreak: 4,

      // Initial tracking
      completedSessions: 0,
      totalFocusTime: 0,
      totalBreakTime: 0,

      // Actions
      startTimer: () => set({ isRunning: true }),

      pauseTimer: () => set({ isRunning: false }),

      resetTimer: () => {
        const { mode, focusDuration, shortBreakDuration, longBreakDuration } =
          get();
        let newTimeRemaining;

        switch (mode) {
          case "focus":
            newTimeRemaining = focusDuration * 60;
            break;
          case "shortBreak":
            newTimeRemaining = shortBreakDuration * 60;
            break;
          case "longBreak":
            newTimeRemaining = longBreakDuration * 60;
            break;
        }

        set({
          timeRemaining: newTimeRemaining,
          isRunning: false,
        });
      },

      skipTimer: () => {
        const {
          mode,
          completedSessions,
          sessionsBeforeLongBreak,
          focusDuration,
          shortBreakDuration,
          longBreakDuration,
          isAutoStartEnabled,
        } = get();

        // Determine the next mode and time
        let nextMode: TimerMode;
        let nextTimeRemaining: number;
        let newCompletedSessions = completedSessions;

        if (mode === "focus") {
          // After focus, go to break (short or long)
          newCompletedSessions = completedSessions + 1;

          if (newCompletedSessions % sessionsBeforeLongBreak === 0) {
            nextMode = "longBreak";
            nextTimeRemaining = longBreakDuration * 60;
          } else {
            nextMode = "shortBreak";
            nextTimeRemaining = shortBreakDuration * 60;
          }
        } else {
          // After any break, go back to focus
          nextMode = "focus";
          nextTimeRemaining = focusDuration * 60;
        }

        set({
          mode: nextMode,
          timeRemaining: nextTimeRemaining,
          completedSessions: newCompletedSessions,
          isRunning: isAutoStartEnabled, // Auto-start if enabled
        });
      },

      tick: () => {
        const {
          timeRemaining,
          isRunning,
          mode,
          totalFocusTime,
          totalBreakTime,
        } = get();

        if (!isRunning || timeRemaining <= 0) return;

        const newTimeRemaining = timeRemaining - 1;

        // Update total time tracking
        if (mode === "focus") {
          set({ totalFocusTime: totalFocusTime + 1 });
        } else {
          set({ totalBreakTime: totalBreakTime + 1 });
        }

        // If timer completed, handle the transition
        if (newTimeRemaining <= 0) {
          get().skipTimer();
        } else {
          set({ timeRemaining: newTimeRemaining });
        }
      },

      setMode: (mode: TimerMode) => {
        const { focusDuration, shortBreakDuration, longBreakDuration } = get();
        let newTimeRemaining;

        switch (mode) {
          case "focus":
            newTimeRemaining = focusDuration * 60;
            break;
          case "shortBreak":
            newTimeRemaining = shortBreakDuration * 60;
            break;
          case "longBreak":
            newTimeRemaining = longBreakDuration * 60;
            break;
        }

        set({
          mode,
          timeRemaining: newTimeRemaining,
          isRunning: false,
        });
      },

      updateSettings: (settings: Partial<TimerSettings>) => {
        const { mode } = get();
        let newTimeRemaining = get().timeRemaining;

        // If updating the duration of the current mode, also update the time remaining
        if (settings.focusDuration && mode === "focus") {
          newTimeRemaining = settings.focusDuration * 60;
        } else if (settings.shortBreakDuration && mode === "shortBreak") {
          newTimeRemaining = settings.shortBreakDuration * 60;
        } else if (settings.longBreakDuration && mode === "longBreak") {
          newTimeRemaining = settings.longBreakDuration * 60;
        }

        set({
          ...settings,
          timeRemaining: newTimeRemaining,
          isRunning: false,
        });
      },

      toggleAutoStart: () =>
        set((state) => ({ isAutoStartEnabled: !state.isAutoStartEnabled })),
    }),
    {
      name: "ataraxia-timer-storage", // Local storage key
      partialize: (state) => ({
        // Only persist settings and stats, not the current timer state
        focusDuration: state.focusDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        sessionsBeforeLongBreak: state.sessionsBeforeLongBreak,
        isAutoStartEnabled: state.isAutoStartEnabled,
        completedSessions: state.completedSessions,
        totalFocusTime: state.totalFocusTime,
        totalBreakTime: state.totalBreakTime,
      }),
    }
  )
);
