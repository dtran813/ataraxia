"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";

export function useAudioPlayer() {
  const {
    currentEnvironmentId,
    getCurrentEnvironment,
    isAudioPaused,
    masterVolume,
    trackVolumes,
  } = useEnvironmentStore();

  // Store Howl instances for each track
  const audioTracksRef = useRef<Record<string, Howl>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load audio tracks whenever the environment changes
  useEffect(() => {
    console.log("useAudioPlayer effect triggered");
    const currentEnvironment = getCurrentEnvironment();
    console.log(
      "Loading audio tracks for environment:",
      currentEnvironment?.id
    );
    if (!currentEnvironment) {
      setIsLoaded(false);
      return;
    }

    const tracks = currentEnvironment.audioTracks;

    // Stop and unload any existing tracks
    Object.values(audioTracksRef.current).forEach((howl) => {
      howl.stop();
      howl.unload();
    });

    audioTracksRef.current = {};
    setIsLoaded(false);

    // If no tracks, mark as loaded
    if (tracks.length === 0) {
      setIsLoaded(true);
      return;
    }

    // Load new tracks
    let loadedCount = 0;

    tracks.forEach((track) => {
      const howl = new Howl({
        src: [track.url],
        loop: true,
        volume: 0, // Start with volume at 0, will adjust in another effect
        onload: () => {
          loadedCount++;
          if (loadedCount === tracks.length) {
            setIsLoaded(true);
          }
        },
        onloaderror: (id, error) => {
          console.error(`Error loading audio track ${track.name}:`, error);
          // Still count as loaded to prevent blocking
          loadedCount++;
          if (loadedCount === tracks.length) {
            setIsLoaded(true);
          }
        },
      });

      audioTracksRef.current[track.id] = howl;
    });

    return () => {
      Object.values(audioTracksRef.current).forEach((howl) => {
        howl.stop();
        howl.unload();
      });
      audioTracksRef.current = {};
    };
  }, [currentEnvironmentId, getCurrentEnvironment]);

  // Update volumes and play/pause based on mute state
  useEffect(() => {
    if (!isLoaded) return;

    const currentEnvironment = getCurrentEnvironment();
    if (!currentEnvironment) return;

    currentEnvironment.audioTracks.forEach((track) => {
      const howl = audioTracksRef.current[track.id];
      if (!howl) return;

      const trackVolume = trackVolumes[track.id] ?? track.defaultVolume;

      const effectiveVolume = isAudioPaused
        ? 0
        : (masterVolume / 100) * (trackVolume / 100);

      howl.volume(effectiveVolume);

      if (isAudioPaused) {
        if (howl.playing()) {
          howl.pause();
        }
      } else {
        if (!howl.playing()) {
          howl.play();
        }
      }
    });
  }, [
    isLoaded,
    currentEnvironmentId,
    getCurrentEnvironment,
    isAudioPaused,
    masterVolume,
    trackVolumes,
  ]);

  return {
    isLoaded,
    tracks: getCurrentEnvironment()?.audioTracks || [],
  };
}
