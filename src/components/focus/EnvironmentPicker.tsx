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
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-white hover:bg-black/50 transition-all duration-200"
        >
          <Palette className="w-6 h-6" />
        </button>
      </div>

      {/* Audio Controls Button */}
      <div className="absolute top-8 right-8">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAudioControls(!showAudioControls)}
            className={cn(
              "bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 transition-all duration-200",
              showAudioControls ? "bg-white/10" : "hover:bg-black/50"
            )}
          >
            {isAudioPaused ? (
              <VolumeX className="w-6 h-6 text-white/70" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={toggleAudio}
            disabled={!isLoaded}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-white hover:bg-black/50 transition-all duration-200 disabled:opacity-50"
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
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-medium mb-4">
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
                      ? "border-white shadow-lg"
                      : "border-white/20 hover:border-white/40"
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

                  <div className="absolute inset-0 bg-black/30 flex items-end">
                    <div className="p-3 w-full">
                      <div className="text-white text-sm font-medium truncate">
                        {env.name}
                      </div>
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
        <div className="absolute top-24 right-8 w-80">
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-medium mb-4">
              Audio Controls
            </h3>

            {/* Master Volume */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Master Volume</span>
                <span className="text-white text-sm">{masterVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => setMasterVolume(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                disabled={isAudioPaused}
              />
            </div>

            {/* Individual Tracks */}
            {tracks.length > 0 && (
              <div className="space-y-4">
                <div className="text-white/80 text-sm">Individual Tracks</div>
                {tracks.map((track) => (
                  <div key={track.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs">
                        {track.name}
                      </span>
                      <span className="text-white/70 text-xs">
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
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      disabled={isAudioPaused}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Status */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Status</span>
                <span
                  className={cn(
                    "font-medium",
                    isAudioPaused ? "text-red-400" : "text-green-400"
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
