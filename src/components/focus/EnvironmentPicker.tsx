"use client";

import { useState } from "react";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Image from "next/image";
import { Volume2, VolumeX, Play, Pause, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export function EnvironmentPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);

  const {
    environments,
    currentEnvironmentId,
    setCurrentEnvironment,
    isAudioPaused,
    setIsAudioPaused,
    masterVolume,
    setMasterVolume,
    trackVolumes,
    setTrackVolume,
  } = useEnvironmentStore();

  const { isLoaded, tracks } = useAudioPlayer();

  const toggleAudio = () => {
    setIsAudioPaused(!isAudioPaused);
  };

  return (
    <>
      {/* Environment Toggle Button */}
      <div className="absolute top-8 left-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white/90 dark:hover:bg-black/50 transition-all duration-200 shadow-lg"
        >
          <Palette className="w-6 h-6" />
        </button>
      </div>

      {/* Audio Controls Button */}
      <div className="absolute top-8 right-25.5">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAudioControls(!showAudioControls)}
            className={cn(
              "bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-white/10 transition-all duration-200 shadow-lg",
              showAudioControls
                ? "bg-primary-100 dark:bg-white/10 text-primary-600 dark:text-white"
                : "text-gray-700 dark:text-white hover:bg-white/90 dark:hover:bg-black/50"
            )}
          >
            {isAudioPaused ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleAudio}
            disabled={!isLoaded}
            className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white/90 dark:hover:bg-black/50 transition-all duration-200 disabled:opacity-50 shadow-lg"
          >
            {isAudioPaused ? (
              <Play className="w-6 h-6" />
            ) : (
              <Pause className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Environment Picker Panel */}
      {isOpen && (
        <div className="absolute top-24 left-8 w-80">
          <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 shadow-2xl">
            <h3 className="text-gray-900 dark:text-white text-lg font-medium mb-4">
              Choose Environment
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {environments.map((env) => (
                <button
                  key={env.id}
                  onClick={() => {
                    setCurrentEnvironment(env.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "relative h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105",
                    currentEnvironmentId === env.id
                      ? "border-primary-500 dark:border-white shadow-lg"
                      : "border-gray-200 dark:border-white/20 hover:border-primary-300 dark:hover:border-white/40"
                  )}
                >
                  {env.backgroundType === "image" ? (
                    <Image
                      src={env.background}
                      alt={env.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: env.background }}
                    />
                  )}

                  <div className="absolute inset-0 bg-black/30 dark:bg-black/40 flex items-end">
                    <div className="p-3 w-full">
                      <p className="text-white text-sm font-medium truncate">
                        {env.name}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audio Controls Panel */}
      {showAudioControls && (
        <div className="absolute top-24 right-20 w-80">
          <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 shadow-2xl">
            <h3 className="text-gray-900 dark:text-white text-lg font-medium mb-4">
              Audio Controls
            </h3>

            {/* Master Volume */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-white/80 text-sm">
                  Master Volume
                </span>
                <span className="text-gray-900 dark:text-white text-sm">
                  {masterVolume}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => setMasterVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-white/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Individual Tracks */}
            {tracks.length > 0 && (
              <div className="space-y-4">
                <div className="text-gray-600 dark:text-white/80 text-sm">
                  Individual Tracks
                </div>
                {tracks.map((track) => (
                  <div key={track.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 dark:text-white/70 text-xs">
                        {track.name}
                      </span>
                      <span className="text-gray-500 dark:text-white/70 text-xs">
                        {trackVolumes[track.id] ?? track.defaultVolume}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={trackVolumes[track.id] ?? track.defaultVolume}
                      onChange={(e) =>
                        setTrackVolume(track.id, Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-white/20 rounded-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Status */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-white/60">Status</span>
                <span
                  className={cn(
                    "font-medium",
                    isAudioPaused ? "text-red-500" : "text-green-500"
                  )}
                >
                  {isAudioPaused ? "Paused" : "Playing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
