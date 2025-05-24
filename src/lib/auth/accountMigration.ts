/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export interface LocalStorageData {
  timerSettings: any;
  timerStats: any;
  environmentPreferences: any;
  themePreferences: any;
}

/**
 * Migrates local storage data to Firebase when user signs up/in
 * This ensures existing users don't lose their preferences and stats
 */
export class AccountMigration {
  private static readonly STORAGE_KEYS = {
    TIMER_STORE: "timer-store",
    ENVIRONMENT_STORE: "environment-store",
    THEME_PREFERENCES: "theme-preferences",
    // Add other localStorage keys as needed
  };

  /**
   * Collect all relevant data from localStorage
   */
  static collectLocalData(): LocalStorageData | null {
    try {
      const localData: Partial<LocalStorageData> = {};
      let hasData = false;

      // Timer data
      const timerData = localStorage.getItem(this.STORAGE_KEYS.TIMER_STORE);
      if (timerData) {
        const parsed = JSON.parse(timerData);
        if (parsed.state) {
          localData.timerSettings = {
            focusDuration: parsed.state.settings?.focusDuration,
            shortBreakDuration: parsed.state.settings?.shortBreakDuration,
            longBreakDuration: parsed.state.settings?.longBreakDuration,
            autoStartBreaks: parsed.state.settings?.autoStartBreaks,
            autoStartPomodoros: parsed.state.settings?.autoStartPomodoros,
            longBreakInterval: parsed.state.settings?.longBreakInterval,
            soundEnabled: parsed.state.settings?.soundEnabled,
            notificationsEnabled: parsed.state.settings?.notificationsEnabled,
          };

          localData.timerStats = {
            totalFocusTime: parsed.state.stats?.totalFocusTime || 0,
            sessionsCompleted: parsed.state.stats?.sessionsCompleted || 0,
            totalSessions: parsed.state.stats?.totalSessions || 0,
            longestStreak: parsed.state.stats?.longestStreak || 0,
            currentStreak: parsed.state.stats?.currentStreak || 0,
            dailyGoal: parsed.state.stats?.dailyGoal || 4,
            weeklyStats: parsed.state.stats?.weeklyStats || {},
            lastSessionDate: parsed.state.stats?.lastSessionDate,
          };

          hasData = true;
        }
      }

      // Environment preferences
      const envData = localStorage.getItem(this.STORAGE_KEYS.ENVIRONMENT_STORE);
      if (envData) {
        const parsed = JSON.parse(envData);
        if (parsed.state) {
          localData.environmentPreferences = {
            currentEnvironment: parsed.state.currentEnvironment,
            masterVolume: parsed.state.masterVolume,
            favoriteEnvironments: parsed.state.favoriteEnvironments || [],
            customEnvironments: parsed.state.customEnvironments || [],
          };
          hasData = true;
        }
      }

      // Theme preferences
      const themeData = localStorage.getItem(
        this.STORAGE_KEYS.THEME_PREFERENCES
      );
      if (themeData) {
        localData.themePreferences = JSON.parse(themeData);
        hasData = true;
      }

      return hasData ? (localData as LocalStorageData) : null;
    } catch (error) {
      console.error("Error collecting local data:", error);
      return null;
    }
  }

  /**
   * Check if user already has cloud data
   */
  static async hasCloudData(user: User): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      return userDoc.exists() && userDoc.data()?.migratedAt;
    } catch (error) {
      console.error("Error checking cloud data:", error);
      return false;
    }
  }

  /**
   * Migrate local data to Firebase for authenticated user
   */
  static async migrateToCloud(user: User): Promise<boolean> {
    try {
      // Check if user already has migrated data
      if (await this.hasCloudData(user)) {
        console.log("User already has cloud data, skipping migration");
        return true;
      }

      const localData = this.collectLocalData();

      if (!localData) {
        console.log("No local data to migrate");
        return true;
      }

      // Save to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          ...localData,
          migratedAt: new Date().toISOString(),
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        { merge: true }
      );

      console.log("Successfully migrated local data to cloud");
      return true;
    } catch (error) {
      console.error("Error migrating data to cloud:", error);
      return false;
    }
  }

  /**
   * Load cloud data and sync with local stores
   */
  static async syncFromCloud(user: User): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        console.log("No cloud data found for user");
        return false;
      }

      const cloudData = userDoc.data();

      // Update localStorage with cloud data (this will trigger store updates)
      if (cloudData.timerSettings || cloudData.timerStats) {
        const existingTimerData = localStorage.getItem(
          this.STORAGE_KEYS.TIMER_STORE
        );
        const timerStore = existingTimerData
          ? JSON.parse(existingTimerData)
          : { state: {} };

        if (cloudData.timerSettings) {
          timerStore.state.settings = {
            ...timerStore.state.settings,
            ...cloudData.timerSettings,
          };
        }

        if (cloudData.timerStats) {
          timerStore.state.stats = {
            ...timerStore.state.stats,
            ...cloudData.timerStats,
          };
        }

        localStorage.setItem(
          this.STORAGE_KEYS.TIMER_STORE,
          JSON.stringify(timerStore)
        );
      }

      if (cloudData.environmentPreferences) {
        const existingEnvData = localStorage.getItem(
          this.STORAGE_KEYS.ENVIRONMENT_STORE
        );
        const envStore = existingEnvData
          ? JSON.parse(existingEnvData)
          : { state: {} };

        envStore.state = {
          ...envStore.state,
          ...cloudData.environmentPreferences,
        };

        localStorage.setItem(
          this.STORAGE_KEYS.ENVIRONMENT_STORE,
          JSON.stringify(envStore)
        );
      }

      if (cloudData.themePreferences) {
        localStorage.setItem(
          this.STORAGE_KEYS.THEME_PREFERENCES,
          JSON.stringify(cloudData.themePreferences)
        );
      }

      console.log("Successfully synced data from cloud");
      return true;
    } catch (error) {
      console.error("Error syncing from cloud:", error);
      return false;
    }
  }

  /**
   * Clear local storage after successful migration
   * Only call this if you're sure the data is safely stored in cloud
   */
  static clearLocalData(): void {
    try {
      // We don't actually clear the data since Zustand stores need it
      // Instead, we just mark it as migrated in a separate key
      localStorage.setItem("migration-completed", new Date().toISOString());
      console.log("Marked local data as migrated");
    } catch (error) {
      console.error("Error marking migration completion:", error);
    }
  }

  /**
   * Full migration workflow for new authenticated users
   */
  static async performMigration(user: User): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // First, try to sync existing cloud data
      const syncSuccess = await this.syncFromCloud(user);

      if (syncSuccess) {
        return {
          success: true,
          message:
            "Your preferences and statistics have been restored from your account.",
        };
      }

      // If no cloud data, migrate local data
      const migrateSuccess = await this.migrateToCloud(user);

      if (migrateSuccess) {
        this.clearLocalData();
        return {
          success: true,
          message:
            "Your local preferences and statistics have been saved to your account.",
        };
      }

      return {
        success: false,
        message:
          "Failed to migrate your data. Your local settings will continue to work.",
      };
    } catch (error) {
      console.error("Migration workflow error:", error);
      return {
        success: false,
        message:
          "An error occurred during data migration. Your local settings will continue to work.",
      };
    }
  }
}
