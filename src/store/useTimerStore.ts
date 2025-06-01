// src/store/useTimerStore.ts
import { SECONDS_IN_MINUTE } from "@/lib/constants";
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
  onTimerComplete?: () => void; // Callback for timer completion
  setOnTimerComplete: (callback: () => void) => void;
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
      timeRemaining: 25 * SECONDS_IN_MINUTE, // 25 minutes in seconds
      isRunning: false,
      isAutoStartEnabled: true, // Auto-start next timer by default

      // Default settings
      focusDuration: 25, // 25 minutes
      shortBreakDuration: 5, // 5 minutes
      longBreakDuration: 15, // 15 minutes
      sessionsBeforeLongBreak: 4,

      // Initial tracking
      completedSessions: 0,
      totalFocusTime: 0,
      totalBreakTime: 0,
      onTimerComplete: undefined,

      // Actions
      startTimer: () => set({ isRunning: true }),

      pauseTimer: () => set({ isRunning: false }),

      resetTimer: () => {
        const { mode, focusDuration, shortBreakDuration, longBreakDuration } =
          get();
        let newTimeRemaining;

        switch (mode) {
          case "focus":
            newTimeRemaining = focusDuration * SECONDS_IN_MINUTE;
            break;
          case "shortBreak":
            newTimeRemaining = shortBreakDuration * SECONDS_IN_MINUTE;
            break;
          case "longBreak":
            newTimeRemaining = longBreakDuration * SECONDS_IN_MINUTE;
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
            nextTimeRemaining = longBreakDuration * SECONDS_IN_MINUTE;
          } else {
            nextMode = "shortBreak";
            nextTimeRemaining = shortBreakDuration * SECONDS_IN_MINUTE;
          }
        } else {
          // After any break, go back to focus
          nextMode = "focus";
          nextTimeRemaining = focusDuration * SECONDS_IN_MINUTE;
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
          onTimerComplete,
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
          // Call the completion callback BEFORE transitioning
          onTimerComplete?.();
          get().skipTimer();
        } else {
          set({ timeRemaining: newTimeRemaining });
        }
      },

      setOnTimerComplete: (callback: () => void) => {
        set({ onTimerComplete: callback });
      },

      setMode: (mode: TimerMode) => {
        const { focusDuration, shortBreakDuration, longBreakDuration } = get();
        let newTimeRemaining;

        switch (mode) {
          case "focus":
            newTimeRemaining = focusDuration * SECONDS_IN_MINUTE;
            break;
          case "shortBreak":
            newTimeRemaining = shortBreakDuration * SECONDS_IN_MINUTE;
            break;
          case "longBreak":
            newTimeRemaining = longBreakDuration * SECONDS_IN_MINUTE;
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
          newTimeRemaining = settings.focusDuration * SECONDS_IN_MINUTE;
        } else if (settings.shortBreakDuration && mode === "shortBreak") {
          newTimeRemaining = settings.shortBreakDuration * SECONDS_IN_MINUTE;
        } else if (settings.longBreakDuration && mode === "longBreak") {
          newTimeRemaining = settings.longBreakDuration * SECONDS_IN_MINUTE;
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

      // Initialize timeRemaining based on the current mode and settings
      onRehydrateStorage: () => (state) => {
        if (state) {
          const duration = (() => {
            switch (state.mode) {
              case "focus":
                return state.focusDuration;
              case "shortBreak":
                return state.shortBreakDuration;
              case "longBreak":
                return state.longBreakDuration;
              default:
                return state.focusDuration;
            }
          })();

          state.timeRemaining = duration * SECONDS_IN_MINUTE;
          state.isRunning = false; // Always start paused after refresh
        }
      },
    }
  )
);
