export interface BackgroundAsset {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  category?: string;
}

export interface AudioTrackAsset {
  id: string;
  name: string;
  category: "ambient" | "music" | "nature" | "binaural";
  url: string;
  defaultVolume: number;
  description: string;
}

export const availableBackgrounds: BackgroundAsset[] = [
  {
    id: "forest",
    name: "Forest Retreat",
    url: "/images/environments/forest.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
    category: "nature",
  },
  {
    id: "cafe",
    name: "Coffee Shop",
    url: "/images/environments/cafe.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
    category: "indoor",
  },
  {
    id: "rain",
    name: "Rainy Day",
    url: "/images/environments/rain.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=300&h=200&fit=crop",
    category: "nature",
  },
  {
    id: "night-city",
    name: "Night City",
    url: "/images/environments/night-city.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=200&fit=crop",
    category: "urban",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    url: "/images/environments/ocean.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop",
    category: "nature",
  },
  {
    id: "library",
    name: "Quiet Library",
    url: "/images/environments/library.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    category: "indoor",
  },
  {
    id: "mountain",
    name: "Mountain Vista",
    url: "/images/environments/mountain.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    category: "nature",
  },
  {
    id: "workspace",
    name: "Minimal Workspace",
    url: "/images/environments/workspace.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    category: "indoor",
  },
  {
    id: "beach",
    name: "Peaceful Beach",
    url: "/images/environments/beach.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    category: "nature",
  },
  {
    id: "garden",
    name: "Japanese Garden",
    url: "/images/environments/garden.jpg",
    thumbnail:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop",
    category: "nature",
  },
];

export const availableAudioTracks: AudioTrackAsset[] = [
  // Nature sounds
  {
    id: "forest-birds",
    name: "Forest Birds",
    category: "nature",
    url: "/sounds/environments/forest-ambience.mp3",
    defaultVolume: 60,
    description: "Gentle chirping of forest birds",
  },
  {
    id: "water-flowing",
    name: "Water Flowing",
    category: "ambient",
    url: "/sounds/environments/rivers-streams-running.mp3",
    defaultVolume: 40,
    description: "Peaceful flowing water sounds",
  },
  {
    id: "rainfall",
    name: "Rainfall",
    category: "nature",
    url: "/sounds/environments/soft-rain-ambient.mp3",
    defaultVolume: 70,
    description: "Gentle rain on surfaces",
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    category: "nature",
    url: "/sounds/environments/ocean-waves.mp3",
    defaultVolume: 60,
    description: "Rolling ocean waves on shore",
  },
  {
    id: "wind-chimes",
    name: "Wind Chimes",
    category: "ambient",
    url: "/sounds/environments/wind-chimes.mp3",
    defaultVolume: 35,
    description: "Gentle wind chimes in breeze",
  },

  // Ambient sounds
  {
    id: "cafe-ambience",
    name: "Cafe Ambience",
    category: "ambient",
    url: "/sounds/environments/cofee-shop-ambience.mp3",
    defaultVolume: 30,
    description: "Busy coffee shop atmosphere",
  },
  {
    id: "white-noise",
    name: "White Noise",
    category: "ambient",
    url: "/sounds/environments/underwater-white-noise.mp3",
    defaultVolume: 40,
    description: "Calming white noise for focus",
  },
  {
    id: "city-sounds",
    name: "City Sounds",
    category: "ambient",
    url: "/sounds/environments/city-sounds.mp3",
    defaultVolume: 50,
    description: "Ethereal synthesizer music",
  },
];

export const predefinedColors = [
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#64748b",
  "#475569",
  "#334155",
  "#1e293b",
  "#dbeafe",
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
  "#dcfce7",
  "#86efac",
  "#22c55e",
  "#15803d",
  "#fef3c7",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#fce7f3",
  "#f9a8d4",
  "#ec4899",
  "#be185d",
  "#f3e8ff",
  "#c4b5fd",
  "#8b5cf6",
  "#7c3aed",
];
