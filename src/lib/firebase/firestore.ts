import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";
import { Environment, TimerSession, DailyStats } from "@/types";

export const getDocument = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }

    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

export const queryDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as T)
    );
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
};

export const addDocument = async <T>(
  collectionName: string,
  data: Omit<T, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

export const setDocument = async <T>(
  collectionName: string,
  id: string,
  data: Omit<T, "id">
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

export const subscribeToDocument = <T>(
  collectionName: string,
  id: string,
  callback: (data: T | null) => void
): (() => void) => {
  const docRef = doc(db, collectionName, id);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as T);
    } else {
      callback(null);
    }
  });
};

export const subscribeToQuery = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  callback: (data: T[]) => void
): (() => void) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);

  return onSnapshot(q, (querySnapshot) => {
    const documents = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as T)
    );
    callback(documents);
  });
};

export const performBatchOperation = async <T>(
  operations: Array<{
    type: "set" | "update" | "delete";
    ref: DocumentReference;
    data?: Partial<T>;
  }>
): Promise<void> => {
  const batch = writeBatch(db);

  operations.forEach((operation) => {
    switch (operation.type) {
      case "set":
        batch.set(operation.ref, {
          ...operation.data,
          updatedAt: serverTimestamp(),
        });
        break;
      case "update":
        batch.update(operation.ref, {
          ...operation.data,
          updatedAt: serverTimestamp(),
        });
        break;
      case "delete":
        batch.delete(operation.ref);
        break;
    }
  });

  await batch.commit();
};

// Environment-specific functions
export const getEnvironmentById = (id: string): Promise<Environment | null> => {
  return getDocument<Environment>("environments", id);
};

export const getUserEnvironments = (userId: string): Promise<Environment[]> => {
  return queryDocuments<Environment>("environments", [
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc"),
  ]);
};

export const getFeaturedEnvironments = (): Promise<Environment[]> => {
  return queryDocuments<Environment>("environments", [
    where("isFeatured", "==", true),
    limit(10),
  ]);
};

// Timer session functions
export const addTimerSession = (
  session: Omit<TimerSession, "id">
): Promise<string> => {
  return addDocument<TimerSession>("timerSessions", session);
};

export const getUserSessions = (userId: string): Promise<TimerSession[]> => {
  return queryDocuments<TimerSession>("timerSessions", [
    where("userId", "==", userId),
    orderBy("startTime", "desc"),
  ]);
};

// Stats functions
export const getDailyStats = (
  userId: string,
  date: string
): Promise<DailyStats | null> => {
  return getDocument<DailyStats>(`users/${userId}/stats`, date);
};

export const updateDailyStats = (
  userId: string,
  date: string,
  stats: Partial<DailyStats>
): Promise<void> => {
  return updateDocument<DailyStats>(`users/${userId}/stats`, date, stats);
};

// Helper to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

// Helper to convert Date to Firestore timestamp
export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};
