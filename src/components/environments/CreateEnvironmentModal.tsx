"use client";

import React, { useState } from "react";
import { X, Play, Pause, Volume2, Tag, Plus } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { FormError } from "@/components/ui/FormError";
import { cn } from "@/lib/utils";
import {
  availableBackgrounds,
  availableAudioTracks,
  predefinedColors,
} from "@/data/assets";
import { Environment } from "@/types";
import Image from "next/image";

interface CreateEnvironmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (environment: Environment) => void;
}

export default function CreateEnvironmentModal({
  isOpen,
  onClose,
  onSave,
}: CreateEnvironmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    backgroundType: "image" as "image" | "color",
    backgroundImage: "",
    backgroundColor: "#f8f9fa",
    selectedTracks: [] as string[],
    trackVolumes: {} as Record<string, number>,
    tags: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<
    Record<string, HTMLAudioElement>
  >({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Environment name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Environment name must be at least 3 characters";
    } else if (formData.name.length > 50) {
      newErrors.name = "Environment name must be less than 50 characters";
    }

    if (formData.description.length > 200) {
      newErrors.description = "Description must be less than 200 characters";
    }

    if (formData.backgroundType === "image" && !formData.backgroundImage) {
      newErrors.background = "Please select a background image";
    }

    if (formData.selectedTracks.length > 5) {
      newErrors.tracks = "Maximum 5 audio tracks allowed";
    }

    if (formData.tags.length > 5) {
      newErrors.tags = "Maximum 5 tags allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Audio preview handling
  const toggleAudioPreview = (trackId: string, url: string) => {
    if (currentlyPlaying === trackId) {
      // Stop current audio
      if (audioElements[trackId]) {
        audioElements[trackId].pause();
        audioElements[trackId].currentTime = 0;
      }
      setCurrentlyPlaying(null);
    } else {
      // Stop any currently playing audio
      if (currentlyPlaying && audioElements[currentlyPlaying]) {
        audioElements[currentlyPlaying].pause();
        audioElements[currentlyPlaying].currentTime = 0;
      }

      // Start new audio
      if (!audioElements[trackId]) {
        const audio = new Audio(url);
        audio.loop = true;
        audio.volume = 0.3;
        audio.onended = () => setCurrentlyPlaying(null);
        setAudioElements((prev) => ({ ...prev, [trackId]: audio }));
        audio.play().catch(console.error);
      } else {
        audioElements[trackId].play().catch(console.error);
      }
      setCurrentlyPlaying(trackId);
    }
  };

  // Track selection handling
  const toggleTrack = (trackId: string) => {
    const isSelected = formData.selectedTracks.includes(trackId);

    if (isSelected) {
      setFormData((prev) => {
        const newTrackVolumes = { ...prev.trackVolumes };
        delete newTrackVolumes[trackId]; // Remove the key entirely instead of setting to undefined

        return {
          ...prev,
          selectedTracks: prev.selectedTracks.filter((id) => id !== trackId),
          trackVolumes: newTrackVolumes,
        };
      });
    } else if (formData.selectedTracks.length < 5) {
      const track = availableAudioTracks.find((t) => t.id === trackId);
      setFormData((prev) => ({
        ...prev,
        selectedTracks: [...prev.selectedTracks, trackId],
        trackVolumes: {
          ...prev.trackVolumes,
          [trackId]: track?.defaultVolume || 50,
        },
      }));
    }
  };

  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (
      tag &&
      !formData.tags.includes(tag) &&
      formData.tags.length < 5 &&
      tag.length <= 20
    ) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const environment = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      backgroundType: formData.backgroundType,
      background:
        formData.backgroundType === "image"
          ? formData.backgroundImage
          : formData.backgroundColor,
      audioTracks: availableAudioTracks
        .filter((track) => formData.selectedTracks.includes(track.id))
        .map((track) => ({
          ...track,
          defaultVolume: formData.trackVolumes[track.id] || track.defaultVolume,
        })),
      tags: formData.tags,
      isFeatured: false,
      createdBy: "user",
      createdAt: new Date(),
    };

    onSave(environment);
    handleClose();
  };

  const handleClose = () => {
    // Stop any playing audio
    if (currentlyPlaying && audioElements[currentlyPlaying]) {
      audioElements[currentlyPlaying].pause();
      audioElements[currentlyPlaying].currentTime = 0;
    }
    setCurrentlyPlaying(null);

    // Reset form
    setFormData({
      name: "",
      description: "",
      backgroundType: "image",
      backgroundImage: "",
      backgroundColor: "#f8f9fa",
      selectedTracks: [],
      trackVolumes: {},
      tags: [],
    });
    setErrors({});
    setNewTag("");
    onClose();
  };

  const backgroundTabs = [
    {
      label: "Images",
      content: (
        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1 custom-scrollbar">
          {availableBackgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  backgroundType: "image",
                  backgroundImage: bg.url,
                }))
              }
              className={cn(
                "relative rounded-lg overflow-hidden border-2 transition-all aspect-video cursor-pointer",
                formData.backgroundType === "image" &&
                  formData.backgroundImage === bg.url
                  ? "border-primary-500 ring-2 ring-primary-200"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Image
                src={bg.url}
                alt={bg.name}
                fill
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Colors",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    backgroundType: "color",
                    backgroundColor: color,
                  }))
                }
                className={cn(
                  "w-8 h-8 rounded-lg border-2 transition-all",
                  formData.backgroundType === "color" &&
                    formData.backgroundColor === color
                    ? "border-primary-500 ring-2 ring-primary-200"
                    : "border-gray-300 hover:border-gray-400"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Label className="text-sm mb-2 block">Custom Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    backgroundColor: e.target.value,
                    backgroundType: "color",
                  }))
                }
                className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={formData.backgroundColor}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    backgroundColor: e.target.value,
                    backgroundType: "color",
                  }))
                }
                placeholder="#000000"
                className="font-mono text-sm"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      showCloseButton={false}
      onClose={handleClose}
      className="max-w-4xl"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Environment
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto px-4 custom-scrollbar">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Environment Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter environment name"
                maxLength={50}
              />
              <FormError message={errors.name} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your environment"
                maxLength={200}
              />
              <FormError message={errors.description} />
            </div>
          </div>

          {/* Background Selection */}
          <div>
            <Label>Background</Label>
            <div className="mt-2">
              <Tabs items={backgroundTabs} />
            </div>
            <FormError message={errors.background} />
          </div>

          {/* Audio Tracks */}
          <div>
            <Label>Audio Tracks (Max 5)</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Select audio tracks for your environment. Click the play button to
              preview.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {availableAudioTracks.map((track) => {
                const isSelected = formData.selectedTracks.includes(track.id);
                const isPlaying = currentlyPlaying === track.id;

                return (
                  <Card
                    key={track.id}
                    className={cn(
                      "transition-all cursor-pointer",
                      isSelected &&
                        "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    )}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                            {track.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {track.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              toggleAudioPreview(track.id, track.url)
                            }
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            ) : (
                              <Play className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            )}
                          </button>

                          <button
                            onClick={() => toggleTrack(track.id)}
                            disabled={
                              !isSelected && formData.selectedTracks.length >= 5
                            }
                            className={cn(
                              "w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                              isSelected
                                ? "bg-primary-500 border-primary-500 text-white"
                                : "border-gray-300 hover:border-primary-300",
                              !isSelected &&
                                formData.selectedTracks.length >= 5 &&
                                "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {isSelected && <Volume2 className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-2">
                          <Label className="text-xs">
                            Volume: {formData.trackVolumes[track.id]}%
                          </Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={
                              formData.trackVolumes[track.id] ||
                              track.defaultVolume
                            }
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                trackVolumes: {
                                  ...prev.trackVolumes,
                                  [track.id]: Number(e.target.value),
                                },
                              }))
                            }
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <FormError message={errors.tracks} />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags (Max 5)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pb-1">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                maxLength={20}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                disabled={formData.tags.length >= 5}
              />
              <Button
                onClick={addTag}
                disabled={!newTag.trim() || formData.tags.length >= 5}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <FormError message={errors.tags} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 px-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Environment</Button>
        </div>
      </div>
    </Dialog>
  );
}
