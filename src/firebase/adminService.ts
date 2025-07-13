// src/firebase/adminService.ts
import { ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

export const getAllApplications = async () => {
  const appsRef = ref(db, 'jobApplications');
  const snapshot = await get(appsRef);
  return snapshot.val();
};

export const downloadCV = (filePath: string) => {
  // Implementation using getDownloadURL()
};