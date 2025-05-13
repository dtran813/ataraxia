// User types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  defaultFocusDuration: number; // in minutes
  defaultShortBreakDuration: number; // in minutes
  defaultLongBreakDuration: number; // in minutes
  enableNotifications: boolean;
  enableSoundAlerts: boolean;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

// Environment types
export interface Environment {
  id: string;
  name: string;
  description: string;
  backgroundType: "image" | "color" | "gradient";
  background: string; // URL for image or color/gradient value
  audioTracks: AudioTrack[];
  tags: string[];
  isFeatured: boolean;
  createdBy: string; // user ID or 'system'
  createdAt: Date;
}

export interface AudioTrack {
  id: string;
  name: string;
  category: "ambient" | "music" | "nature" | "binaural";
  url: string;
  defaultVolume: number; // 0-100
}

// Timer types
export interface TimerSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in seconds
  type: "focus" | "shortBreak" | "longBreak";
  completed: boolean;
  environmentId: string | null;
}

// Analytics types
export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalFocusTime: number; // in minutes
  totalBreakTime: number; // in minutes
  sessionsCompleted: number;
  sessionsAbandoned: number;
  mostUsedEnvironmentId: string | null;
}
