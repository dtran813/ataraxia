import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Environment } from "@/types";
import { defaultEnvironments } from "@/data/environment";

interface EnvironmentState {
  // Cuurent environment state
  currentEnvironmentId: string | null;
  isAudioMuted: boolean;
  masterVolume: number; // 0-100
  trackVolumes: Record<string, number>; // Track ID -> Volume (0-100)

  // Environment data
  environments: Environment[];

  // Actions
  setCurrentEnvironment: (environmentId: string) => void;
  setIsAudioMuted: (isMuted: boolean) => void;
  setMasterVolume: (volume: number) => void;
  setTrackVolume: (trackId: string, volume: number) => void;

  getCurrentEnvironment: () => Environment | null;
}

export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set, get) => ({
      currentEnvironmentId: "forest",
      isAudioMuted: false,
      masterVolume: 80,
      trackVolumes: {},
      environments: defaultEnvironments,

      setCurrentEnvironment: (environmentId: string) => {
        set({ currentEnvironmentId: environmentId });
      },

      setIsAudioMuted: (muted: boolean) => {
        set({ isAudioMuted: muted });
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
        isAudioMuted: state.isAudioMuted,
        masterVolume: state.masterVolume,
        trackVolumes: state.trackVolumes,
      }),
    }
  )
);
