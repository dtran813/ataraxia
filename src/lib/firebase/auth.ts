import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  User,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserProfile } from "@/types";
import { create } from "domain";

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user profile in Firestore
    await createUserProfile(user, { displayName });

    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  await checkAndCreateUserProfile(userCredential.user);

  return userCredential;
};

export const signInWithGithub = async (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  await checkAndCreateUserProfile(userCredential.user);

  return userCredential;
};

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Helper function to create a user profile in Firestore
export const createUserProfile = async (
  user: User,
  additionalData?: { displayName?: string }
) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, photoURL } = user;
    const displayName = additionalData?.displayName || user.displayName;

    const userData: Omit<UserProfile, "uid"> = {
      email: email || "",
      displayName: displayName || "",
      photoURL: photoURL || "",
      createdAt: new Date(),
      preferences: {
        theme: "system",
        defaultFocusDuration: 25,
        defaultShortBreakDuration: 5,
        defaultLongBreakDuration: 15,
        enableNotifications: true,
        enableSoundAlerts: true,
        autoStartBreaks: false,
        autoStartPomodoros: false,
      },
    };

    try {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }
};

// Helper to check if a user profile exists and create one if not
const checkAndCreateUserProfile = async (user: User): Promise<void> => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await createUserProfile(user);
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile from Firestore
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return { uid, ...snapshot.data() } as UserProfile;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
