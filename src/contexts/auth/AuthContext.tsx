"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types";
import {
  subscribeToAuthChanges,
  getUserProfile,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  registerWithEmailAndPassword,
  signOut as firebaseSignOut,
  resetPassword,
} from "@/lib/firebase/auth";
import { AccountMigration } from "@/lib/auth/accountMigration";
import { toast } from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  migrationStatus: {
    isLoading: boolean;
    success: boolean | null;
    message: string;
  };
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGithub: () => Promise<User>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  retryMigration: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [migrationProcessed, setMigrationProcessed] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState({
    isLoading: false,
    success: null as boolean | null,
    message: "",
  });

  // Handle data migration for authenticated users
  const performMigration = useCallback(
    async (firebaseUser: User) => {
      if (migrationProcessed) return;

      setMigrationStatus({
        isLoading: true,
        success: null,
        message: "",
      });

      try {
        const migrationResult = await AccountMigration.performMigration(
          firebaseUser
        );

        setMigrationStatus({
          isLoading: false,
          success: migrationResult.success,
          message: migrationResult.message,
        });

        if (migrationResult.success) {
          toast.success(migrationResult.message, { duration: 5000 });
        } else {
          toast.error(migrationResult.message, { duration: 8000 });
        }

        setMigrationProcessed(true);
      } catch (error) {
        console.error("Migration error:", error);
        const errorMessage =
          "Migration failed, but your local settings will continue to work.";

        setMigrationStatus({
          isLoading: false,
          success: false,
          message: errorMessage,
        });

        toast.error(errorMessage, { duration: 8000 });
        setMigrationProcessed(true);
      }
    },
    [migrationProcessed]
  );

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);

          // Handle migration for authenticated users
          if (!migrationProcessed) {
            await performMigration(firebaseUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
        // Reset migration flag when user signs out
        setMigrationProcessed(false);
        setMigrationStatus({
          isLoading: false,
          success: null,
          message: "",
        });
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [migrationProcessed, performMigration]);

  const refreshUserProfile = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    const { user } = await signInWithEmail(email, password);
    return user;
  };

  const signInWithGoogleHandler = async (): Promise<User> => {
    const { user } = await signInWithGoogle();
    return user;
  };

  const signInWithGithubHandler = async (): Promise<User> => {
    const { user } = await signInWithGithub();
    return user;
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<User> => {
    const { user } = await registerWithEmailAndPassword(
      email,
      password,
      displayName
    );
    return user;
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut();
    // Migration flag will be reset by the auth state change handler
  };

  const resetPasswordHandler = async (email: string): Promise<void> => {
    await resetPassword(email);
  };

  // Allow manual retry of migration if it fails
  const retryMigration = async (): Promise<void> => {
    if (user && !migrationStatus.isLoading) {
      setMigrationProcessed(false);
      await performMigration(user);
    }
  };

  const value = {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    migrationStatus,
    signIn,
    signInWithGoogle: signInWithGoogleHandler,
    signInWithGithub: signInWithGithubHandler,
    register,
    signOut,
    resetPassword: resetPasswordHandler,
    refreshUserProfile,
    retryMigration,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Migration-specific hooks for components that need them
export const useMigration = () => {
  const { migrationStatus, retryMigration } = useAuth();
  return {
    ...migrationStatus,
    retryMigration,
  };
};

// Authentication status hooks (for convenience)
export const useAuthStatus = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};

export const useAuthConditional = () => {
  const { user, isLoading } = useAuth();

  const whenAuthenticated = (component: ReactNode) =>
    !isLoading && user ? component : null;

  const whenNotAuthenticated = (component: ReactNode) =>
    !isLoading && !user ? component : null;

  const whenLoading = (component: ReactNode) => (isLoading ? component : null);

  return {
    whenAuthenticated,
    whenNotAuthenticated,
    whenLoading,
    isAuthenticated: !!user,
    isLoading,
  };
};
