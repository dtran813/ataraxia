import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Environment } from "@/types";
import { defaultEnvironments } from "@/data/environment";

interface EnvironmentState {
  // Cuurent environment state
  currentEnvironmentId: string | null;
  isAudioPaused: boolean;
  masterVolume: number; // 0-100
  trackVolumes: Record<string, number>; // Track ID -> Volume (0-100)

  // Environment data
  environments: Environment[];
  userEnvironments: Environment[];

  // Actions
  setCurrentEnvironment: (environmentId: string) => void;
  setIsAudioPaused: (isMuted: boolean) => void;
  setMasterVolume: (volume: number) => void;
  setTrackVolume: (trackId: string, volume: number) => void;
  addEnvironment: (environment: Environment) => void;
  updateEnvironment: (
    environmentId: string,
    updates: Partial<Environment>
  ) => void;
  deleteEnvironment: (environmentId: string) => void;
  getCurrentEnvironment: () => Environment | null;
}

export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set, get) => ({
      currentEnvironmentId: "forest",
      isAudioPaused: true,
      masterVolume: 80,
      trackVolumes: {},
      environments: defaultEnvironments,
      userEnvironments: [],

      setCurrentEnvironment: (environmentId: string) => {
        set({ currentEnvironmentId: environmentId });
      },

      setIsAudioPaused: (muted: boolean) => {
        set({ isAudioPaused: muted });
      },

      setMasterVolume: (volume: number) => {
        const newVolume = Math.max(0, Math.min(100, volume));
        set({ masterVolume: newVolume });
      },

      setTrackVolume: (trackId: string, volume: number) => {
        const newVolume = Math.max(0, Math.min(100, volume));
        set((state) => ({
          trackVolumes: {
            ...state.trackVolumes,
            [trackId]: newVolume,
          },
        }));
      },

      addEnvironment: (environment: Environment) => {
        set((state) => ({
          userEnvironments: [...state.userEnvironments, environment],
          // Also add to main environments array for easy access
          environments: [...state.environments, environment],
        }));
      },

      updateEnvironment: (
        environmentId: string,
        updates: Partial<Environment>
      ) => {
        set((state) => ({
          userEnvironments: state.userEnvironments.map((env) =>
            env.id === environmentId ? { ...env, ...updates } : env
          ),
          environments: state.environments.map((env) =>
            env.id === environmentId ? { ...env, ...updates } : env
          ),
        }));
      },

      deleteEnvironment: (environmentId: string) => {
        set((state) => ({
          userEnvironments: state.userEnvironments.filter(
            (env) => env.id !== environmentId
          ),
          environments: state.environments.filter(
            (env) => env.id !== environmentId
          ),
          // If deleting current environment, reset to default
          currentEnvironmentId:
            state.currentEnvironmentId === environmentId
              ? "forest"
              : state.currentEnvironmentId,
        }));
      },

      getCurrentEnvironment: () => {
        const { currentEnvironmentId, environments } = get();
        if (!currentEnvironmentId) return null;

        return (
          environments.find((env) => env.id === currentEnvironmentId) || null
        );
      },
    }),
    {
      name: "ataraxia-environment-storage",
      partialize: (state) => ({
        currentEnvironmentId: state.currentEnvironmentId,
        isAudioPaused: state.isAudioPaused,
        masterVolume: state.masterVolume,
        trackVolumes: state.trackVolumes,
        userEnvironments: state.userEnvironments,
      }),
      // Merge user environments back into main environments on load
      onRehydrateStorage: () => (state) => {
        if (state && state.userEnvironments) {
          state.environments = [
            ...defaultEnvironments,
            ...state.userEnvironments,
          ];
        }
      },
    }
  )
);
