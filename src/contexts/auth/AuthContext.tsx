"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
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

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setUser(user);

      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
  };

  const resetPasswordHandler = async (email: string): Promise<void> => {
    await resetPassword(email);
  };

  const value = {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithGoogle: signInWithGoogleHandler,
    signInWithGithub: signInWithGithubHandler,
    register,
    signOut,
    resetPassword: resetPasswordHandler,
    refreshUserProfile,
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
