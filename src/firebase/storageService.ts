import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface UploadResult {
  success: boolean;
  downloadURL?: string;
  filePath?: string;
  error?: string;
}

export const uploadJobApplicationCV = async (
  file: File,
  applicationId: string,
  applicantEmail: string
): Promise<UploadResult> => {
  try {
    // 1. Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      throw new Error('Only PDF and Word documents are allowed');
    }

    // 2. Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // 3. Create storage path
    const sanitizedEmail = applicantEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const filePath = `job-applications/${sanitizedEmail}/${applicationId}/${file.name}`;
    const storageRef = ref(storage, filePath);

    // 4. Upload file
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      success: true,
      downloadURL,
      filePath
    };
  } catch (error) {
    console.error('CV upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'File upload failed'
    };
  }
};