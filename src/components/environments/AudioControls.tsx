"use client";

import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function AudioControls() {
  const {
    isAudioMuted,
    setIsAudioMuted,
    masterVolume,
    setMasterVolume,
    trackVolumes,
    setTrackVolume,
  } = useEnvironmentStore();

  const { isLoaded, tracks } = useAudioPlayer();

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        {/* Master volume control */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Label>Master Volume</Label>
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              aria-label={isAudioMuted ? "Unmute" : "Mute"}
            >
              {isAudioMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(Number(e.target.value))}
            className={cn(
              "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer",
              isAudioMuted && "opacity-50"
            )}
            disabled={isAudioMuted}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span>{masterVolume}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Individual track controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Audio Tracks</h3>

          {!isLoaded ? (
            <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
              Loading audio tracks...
            </div>
          ) : tracks.length === 0 ? (
            <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
              No audio tracks available for this environment.
            </div>
          ) : (
            tracks.map((track) => (
              <div key={track.id} className="space-y-1">
                <Label className="text-xs">{track.name}</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={trackVolumes[track.id] ?? track.defaultVolume}
                  onChange={(e) =>
                    setTrackVolume(track.id, Number(e.target.value))
                  }
                  className={cn(
                    "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer",
                    isAudioMuted && "opacity-50"
                  )}
                  disabled={isAudioMuted}
                />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
