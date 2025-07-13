// lib/storage.ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Define a proper return type
type UploadResult = {
  success: boolean;
  downloadURL?: string;
  filePath?: string;
  fileName?: string;
  error?: string;
};

export const uploadFileToStorage = async (file: File, path: string): Promise<UploadResult> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      downloadURL,
      filePath: snapshot.ref.fullPath, // Now properly included in return type
      fileName: file.name
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload file'
    };
  }
};