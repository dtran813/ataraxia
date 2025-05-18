import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  list,
  StorageReference,
} from "firebase/storage";
import { storage } from "./config";

// Upload a file and get its download URL
export const uploadFile = async (
  path: string,
  file: File,
  metadata?: { contentType?: string }
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Upload a blob (for client-side canvas operations)
export const uploadBlob = async (
  path: string,
  blob: Blob,
  metadata?: { contentType?: string }
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytes(storageRef, blob, metadata);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading blob:", error);
    throw error;
  }
};

export const getFileUrl = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const listFiles = async (path: string): Promise<string[]> => {
  try {
    const storageRef = ref(storage, path);
    const res = await listAll(storageRef);
    return res.items.map((item) => item.fullPath);
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};

// List files with pagination
export const listFilesPaged = async (
  path: string,
  pageSize: number,
  nextPageToken?: string
): Promise<{
  items: string[];
  nextPageToken?: string;
}> => {
  try {
    const storageRef = ref(storage, path);
    const res = await list(storageRef, {
      maxResults: pageSize,
      pageToken: nextPageToken,
    });

    return {
      items: res.items.map((item) => item.fullPath),
      nextPageToken: res.nextPageToken,
    };
  } catch (error) {
    console.error("Error listing files with pagination:", error);
    throw error;
  }
};

export const generateStoragePath = (
  userId: string,
  folder: string,
  fileName: string
): string => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = fileName.split(".").pop();

  return `users/${userId}/${folder}/${timestamp}-${randomString}.${extension}`;
};

export const getStorageRef = (path: string): StorageReference => {
  return ref(storage, path);
};
